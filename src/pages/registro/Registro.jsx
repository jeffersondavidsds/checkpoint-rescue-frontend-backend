import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../auth/Auth.scss';

export default function Registro() {
  const [searchParams] = useSearchParams();
  const tipoInicial = searchParams.get('tipo') || '';
  
  const [formData, setFormData] = useState({
    tipo_usuario: tipoInicial,
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
    latitude: -22.9068,
    longitude: -43.1729
  });
  
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { registro } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    const resultado = await registro(formData);

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
              <span className="auth-pill">Cadastro rápido</span>
              <img src="/logo.png" alt="Logo" className="auth-logo" />
              <h1>Crie sua conta</h1>
              <p>Seja voluntário, registre um abrigo ou solicite ajuda em poucos passos.</p>
            </div>

            <div className="auth-metrics">
              <div>
                <strong>3+</strong>
                <span>Tipos de cadastro</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>Retorno imediato</span>
              </div>
            </div>
          </div>

          {erro && (
            <div className="alert alert-error">
              <span>{erro}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Tipo de Cadastro</label>
              <select
                className="input"
                value={formData.tipo_usuario}
                onChange={(e) => setFormData({ ...formData, tipo_usuario: e.target.value })}
                required
              >
                <option value="">Selecione...</option>
                <option value="usuario_final">Preciso de Ajuda</option>
                <option value="voluntario">Voluntário</option>
                <option value="abrigo">Abrigo/Instituição</option>
              </select>
            </div>

            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                className="input"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Senha</label>
              <input
                type="password"
                className="input"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                required
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                className="input"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                placeholder="(21) 98765-4321"
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={carregando}>
              {carregando ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login">Fazer login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
