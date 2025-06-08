import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Contract } from "../../models/contract";
import { mockContracts } from "../../data/mockContract";

interface ContractContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  removeContract: (id: number) => void;
  updateContract: (updated: Contract) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);

  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
  };

  const removeContract = (id: number) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  const updateContract = (updated: Contract) => {
    setContracts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  return (
    <ContractContext.Provider
      value={{ contracts, addContract, removeContract, updateContract }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContracts must be used within ContractProvider");
  }
  return context;
};
