import { createContext, useContext, useState, type ReactNode } from "react";
import type { Client } from "../../models/client";
import { mockClients } from "../../data/mockClients";

interface ClientContextType {
  clients: Client[];
  addClient: (client: Client) => void;
  removeClient: (id: number) => void;
  updateClient: (client: Client) => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);



export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(mockClients);

  const addClient = (client: Client) => {
    setClients(prev => [...prev, client]);
};

const removeClient = (id: number) => {
    setClients(prev => prev.filter(c => c.id !== id));
};

const updateClient = (updated: Client) => {
    setClients(prev => prev.map(c => (c.id === updated.id ? updated : c)));
};

  return (
    <ClientContext.Provider value={{ clients, addClient, removeClient, updateClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context)
    throw new Error("useClients must be used within ClientProvider");
  return context;
};
