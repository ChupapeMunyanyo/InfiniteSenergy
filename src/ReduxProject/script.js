// Конфигурация интеграции
const config = {
    clientId: 'ваш_client_id',//Нужно заменить
    clientSecret: 'ваш_client_secret',//Нужно заменить
    redirectUri: 'https://example.com', //Нужно заменить
    subdomain: 'ваш_поддомен', //Нужно заменить
    accessToken: 'ваш_access_token',//Нужно заменить
    refreshToken: 'ваш_refresh_token'//Нужно заменить
};

const API_BASE_URL = `https://${config.subdomain}.amocrm.ru/api/v4`;

let currentExpandedDealId = null;
let dealsWithContacts = [];

async function makeApiRequest(url, method = 'GET', body = null) {
    const headers = {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json'
    };
    
    const options = {
        method,
        headers
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (response.status === 401) {
            await refreshAccessToken();
            return makeApiRequest(url, method, body);
        }
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
}

async function refreshAccessToken() {
    const url = `https://${config.subdomain}.amocrm.ru/oauth2/access_token`;
    
    const body = {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: config.refreshToken,
        redirect_uri: config.redirectUri
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        config.accessToken = data.access_token;
        config.refreshToken = data.refresh_token;
        
        console.log('Access token refreshed successfully');
    } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
    }
}

async function fetchDeals() {
    try {

        const dealsResponse = await makeApiRequest(`${API_BASE_URL}/leads?with=contacts&limit=50`);
        
        if (!dealsResponse._embedded || !dealsResponse._embedded.leads) {
            throw new Error('No deals found in response');
        }
        
        const allDeals = dealsResponse._embedded.leads;
        

        const dealsWithContactsIds = allDeals.filter(deal => 
            deal._embedded && deal._embedded.contacts && deal._embedded.contacts.length > 0
        ).map(deal => deal.id);
        
        const detailedDeals = [];
        
        for (let i = 0; i < dealsWithContactsIds.length; i++) {
            const dealId = dealsWithContactsIds[i];
            
            const deal = await makeApiRequest(`${API_BASE_URL}/leads/${dealId}?with=contacts`);
            
            const contactId = deal._embedded.contacts[0].id;
            const contact = await makeApiRequest(`${API_BASE_URL}/contacts/${contactId}`);
            const tasks = await makeApiRequest(`${API_BASE_URL}/tasks?filter[entity_id]=${dealId}&filter[entity_type]=leads`);
            
            detailedDeals.push({
                deal,
                contact,
                tasks: tasks._embedded.tasks || []
            });
            
            if (i > 0 && i % 2 === 0) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        return detailedDeals;
    } catch (error) {
        console.error('Error fetching deals:', error);
        throw error;
    }
}

function renderDealsTable(deals) {
    const tableBody = document.getElementById('dealsTableBody');
    tableBody.innerHTML = '';
    
    deals.forEach(item => {
        const deal = item.deal;
        const contact = item.contact;
        const tasks = item.tasks;
        
        const nearestTask = tasks.length > 0 ? tasks[0] : null;
        
        const status = getTaskStatus(nearestTask);
        
        const row = document.createElement('tr');
        row.className = 'deal-card';
        row.dataset.dealId = deal.id;
        
        row.innerHTML = `
            <td>${deal.id}</td>
            <td>${deal.name || 'Без названия'}</td>
            <td>${deal.price || 0} ₽</td>
            <td>${contact.id}</td>
            <td>${contact.name || 'Без имени'}</td>
            <td>${getContactPhone(contact)}</td>
            <td>
                <svg class="status-circle status-${status.color}" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" fill="${status.color}" />
                </svg>
                ${status.text}
            </td>
        `;
        
        row.addEventListener('click', () => toggleDealDetails(deal.id));
        tableBody.appendChild(row);
    });
}

function getContactPhone(contact) {
    if (!contact.custom_fields_values) return 'Нет телефона';
    
    const phoneField = contact.custom_fields_values.find(field => field.field_code === 'PHONE');
    if (!phoneField || !phoneField.values || phoneField.values.length === 0) return 'Нет телефона';
    
    return phoneField.values[0].value;
}

function getTaskStatus(task) {
    if (!task) {
        return { color: 'red', text: 'Нет задачи' };
    }
    
    const taskDate = new Date(task.complete_till * 1000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (taskDate < today) {
        return { color: 'red', text: 'Просрочена' };
    }
    
    if (taskDate >= today && taskDate < tomorrow) {
        return { color: 'green', text: 'Сегодня' };
    }
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);
    
    if (taskDate >= tomorrow && taskDate < dayAfterTomorrow) {
        return { color: 'green', text: 'Завтра' };
    }
    
    return { color: 'yellow', text: 'Более чем через день' };
}

async function toggleDealDetails(dealId) {
    const tableBody = document.getElementById('dealsTableBody');
    const rows = tableBody.querySelectorAll('tr');
    
    if (currentExpandedDealId === dealId) {
        currentExpandedDealId = null;
        rows.forEach(row => {
            if (row.classList.contains('expanded-row')) {
                row.remove();
            }
        });
        return;
    }
    
    if (currentExpandedDealId) {
        rows.forEach(row => {
            if (row.classList.contains('expanded-row')) {
                row.remove();
            }
        });
    }
    
    currentExpandedDealId = dealId;
    
    const clickedRow = Array.from(rows).find(row => row.dataset.dealId === dealId.toString());
    if (!clickedRow) return;
    
    const expandedRow = document.createElement('tr');
    expandedRow.className = 'expanded-row';
    expandedRow.innerHTML = `
        <td colspan="7">
            <div class="d-flex justify-content-center">
                <div class="loading-spinner"></div>
                <span class="ms-2">Загрузка деталей сделки...</span>
            </div>
        </td>
    `;
    
    clickedRow.after(expandedRow);
    
    try {
        const deal = await makeApiRequest(`${API_BASE_URL}/leads/${dealId}`);
        
        const tasksResponse = await makeApiRequest(`${API_BASE_URL}/tasks?filter[entity_id]=${dealId}&filter[entity_type]=leads`);
        const tasks = tasksResponse._embedded.tasks || [];
        const nearestTask = tasks.length > 0 ? tasks[0] : null;
        const taskStatus = getTaskStatus(nearestTask);
        
        const createdAt = new Date(deal.created_at * 1000);
        const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}.${(createdAt.getMonth() + 1).toString().padStart(2, '0')}.${createdAt.getFullYear()}`;
        
        expandedRow.innerHTML = `
            <td colspan="7">
                <div class="expanded-card">
                    <h5>${deal.name || 'Без названия'}</h5>
                    <div class="row mt-3">
                        <div class="col-md-6">
                            <p><strong>ID:</strong> ${deal.id}</p>
                            <p><strong>Дата создания:</strong> ${formattedDate}</p>
                            <p><strong>Бюджет:</strong> ${deal.price || 0} ₽</p>
                        </div>
                        <div class="col-md-6">
                            <p><strong>Статус ближайшей задачи:</strong> 
                                <svg class="status-circle status-${taskStatus.color}" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="6" fill="${taskStatus.color}" />
                                </svg>
                                ${taskStatus.text}
                            </p>
                            ${nearestTask ? `<p><strong>Текст задачи:</strong> ${nearestTask.text}</p>` : ''}
                        </div>
                    </div>
                </div>
            </td>
        `;
    } catch (error) {
        console.error('Error fetching deal details:', error);
        expandedRow.innerHTML = `
            <td colspan="7">
                <div class="alert alert-danger">
                    Ошибка при загрузке деталей сделки
                </div>
            </td>
        `;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        dealsWithContacts = await fetchDeals();
        
        renderDealsTable(dealsWithContacts);
    } catch (error) {
        console.error('Initialization error:', error);
        alert('Произошла ошибка при загрузке данных. Пожалуйста, проверьте консоль для подробностей.');
    }
});