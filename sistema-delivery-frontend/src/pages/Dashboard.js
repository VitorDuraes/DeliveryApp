import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [resumo, setResumo] = useState({});
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

    // Chamada para obter o resumo dos pedidos
    axios
      .get("api/pedido/dashboard/resumo-status")
      .then((res) => setResumo(res.data))
      .catch((error) => {
        console.error("Erro ao obter resumo:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Resumo dos Pedidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(resumo).map(([status, count]) => (
              <div
                key={status}
                className="bg-blue-100 p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  {status}
                </h3>
                <p className="text-3xl font-bold text-blue-600">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
