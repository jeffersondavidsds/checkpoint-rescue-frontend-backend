import { useState, useEffect } from 'react';
import { mapa } from '../../services/api';
import { MapPin, Home, Users, AlertCircle } from 'lucide-react';
import './Mapa.scss';

export default function Mapa() {
  const [localizacoes, setLocalizacoes] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    carregarLocalizacoes();
  }, []);

  const carregarLocalizacoes = async () => {
    try {
      const response = await mapa.obterLocalizacoes();
      setLocalizacoes(response.data.dados);
    } catch (error) {
      console.error('Erro ao carregar localizações:', error);
    } finally {
      setCarregando(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      verde: '#22c55e',
      azul: '#3b82f6',
      amarelo: '#f59e0b',
      vermelho: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  if (carregando) {
    return (
      <div className="mapa-loading">
        <div className="spinner"></div>
        <p>Carregando mapa...</p>
      </div>
    );
  }

  const dadosFiltrados = () => {
    if (!localizacoes) return { abrigos: [], voluntarios_espaco: [], solicitacoes_pendentes: [] };
    
    if (filtro === 'todos') return localizacoes;
    
    if (filtro === 'abrigos') {
      return {
        abrigos: localizacoes.abrigos,
        voluntarios_espaco: [],
        solicitacoes_pendentes: []
      };
    }
    
    if (filtro === 'voluntarios') {
      return {
        abrigos: [],
        voluntarios_espaco: localizacoes.voluntarios_espaco,
        solicitacoes_pendentes: []
      };
    }
    
    if (filtro === 'solicitacoes') {
      return {
        abrigos: [],
        voluntarios_espaco: [],
        solicitacoes_pendentes: localizacoes.solicitacoes_pendentes
      };
    }
    
    return localizacoes;
  };

  const dados = dadosFiltrados();

  return (
    <div className="mapa-page">
      <div className="container">
        <div className="mapa-intro">
          <div className="mapa-header-card">
            <div className="mapa-header">
              <div>
                <h1>Mapa de Recursos</h1>
                <p>Encontre abrigos, voluntários e solicitações de ajuda</p>
              </div>

              <div className="mapa-filters">
            <button
              className={`filter-btn ${filtro === 'todos' ? 'active' : ''}`}
              onClick={() => setFiltro('todos')}
            >
              Todos
            </button>
            <button
              className={`filter-btn ${filtro === 'abrigos' ? 'active' : ''}`}
              onClick={() => setFiltro('abrigos')}
            >
              <Home size={16} />
              Abrigos
            </button>
            <button
              className={`filter-btn ${filtro === 'voluntarios' ? 'active' : ''}`}
              onClick={() => setFiltro('voluntarios')}
            >
              <Users size={16} />
              Voluntários
            </button>
            <button
              className={`filter-btn ${filtro === 'solicitacoes' ? 'active' : ''}`}
              onClick={() => setFiltro('solicitacoes')}
            >
              <AlertCircle size={16} />
              Solicitações
            </button>
          </div>
        </div>
      </div>
    </div>

        {/* Info Cards */}
        <div className="stats-summary">
          <div className="summary-card">
            <Home size={24} color="#2563eb" />
            <div>
              <p className="summary-value">{localizacoes?.abrigos?.length || 0}</p>
              <p className="summary-label">Abrigos</p>
            </div>
          </div>
          <div className="summary-card">
            <Users size={24} color="#10b981" />
            <div>
              <p className="summary-value">{localizacoes?.voluntarios_espaco?.length || 0}</p>
              <p className="summary-label">Voluntários</p>
            </div>
          </div>
          <div className="summary-card">
            <AlertCircle size={24} color="#f59e0b" />
            <div>
              <p className="summary-value">{localizacoes?.solicitacoes_pendentes?.length || 0}</p>
              <p className="summary-label">Solicitações</p>
            </div>
          </div>
        </div>

        {/* Lista de Localizações */}
        <div className="localizacoes-grid">
          {/* Abrigos */}
          {dados.abrigos?.map((abrigo) => (
            <div key={`abrigo-${abrigo.id}`} className="local-card">
              <div className="local-header">
                <div className="local-icon" style={{ background: '#dbeafe' }}>
                  <Home size={20} color="#2563eb" />
                </div>
                <span 
                  className="local-status"
                  style={{ 
                    background: getStatusColor(abrigo.status_lotacao) + '20',
                    color: getStatusColor(abrigo.status_lotacao)
                  }}
                >
                  {abrigo.status_lotacao}
                </span>
              </div>
              <h3 className="local-nome">{abrigo.nome}</h3>
              <p className="local-endereco">
                <MapPin size={16} />
                {abrigo.endereco}
              </p>
              <div className="local-info">
                <span>Capacidade: {abrigo.capacidade_total}</span>
                <span>Ocupação: {abrigo.ocupacao_atual}</span>
                <span>Vagas: {abrigo.vagas_disponiveis}</span>
              </div>
            </div>
          ))}

          {/* Voluntários */}
          {dados.voluntarios_espaco?.map((vol) => (
            <div key={`vol-${vol.id}`} className="local-card">
              <div className="local-header">
                <div className="local-icon" style={{ background: '#d1fae5' }}>
                  <Users size={20} color="#10b981" />
                </div>
                <span 
                  className="local-status"
                  style={{ 
                    background: getStatusColor(vol.status_lotacao) + '20',
                    color: getStatusColor(vol.status_lotacao)
                  }}
                >
                  {vol.status_lotacao}
                </span>
              </div>
              <h3 className="local-nome">{vol.nome}</h3>
              <p className="local-endereco">
                <MapPin size={16} />
                {vol.endereco}
              </p>
              <div className="local-info">
                <span>Tipo: {vol.tipo_espaco}</span>
                <span>Vagas: {vol.vagas_disponiveis}</span>
              </div>
            </div>
          ))}

          {/* Solicitações */}
          {dados.solicitacoes_pendentes?.map((sol) => (
            <div key={`sol-${sol.id}`} className="local-card">
              <div className="local-header">
                <div className="local-icon" style={{ background: '#fef3c7' }}>
                  <AlertCircle size={20} color="#f59e0b" />
                </div>
                <span 
                  className="local-status badge-warning"
                >
                  {sol.prioridade}
                </span>
              </div>
              <h3 className="local-nome">{sol.tipo_solicitacao}</h3>
              <p className="local-descricao">{sol.descricao}</p>
              <p className="local-solicitante">
                Solicitante: {sol.solicitante}
              </p>
            </div>
          ))}
        </div>

        {dados.abrigos?.length === 0 && 
         dados.voluntarios_espaco?.length === 0 && 
         dados.solicitacoes_pendentes?.length === 0 && (
          <div className="empty-mapa">
            <MapPin size={48} color="#9ca3af" />
            <p>Nenhum resultado encontrado para este filtro</p>
          </div>
        )}
      </div>
    </div>
  );
}
