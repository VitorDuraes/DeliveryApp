import { useState } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async () => {
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (
      !form.nome ||
      !form.email ||
      !form.telefone ||
      !form.endereco ||
      !form.senha
    ) {
      alert("Todos os campos são obrigatórios!");
      return;
    }
    setIsSubmitting(true);

    try {
      await axios.post("/api/auth/Cadastro", form);
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      // Exibir erro detalhado
      if (err.response && err.response.data) {
        alert(
          err.response.data.message || "Erro ao cadastrar. Verifique os dados."
        );
      } else {
        alert("Erro de conexão. Tente novamente mais tarde.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="telefone"
          placeholder="Telefone"
          onChange={handleChange}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          name="endereco"
          placeholder="Endereço"
          onChange={handleChange}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>
    </div>
  );
};

export default Cadastro;
