import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import '../auth/Auth.scss';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const resultado = await login(formData.email, formData.senha);

    if (resultado.sucesso) {
      navigate('/dashboard');
    } else {
      setErro(resultado.mensagem);
    }

    setCarregando(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-intro">
            <div className="auth-header">
              <span className="auth-pill">Conecte-se</span>
              <img src="/logo.png" alt="Logo" className="auth-logo" />
              <h1>Bem-vindo ao Checkpoint Rescue</h1>
              <p>Entre para gerenciar abrigos, voluntários e solicitações de ajuda com rapidez.</p>
            </div>

            <div className="auth-metrics">
              <div>
                <strong>150+</strong>
                <span>Abrigos ativos</span>
              </div>
              <div>
                <strong>120+</strong>
                <span>Voluntários prontos</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>Atendimento emergencial</span>
              </div>
            </div>
          </div>

          {erro && (
            <div className="alert alert-error">
              <AlertCircle size={20} />
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>
                <Mail size={18} />
                E-mail
              </label>
              <input
                type="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label>
                <Lock size={18} />
                Senha
              </label>
              <input
                type="password"
                className="input"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/registro">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
