import { useClients } from './ClientContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ClientList = () => {
  const { clients } = useClients();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase();
    return (
      client.firstName.toLowerCase().includes(term) ||
      client.lastName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Nadpis a akční tlačítko */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">Klienti</h1>
        <button
          onClick={() => navigate('/klienti/novy')}
          className="bg-steelBlue text-white px-5 py-2 rounded hover:bg-darkBlue transition"
        >
          + Nový klient
        </button>
      </div>

      {/* Vyhledávací pole */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Vyhledat klienty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-steelBlue transition"
        />
      </div>

      {/* Tabulka klientů */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base">
          <thead className="bg-grayBlue text-white">
            <tr>
              <th className="p-3">Jméno</th>
              <th className="p-3">Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="p-3">{client.firstName} {client.lastName}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/klienti/${client.id}`)}
                    className="text-steelBlue hover:text-darkBlue transition"
                  >
                    →
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td className="p-3 italic text-gray-500" colSpan={2}>
                  Žádní klienti neodpovídají hledání
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;
