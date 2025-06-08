import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClients } from "./ClientContext";
import type { Client } from "../../models/client";

const ClientForm = () => {
  const { addClient } = useClients();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Client>({
    id: Date.now(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthNumber: "",
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.birthNumber) {
      alert("Vyplňte prosím všechna povinná pole.");
      return;
    }
    addClient(formData);
    navigate("/klienti");
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-darkBlue">Nový klient</h1>
        <button
          onClick={() => navigate("/klienti")}
          className="text-steelBlue hover:underline"
        >
          ← Zpět na seznam
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jméno</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Příjmení</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rodné číslo</label>
            <input
              name="birthNumber"
              value={formData.birthNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Věk</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-steelBlue"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/klienti")}
            className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          >
            Zrušit
          </button>
          <button
            type="submit"
            className="bg-steelBlue text-white px-4 py-2 rounded hover:bg-darkBlue"
          >
            Přidat klienta
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
