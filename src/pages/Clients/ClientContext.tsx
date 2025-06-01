import { createContext, useContext, useState, type ReactNode } from "react";
import type { Client } from "../../models/client";
import { mockClients } from "../../data/mockClients";

interface ClientContextType {
  clients: Client[];
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [clients] = useState<Client[]>(mockClients);

  return (
    <ClientContext.Provider value={{ clients }}>
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
