import { useEffect, useState } from "react";
import axios from "../api/api";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get("api/cliente").then((res) => setClientes(res.data));
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">👤 Lista de Clientes</h2>
      <div className="grid gap-4">
        {clientes.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <p className="text-lg font-medium">{c.nome}</p>
            <p className="text-sm text-gray-500">{c.email}</p>
            <p className="text-sm text-gray-500">📞 {c.telefone}</p>
            <p className="text-sm text-gray-500">🏠 {c.endereco}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
