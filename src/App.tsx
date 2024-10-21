import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Notebook, Calendar, Users, BookOpen, Code, Bot, Settings } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import NotesList from './components/NotesList';
import CalendarView from './components/CalendarView';
import ContactsList from './components/ContactsList';
import SavedConversationsList from './components/SavedConversationsList';
import ScriptFormulasList from './components/ScriptFormulasList';
import AIAgentsList from './components/AIAgentsList';
import SettingsModal from './components/SettingsModal';
import DataImportExport from './components/DataImportExport';
import { Message, Note, Contact, CalendarEvent, SavedConversation, ScriptFormula, AIAgent, TabType, AppSettings } from './types';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [notes, setNotes] = useState<Note[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [savedConversations, setSavedConversations] = useState<SavedConversation[]>([]);
  const [scripts, setScripts] = useState<ScriptFormula[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);

  const [settings, setSettings] = useState<AppSettings>({
    apiKey: '',
    model: 'gpt-4o'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('appData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setNotes(parsedData.notes || []);
      setContacts(parsedData.contacts || []);
      setEvents(parsedData.events || []);
      setSavedConversations(parsedData.savedConversations || []);
      setScripts(parsedData.scripts || []);
      setAgents(parsedData.agents || []);
      setMessages(parsedData.messages || []);
      setSettings(parsedData.settings || { apiKey: '', model: 'gpt-4o' });
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      notes,
      contacts,
      events,
      savedConversations,
      scripts,
      agents,
      messages,
      settings
    };
    localStorage.setItem('appData', JSON.stringify(dataToSave));
  }, [notes, contacts, events, savedConversations, scripts, agents, messages, settings]);

  const handleSettingsChange = (newSettings: AppSettings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage: Message = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInput('');

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${settings.apiKey}`
          },
          body: JSON.stringify({
            model: settings.model,
            messages: [...messages, newMessage].map(msg => ({ role: msg.role, content: msg.content }))
          })
        });

        if (!response.ok) {
          throw new Error('Σφάλμα κατά την επικοινωνία με το API');
        }

        const data = await response.json();
        const aiResponse: Message = { role: 'assistant', content: data.choices[0].message.content };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } catch (error) {
        console.error('Σφάλμα:', error);
        const errorMessage: Message = { role: 'assistant', content: 'Συγγνώμη, προέκυψε ένα σφάλμα κατά την επεξεργασία του αιτήματός σας.' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }
    }
  };

  const handleImportData = (importedData: {
    notes: Note[];
    contacts: Contact[];
    events: CalendarEvent[];
    savedConversations: SavedConversation[];
    scripts: ScriptFormula[];
    agents: AIAgent[];
    messages: Message[];
    settings: AppSettings;
  }) => {
    setNotes(importedData.notes || []);
    setContacts(importedData.contacts || []);
    setEvents(importedData.events || []);
    setSavedConversations(importedData.savedConversations || []);
    setScripts(importedData.scripts || []);
    setAgents(importedData.agents || []);
    setMessages(importedData.messages || []);
    setSettings(importedData.settings || { apiKey: '', model: 'gpt-4o' });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-4">
        <button onClick={() => setActiveTab('chat')} className={`p-2 rounded-full ${activeTab === 'chat' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <MessageSquare size={24} />
        </button>
        <button onClick={() => setActiveTab('notes')} className={`p-2 rounded-full ${activeTab === 'notes' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <Notebook size={24} />
        </button>
        <button onClick={() => setActiveTab('calendar')} className={`p-2 rounded-full ${activeTab === 'calendar' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <Calendar size={24} />
        </button>
        <button onClick={() => setActiveTab('contacts')} className={`p-2 rounded-full ${activeTab === 'contacts' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <Users size={24} />
        </button>
        <button onClick={() => setActiveTab('conversations')} className={`p-2 rounded-full ${activeTab === 'conversations' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <BookOpen size={24} />
        </button>
        <button onClick={() => setActiveTab('scripts')} className={`p-2 rounded-full ${activeTab === 'scripts' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <Code size={24} />
        </button>
        <button onClick={() => setActiveTab('agents')} className={`p-2 rounded-full ${activeTab === 'agents' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
          <Bot size={24} />
        </button>
        <button onClick={() => setIsSettingsOpen(true)} className="p-2 rounded-full hover:bg-gray-700">
          <Settings size={24} />
        </button>
        <div className="mt-auto">
          <DataImportExport
            data={{
              notes,
              contacts,
              events,
              savedConversations,
              scripts,
              agents,
              messages,
              settings
            }}
            onImport={handleImportData}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'chat' && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
            </div>
          )}
          {activeTab === 'notes' && <NotesList notes={notes} onAddNote={(note) => setNotes([...notes, { ...note, id: Date.now() }])} onEditNote={(editedNote) => setNotes(notes.map(note => note.id === editedNote.id ? editedNote : note))} onDeleteNote={(id) => setNotes(notes.filter(note => note.id !== id))} />}
          {activeTab === 'calendar' && <CalendarView events={events} onAddEvent={(event) => setEvents([...events, { ...event, id: Date.now() }])} onEditEvent={(editedEvent) => setEvents(events.map(event => event.id === editedEvent.id ? editedEvent : event))} onDeleteEvent={(id) => setEvents(events.filter(event => event.id !== id))} />}
          {activeTab === 'contacts' && <ContactsList contacts={contacts} onAddContact={(contact) => setContacts([...contacts, { ...contact, id: Date.now() }])} onEditContact={(editedContact) => setContacts(contacts.map(contact => contact.id === editedContact.id ? editedContact : contact))} onDeleteContact={(id) => setContacts(contacts.filter(contact => contact.id !== id))} />}
          {activeTab === 'conversations' && <SavedConversationsList conversations={savedConversations} onAddConversation={(conversation) => setSavedConversations([...savedConversations, { ...conversation, id: Date.now() }])} onEditConversation={(editedConversation) => setSavedConversations(savedConversations.map(conv => conv.id === editedConversation.id ? editedConversation : conv))} onDeleteConversation={(id) => setSavedConversations(savedConversations.filter(conv => conv.id !== id))} />}
          {activeTab === 'scripts' && <ScriptFormulasList scripts={scripts} onAddScript={(script) => setScripts([...scripts, { ...script, id: Date.now() }])} onEditScript={(editedScript) => setScripts(scripts.map(script => script.id === editedScript.id ? editedScript : script))} onDeleteScript={(id) => setScripts(scripts.filter(script => script.id !== id))} onExecuteScript={(script) => console.log('Executing script:', script)} />}
          {activeTab === 'agents' && <AIAgentsList agents={agents} onAddAgent={(agent) => setAgents([...agents, { ...agent, id: Date.now() }])} onEditAgent={(editedAgent) => setAgents(agents.map(agent => agent.id === editedAgent.id ? editedAgent : agent))} onDeleteAgent={(id) => setAgents(agents.filter(agent => agent.id !== id))} onChatWithAgent={(agent) => console.log('Chatting with agent:', agent)} />}
        </div>

        {/* Input area */}
        {activeTab === 'chat' && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Πληκτρολογήστε το μήνυμά σας εδώ..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSettingsChange}
      />
    </div>
  );
}

export default App;