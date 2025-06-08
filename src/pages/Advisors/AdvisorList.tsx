import { useAdvisors } from "./AdvisorContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdvisorList = () => {
  const { advisors } = useAdvisors();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdvisors = advisors.filter((advisor) => {
    const term = searchTerm.toLowerCase();
    return (
      advisor.firstName.toLowerCase().includes(term) ||
      advisor.lastName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Hlavička a akce */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">Poradci</h1>
        <button
          onClick={() => navigate("/poradci/novy")}
          className="bg-steelBlue text-white px-5 py-2 rounded hover:bg-darkBlue transition"
        >
          + Nový poradce
        </button>
      </div>

      {/* Vyhledávání */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Vyhledat poradce..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-steelBlue transition"
        />
      </div>

      {/* Tabulka */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-base">
          <thead className="bg-grayBlue text-white">
            <tr>
              <th className="p-3">Jméno</th>
              <th className="p-3">Detail</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredAdvisors.map((advisor) => (
              <tr
                key={advisor.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="p-3">{advisor.firstName} {advisor.lastName}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/poradci/${advisor.id}`)}
                    className="text-steelBlue hover:text-darkBlue transition"
                  >
                    →
                  </button>
                </td>
              </tr>
            ))}
            {filteredAdvisors.length === 0 && (
              <tr>
                <td className="p-3 italic text-gray-500" colSpan={2}>
                  Žádní poradci neodpovídají hledání
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvisorList;
