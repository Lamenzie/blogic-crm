import { useParams, useNavigate } from "react-router-dom";
import { useClients } from "./ClientContext";
import { useState } from "react";

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clients, removeClient, updateClient } = useClients();

  const client = clients.find((c) => c.id === Number(id));
  const [editMode, setEditMode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [formData, setFormData] = useState(() =>
    client ? { ...client } : null
  );

  if (!client || !formData) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4 text-darkBlue">Klient nebyl nalezen</h1>
        <button
          onClick={() => navigate("/klienti")}
          className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
        >
          Zpět na seznam
        </button>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleUpdate = () => {
    updateClient(formData);
    setEditMode(false);
  };

  const handleDelete = () => {
    removeClient(client.id);
    navigate("/klienti");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      {/* Hlavička + akce */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">Detail klienta</h1>
        <button
          onClick={() => navigate("/klienti")}
          className="text-steelBlue hover:underline"
        >
          ← Zpět na seznam
        </button>
      </div>

      {/* Tlačítka akcí */}
      {!editMode && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setEditMode(true)}
            className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
          >
            Upravit
          </button>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Smazat
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <p className="text-red-600 font-semibold">Opravdu smazat?</p>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
              >
                Ano
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="border border-gray-400 px-3 py-1 rounded hover:bg-gray-100"
              >
                Ne
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detail / Editace */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-darkBlue">Základní údaje</h2>

        {editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Jméno", name: "firstName" },
              { label: "Příjmení", name: "lastName" },
              { label: "Email", name: "email" },
              { label: "Telefon", name: "phone" },
              { label: "Rodné číslo", name: "birthNumber" },
              { label: "Věk", name: "age", type: "number" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
                />
              </div>
            ))}
            <div className="col-span-full flex gap-4 mt-4">
              <button
                onClick={() => setEditMode(false)}
                className="border border-gray-500 px-4 py-2 rounded hover:bg-gray-100"
              >
                Zrušit
              </button>
              <button
                onClick={handleUpdate}
                className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
              >
                Uložit změny
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-gray-800">
            <p><strong>Jméno:</strong> {client.firstName} {client.lastName}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Telefon:</strong> {client.phone}</p>
            <p><strong>Rodné číslo:</strong> {client.birthNumber}</p>
            <p><strong>Věk:</strong> {client.age}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDetail;
