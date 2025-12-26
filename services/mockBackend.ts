import {
  Product,
  Enquiry,
  ContactMessage,
  User,
  Service,
  ProcessStep,
  ContentItem,
} from "../types";

// --- INITIAL DATA SEEDING ---

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Corex",
    category: "Fertilizer",
    description: "High-grade nitrogen fertilizer for rapid crop growth.",
    imageUrl: "/images/Corex.png",
  },
  {
    id: 2,
    name: "Combi",
    category: "Fertilizer",
    description: "Di-ammonium Phosphate ensuring strong root development.",
    imageUrl: "/images/combiSimple.png",
  },
  {
    id: 3,
    name: "Super Neem",
    category: "Raw Material",
    description: "Imported high-quality Potash for manufacturing.",
    imageUrl: "/images/SuparNeem.png",
  },
  {
    id: 4,
    name: "ZN",
    category: "Growth Promoter",
    description: "Soil conditioner to improve nutrient uptake.",
    imageUrl: "/images/ZN.png",
  },
  {
    id: 4,
    name: "ZN",
    category: "Growth Promoter",
    description: "Soil conditioner to improve nutrient uptake.",
    imageUrl: "/images/ZN.png",
  },
  {
    id: 4,
    name: "ZN",
    category: "Growth Promoter",
    description: "Soil conditioner to improve nutrient uptake.",
    imageUrl: "/images/ZN.png",
  },
  {
    id: 4,
    name: "ZN",
    category: "Growth Promoter",
    description: "Soil conditioner to improve nutrient uptake.",
    imageUrl: "/images/ZN.png",
  },
];

const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    title: "Raw Material Mfg.",
    description:
      "We synthesize essential chemical compounds used as the foundation for various agricultural products.",
    icon: "FlaskConical",
    processSteps: [
      "Chemical Synthesis",
      "Purification",
      "Grade Testing",
      "Bulk Storage",
    ],
    valueProp: "Ensures consistency and purity at the molecular level.",
    colorClass: "bg-blue-600",
  },
  {
    id: "2",
    title: "Final Product Mfg.",
    description:
      "Production of market-ready fertilizers (NPK, Urea, etc.) packaged for end-user application.",
    icon: "Factory",
    processSteps: [
      "Formulation Mixing",
      "Granulation",
      "Quality Check",
      "Automated Packaging",
    ],
    valueProp: "Delivers balanced nutrition directly to crops.",
    colorClass: "bg-combat-green",
  },
  {
    id: "3",
    title: "Dealer Supply & Consulting",
    description:
      "We provide production consulting and reliable supply chains to dealers.",
    icon: "Handshake",
    processSteps: [
      "Requirement Analysis",
      "Supply Planning",
      "Logistics",
      "Support",
    ],
    valueProp: "Empowers dealers with knowledge and reliable stock.",
    colorClass: "bg-combat-yellow",
  },
];

const INITIAL_PROCESS: ProcessStep[] = [
  {
    id: "1",
    title: "Raw Material Sourcing",
    description:
      "We procure premium grade chemicals and minerals from trusted global partners.",
    icon: "Beaker",
    colorClass: "bg-blue-500",
  },
  {
    id: "2",
    title: "Processing & Formulation",
    description:
      "Advanced machinery mixes and granulates compounds at precise temperatures.",
    icon: "Settings",
    colorClass: "bg-yellow-500",
  },
  {
    id: "3",
    title: "Quality Control",
    description:
      "Every batch is tested in our in-house lab for nutrient content and solubility.",
    icon: "SearchCheck",
    colorClass: "bg-red-500",
  },
  {
    id: "4",
    title: "Packaging & Dispatch",
    description:
      "Moisture-proof automated packaging ensures longevity during storage and transport.",
    icon: "Package",
    colorClass: "bg-green-600",
  },
];

const INITIAL_CONTENT: ContentItem[] = [
  {
    key: "home_hero_title",
    label: "Home Hero Title",
    value: "Empowering Agriculture with Quality Fertilizers",
    category: "home",
    type: "text",
  },
  {
    key: "home_hero_subtitle",
    label: "Home Hero Subtitle",
    value:
      "Combat Agrotech delivers premium manufacturing solutions for raw materials and final fertilizer products to fuel India's growth.",
    category: "home",
    type: "textarea",
  },
  {
    key: "home_about_title",
    label: "Home About Title",
    value: "Growing Trust Since Inception",
    category: "home",
    type: "text",
  },
  {
    key: "home_about_text",
    label: "Home About Text",
    value:
      "Located in Pune, Combat Agrotech Pvt. Ltd. stands as a pillar of reliability in the fertilizer industry. We specialize in the end-to-end manufacturing of agricultural inputs.",
    category: "home",
    type: "textarea",
  },
  {
    key: "home_cta_title",
    label: "Home CTA Title",
    value: "Ready to Boost Agricultural Yields?",
    category: "home",
    type: "text",
  },
  {
    key: "about_vision",
    label: "About Page Vision",
    value:
      "To be India's most trusted partner in sustainable agriculture, providing world-class fertilizers that ensure food security.",
    category: "about",
    type: "textarea",
  },
  {
    key: "about_mission",
    label: "About Page Mission",
    value:
      "To manufacture high-quality, cost-effective agricultural inputs through state-of-the-art technology and rigorous quality control.",
    category: "about",
    type: "textarea",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStorage = (key: string, initial: any) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

const setStorage = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data));

// --- API ---

export const api = {
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(300);
      localStorage.removeItem("combat_products"); // DEV ONLY Remove this after testing.
      return getStorage("combat_products", INITIAL_PRODUCTS);
    },
    add: async (item: Omit<Product, "id">) => {
      await delay(300);
      const list = getStorage("combat_products", INITIAL_PRODUCTS);
      const newItem = { ...item, id: Date.now().toString() };
      list.push(newItem);
      setStorage("combat_products", list);
      return newItem;
    },
    update: async (updated: Product) => {
      await delay(300);
      const list = getStorage("combat_products", INITIAL_PRODUCTS);
      const index = list.findIndex((p: Product) => p.id === updated.id);
      if (index !== -1) list[index] = updated;
      setStorage("combat_products", list);
    },
    delete: async (id: number) => {
      await delay(300);
      const list = getStorage("combat_products", INITIAL_PRODUCTS);
      setStorage(
        "combat_products",
        list.filter((i: Product) => i.id !== id)
      );
    },
  },
  services: {
    getAll: async (): Promise<Service[]> => {
      await delay(300);
      return getStorage("combat_services", INITIAL_SERVICES);
    },
    save: async (services: Service[]) => {
      await delay(300);
      setStorage("combat_services", services);
    },
    add: async (item: Omit<Service, "id">) => {
      await delay(300);
      const list = getStorage("combat_services", INITIAL_SERVICES);
      const newItem = { ...item, id: Date.now().toString() };
      list.push(newItem);
      setStorage("combat_services", list);
    },
    update: async (updated: Service) => {
      await delay(300);
      const list = getStorage("combat_services", INITIAL_SERVICES);
      const index = list.findIndex((s: Service) => s.id === updated.id);
      if (index !== -1) list[index] = updated;
      setStorage("combat_services", list);
    },
    delete: async (id: string) => {
      await delay(300);
      const list = getStorage("combat_services", INITIAL_SERVICES);
      setStorage(
        "combat_services",
        list.filter((s: Service) => s.id !== id)
      );
    },
  },
  process: {
    getAll: async (): Promise<ProcessStep[]> => {
      await delay(300);
      return getStorage("combat_process", INITIAL_PROCESS);
    },
    add: async (item: Omit<ProcessStep, "id">) => {
      await delay(300);
      const list = getStorage("combat_process", INITIAL_PROCESS);
      const newItem = { ...item, id: Date.now().toString() };
      list.push(newItem);
      setStorage("combat_process", list);
    },
    update: async (updated: ProcessStep) => {
      await delay(300);
      const list = getStorage("combat_process", INITIAL_PROCESS);
      const index = list.findIndex((s: ProcessStep) => s.id === updated.id);
      if (index !== -1) list[index] = updated;
      setStorage("combat_process", list);
    },
    delete: async (id: string) => {
      await delay(300);
      const list = getStorage("combat_process", INITIAL_PROCESS);
      setStorage(
        "combat_process",
        list.filter((s: ProcessStep) => s.id !== id)
      );
    },
  },
  content: {
    getAll: async (): Promise<ContentItem[]> => {
      await delay(300);
      return getStorage("combat_content", INITIAL_CONTENT);
    },
    update: async (key: string, value: string) => {
      await delay(300);
      const list = getStorage("combat_content", INITIAL_CONTENT);
      const index = list.findIndex((c: ContentItem) => c.key === key);
      if (index !== -1) {
        list[index].value = value;
        setStorage("combat_content", list);
      }
    },
    delete: async (key: string) => {
      await delay(300);
      const list = getStorage("combat_content", INITIAL_CONTENT);
      setStorage(
        "combat_content",
        list.filter((c: ContentItem) => c.key !== key)
      );
    },
  },
  enquiries: {
    submit: async (data: Omit<Enquiry, "id" | "status" | "date">) => {
      await delay(500);
      const list = getStorage("combat_enquiries", []);
      list.push({
        ...data,
        id: Date.now().toString(),
        status: "New",
        date: new Date().toISOString(),
      });
      setStorage("combat_enquiries", list);
    },
    getAll: async (): Promise<Enquiry[]> => {
      await delay(300);
      return getStorage("combat_enquiries", []);
    },
  },
  contact: {
    submit: async (data: Omit<ContactMessage, "id" | "date">) => {
      await delay(500);
      const list = getStorage("combat_messages", []);
      list.push({
        ...data,
        id: Date.now().toString(),
        date: new Date().toISOString(),
      });
      setStorage("combat_messages", list);
    },
    getAll: async (): Promise<ContactMessage[]> => {
      await delay(300);
      return getStorage("combat_messages", []);
    },
  },
  auth: {
    login: async (email: string, password: string): Promise<User> => {
      await delay(500);
      if (email === "admin@combat.com" && password === "admin") {
        const user = { email, name: "Admin User", token: "mock-jwt-token-123" };
        localStorage.setItem("combat_user", JSON.stringify(user));
        return user;
      }
      throw new Error("Invalid credentials");
    },
    logout: async () => {
      localStorage.removeItem("combat_user");
    },
    getCurrentUser: (): User | null => {
      const stored = localStorage.getItem("combat_user");
      return stored ? JSON.parse(stored) : null;
    },
  },
};
