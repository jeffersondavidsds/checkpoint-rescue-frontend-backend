import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { solicitacoes, abrigos, voluntarios } from '../../services/api';
import { 
  Home, Users, Heart, AlertCircle, CheckCircle, 
  Clock, MapPin, Phone, Mail, User
} from 'lucide-react';
import './Dashboard.scss';

export default function Dashboard() {
  const { usuario } = useAuth();
  const [dados, setDados] = useState(null);
  const [minhasSolicitacoes, setMinhasSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [usuario]);

  const carregarDados = async () => {
    try {
      if (usuario.tipo_usuario === 'abrigo') {
        const response = await abrigos.meuPerfil();
        setDados(response.data.dados.abrigo);
      } else if (usuario.tipo_usuario === 'voluntario') {
        const response = await voluntarios.meuPerfil();
        setDados(response.data.dados.voluntario);
      } else if (usuario.tipo_usuario === 'usuario_final') {
        const response = await solicitacoes.minhas();
        setMinhasSolicitacoes(response.data.dados.solicitacoes);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setCarregando(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      verde: '#22c55e',
      azul: '#3b82f6',
      amarelo: '#f59e0b',
      vermelho: '#ef4444',
      Pendente: '#f59e0b',
      'Em andamento': '#3b82f6',
      Concluida: '#22c55e'
    };
    return colors[status] || '#6b7280';
  };

  if (carregando) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-intro">
          <div className="dashboard-header-card">
            <div className="dashboard-header">
              <div>
                <h1>Bem-vindo, {usuario.nome}!</h1>
                <p className="dashboard-subtitle">
                  {usuario.tipo_usuario === 'abrigo' && 'Painel de Controle do Abrigo'}
                  {usuario.tipo_usuario === 'voluntario' && 'Painel do Voluntário'}
                  {usuario.tipo_usuario === 'usuario_final' && 'Suas Solicitações'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard para ABRIGO */}
        {usuario.tipo_usuario === 'abrigo' && dados && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#dbeafe' }}>
                  <Home size={24} color="#2563eb" />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Capacidade Total</p>
                  <p className="stat-value">{dados.capacidade_total}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#fef3c7' }}>
                  <Users size={24} color="#f59e0b" />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Ocupação Atual</p>
                  <p className="stat-value">{dados.ocupacao_atual}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#d1fae5' }}>
                  <CheckCircle size={24} color="#10b981" />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Vagas Disponíveis</p>
                  <p className="stat-value">{dados.capacidade_total - dados.ocupacao_atual}</p>
                </div>
              </div>

              <div className="stat-card">
                <div 
                  className="stat-icon" 
                  style={{ background: getStatusColor(dados.status_lotacao) + '20' }}
                >
                  <AlertCircle size={24} color={getStatusColor(dados.status_lotacao)} />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Status</p>
                  <p className="stat-value" style={{ textTransform: 'capitalize' }}>
                    {dados.status_lotacao}
                  </p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Informações do Abrigo</h2>
              <div className="info-card">
                <div className="info-item">
                  <Home size={20} />
                  <div>
                    <p className="info-label">Organização</p>
                    <p className="info-text">{dados.nome_organizacao}</p>
                  </div>
                </div>
                <div className="info-item">
                  <MapPin size={20} />
                  <div>
                    <p className="info-label">Endereço</p>
                    <p className="info-text">{dados.endereco_completo}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Phone size={20} />
                  <div>
                    <p className="info-label">Contato</p>
                    <p className="info-text">{dados.telefone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Heart size={20} />
                  <div>
                    <p className="info-label">Recursos</p>
                    <p className="info-text">{dados.recursos_disponiveis}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard para VOLUNTÁRIO */}
        {usuario.tipo_usuario === 'voluntario' && dados && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#dbeafe' }}>
                  <Heart size={24} color="#2563eb" />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Tipo de Voluntário</p>
                  <p className="stat-value" style={{ fontSize: '1rem' }}>
                    {dados.tipo_voluntario === 'resgate' && 'Resgate'}
                    {dados.tipo_voluntario === 'ceder_espaco' && 'Ceder Espaço'}
                    {dados.tipo_voluntario === 'doacao' && 'Doação'}
                  </p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: '#d1fae5' }}>
                  <CheckCircle size={24} color="#10b981" />
                </div>
                <div className="stat-info">
                  <p className="stat-label">Status</p>
                  <p className="stat-value" style={{ fontSize: '1rem' }}>
                    {dados.disponibilidade}
                  </p>
                </div>
              </div>
            </div>

            <div className="info-section">
              <h2>Suas Informações</h2>
              <div className="info-card">
                <div className="info-item">
                  <User size={20} />
                  <div>
                    <p className="info-label">Nome</p>
                    <p className="info-text">{dados.nome}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Phone size={20} />
                  <div>
                    <p className="info-label">Telefone</p>
                    <p className="info-text">{dados.telefone}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Mail size={20} />
                  <div>
                    <p className="info-label">E-mail</p>
                    <p className="info-text">{dados.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard para USUÁRIO FINAL */}
        {usuario.tipo_usuario === 'usuario_final' && (
          <div className="dashboard-content">
            <div className="solicitacoes-section">
              <h2>Minhas Solicitações</h2>
              
              {minhasSolicitacoes.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle size={48} color="#9ca3af" />
                  <p>Você ainda não fez nenhuma solicitação</p>
                </div>
              ) : (
                <div className="solicitacoes-list">
                  {minhasSolicitacoes.map((sol) => (
                    <div key={sol.id} className="solicitacao-card">
                      <div className="solicitacao-header">
                        <span 
                          className="badge"
                          style={{ 
                            background: getStatusColor(sol.status) + '20',
                            color: getStatusColor(sol.status)
                          }}
                        >
                          {sol.status}
                        </span>
                        <span className="solicitacao-tipo">
                          {sol.tipo_solicitacao}
                        </span>
                      </div>
                      <p className="solicitacao-descricao">{sol.descricao}</p>
                      <div className="solicitacao-footer">
                        <span className="solicitacao-prioridade">
                          Prioridade: {sol.prioridade}
                        </span>
                        <span className="solicitacao-data">
                          {new Date(sol.data_solicitacao).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
