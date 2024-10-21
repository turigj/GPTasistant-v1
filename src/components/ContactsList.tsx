import React, { useState } from 'react';
import { Contact } from '../types';
import { Edit, Trash2, Plus } from 'lucide-react';

interface ContactsListProps {
  contacts: Contact[];
  onAddContact: (newContact: Omit<Contact, 'id'>) => void;
  onEditContact: (editedContact: Contact) => void;
  onDeleteContact: (id: number) => void;
}

const ContactsList: React.FC<ContactsListProps> = ({ contacts, onAddContact, onEditContact, onDeleteContact }) => {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState<Omit<Contact, 'id'>>({
    photo: '',
    firstName: '',
    lastName: '',
    profession: '',
    email: '',
    phone: '',
    personalityDescription: '',
    relationshipType: '',
    dateOfBirth: new Date(),
    address: ''
  });

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleSave = () => {
    if (editingContact) {
      onEditContact(editingContact);
      setEditingContact(null);
    }
  };

  const handleCancel = () => {
    setEditingContact(null);
  };

  const handleDelete = (id: number) => {
    onDeleteContact(id);
  };

  const handleAdd = () => {
    onAddContact(newContact);
    setIsAdding(false);
    setNewContact({
      photo: '',
      firstName: '',
      lastName: '',
      profession: '',
      email: '',
      phone: '',
      personalityDescription: '',
      relationshipType: '',
      dateOfBirth: new Date(),
      address: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Επαφές</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <Plus size={20} className="inline-block mr-2" />
          Προσθήκη Επαφής
        </button>
      </div>
      {isAdding && (
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Προσθήκη Νέας Επαφής</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Όνομα"
              value={newContact.firstName}
              onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Επώνυμο"
              value={newContact.lastName}
              onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Επάγγελμα"
              value={newContact.profession}
              onChange={(e) => setNewContact({ ...newContact, profession: e.target.value })}
              className="border rounded-md p-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              className="border rounded-md p-2"
            />
            <input
              type="tel"
              placeholder="Τηλέφωνο"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Τύπος Σχέσης"
              value={newContact.relationshipType}
              onChange={(e) => setNewContact({ ...newContact, relationshipType: e.target.value })}
              className="border rounded-md p-2"
            />
            <input
              type="date"
              placeholder="Ημερομηνία Γέννησης"
              value={newContact.dateOfBirth.toISOString().split('T')[0]}
              onChange={(e) => setNewContact({ ...newContact, dateOfBirth: new Date(e.target.value) })}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              placeholder="Διεύθυνση"
              value={newContact.address}
              onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
              className="border rounded-md p-2"
            />
            <textarea
              placeholder="Περιγραφή Προσωπικότητας"
              value={newContact.personalityDescription}
              onChange={(e) => setNewContact({ ...newContact, personalityDescription: e.target.value })}
              className="border rounded-md p-2 col-span-2"
            />
            <input
              type="text"
              placeholder="URL Φωτογραφίας"
              value={newContact.photo}
              onChange={(e) => setNewContact({ ...newContact, photo: e.target.value })}
              className="border rounded-md p-2 col-span-2"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
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
        {contacts.map((contact) => (
          <li key={contact.id} className="p-4">
            {editingContact && editingContact.id === contact.id ? (
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={editingContact.firstName}
                  onChange={(e) => setEditingContact({ ...editingContact, firstName: e.target.value })}
                  className="border rounded-md p-2"
                />
                <input
                  type="text"
                  value={editingContact.lastName}
                  onChange={(e) => setEditingContact({ ...editingContact, lastName: e.target.value })}
                  className="border rounded-md p-2"
                />
                <input
                  type="text"
                  value={editingContact.profession}
                  onChange={(e) => setEditingContact({ ...editingContact, profession: e.target.value })}
                  className="border rounded-md p-2"
                />
                <input
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  className="border rounded-md p-2"
                />
                <input
                  type="tel"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                  className="border rounded-md p-2"
                />
                <input
                  type="text"
                  value={editingContact.relationshipType}
                  onChange={(e) => setEditingContact({ ...editingContact, relationshipType: e.target.value })}
                  className="border rounded-md p-2"
                />
                <input
                  type="date"
                  value={editingContact.dateOfBirth.toISOString().split('T')[0]}
                  onChange={(e) => setEditingContact({ ...editingContact, dateOfBirth: new Date(e.target.value) })}
                  className="border rounded-md p-2"
                />
                <input
                  type="text"
                  value={editingContact.address}
                  onChange={(e) => setEditingContact({ ...editingContact, address: e.target.value })}
                  className="border rounded-md p-2"
                />
                <textarea
                  value={editingContact.personalityDescription}
                  onChange={(e) => setEditingContact({ ...editingContact, personalityDescription: e.target.value })}
                  className="border rounded-md p-2 col-span-2"
                />
                <input
                  type="text"
                  value={editingContact.photo}
                  onChange={(e) => setEditingContact({ ...editingContact, photo: e.target.value })}
                  className="border rounded-md p-2 col-span-2"
                />
                <div className="col-span-2 flex justify-end space-x-2">
                  <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Ακύρωση</button>
                  <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Αποθήκευση</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {contact.firstName} {contact.lastName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{contact.profession}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                  <p className="text-sm text-gray-500 truncate">{contact.phone}</p>
                  <p className="text-sm text-gray-500 truncate">Γέννηση: {contact.dateOfBirth.toLocaleDateString('el-GR')}</p>
                  <p className="text-sm text-gray-500 truncate">Διεύθυνση: {contact.address}</p>
                  <p className="text-sm text-gray-600">{contact.personalityDescription}</p>
                  <p className="text-sm text-gray-500 mt-1">Σχέση: {contact.relationshipType}</p>
                </div>
                <div className="flex-shrink-0 space-x-2">
                  <button onClick={() => handleEdit(contact)} className="text-blue-600 hover:text-blue-800">
                    <Edit size={20} />
                  </button>
                  <button onClick={() => handleDelete(contact.id)} className="text-red-600 hover:text-red-800">
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

export default ContactsList;