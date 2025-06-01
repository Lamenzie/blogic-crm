import { useNavigate } from 'react-router-dom';
import { useContracts } from './ContractContext';

const ContractList = () => {
  const { contracts } = useContracts();
  const navigate = useNavigate();

  return (
    <div className="ml-64 min-h-screen bg-gradient-to-br from-[#BFcad9] to-[#748cab]">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-[#0D1321] tracking-tight">Smlouvy</h1>
          <button
            onClick={() => navigate('/smlouvy/novy')}
            className="bg-[#2E455D] text-white px-6 py-3 rounded-lg hover:bg-[#1D2D44] shadow-lg transition-all duration-200 font-medium"
          >
            + Nová smlouva
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Vyhledat smlouvy..."
            className="w-5/12 max-w-md px-4 py-3 border-2 border-[#748cab] rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:border-[#3E5C76] focus:bg-white transition-all duration-200 placeholder-[#748cab]"
          />
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-[#748cab]/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#0D1321] to-[#152033] text-[#FFFFFF]">
                  <th className="px-6 py-4 text-left font-semibold tracking-wide">Evidenční číslo</th>
                  <th className="px-6 py-4 text-left font-semibold tracking-wide">Instituce</th>
                  <th className="px-6 py-4 text-left font-semibold tracking-wide">Datum uzavření</th>
                  <th className="px-6 py-4 text-left font-semibold tracking-wide">Platnost do</th>
                  <th className="px-6 py-4 text-center font-semibold tracking-wide">Detail</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr 
                    key={contract.id} 
                    className={`border-b border-[#748cab]/20 hover:bg-[#BFcad9]/30 transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white/50' : 'bg-[#BFcad9]/10'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-[#0D1321]">{contract.evidenceNumber}</td>
                    <td className="px-6 py-4 text-[#152033]">{contract.institution}</td>
                    <td className="px-6 py-4 text-[#152033]">{contract.startDate}</td>
                    <td className="px-6 py-4 text-[#152033]">{contract.validUntil}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/smlouvy/${contract.id}`)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3E5C76] text-white hover:bg-[#2E455D] transition-colors duration-150 shadow-md"
                      >
                        →
                      </button>
                    </td>
                  </tr>
                ))}
                {contracts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[#748cab]">
                      Žádné smlouvy nebyly nalezeny
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractList;