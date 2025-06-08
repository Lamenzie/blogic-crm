import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContracts } from "./ContractContext";
import { useClients } from "../Clients/ClientContext";
import { useAdvisors } from "../Advisors/AdvisorContext";

const ContractDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { contracts, removeContract } = useContracts();
  const { clients } = useClients();
  const { advisors } = useAdvisors();

  const contract = contracts.find((c) => c.id === Number(id));
  const client = clients.find((c) => c.id === contract?.clientId);
  const manager = advisors.find((a) => a.id === contract?.managerId);
  const otherAdvisors = advisors.filter((a) =>
    contract?.advisorIds.includes(a.id)
  );

  const [rcInput, setRcInput] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  if (!contract) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold text-darkBlue mb-4">Smlouva nebyla nalezena</h1>
        <button
          onClick={() => navigate("/smlouvy")}
          className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
        >
          Zpět na seznam
        </button>
      </div>
    );
  }

  const handleDeleteConfirm = () => {
    if (
      !manager ||
      rcInput !== manager.birthNumber ||
      password !== "heslo123"
    ) {
      alert("Neplatné údaje správce nebo nesprávné heslo.");
      return;
    }
    removeContract(contract.id);
    navigate("/smlouvy");
  };

  const handleEdit = () => {
    navigate(`/smlouvy/novy?edit=${contract.id}`);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Hlavička */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">Detail smlouvy</h1>
        <button
          onClick={() => navigate("/smlouvy")}
          className="text-steelBlue hover:underline"
        >
          ← Zpět na seznam
        </button>
      </div>

      {/* Akce */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleEdit}
          className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
        >
          Upravit smlouvu
        </button>
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Smazat smlouvu
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Rodné číslo správce"
                value={rcInput}
                onChange={(e) => setRcInput(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              />
              <input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
              >
                Potvrdit
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
              >
                Zrušit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Základní údaje */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-darkBlue mb-3">Základní údaje</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800">
          <div>
            <span className="block text-sm text-gray-600">Evidenční číslo</span>
            <p>{contract.evidenceNumber}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-600">Instituce</span>
            <p>{contract.institution}</p>
          </div>
        </div>
      </section>

      {/* Datumy */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-darkBlue mb-3">Datumy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
          <div>
            <span className="block text-sm text-gray-600">Datum uzavření</span>
            <p>{contract.startDate}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-600">Datum platnosti</span>
            <p>{contract.validUntil}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-600">Datum ukončení</span>
            <p>{contract.endDate || "Neuvedeno"}</p>
          </div>
        </div>
      </section>

      {/* Klient a poradci */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-darkBlue mb-3">Klient</h3>
        <p className="text-gray-800">
          {client ? `${client.firstName} ${client.lastName}` : "Neznámý klient"}
        </p>
        {client && <p className="text-sm text-gray-600">RC: {client.birthNumber}</p>}
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-darkBlue mb-3">Správce smlouvy</h3>
        <p className="text-gray-800">
          {manager ? `${manager.firstName} ${manager.lastName}` : "Neznámý správce"}
        </p>
        {manager && <p className="text-sm text-gray-600">RC: {manager.birthNumber}</p>}
      </section>

      <section>
        <h3 className="text-lg font-semibold text-darkBlue mb-3">Další poradci</h3>
        {otherAdvisors.length > 0 ? (
          <div className="space-y-2 text-gray-800">
            {otherAdvisors.map((advisor) => (
              <div key={advisor.id}>
                <p>{advisor.firstName} {advisor.lastName}</p>
                <p className="text-sm text-gray-600">RC: {advisor.birthNumber}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">Žádní další poradci</p>
        )}
      </section>
    </div>
  );
};

export default ContractDetail;
