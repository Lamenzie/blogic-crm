import { useState, useEffect } from 'react';
import type { Contract } from '../../models/contract';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContracts } from './ContractContext';
import { useClients } from '../Clients/ClientContext';
import { useAdvisors } from '../Advisors/AdvisorContext';

const ContractForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { contracts, addContract, updateContract } = useContracts();
  const { clients } = useClients();
  const { advisors } = useAdvisors();

  const editId = searchParams.get('edit');
  const editing = !!editId;

  const [rcInput, setRcInput] = useState('');
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    id: Date.now(),
    evidenceNumber: '',
    institution: '',
    startDate: '',
    validUntil: '',
    endDate: '',
    clientBirthNumber: '',
    managerBirthNumber: '',
    advisorBirthNumbers: ['']
  });

  useEffect(() => {
    if (editing) {
      const contract = contracts.find(c => c.id === Number(editId));
      if (contract) {
        const client = clients.find(c => c.id === contract.clientId);
        const manager = advisors.find(a => a.id === contract.managerId);
        const advisorBNs = contract.advisorIds.map(id => advisors.find(a => a.id === id)?.birthNumber || '');

        setFormData({
          id: contract.id,
          evidenceNumber: contract.evidenceNumber,
          institution: contract.institution,
          startDate: contract.startDate,
          validUntil: contract.validUntil,
          endDate: contract.endDate || '',
          clientBirthNumber: client?.birthNumber || '',
          managerBirthNumber: manager?.birthNumber || '',
          advisorBirthNumbers: advisorBNs.length > 0 ? advisorBNs : ['']
        });
      }
    }
  }, [editId, editing, contracts, clients, advisors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdvisorChange = (index: number, value: string) => {
    const updated = [...formData.advisorBirthNumbers];
    updated[index] = value;
    setFormData({ ...formData, advisorBirthNumbers: updated });
  };

  const addAdvisorField = () => {
    setFormData({
      ...formData,
      advisorBirthNumbers: [...formData.advisorBirthNumbers, '']
    });
  };

  const removeAdvisorField = (index: number) => {
    if (formData.advisorBirthNumbers.length > 1) {
      const updated = formData.advisorBirthNumbers.filter((_, i) => i !== index);
      setFormData({ ...formData, advisorBirthNumbers: updated });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const client = clients.find(c => c.birthNumber === formData.clientBirthNumber);
    const manager = advisors.find(a => a.birthNumber === formData.managerBirthNumber);
    const advisorIds = formData.advisorBirthNumbers
      .map(bn => advisors.find(a => a.birthNumber === bn)?.id)
      .filter(id => id !== undefined) as number[];

    if (!client || !manager) {
      alert('Neplatné rodné číslo klienta nebo správce.');
      return;
    }

    if (rcInput !== manager.birthNumber || password !== 'heslo123') {
      alert('Neplatné ověření správce.');
      return;
    }

    const newContract: Contract = {
      id: editing ? formData.id : Date.now(),
      evidenceNumber: formData.evidenceNumber,
      institution: formData.institution,
      startDate: formData.startDate,
      validUntil: formData.validUntil,
      endDate: formData.endDate || '',
      clientId: client.id,
      managerId: manager.id,
      advisorIds
    };

    editing ? updateContract(newContract) : addContract(newContract);
    navigate('/smlouvy');
  };

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-[#BFcad9] to-[#748cab]">
      <div className="p-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/smlouvy')}
            className="text-[#0D1321] hover:text-[#152033] mb-2 flex items-center gap-2 transition-colors"
          >
            ← Zpět na seznam
          </button>
          <h1 className="text-4xl font-bold text-[#0D1321] tracking-tight">
            {editing ? 'Upravit smlouvu' : 'Nová smlouva'}
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#748cab]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Základní údaje */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#0D1321] to-[#152033] text-[#FFFFFF] p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Základní údaje</h2>
                </div>
                
                <div>
                  <label className="block text-[#0D1321] font-medium mb-2">Evidenční číslo</label>
                  <input
                    name="evidenceNumber"
                    placeholder="Zadejte evidenční číslo"
                    value={formData.evidenceNumber}
                    onChange={handleChange}
                    className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#0D1321] font-medium mb-2">Instituce</label>
                  <input
                    name="institution"
                    placeholder="Zadejte název instituce"
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0D1321] font-medium mb-2">Datum uzavření</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#0D1321] font-medium mb-2">Datum platnosti</label>
                    <input
                      type="date"
                      name="validUntil"
                      value={formData.validUntil}
                      onChange={handleChange}
                      className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#0D1321] font-medium mb-2">Datum ukončení (volitelné)</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                  />
                </div>
              </div>

              {/* Osoby */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#2E455D] to-[#3E5C76] text-[#FFFFFF] p-4 rounded-lg">
                  <h2 className="text-lg font-semibold mb-4">Účastníci smlouvy</h2>
                </div>

                <div>
                  <label className="block text-[#0D1321] font-medium mb-2">Rodné číslo klienta</label>
                  <input
                    name="clientBirthNumber"
                    placeholder="Zadejte rodné číslo klienta"
                    value={formData.clientBirthNumber}
                    onChange={handleChange}
                    className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#0D1321] font-medium mb-2">Rodné číslo správce smlouvy</label>
                  <input
                    name="managerBirthNumber"
                    placeholder="Zadejte rodné číslo správce"
                    value={formData.managerBirthNumber}
                    onChange={handleChange}
                    className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[#0D1321] font-medium">Další poradci (volitelné)</label>
                    <button
                      type="button"
                      onClick={addAdvisorField}
                      className="text-sm text-[#3E5C76] hover:text-[#2E455D] font-medium transition-colors"
                    >
                      + Přidat poradce
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.advisorBirthNumbers.map((value, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={value}
                          onChange={e => handleAdvisorChange(i, e.target.value)}
                          placeholder="Rodné číslo poradce"
                          className="flex-1 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#3E5C76] transition-colors bg-white/90"
                        />
                        {formData.advisorBirthNumbers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAdvisorField(i)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ověření */}
            <div className="mt-8 pt-8 border-t-2 border-[#748cab]/30">
              <div className="bg-[#1D2D44]/10 p-6 rounded-lg border border-[#1D2D44]/30">
                <h3 className="text-lg font-semibold text-[#0D1321] mb-4">Ověření správce</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#0D1321] font-medium mb-2">Rodné číslo správce</label>
                    <input
                      type="text"
                      placeholder="Zadejte jméno"
                      value={rcInput}
                      onChange={e => setRcInput(e.target.value)}
                      className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#1D2D44] transition-colors bg-white/90"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#0D1321] font-medium mb-2">Heslo</label>
                    <input
                      type="password"
                      placeholder="Zadejte heslo"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-10/12 border-2 border-[#748cab] rounded-lg px-4 py-3 focus:outline-none focus:border-[#1D2D44] transition-colors bg-white/90"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Akce */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/smlouvy')}
                className="px-6 py-3 border-2 border-[#748cab] text-[#0D1321] rounded-lg hover:bg-[#748cab]/10 transition-colors font-medium"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="bg-[#2E455D] text-white px-8 py-3 rounded-lg hover:bg-[#1D2D44] transition-colors font-medium shadow-lg"
              >
                {editing ? 'Uložit změny' : 'Vytvořit smlouvu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContractForm;