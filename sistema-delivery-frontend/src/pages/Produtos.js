import { useEffect, useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  // Função para checar o token JWT
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");  // Redireciona para login caso não tenha token
    }
  };

  useEffect(() => {
    checkAuth();

    // Chamada para obter a lista de produtos
    axios
      .get("api/produto")
      .then((res) => setProdutos(res.data))
      .catch((error) => {
        console.error("Erro ao obter produtos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Lista de Produtos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {produto.nome}
                </h3>
                <p className="text-gray-500 mb-4">Descrição: {produto.descricao}</p>
                <p className="text-lg font-medium text-gray-800">
                  R${produto.preco.toFixed(2)}
                </p>
                <button
                  onClick={() => alert("Produto adicionado ao carrinho!")}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
