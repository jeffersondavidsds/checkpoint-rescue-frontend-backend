import { Heart, Users, Home, Shield, Zap, Globe } from 'lucide-react';
import './Sobre.scss';

export default function Sobre() {
  return (
    <div className="sobre-page">
      <div className="container">
        {/* Cabeçalho */}
        <div className="sobre-header">
          <img src="/logo.png" alt="Checkpoint Rescue" className="sobre-logo" />
          <h1>Sobre o Checkpoint Rescue</h1>
          <p className="sobre-intro">
            Uma plataforma desenvolvida para conectar pessoas, voluntários e instituições 
            durante situações de emergência por enchentes.
          </p>
        </div>

        {/* Missão */}
        <section className="sobre-section">
          <h2>Nossa Missão</h2>
          <p>
            Facilitar a comunicação e coordenação durante enchentes, conectando pessoas que 
            precisam de ajuda com voluntários dispostos a salvar vidas, doar recursos e oferecer 
            abrigo temporário.
          </p>
        </section>

        {/* Como Funciona */}
        <section className="sobre-section">
          <h2>Como Funciona</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#dbeafe' }}>
                <Users size={28} color="#2563eb" />
              </div>
              <h3>Voluntários</h3>
              <p>
                Pessoas dispostas a ajudar podem se cadastrar como voluntários de resgate, 
                doação ou cedendo espaço em suas casas.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#fef3c7' }}>
                <Home size={28} color="#f59e0b" />
              </div>
              <h3>Abrigos</h3>
              <p>
                Instituições e organizações podem cadastrar seus abrigos, informando 
                capacidade e recursos disponíveis.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#d1fae5' }}>
                <Heart size={28} color="#10b981" />
              </div>
              <h3>Solicitações</h3>
              <p>
                Pessoas em situação de risco podem criar solicitações de resgate, 
                abrigo ou doações rapidamente.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#fce7f3' }}>
                <Globe size={28} color="#ec4899" />
              </div>
              <h3>Mapa em Tempo Real</h3>
              <p>
                Visualize a localização de todos os abrigos, voluntários e 
                solicitações em um mapa interativo.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#e0e7ff' }}>
                <Zap size={28} color="#6366f1" />
              </div>
              <h3>Resposta Rápida</h3>
              <p>
                Sistema de priorização de solicitações urgentes para garantir 
                atendimento rápido em casos críticos.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#fef9c3' }}>
                <Shield size={28} color="#ca8a04" />
              </div>
              <h3>Seguro e Confiável</h3>
              <p>
                Dados protegidos e sistema de autenticação para garantir a 
                segurança de todos os usuários.
              </p>
            </div>
          </div>
        </section>

        {/* Tecnologias */}
        <section className="sobre-section">
          <h2>Tecnologias Utilizadas</h2>
          <div className="tech-list">
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Express</span>
            <span className="tech-badge">SQLite</span>
            <span className="tech-badge">Google Maps</span>
            <span className="tech-badge">JWT</span>
          </div>
        </section>

        {/* CTA */}
        <section className="sobre-cta">
          <h2>Junte-se a Nós</h2>
          <p>
            Faça parte desta rede de solidariedade e ajude a salvar vidas 
            durante emergências por enchentes.
          </p>
          <a href="/registro" className="btn btn-primary btn-large">
            Cadastrar Agora
          </a>
        </section>
      </div>
    </div>
  );
}
