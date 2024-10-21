import React from 'react';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Note {
  id: number;
  date: Date;
  content: string;
  keywords: string[];
}

export interface Contact {
  id: number;
  photo: string;
  firstName: string;
  lastName: string;
  profession: string;
  email: string;
  phone: string;
  personalityDescription: string;
  relationshipType: string;
  dateOfBirth: Date;
  address: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  description: string;
}

export interface SavedConversation {
  id: number;
  title: string;
  date: Date;
  messages: Message[];
}

export interface ScriptFormula {
  id: number;
  name: string;
  description: string;
  code: string;
  language: string;
}

export interface AIAgent {
  id: number;
  name: string;
  prompt: string;
  skills: string[];
  attachment: string | null;
  model: 'gpt-4o' | 'gpt-4o-mini';
}

export type TabType = 'chat' | 'notes' | 'calendar' | 'contacts' | 'conversations' | 'scripts' | 'agents';

export interface AppSettings {
  apiKey: string;
  model: 'gpt-4o' | 'gpt-4o-mini';
}