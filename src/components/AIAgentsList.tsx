import React, { useState } from 'react';
import { AIAgent } from '../types';
import { Edit, Trash2, Plus, MessageSquare } from 'lucide-react';

interface AIAgentsListProps {
  agents: AIAgent[];
  onAddAgent: (newAgent: Omit<AIAgent, 'id'>) => void;
  onEditAgent: (editedAgent: AIAgent) => void;
  onDeleteAgent: (id: number) => void;
  onChatWithAgent: (agent: AIAgent) => void;
}

const AIAgentsList: React.FC<AIAgentsListProps> = ({
  agents,
  onAddAgent,
  onEditAgent,
  onDeleteAgent,
  onChatWithAgent
}) => {
  const [editingAgent, setEditingAgent] = useState<AIAgent | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newAgent, setNewAgent] = useState<Omit<AIAgent, 'id'>>({
    name: '',
    prompt: '',
    skills: [],
    attachment: null,
    model: 'gpt-4o'
  });

  const handleEdit = (agent: AIAgent) => {
    setEditingAgent(agent);
  };

  const handleSave = () => {
    if (editingAgent) {
      onEditAgent(editingAgent);
      setEditingAgent(null);
    }
  };

  const handleCancel = () => {
    setEditingAgent(null);
  };

  const handleDelete = (id: number) => {
    onDeleteAgent(id);
  };

  const handleAdd = () => {
    onAddAgent(newAgent);
    setIsAdding(false);
    setNewAgent({
      name: '',
      prompt: '',
      skills: [],
      attachment: null,
      model: 'gpt-4o'
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isNewAgent: boolean) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (isNewAgent) {
          setNewAgent({ ...newAgent, attachment: content });
        } else if (editingAgent) {
          setEditingAgent({ ...editingAgent, attachment: content });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Πράκτορες AI</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={20} className="inline-block mr-2" />
          Προσθήκη Πράκτορα
        </button>
      </div>
      {isAdding && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Προσθήκη Νέου Πράκτορα AI</h3>
          <input
            type="text"
            placeholder="Όνομα πράκτορα"
            value={newAgent.name}
            onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <textarea
            placeholder="Prompt"
            value={newAgent.prompt}
            onChange={(e) => setNewAgent({ ...newAgent, prompt: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
            rows={3}
          />
          <input
            type="text"
            placeholder="Δεξιότητες (χωρισμένες με κόμμα)"
            value={newAgent.skills.join(', ')}
            onChange={(e) => setNewAgent({ ...newAgent, skills: e.target.value.split(',').map(s => s.trim()) })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <select
            value={newAgent.model}
            onChange={(e) => setNewAgent({ ...newAgent, model: e.target.value as 'gpt-4o' | 'gpt-4o-mini' })}
            className="border rounded-md p-2 w-full mb-2"
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4o-mini">GPT-4o-mini</option>
          </select>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileChange(e, true)}
            className="mb-2"
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
        {agents.map((agent) => (
          <li key={agent.id} className="p-4">
            {editingAgent && editingAgent.id === agent.id ? (
              <div>
                <input
                  type="text"
                  value={editingAgent.name}
                  onChange={(e) => setEditingAgent({ ...editingAgent, name: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                />
                <textarea
                  value={editingAgent.prompt}
                  onChange={(e) => setEditingAgent({ ...editingAgent, prompt: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                  rows={3}
                />
                <input
                  type="text"
                  value={editingAgent.skills.join(', ')}
                  onChange={(e) => setEditingAgent({ ...editingAgent, skills: e.target.value.split(',').map(s => s.trim()) })}
                  className="border rounded-md p-2 w-full mb-2"
                />
                <select
                  value={editingAgent.model}
                  onChange={(e) => setEditingAgent({ ...editingAgent, model: e.target.value as 'gpt-4o' | 'gpt-4o-mini' })}
                  className="border rounded-md p-2 w-full mb-2"
                >
                  <option value="gpt-4o">GPT-4o</option>
                  <option value="gpt-4o-mini">GPT-4o-mini</option>
                </select>
                <input
                  type="file"
                  accept=".txt"
                  onChange={(e) => handleFileChange(e, false)}
                  className="mb-2"
                />
                <div className="flex justify-end space-x-2">
                  <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ακύρωση</button>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Αποθήκευση</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{agent.name}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => onChatWithAgent(agent)} className="text-green-600 hover:text-green-800">
                      <MessageSquare size={20} />
                    </button>
                    <button onClick={() => handleEdit(agent)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(agent.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{agent.prompt}</p>
                <p className="text-sm text-gray-500">Δεξιότητες: {agent.skills.join(', ')}</p>
                <p className="text-sm text-gray-500">Μοντέλο: {agent.model}</p>
                {agent.attachment && <p className="text-sm text-gray-500 mt-1">Επισυναπτόμενο αρχείο: Διαθέσιμο</p>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIAgentsList;