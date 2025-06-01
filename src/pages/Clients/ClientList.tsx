import { useClients } from './ClientContext';
import { useNavigate } from 'react-router-dom';

const ClientList = () => {
  const { clients } = useClients();
  const navigate = useNavigate();

  return (
    <div className="pt-24 px-8 min-h-screen bg-gradient-to-br from-[#BFcad9] to-[#748cab]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-[#0D1321] tracking-tight">Klienti</h1>
        <button
          onClick={() => navigate('/klienti/novy')}
          className="bg-[#2E455D] text-white px-6 py-3 rounded-lg hover:bg-[#1D2D44] shadow-lg transition-all duration-200 font-medium"
        >
          + Nový klient
        </button>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-[#748cab]/20">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#0D1321] to-[#152033] text-[#FFFFFF]">
                <th className="px-6 py-4 text-left font-semibold tracking-wide">Jméno</th>
                <th className="px-6 py-4 text-left font-semibold tracking-wide">Příjmení</th>
                <th className="px-6 py-4 text-left font-semibold tracking-wide">Rodné číslo</th>
                <th className="px-6 py-4 text-center font-semibold tracking-wide">Akce</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  className={`border-b border-[#748cab]/20 hover:bg-[#BFcad9]/30 transition-colors duration-150 ${
                    index % 2 === 0 ? 'bg-white/50' : 'bg-[#BFcad9]/10'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-[#0D1321]">{client.firstName}</td>
                  <td className="px-6 py-4 text-[#152033]">{client.lastName}</td>
                  <td className="px-6 py-4 text-[#152033]">{client.birthNumber}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => navigate(`/klienti/${client.id}`)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#3E5C76] text-white hover:bg-[#2E455D] transition-colors duration-150 shadow-md"
                    >
                      →
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[#748cab]">
                    Žádní klienti nebyli nalezeni
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
