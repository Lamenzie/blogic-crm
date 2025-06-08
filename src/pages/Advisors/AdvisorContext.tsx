import { createContext, useContext, useState, type ReactNode } from "react";
import type { Advisor } from "../../models/advisor";
import { mockAdvisors } from "../../data/mockAdvisor";

interface AdvisorContextType {
  advisors: Advisor[];
  addAdvisor: (advisor: Advisor) => void;
  removeAdvisor: (id: number) => void;
  updateAdvisor: (updated: Advisor) => void;
}

const AdvisorContext = createContext<AdvisorContextType | undefined>(undefined);

export const AdvisorProvider = ({ children }: { children: ReactNode }) => {
  const [advisors, setAdvisors] = useState<Advisor[]>(mockAdvisors);

const addAdvisor = (advisor: Advisor) => {
  setAdvisors(prev => [...prev, advisor]);
};

const removeAdvisor = (id: number) => {
  setAdvisors(prev => prev.filter(a => a.id !== id));
}

const updateAdvisor = (updated: Advisor) => {
  setAdvisors( prev =>
    prev.map(a=>(a.id === updated.id ? updated : a))
  );
};

  return (
    <AdvisorContext.Provider value={{ advisors, addAdvisor, removeAdvisor, updateAdvisor }}>
      {children}
    </AdvisorContext.Provider>
  );
};

export const useAdvisors = () => {
  const context = useContext(AdvisorContext);
  if (!context)
    throw new Error("useAdvisors must be used within AdvisorProvider");
  return context;
};
