import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const Pagamentos = () => {
  const [pagamentos, setPagamentos] = useState([]);
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

    // Chamada para obter os pagamentos
    axios
      .get("api/pagamento")
      .then((res) => setPagamentos(res.data))
      .catch((error) => {
        console.error("Erro ao obter pagamentos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Histórico de Pagamentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pagamentos.map((pagamento) => (
              <div
                key={pagamento.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Método: {pagamento.metodo}
                </h3>
                <p className="text-gray-500 mb-4">Status: {pagamento.status}</p>
                <p className="text-lg font-medium text-gray-800">
                  R${pagamento.valor.toFixed(2)}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      alert(`Detalhes do pagamento #${pagamento.id}`)
                    }
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagamentos;
