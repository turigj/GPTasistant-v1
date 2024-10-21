import React, { useState } from 'react';
import { Note } from '../types';
import { Edit, Trash2, Plus } from 'lucide-react';

interface NotesListProps {
  notes: Note[];
  onAddNote: (newNote: Omit<Note, 'id'>) => void;
  onEditNote: (editedNote: Note) => void;
  onDeleteNote: (id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onAddNote, onEditNote, onDeleteNote }) => {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, 'id'>>({
    date: new Date(),
    content: '',
    keywords: []
  });

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleSave = () => {
    if (editingNote) {
      onEditNote(editingNote);
      setEditingNote(null);
    }
  };

  const handleCancel = () => {
    setEditingNote(null);
  };

  const handleDelete = (id: number) => {
    onDeleteNote(id);
  };

  const handleAdd = () => {
    onAddNote(newNote);
    setIsAdding(false);
    setNewNote({
      date: new Date(),
      content: '',
      keywords: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Σημειώσεις</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={20} className="inline-block mr-2" />
          Προσθήκη Σημείωσης
        </button>
      </div>
      {isAdding && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Προσθήκη Νέας Σημείωσης</h3>
          <textarea
            placeholder="Περιεχόμενο σημείωσης"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
            rows={4}
          />
          <input
            type="text"
            placeholder="Λέξεις κλειδιά (χωρισμένες με κόμμα)"
            value={newNote.keywords.join(', ')}
            onChange={(e) => setNewNote({ ...newNote, keywords: e.target.value.split(',').map(k => k.trim()) })}
            className="border rounded-md p-2 w-full mb-2"
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
      <ul className="divide-y divide-gray-200">
        {notes.map((note) => (
          <li key={note.id} className="p-4">
            {editingNote && editingNote.id === note.id ? (
              <div>
                <textarea
                  value={editingNote.content}
                  onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                  rows={4}
                />
                <input
                  type="text"
                  value={editingNote.keywords.join(', ')}
                  onChange={(e) => setEditingNote({ ...editingNote, keywords: e.target.value.split(',').map(k => k.trim()) })}
                  className="border rounded-md p-2 w-full mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ακύρωση</button>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Αποθήκευση</button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-2">{note.date.toLocaleDateString('el-GR')}</p>
                <p className="text-sm text-gray-900 mb-2">{note.content}</p>
                <p className="text-sm text-gray-500">Λέξεις κλειδιά: {note.keywords.join(', ')}</p>
                <div className="mt-2 flex justify-end space-x-2">
                  <button onClick={() => handleEdit(note)} className="text-blue-600 hover:text-blue-800">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(note.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;