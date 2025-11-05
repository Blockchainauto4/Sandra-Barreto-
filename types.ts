import React from 'react';

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Review {
  quote: string;
  author: string;
  rating: number;
  date?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  excerpt: string;
}

export interface Appointment {
  id: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  clientName: string;
  clientContact: string;
  clientEmail: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  type: string; // e.g., "Full-time", "Part-time"
  datePosted: string;
}

export interface Client {
  name: string;
  contact: string;
  email: string;
  appointments: Appointment[];
}

export interface BeforeAfterImage {
  id: string;
  title: string;
  beforeUrl: string;
  afterUrl: string;
}
