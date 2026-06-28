
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
  author?: string;
  authorRole?: string;
}

export interface PricingItem {
  treatment: string;
  indication: string;
  price: string;
}

export interface LocationItem {
  name: string;
  detail: string;
}
