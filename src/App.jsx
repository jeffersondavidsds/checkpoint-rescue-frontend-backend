import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Registro from './pages/registro/Registro';
import Dashboard from './pages/dashboard/Dashboard';
import Mapa from './pages/mapa/Mapa';
import Sobre from './pages/sobre/Sobre';

// Componente para rotas protegidas (apenas usuários autenticados)
function RotaProtegida({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/mapa" element={<Mapa />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route 
                path="/dashboard" 
                element={
                  <RotaProtegida>
                    <Dashboard />
                  </RotaProtegida>
                } 
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
