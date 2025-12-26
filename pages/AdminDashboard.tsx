import React, { useState, useEffect } from 'react';
import { api } from '../services/mockBackend';
import { Product, Enquiry, ContactMessage, Service, ProcessStep, ContentItem } from '../types';
import { Trash2, Plus, Users, MessageSquare, Package, LogOut, Settings, Factory, Edit, FileText, XCircle, Save, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { renderIcon, iconNames } from '../utils/icons';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'services' | 'process' | 'content' | 'enquiries' | 'messages'>('products');
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Forms & Edit States
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({ name: '', category: 'Fertilizer', description: '', imageUrl: 'https://picsum.photos/400/300' });
  
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newService, setNewService] = useState({ title: '', description: '', icon: 'Factory', processSteps: '', valueProp: '', colorClass: 'bg-combat-green' });
  
  const [editingProcessId, setEditingProcessId] = useState<string | null>(null);
  const [newProcess, setNewProcess] = useState({ title: '', description: '', icon: 'Settings', colorClass: 'bg-blue-500' });

  // Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'product' | 'service' | 'process' | 'content' | null;
    id: string | null;
  }>({ isOpen: false, type: null, id: null });

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadData = async () => {
    setProducts(await api.products.getAll());
    setServices(await api.services.getAll());
    setProcessSteps(await api.process.getAll());
    setContentItems(await api.content.getAll());
    setEnquiries(await api.enquiries.getAll());
    setMessages(await api.contact.getAll());
  };

  // --- Product Handlers ---
  
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProductId) {
        await api.products.update({ ...newProduct, id: editingProductId } as Product);
        setEditingProductId(null);
    } else {
        await api.products.add(newProduct as any);
    }
    setNewProduct({ name: '', category: 'Fertilizer', description: '', imageUrl: 'https://picsum.photos/400/300' });
    loadData();
  };

  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setNewProduct({ 
        name: p.name, 
        category: p.category, 
        description: p.description, 
        imageUrl: p.imageUrl 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    setNewProduct({ name: '', category: 'Fertilizer', description: '', imageUrl: 'https://picsum.photos/400/300' });
  };

  // --- Service Handlers ---

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const servicePayload = {
        ...newService,
        processSteps: typeof newService.processSteps === 'string' 
            ? newService.processSteps.split(',').map(s => s.trim()) 
            : newService.processSteps
    };

    if (editingServiceId) {
        await api.services.update({ ...servicePayload, id: editingServiceId } as Service);
        setEditingServiceId(null);
    } else {
        await api.services.add(servicePayload as any);
    }
    setNewService({ title: '', description: '', icon: 'Factory', processSteps: '', valueProp: '', colorClass: 'bg-combat-green' });
    loadData();
  };

  const handleEditService = (s: Service) => {
    setEditingServiceId(s.id);
    setNewService({
        title: s.title,
        description: s.description,
        icon: s.icon,
        processSteps: s.processSteps.join(', '),
        valueProp: s.valueProp,
        colorClass: s.colorClass
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditService = () => {
    setEditingServiceId(null);
    setNewService({ title: '', description: '', icon: 'Factory', processSteps: '', valueProp: '', colorClass: 'bg-combat-green' });
  };

  // --- Process Handlers ---

  const handleProcessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProcessId) {
        await api.process.update({ ...newProcess, id: editingProcessId } as ProcessStep);
        setEditingProcessId(null);
    } else {
        await api.process.add(newProcess as any);
    }
    setNewProcess({ title: '', description: '', icon: 'Settings', colorClass: 'bg-blue-500' });
    loadData();
  };

  const handleEditProcess = (p: ProcessStep) => {
    setEditingProcessId(p.id);
    setNewProcess({
        title: p.title,
        description: p.description,
        icon: p.icon,
        colorClass: p.colorClass
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditProcess = () => {
    setEditingProcessId(null);
    setNewProcess({ title: '', description: '', icon: 'Settings', colorClass: 'bg-blue-500' });
  };

  // --- General Handlers ---

  const handleUpdateContent = async (key: string, value: string) => {
    await api.content.update(key, value);
    // Optimistic update
    setContentItems(items => items.map(i => i.key === key ? { ...i, value } : i));
  };

  const initiateDelete = (type: 'product' | 'service' | 'process' | 'content', id: string) => {
    setDeleteModal({ isOpen: true, type, id });
  };

  const confirmDelete = async () => {
    const { type, id } = deleteModal;
    if (!type || !id) return;

    if (type === 'product') await api.products.delete(id);
    if (type === 'service') await api.services.delete(id);
    if (type === 'process') await api.process.delete(id);
    if (type === 'content') await api.content.delete(id);
    
    setDeleteModal({ isOpen: false, type: null, id: null });
    loadData();
  };

  const IconSelect = ({ value, onChange }: any) => (
    <select value={value} onChange={onChange} className="w-full border p-2 rounded">
        {iconNames.map(name => <option key={name} value={name}>{name}</option>)}
    </select>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-combat-darkGreen text-white flex flex-col">
        <div className="p-6 text-xl font-bold text-combat-yellow">CMS Admin</div>
        <nav className="flex-1 px-4 space-y-1 overflow-x-auto md:overflow-visible flex md:flex-col">
          {[
            { id: 'products', label: 'Products', icon: Package },
            { id: 'services', label: 'Services', icon: Factory },
            { id: 'process', label: 'Process Flow', icon: Settings },
            { id: 'content', label: 'Site Text', icon: FileText },
            { id: 'enquiries', label: 'Enquiries', icon: Users },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
          ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`flex-shrink-0 md:w-full flex items-center space-x-3 px-4 py-3 rounded transition ${activeTab === tab.id ? 'bg-white/10 text-combat-yellow' : 'hover:bg-white/5'}`}
              >
                <tab.icon size={20} /> <span className="whitespace-nowrap">{tab.label}</span>
              </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 hidden md:block">
          <button onClick={() => { logout(); navigate('/login'); }} className="flex items-center space-x-2 text-red-300 hover:text-white">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="p-8 pb-32">
          
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h2>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-combat-green">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        {editingProductId ? <><Edit size={20}/> Edit Product</> : <><Plus size={20}/> Add New Product</>}
                    </h3>
                    {editingProductId && (
                        <button onClick={handleCancelEditProduct} className="text-red-500 text-sm flex items-center gap-1 hover:underline">
                            <XCircle size={16}/> Cancel Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleProductSubmit} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <input required placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="border p-2 rounded w-full" />
                  <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="border p-2 rounded w-full">
                    <option>Fertilizer</option><option>Raw Material</option><option>Growth Promoter</option>
                  </select>
                  <input required placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="border p-2 rounded w-full" />
                  <button type="submit" className={`${editingProductId ? 'bg-combat-yellow text-combat-darkGreen' : 'bg-combat-green text-white'} px-4 py-2 rounded hover:opacity-90 font-bold flex items-center justify-center gap-2`}>
                     {editingProductId ? <Save size={18}/> : <Plus size={18}/>} 
                     {editingProductId ? 'Update' : 'Add'}
                  </button>
                </form>
              </div>
              <div className="grid gap-4">
                  {products.map(p => (
                      <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-center group hover:bg-gray-50 transition">
                          <div className="flex items-center gap-4">
                              <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover bg-gray-200" />
                              <div>
                                  <span className="font-bold block">{p.name}</span> 
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{p.category}</span>
                              </div>
                          </div>
                          <div className="flex space-x-2">
                              <button onClick={() => handleEditProduct(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                                <Edit size={18} />
                              </button>
                              <button onClick={() => initiateDelete('product', p.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                                <Trash2 size={18} />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Services</h2>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-combat-green">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        {editingServiceId ? <><Edit size={20}/> Edit Service</> : <><Plus size={20}/> Add New Service</>}
                    </h3>
                    {editingServiceId && (
                        <button onClick={handleCancelEditService} className="text-red-500 text-sm flex items-center gap-1 hover:underline">
                            <XCircle size={16}/> Cancel Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleServiceSubmit} className="grid md:grid-cols-2 gap-4">
                  <input required placeholder="Service Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} className="border p-2 rounded" />
                  <input required placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} className="border p-2 rounded" />
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Icon</label>
                    <IconSelect value={newService.icon} onChange={(e: any) => setNewService({...newService, icon: e.target.value})} />
                  </div>
                  <div>
                     <label className="text-xs text-gray-500 block mb-1">Process Steps (comma separated)</label>
                     <input placeholder="Step 1, Step 2, Step 3" value={newService.processSteps} onChange={e => setNewService({...newService, processSteps: e.target.value})} className="border p-2 rounded w-full" />
                  </div>
                  <input required placeholder="Business Value Prop" value={newService.valueProp} onChange={e => setNewService({...newService, valueProp: e.target.value})} className="border p-2 rounded" />
                  
                  <div className="md:col-span-2 flex justify-end">
                      <button type="submit" className={`${editingServiceId ? 'bg-combat-yellow text-combat-darkGreen' : 'bg-combat-green text-white'} px-6 py-2 rounded hover:opacity-90 font-bold flex items-center gap-2`}>
                        {editingServiceId ? <Save size={18}/> : <Plus size={18}/>}
                        {editingServiceId ? 'Update Service' : 'Add Service'}
                      </button>
                  </div>
                </form>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                  {services.map(s => (
                      <div key={s.id} className="bg-white p-4 rounded shadow relative group border border-gray-100">
                          <div className="absolute top-2 right-2 flex space-x-1">
                              <button onClick={() => handleEditService(s)} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit size={16}/></button>
                              <button onClick={() => initiateDelete('service', s.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16}/></button>
                          </div>
                          <div className="flex items-center space-x-3 mb-2">
                             <div className="bg-gray-100 p-2 rounded">{renderIcon(s.icon, { size: 20 })}</div>
                             <h4 className="font-bold">{s.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{s.description}</p>
                          <div className="text-xs bg-gray-50 p-2 rounded">
                              <strong>Steps:</strong> {s.processSteps.join(', ')}
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          )}

          {/* Process Tab */}
          {activeTab === 'process' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Process Flow</h2>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-combat-green">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        {editingProcessId ? <><Edit size={20}/> Edit Process Step</> : <><Plus size={20}/> Add Process Step</>}
                    </h3>
                    {editingProcessId && (
                        <button onClick={handleCancelEditProcess} className="text-red-500 text-sm flex items-center gap-1 hover:underline">
                            <XCircle size={16}/> Cancel Edit
                        </button>
                    )}
                </div>
                <form onSubmit={handleProcessSubmit} className="grid md:grid-cols-4 gap-4 items-end">
                  <input required placeholder="Step Title" value={newProcess.title} onChange={e => setNewProcess({...newProcess, title: e.target.value})} className="border p-2 rounded" />
                  <input required placeholder="Description" value={newProcess.description} onChange={e => setNewProcess({...newProcess, description: e.target.value})} className="border p-2 rounded" />
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Icon</label>
                    <IconSelect value={newProcess.icon} onChange={(e: any) => setNewProcess({...newProcess, icon: e.target.value})} />
                  </div>
                  <button type="submit" className={`${editingProcessId ? 'bg-combat-yellow text-combat-darkGreen' : 'bg-combat-green text-white'} px-4 py-2 rounded hover:opacity-90 font-bold flex items-center justify-center gap-2`}>
                      {editingProcessId ? <Save size={18}/> : <Plus size={18}/>}
                      {editingProcessId ? 'Update' : 'Add'}
                  </button>
                </form>
              </div>
              <div className="space-y-2">
                  {processSteps.map((s, idx) => (
                      <div key={s.id} className="bg-white p-4 rounded shadow flex items-center justify-between group">
                          <div className="flex items-center space-x-4">
                             <span className="font-bold text-gray-400">#{idx + 1}</span>
                             {renderIcon(s.icon, { size: 20 })}
                             <div>
                                 <div className="font-bold">{s.title}</div>
                                 <div className="text-sm text-gray-500">{s.description}</div>
                             </div>
                          </div>
                          <div className="flex space-x-2">
                             <button onClick={() => handleEditProcess(s)} className="text-blue-500 hover:text-blue-700 p-1"><Edit size={18}/></button>
                             <button onClick={() => initiateDelete('process', s.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={18}/></button>
                          </div>
                      </div>
                  ))}
              </div>
            </div>
          )}

          {/* Site Content Tab */}
          {activeTab === 'content' && (
             <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Page Text Content</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Label</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Content Value</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contentItems.map(item => (
                                <tr key={item.key}>
                                    <td className="px-6 py-4 w-1/3">
                                        <div className="text-sm font-medium text-gray-900">{item.label}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{item.category}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.type === 'textarea' ? (
                                            <textarea 
                                                className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-combat-green outline-none" 
                                                rows={3}
                                                value={item.value}
                                                onChange={(e) => handleUpdateContent(item.key, e.target.value)}
                                            />
                                        ) : (
                                            <input 
                                                className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-combat-green outline-none"
                                                value={item.value}
                                                onChange={(e) => handleUpdateContent(item.key, e.target.value)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => initiateDelete('content', item.key)} className="text-red-500 hover:text-red-700 p-2 rounded hover:bg-red-50" title="Delete Content">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>
          )}

          {/* Enquiries Tab */}
          {activeTab === 'enquiries' && (
            <div>
               <h2 className="text-2xl font-bold text-gray-800 mb-6">Dealer Enquiries</h2>
               <div className="grid gap-4">
                  {enquiries.length === 0 && <p className="text-gray-500">No enquiries yet.</p>}
                  {enquiries.map(enq => (
                    <div key={enq.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-combat-yellow">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">{enq.companyName} <span className="text-sm font-normal text-gray-500">({enq.dealerName})</span></h3>
                            <span className="text-xs text-gray-400">{new Date(enq.date).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 grid md:grid-cols-3 gap-2">
                            <p><strong>Phone:</strong> {enq.phone}</p>
                            <p><strong>Email:</strong> {enq.email}</p>
                            <p><strong>Loc:</strong> {enq.location}</p>
                            <p><strong>Interest:</strong> {enq.productInterest}</p>
                        </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
             <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Messages</h2>
                <div className="grid gap-4">
                  {messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
                  {messages.map(msg => (
                    <div key={msg.id} className="bg-white p-4 rounded-lg shadow">
                         <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold">{msg.name}</h3>
                            <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{msg.email} | {msg.phone}</p>
                        <p className="text-gray-700 bg-gray-50 p-2 rounded">{msg.message}</p>
                    </div>
                  ))}
                </div>
             </div>
          )}

        </div>
      </div>

      {/* Confirmation Modal */}
      {deleteModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-lg p-6 shadow-2xl max-w-md w-full transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
                  <div className="flex items-center gap-3 text-red-600 mb-4">
                      <div className="bg-red-100 p-2 rounded-full">
                          <AlertTriangle size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Confirm Deletion</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                      Are you sure you want to delete this item? This action cannot be undone and will permanently remove the data from the system.
                  </p>
                  
                  <div className="flex justify-end space-x-3">
                      <button 
                          onClick={() => setDeleteModal({ isOpen: false, type: null, id: null })}
                          className="px-5 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={confirmDelete}
                          className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-bold shadow-lg shadow-red-200 transition-colors flex items-center gap-2"
                      >
                          <Trash2 size={18} /> Delete Forever
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default AdminDashboard;