import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Contract } from "../../models/contract";

interface ContractContextType {
  contracts: Contract[];
  addContract: (contract: Contract) => void;
  removeContract: (id: number) => void;
  updateContract: (updated: Contract) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

const initialContracts: Contract[] = [
  {
    id: 1,
    evidenceNumber: "CZ2024/001",
    institution: "ČSOB",
    startDate: "2024-05-01",
    validUntil: "2025-05-01",
    clientId: 1,
    managerId: 2,
    advisorIds: [3],
  },
  {
    id: 2,
    evidenceNumber: "CZ2024/002",
    institution: "AirBank",
    startDate: "2024-05-01",
    validUntil: "2025-09-011",
    clientId: 2,
    managerId: 2,
    advisorIds: [3],
  },
];

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);

  const addContract = (contract: Contract) => {
    setContracts(prev => [...prev, contract]);
  };

  const removeContract = (id: number) => {
    setContracts(prev => prev.filter(c => c.id !== id));
  };

  const updateContract = (updated: Contract) => {
    setContracts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  }

  return (
    <ContractContext.Provider value={{ contracts, addContract, removeContract, updateContract }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContracts = () => {
  const context = useContext(ContractContext);
  if (!context) throw new Error('useContracts must be used within ContractProvider');
  return context;
};
