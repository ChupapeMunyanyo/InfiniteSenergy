import React from 'react';
import { DataItem } from '../entities/types';
interface DataTableProps {
    items: DataItem[];
    loading: boolean;
    emptyMessage: string;
    onAddItem?: (item: DataItem) => void;
    onUpdateItem?: (item: DataItem) => void;
    onRemoveItem?: (id: number) => void;
  }
  export const DataTable: React.FC<DataTableProps> = ({ 
    items, 
    loading, 
    emptyMessage,
    onAddItem, 
    onRemoveItem 
  }) => {
    if (loading) {
      return <div className="loading">Загрузка данных...</div>;
    }
  
    const handleAdd = () => {
      if (!onAddItem) return;
      const newItem: DataItem = {
        id: Math.max(0, ...items.map(i => i.id)) + 1,
        name: 'Новый элемент',
        status: 'new',
        date_created: new Date().toISOString(),
        price: 0,
        category: 'other'
      };
      onAddItem(newItem);
    };
  
    return (
      <div className="data-table">
        <button onClick={handleAdd} className="add-btn">
          Добавить элемент
        </button>
        
        {items.length === 0 ? (
          <div className="empty-message">{emptyMessage}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th>Цена</th>
                <th>Категория</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{new Date(item.date_created).toLocaleDateString()}</td>
                  <td>{item.price} ₽</td>
                  <td>{item.category}</td>
                  <td>
                    <button onClick={() => onRemoveItem?.(item.id)}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };