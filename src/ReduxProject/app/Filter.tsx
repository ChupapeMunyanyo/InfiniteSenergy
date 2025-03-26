import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FiltersProps {
    statusOptions: string[];
    onFilterChange: React.Dispatch<React.SetStateAction<{
      dateFrom: Date | null;
      dateTo: Date | null;
      statuses: string[];
    }>>;
    disabled?: boolean; // Добавляем необязательное свойство
  }

const Filters: React.FC<FiltersProps> = ({ statusOptions, onFilterChange }) => {
  const [dateFrom, setDateFrom] = React.useState<Date | null>(null);
  const [dateTo, setDateTo] = React.useState<Date | null>(null);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);

  React.useEffect(() => {
    onFilterChange({
      dateFrom,
      dateTo,
      statuses: selectedStatuses,
    });
  }, [dateFrom, dateTo, selectedStatuses, onFilterChange]);

  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label>Дата от:</label>
        <DatePicker
          selected={dateFrom}
          onChange={(date) => setDateFrom(date)}
          selectsStart
          startDate={dateFrom}
          endDate={dateTo}
          dateFormat="dd.MM.yyyy"
        />
      </div>

      <div className="filter-group">
        <label>Дата до:</label>
        <DatePicker
          selected={dateTo}
          onChange={(date) => setDateTo(date)}
          selectsEnd
          startDate={dateFrom}
          endDate={dateTo}
          minDate={dateFrom??undefined}
          dateFormat="dd.MM.yyyy"
        />
      </div>

      <div className="filter-group">
        <label>Статус:</label>
        <div className="status-filters">
          {statusOptions.map((status) => (
            <div key={status} className="status-checkbox">
              <input
                type="checkbox"
                id={`status-${status}`}
                checked={selectedStatuses.includes(status)}
                onChange={() => handleStatusChange(status)}
              />
              <label htmlFor={`status-${status}`}>{status}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;