import { createContext, useContext, useState, type ReactNode } from "react";
import type { Advisor } from "../../models/advisor";
import { mockAdvisors } from "../../data/mockAdvisor";

interface AdvisorContextType {
  advisors: Advisor[];
}

const AdvisorContext = createContext<AdvisorContextType | undefined>(undefined);

export const AdvisorProvider = ({ children }: { children: ReactNode }) => {
  const [advisors] = useState<Advisor[]>(mockAdvisors);

  return (
    <AdvisorContext.Provider value={{ advisors }}>
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
