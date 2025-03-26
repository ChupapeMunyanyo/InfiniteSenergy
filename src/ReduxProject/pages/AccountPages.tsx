import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../processes/authSlice';
import { fetchData, saveData, addItem, updateItem, removeItem } from '../processes/dataSlice';
import { DataTable } from '../app/Table';
import Filters from '../app/Filter';
import { AppDispatch, RootState } from '../app/store';
import { DataItem } from '../entities/types';

const AccountPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items,
    loading,
    saving,
    error: dataError
  } = useSelector((state: RootState) => state.data);

  const [filters, setFilters] = React.useState<{
    dateFrom: Date | null;
    dateTo: Date | null;
    statuses: string[];
  }>({
    dateFrom: null,
    dateTo: null,
    statuses: [],
  });

  const [notification, setNotification] = React.useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  // Загрузка данных при монтировании
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // Обработчик уведомлений
  useEffect(() => {
    if (dataError) {
      setNotification({ message: dataError, type: 'error' });
    }
  }, [dataError]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = async () => {
    try {
      await dispatch(saveData(filteredItems)).unwrap();
      setNotification({
        message: 'Данные успешно сохранены в localStorage!',
        type: 'success'
      });
    } catch (err) {
      setNotification({
        message: 'Ошибка при сохранении данных',
        type: 'error'
      });
    }
  };

  // Добавление нового элемента
  const handleAddItem = (newItem: DataItem) => {
    dispatch(addItem(newItem));
    setNotification({
      message: 'Элемент добавлен!',
      type: 'success'
    });
  };

  // Обновление элемента
  const handleUpdateItem = (updatedItem: DataItem) => {
    dispatch(updateItem(updatedItem));
    setNotification({
      message: 'Элемент обновлен!',
      type: 'success'
    });
  };

  // Удаление элемента
  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
    setNotification({
      message: 'Элемент удален!',
      type: 'success'
    });
  };

  // Оптимизированная фильтрация данных
  const filteredItems = useMemo(() => {
    return items.filter((item: DataItem) => {
      const dateMatch = !filters.dateFrom || new Date(item.date_created) >= filters.dateFrom;
      const dateMatchTo = !filters.dateTo || new Date(item.date_created) <= filters.dateTo;
      const statusMatch = filters.statuses.length === 0 || filters.statuses.includes(item.status);
      
      return dateMatch && dateMatchTo && statusMatch;
    });
  }, [items, filters]);

  // Получение уникальных статусов
  const statusOptions = useMemo(() => {
    return [...new Set(items.map((item: DataItem) => item.status))];
  }, [items]);

  // Автоматическое скрытие уведомления
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="account-page">
      <div className="account-controls">
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          disabled={saving}
        >
          Выход
        </button>
        
        <button
          onClick={handleSave}
          className="save-btn"
          disabled={loading || saving}
        >
          {saving ? (
            <span className="saving-indicator">
              <span className="spinner"></span>
              Сохранение...
            </span>
          ) : 'Сохранить данные'}
        </button>
      </div>

      {notification.type && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <Filters
        statusOptions={statusOptions}
        onFilterChange={setFilters}
        disabled={loading || saving}
      />

      <DataTable 
        items={filteredItems} 
        loading={loading || saving}
        emptyMessage={items.length === 0 ? 'Нет данных для отображения' : 'Нет данных по выбранным фильтрам'}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default AccountPage;