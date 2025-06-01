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
  if (!contract)
    return (
      <div className="ml-64 min-h-screen bg-gradient-to-br from-[#BFcad9] to-[#748cab] p-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#748cab]/20">
          <h1 className="text-2xl font-bold text-[#0D1321] mb-4">Smlouva nebyla nalezena</h1>
          <button
            onClick={() => navigate('/smlouvy')}
            className="bg-[#3E5C76] text-white px-4 py-2 rounded-lg hover:bg-[#2E455D] transition-colors"
          >
            Zpět na seznam
          </button>
        </div>
      </div>
    );

  const client = clients.find((c) => c.id === contract.clientId);
  const manager = advisors.find((a) => a.id === contract.managerId);
  const otherAdvisors = advisors.filter((a) =>
    contract.advisorIds.includes(a.id)
  );

  const [rcInput, setRcInput] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

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
    <div className="ml-64 min-h-screen bg-gradient-to-br from-[#BFcad9] to-[#748cab]">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#0D1321] tracking-tight">
              Detail smlouvy
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="bg-[#3E5C76] text-white px-6 py-3 rounded-lg hover:bg-[#2E455D] transition-colors font-medium shadow-lg"
            >
              Upravit smlouvu
            </button>
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg"
              >
                Smazat smlouvu
              </button>
            ) : (
              <div className="flex gap-2 items-center bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-red-200">
                <input
                  type="text"
                  placeholder="Jméno"
                  value={rcInput}
                  onChange={(e) => setRcInput(e.target.value)}
                  className="border-2 border-[#748cab] px-3 py-2 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                />
                <input
                  type="password"
                  placeholder="Heslo"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-[#748cab] px-3 py-2 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Potvrdit
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-[#748cab] text-white px-4 py-2 rounded-lg hover:bg-[#3E5C76] transition-colors font-medium"
                >
                  Zrušit
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-[#748cab]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-[#0D1321] to-[#152033] text-[#FFFFFF] p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Základní údaje</h2>
                <div className="space-y-3">
                  <div>
                    <span className="text-[#BFcad9] text-sm">Evidenční číslo</span>
                    <p className="font-medium">{contract.evidenceNumber}</p>
                  </div>
                  <div>
                    <span className="text-[#BFcad9] text-sm">Instituce</span>
                    <p className="font-medium">{contract.institution}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#BFcad9]/20 p-4 rounded-lg border border-[#748cab]/30">
                <h3 className="text-lg font-semibold text-[#0D1321] mb-4">Datumy</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-[#152033] text-sm font-medium">Datum uzavření:</span>
                    <p className="text-[#0D1321]">{contract.startDate}</p>
                  </div>
                  <div>
                    <span className="text-[#152033] text-sm font-medium">Datum platnosti:</span>
                    <p className="text-[#0D1321]">{contract.validUntil}</p>
                  </div>
                  <div>
                    <span className="text-[#152033] text-sm font-medium">Datum ukončení:</span>
                    <p className="text-[#0D1321]">{contract.endDate || "Neuvedeno"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#3E5C76]/10 p-4 rounded-lg border border-[#3E5C76]/30">
                <h3 className="text-lg font-semibold text-[#0D1321] mb-4">Klient</h3>
                <div className="bg-white p-3 rounded border-l-4 border-[#3E5C76]">
                  <p className="font-medium text-[#0D1321]">
                    {client
                      ? `${client.firstName} ${client.lastName}`
                      : "Neznámý klient"}
                  </p>
                  {client && (
                    <p className="text-sm text-[#152033]">RC: {client.birthNumber}</p>
                  )}
                </div>
              </div>

              <div className="bg-[#2E455D]/10 p-4 rounded-lg border border-[#2E455D]/30">
                <h3 className="text-lg font-semibold text-[#0D1321] mb-4">Správce smlouvy</h3>
                <div className="bg-white p-3 rounded border-l-4 border-[#2E455D]">
                  <p className="font-medium text-[#0D1321]">
                    {manager
                      ? `${manager.firstName} ${manager.lastName}`
                      : "Neznámý správce"}
                  </p>
                  {manager && (
                    <p className="text-sm text-[#152033]">RC: {manager.birthNumber}</p>
                  )}
                </div>
              </div>

              <div className="bg-[#748cab]/10 p-4 rounded-lg border border-[#748cab]/30">
                <h3 className="text-lg font-semibold text-[#0D1321] mb-4">Další poradci</h3>
                <div className="space-y-2">
                  {otherAdvisors.length > 0 ? (
                    otherAdvisors.map((advisor) => (
                      <div key={advisor.id} className="bg-white p-3 rounded border-l-4 border-[#748cab]">
                        <p className="font-medium text-[#0D1321]">
                          {advisor.firstName} {advisor.lastName}
                        </p>
                        <p className="text-sm text-[#152033]">RC: {advisor.birthNumber}</p>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white p-3 rounded border border-dashed border-[#748cab]">
                      <p className="text-[#152033] text-center">Žádní další poradci</p>
                    </div>
                  )}
                </div>
              </div>
              <button
              onClick={() => navigate('/smlouvy')}
              className="text-[#0D1321] hover:text-[#152033] mb-2 flex items-center gap-2 transition-colors"
            >
              ← Zpět na seznam
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;