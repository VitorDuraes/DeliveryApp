import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
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

    // Chamada para obter a lista de pedidos
    axios
      .get("api/pedido")
      .then((res) => setPedidos(res.data))
      .catch((error) => {
        console.error("Erro ao obter pedidos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Lista de Pedidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pedidos.map((pedido) => (
              <div
                key={pedido.id}
                className="bg-blue-100 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  Pedido #{pedido.id}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Cliente: {pedido.cliente.nome}
                </p>
                <p className="text-lg font-medium text-gray-700">
                  Status:
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      pedido.status === "Pendente"
                        ? "bg-yellow-400 text-black"
                        : pedido.status === "Em preparo"
                        ? "bg-blue-500 text-white"
                        : pedido.status === "Saiu para entrega"
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {pedido.status}
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

export default Pedidos;
