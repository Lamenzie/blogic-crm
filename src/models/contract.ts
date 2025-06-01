export interface Contract {
    id: number;
    evidenceNumber: string;
    institution: string;
    startDate: string;
    validUntil: string;
    endDate?: string;

    // Cizi klice
    clientId: number;
    managerId: number;
    advisorIds: number[];
}