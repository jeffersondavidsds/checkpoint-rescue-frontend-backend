import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, MapPin, Users, Home as HomeIcon } from 'lucide-react';
import { useState } from 'react';
import './Header.scss';

export default function Header() {
  const { usuario, logout, isAuthenticated } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Checkpoint Rescue" className="logo-img" />
            <span className="logo-text">CHECKPOINT RESCUE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/" className="nav-link">
              <HomeIcon size={18} />
              Início
            </Link>
            <Link to="/mapa" className="nav-link">
              <MapPin size={18} />
              Mapa
            </Link>
            <Link to="/sobre" className="nav-link">
              <Users size={18} />
              Sobre
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="auth-buttons">
            {isAuthenticated() ? (
              <div className="user-menu">
                <Link to="/dashboard" className="btn btn-secondary">
                  <User size={18} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-outline">
                  <LogOut size={18} />
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-login">
                  Entrar
                </Link>
                <Link to="/registro" className="btn btn-primary">
                  Cadastrar
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="menu-mobile-btn"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              {menuAberto ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuAberto && (
          <nav className="nav-mobile">
            <Link to="/" className="nav-link-mobile" onClick={() => setMenuAberto(false)}>
              <HomeIcon size={18} />
              Início
            </Link>
            <Link to="/mapa" className="nav-link-mobile" onClick={() => setMenuAberto(false)}>
              <MapPin size={18} />
              Mapa
            </Link>
            <Link to="/sobre" className="nav-link-mobile" onClick={() => setMenuAberto(false)}>
              <Users size={18} />
              Sobre
            </Link>
            {isAuthenticated() && (
              <Link to="/dashboard" className="nav-link-mobile" onClick={() => setMenuAberto(false)}>
                <User size={18} />
                Dashboard
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
