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
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">
          {editing ? 'Upravit smlouvu' : 'Nová smlouva'}
        </h1>
        <button
          onClick={() => navigate('/smlouvy')}
          className="text-steelBlue hover:underline"
        >
          ← Zpět na seznam
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Základní údaje */}
        <section>
          <h2 className="text-lg font-semibold text-darkBlue mb-4">Základní údaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Evidenční číslo', name: 'evidenceNumber' },
              { label: 'Instituce', name: 'institution' },
              { label: 'Datum uzavření', name: 'startDate', type: 'date' },
              { label: 'Datum platnosti', name: 'validUntil', type: 'date' },
              { label: 'Datum ukončení (volitelné)', name: 'endDate', type: 'date' }
            ].map(({ label, name, type = 'text' }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  required={name !== 'endDate'}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Účastníci */}
        <section>
          <h2 className="text-lg font-semibold text-darkBlue mb-4">Účastníci smlouvy</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rodné číslo klienta</label>
              <input
                name="clientBirthNumber"
                value={formData.clientBirthNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rodné číslo správce smlouvy</label>
              <input
                name="managerBirthNumber"
                value={formData.managerBirthNumber}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Další poradci (volitelné)</label>
              <div className="space-y-2">
                {formData.advisorBirthNumbers.map((value, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={value}
                      onChange={(e) => handleAdvisorChange(i, e.target.value)}
                      placeholder="Rodné číslo poradce"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
                    />
                    {formData.advisorBirthNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAdvisorField(i)}
                        className="text-red-500 hover:underline"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addAdvisorField}
                className="mt-2 text-sm text-steelBlue hover:underline"
              >
                + Přidat poradce
              </button>
            </div>
          </div>
        </section>

        {/* Ověření */}
        <section>
          <h2 className="text-lg font-semibold text-darkBlue mb-4">Ověření správce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jméno</label>
              <input
                type="text"
                value={rcInput}
                onChange={(e) => setRcInput(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heslo</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              />
            </div>
          </div>
        </section>

        {/* Akce */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate('/smlouvy')}
            className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            Zrušit
          </button>
          <button
            type="submit"
            className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
          >
            {editing ? 'Uložit změny' : 'Vytvořit smlouvu'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractForm;
