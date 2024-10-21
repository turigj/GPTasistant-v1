import React, { useState } from 'react';
import { ScriptFormula } from '../types';
import { Edit, Trash2, Plus, Play } from 'lucide-react';

interface ScriptFormulasListProps {
  scripts: ScriptFormula[];
  onAddScript: (newScript: Omit<ScriptFormula, 'id'>) => void;
  onEditScript: (editedScript: ScriptFormula) => void;
  onDeleteScript: (id: number) => void;
  onExecuteScript: (script: ScriptFormula) => void;
}

const ScriptFormulasList: React.FC<ScriptFormulasListProps> = ({
  scripts,
  onAddScript,
  onEditScript,
  onDeleteScript,
  onExecuteScript
}) => {
  const [editingScript, setEditingScript] = useState<ScriptFormula | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newScript, setNewScript] = useState<Omit<ScriptFormula, 'id'>>({
    name: '',
    description: '',
    code: '',
    language: 'javascript'
  });

  const handleEdit = (script: ScriptFormula) => {
    setEditingScript(script);
  };

  const handleSave = () => {
    if (editingScript) {
      onEditScript(editingScript);
      setEditingScript(null);
    }
  };

  const handleCancel = () => {
    setEditingScript(null);
  };

  const handleDelete = (id: number) => {
    onDeleteScript(id);
  };

  const handleAdd = () => {
    onAddScript(newScript);
    setIsAdding(false);
    setNewScript({
      name: '',
      description: '',
      code: '',
      language: 'javascript'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Σκριπτς και Φόρμουλες</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={20} className="inline-block mr-2" />
          Προσθήκη Σκριπτ
        </button>
      </div>
      {isAdding && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Προσθήκη Νέου Σκριπτ</h3>
          <input
            type="text"
            placeholder="Όνομα σκριπτ"
            value={newScript.name}
            onChange={(e) => setNewScript({ ...newScript, name: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
          />
          <textarea
            placeholder="Περιγραφή"
            value={newScript.description}
            onChange={(e) => setNewScript({ ...newScript, description: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
            rows={3}
          />
          <textarea
            placeholder="Κώδικας"
            value={newScript.code}
            onChange={(e) => setNewScript({ ...newScript, code: e.target.value })}
            className="border rounded-md p-2 w-full mb-2 font-mono"
            rows={10}
          />
          <select
            value={newScript.language}
            onChange={(e) => setNewScript({ ...newScript, language: e.target.value })}
            className="border rounded-md p-2 w-full mb-2"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
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
        {scripts.map((script) => (
          <li key={script.id} className="p-4">
            {editingScript && editingScript.id === script.id ? (
              <div>
                <input
                  type="text"
                  value={editingScript.name}
                  onChange={(e) => setEditingScript({ ...editingScript, name: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                />
                <textarea
                  value={editingScript.description}
                  onChange={(e) => setEditingScript({ ...editingScript, description: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                  rows={3}
                />
                <textarea
                  value={editingScript.code}
                  onChange={(e) => setEditingScript({ ...editingScript, code: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2 font-mono"
                  rows={10}
                />
                <select
                  value={editingScript.language}
                  onChange={(e) => setEditingScript({ ...editingScript, language: e.target.value })}
                  className="border rounded-md p-2 w-full mb-2"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ακύρωση</button>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Αποθήκευση</button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium">{script.name}</h3>
                  <div className="flex space-x-2">
                    <button onClick={() => onExecuteScript(script)} className="text-green-600 hover:text-green-800">
                      <Play size={20} />
                    </button>
                    <button onClick={() => handleEdit(script)} className="text-blue-600 hover:text-blue-800">
                      <Edit size={20} />
                    </button>
                    <button onClick={() => handleDelete(script.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{script.description}</p>
                <pre className="bg-gray-100 p-2 rounded-md text-sm overflow-x-auto">
                  <code>{script.code}</code>
                </pre>
                <p className="text-sm text-gray-500 mt-2">Γλώσσα: {script.language}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScriptFormulasList;