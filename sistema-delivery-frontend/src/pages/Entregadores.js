import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const Entregadores = () => {
  const [entregadores, setEntregadores] = useState([]);
  const navigate = useNavigate();

  // Função para checar o token JWT
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redireciona para login caso não tenha token
    }
  };

  useEffect(() => {
    checkAuth();

    // Chamada para obter a lista de entregadores
    axios
      .get("api/entregador")
      .then((res) => setEntregadores(res.data))
      .catch((error) => {
        console.error("Erro ao obter entregadores:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Lista de Entregadores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entregadores.map((entregador) => (
              <div
                key={entregador.id}
                className="bg-green-100 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  {entregador.nome}
                </h3>
                <p className="text-lg font-medium text-gray-600">
                  Status:
                  <span
                    className={`px-2 py-1 text-sm rounded ${
                      entregador.status === "Disponível"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {entregador.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entregadores;
