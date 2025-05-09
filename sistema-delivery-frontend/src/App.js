import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Entregadores from "./pages/Entregadores";
import Produtos from "./pages/Produtos";
import Pedidos from "./pages/Pedidos";
import Pagamentos from "./pages/Pagamentos";
import Cadastro from "./pages/Cadastro";

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              <Clientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/entregadores"
          element={
            <ProtectedRoute>
              <Entregadores />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <Produtos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pedidos"
          element={
            <ProtectedRoute>
              <Pedidos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pagamentos"
          element={
            <ProtectedRoute>
              <Pagamentos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
