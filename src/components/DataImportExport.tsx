import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { Note, Contact, CalendarEvent, SavedConversation, ScriptFormula, AIAgent, Message, AppSettings } from '../types';

interface DataImportExportProps {
  data: {
    notes: Note[];
    contacts: Contact[];
    events: CalendarEvent[];
    savedConversations: SavedConversation[];
    scripts: ScriptFormula[];
    agents: AIAgent[];
    messages: Message[];
    settings: AppSettings;
  };
  onImport: (data: {
    notes: Note[];
    contacts: Contact[];
    events: CalendarEvent[];
    savedConversations: SavedConversation[];
    scripts: ScriptFormula[];
    agents: AIAgent[];
    messages: Message[];
    settings: AppSettings;
  }) => void;
}

const DataImportExport: React.FC<DataImportExportProps> = ({ data, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const importedData = JSON.parse(content);
          
          // Ensure all properties are present, use empty arrays or default values if missing
          const processedData = {
            notes: Array.isArray(importedData.notes) ? importedData.notes : [],
            contacts: Array.isArray(importedData.contacts) ? importedData.contacts : [],
            events: Array.isArray(importedData.events) ? importedData.events : [],
            savedConversations: Array.isArray(importedData.savedConversations) ? importedData.savedConversations : [],
            scripts: Array.isArray(importedData.scripts) ? importedData.scripts : [],
            agents: Array.isArray(importedData.agents) ? importedData.agents : [],
            messages: Array.isArray(importedData.messages) ? importedData.messages : [],
            settings: importedData.settings || { apiKey: '', model: 'gpt-4o' },
          };

          // Convert date strings to Date objects
          processedData.notes.forEach((note: Note) => {
            note.date = new Date(note.date);
          });
          processedData.events.forEach((event: CalendarEvent) => {
            event.date = new Date(event.date);
          });
          processedData.savedConversations.forEach((conv: SavedConversation) => {
            conv.date = new Date(conv.date);
          });
          processedData.contacts.forEach((contact: Contact) => {
            contact.dateOfBirth = new Date(contact.dateOfBirth);
          });

          onImport(processedData);
        } catch (error) {
          console.error('Error parsing imported data:', error);
          alert('Σφάλμα κατά την εισαγωγή των δεδομένων. Βεβαιωθείτε ότι το αρχείο είναι σε έγκυρη μορφή JSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={exportData}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        title="Εξαγωγή δεδομένων"
      >
        <Download size={20} />
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        title="Εισαγωγή δεδομένων"
      >
        <Upload size={20} />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={importData}
        className="hidden"
      />
    </div>
  );
};

export default DataImportExport;