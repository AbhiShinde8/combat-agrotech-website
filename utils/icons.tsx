import React from 'react';
import { 
  Factory, FlaskConical, Handshake, Beaker, Settings, SearchCheck, 
  Package, Award, ShieldCheck, Truck, CheckCircle, TrendingUp, Leaf, 
  Tractor, ArrowRight, Menu, X, Filter, Loader, Trash2, Plus, 
  Users, MessageSquare, LogOut, Lock, MapPin, Phone, Mail, Send, Edit
} from 'lucide-react';

const IconMap: { [key: string]: React.ElementType } = {
  Factory, FlaskConical, Handshake, Beaker, Settings, SearchCheck, 
  Package, Award, ShieldCheck, Truck, CheckCircle, TrendingUp, Leaf,
  Tractor, ArrowRight, Menu, X, Filter, Loader, Trash2, Plus, 
  Users, MessageSquare, LogOut, Lock, MapPin, Phone, Mail, Send, Edit
};

export const renderIcon = (name: string, props: any = {}) => {
  const IconComponent = IconMap[name] || Factory; // Default to Factory if not found
  return <IconComponent {...props} />;
};

export const iconNames = Object.keys(IconMap);