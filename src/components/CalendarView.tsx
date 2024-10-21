import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { CalendarEvent } from '../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent: (newEvent: Omit<CalendarEvent, 'id'>) => void;
  onEditEvent: (editedEvent: CalendarEvent) => void;
  onDeleteEvent: (id: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, 'id'>>({
    title: '',
    date: new Date(),
    description: ''
  });

  const changeMonth = (increment: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const changeYear = (year: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(year);
      return newDate;
    });
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
  };

  const handleSave = () => {
    if (editingEvent) {
      onEditEvent(editingEvent);
      setEditingEvent(null);
    }
  };

  const handleCancel = () => {
    setEditingEvent(null);
  };

  const handleDelete = (id: number) => {
    onDeleteEvent(id);
  };

  const handleAdd = () => {
    onAddEvent(newEvent);
    setIsAdding(false);
    setNewEvent({
      title: '',
      date: new Date(),
      description: ''
    });
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dayEvents = events.filter(event => 
        event.date.getFullYear() === year &&
        event.date.getMonth() === month &&
        event.date.getDate() === i
      );

      days.push(
        <li key={i} className="py-2 px-4 border-b border-gray-200">
          <div className="font-semibold">{i} {date.toLocaleDateString('el-GR', { weekday: 'long' })}</div>
          {dayEvents.map(event => (
            <div key={event.id} className="mt-2 p-2 bg-blue-100 rounded">
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-gray-600">{event.description}</div>
              <div className="mt-1 flex justify-end space-x-2">
                <button onClick={() => handleEdit(event)} className="text-blue-600 hover:text-blue-800">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(event.id)} className="text-red-600 hover:text-red-800">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </li>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <div className="text-lg font-semibold">
          {currentDate.toLocaleDateString('el-GR', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">
            Επιλογή Έτους
          </label>
          <select
            id="year-select"
            value={currentDate.getFullYear()}
            onChange={(e) => changeYear(parseInt(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={20} className="inline-block mr-2" />
          Προσθήκη Γεγονότος
        </button>
      </div>
      {isAdding && (
        <div className="mb-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Προσθήκη Νέου Γεγονότος</h3>
          <input
            type="text"
            placeholder="Τίτλος"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <input
            type="date"
            value={newEvent.date.toISOString().split('T')[0]}
            onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <textarea
            placeholder="Περιγραφή"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Ακύρωση
            </button>
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Προσθήκη
            </button>
          </div>
        </div>
      )}
      {editingEvent && (
        <div className="mb-4 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Επεξεργασία Γεγονότος</h3>
          <input
            type="text"
            value={editingEvent.title}
            onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <input
            type="date"
            value={editingEvent.date.toISOString().split('T')[0]}
            onChange={(e) => setEditingEvent({ ...editingEvent, date: new Date(e.target.value) })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <textarea
            value={editingEvent.description}
            onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ακύρωση</button>
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Αποθήκευση</button>
          </div>
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {renderCalendar()}
      </ul>
    </div>
  );
};

export default CalendarView;