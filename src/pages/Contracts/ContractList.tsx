import { useNavigate } from 'react-router-dom';
import { useContracts } from './ContractContext';
import { useState } from 'react';

const ContractList = () => {
  const { contracts } = useContracts();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContracts = contracts.filter((contract) => {
    const term = searchTerm.toLowerCase();
    return (
      contract.evidenceNumber.toLowerCase().includes(term) ||
      contract.institution.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Hlavička */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">Seznam smluv</h1>
        <button
          onClick={() => navigate('/smlouvy/novy')}
          className="bg-steelBlue text-white px-5 py-2 rounded hover:bg-darkBlue transition"
        >
          + Nová smlouva
        </button>
      </div>

      {/* Vyhledávání */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Vyhledat smlouvy..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-steelBlue transition"
        />
      </div>

      {/* Tabulka */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base border-collapse">
          <thead className="bg-grayBlue text-white">
            <tr>
              <th className="p-3">Evidenční číslo</th>
              <th className="p-3">Instituce</th>
              <th className="p-3">Platnost do</th>
              <th className="p-3">Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredContracts.map((contract) => (
              <tr
                key={contract.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="p-3">{contract.evidenceNumber}</td>
                <td className="p-3">{contract.institution}</td>
                <td className="p-3">{contract.validUntil || '—'}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/smlouvy/${contract.id}`)}
                    className="text-steelBlue hover:text-darkBlue transition"
                  >
                    →
                  </button>
                </td>
              </tr>
            ))}
            {filteredContracts.length === 0 && (
              <tr>
                <td className="p-3 italic text-gray-500" colSpan={6}>
                  Žádné smlouvy neodpovídají hledání
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractList;
