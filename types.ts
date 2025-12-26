export interface Product {
  id: number;
  name: string;
  category: "Fertilizer" | "Raw Material" | "Growth Promoter";
  description: string;
  price?: number;
  imageUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Name of lucide icon
  processSteps: string[]; // Array of strings
  valueProp: string;
  colorClass: string; // e.g. 'bg-blue-600'
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
}

export interface ContentItem {
  key: string; // e.g., 'home_hero_title'
  value: string;
  category: "home" | "about" | "general";
  label: string;
  type: "text" | "textarea";
}

export interface Enquiry {
  id: string;
  dealerName: string;
  companyName: string;
  location: string;
  phone: string;
  email: string;
  productInterest: string;
  status: "New" | "Contacted";
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface User {
  email: string;
  name: string;
  token: string;
}
