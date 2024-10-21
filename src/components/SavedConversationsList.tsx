import React, { useState } from 'react';
import { SavedConversation, Message } from '../types';
import { Edit, Trash2, Plus, MessageSquare } from 'lucide-react';

interface SavedConversationsListProps {
  conversations: SavedConversation[];
  onAddConversation: (newConversation: Omit<SavedConversation, 'id'>) => void;
  onEditConversation: (editedConversation: SavedConversation) => void;
  onDeleteConversation: (id: number) => void;
}

const SavedConversationsList: React.FC<SavedConversationsListProps> = ({
  conversations,
  onAddConversation,
  onEditConversation,
  onDeleteConversation
}) => {
  const [editingConversation, setEditingConversation] = useState<SavedConversation | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newConversation, setNewConversation] = useState<Omit<SavedConversation, 'id'>>({
    title: '',
    date: new Date(),
    messages: []
  });

  const handleEdit = (conversation: SavedConversation) => {
    setEditingConversation(conversation);
  };

  const handleSave = () => {
    if (editingConversation) {
      onEditConversation(editingConversation);
      setEditingConversation(null);
    }
  };

  const handleCancel = () => {
    setEditingConversation(null);
  };

  const handleDelete = (id: number) => {
    onDeleteConversation(id);
  };

  const handleAdd = () => {
    onAddConversation(newConversation);
    setIsAdding(false);
    setNewConversation({
      title: '',
      date: new Date(),
      messages: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Αποθηκευμένες Συνομιλίες</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={20} className="inline-block mr-2" />
          Προσθήκη Συνομιλίας
        </button>
      </div>
      {isAdding && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Προσθήκη Νέας Συνομιλίας</h3>
          <input
            type="text"
            placeholder="Τίτλος συνομιλίας"
            value={newConversation.title}
            onChange={(e) => setNewConversation({ ...newConversation, title: e.target.value })}
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
        {conversations.map((conversation) => (
          <li key={conversation.id} className="p-4">
            {editingConversation && editingConversation.id === conversation.id ? (
              <div>
                <input
                  type="text"
                  value={editingConversation.title}
                  onChange={(e) => setEditingConversation({ ...editingConversation, title: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ακύρωση</button>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Αποθήκευση</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{conversation.title}</h3>
                  <p className="text-sm text-gray-500">{conversation.date.toLocaleDateString('el-GR')}</p>
                  <p className="text-sm text-gray-500">{conversation.messages.length} μηνύματα</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(conversation)} className="text-blue-600 hover:text-blue-800">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(conversation.id)} className="text-red-600 hover:text-red-800">
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

export default SavedConversationsList;