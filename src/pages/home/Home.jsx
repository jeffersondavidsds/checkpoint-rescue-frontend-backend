import { Link } from 'react-router-dom';
import { Search, Home as HomeIcon, ShieldCheck, Heart, MapPin, ArrowRight, Facebook, Instagram, MessageCircle } from 'lucide-react';
import './Home.scss';

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-banner">
        <div className="home-banner-grid container">
          <div className="home-copy">
            <span className="home-badge">Checkpoint Rescue</span>
            <h1>Encontre <span>abrigos seguros</span> e voluntários em poucos segundos</h1>
            <p>
              A plataforma conecta pessoas em risco de enchentes com abrigos, voluntários e doações disponíveis na sua região.
            </p>

            <div className="home-actions">
              <Link to="/mapa" className="btn btn-primary btn-large">
                Ver no Mapa
              </Link>
              <Link to="/registro" className="btn btn-outline btn-large">
                Quero Ajudar
              </Link>
            </div>

            <div className="home-stats">
              <div>
                <strong>+150</strong>
                <span>Abrigos ativos</span>
              </div>
              <div>
                <strong>+120</strong>
                <span>Voluntários prontos</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>Suporte de emergência</span>
              </div>
            </div>
          </div>

          <div className="home-visual">
            <div className="home-image-card">
              <img src="/abrigo-banner.jpg" alt="Abrigo seguro" />
              <div className="home-card-label">
                <HomeIcon size={18} />
                Abrigo Verificado
              </div>
              <div className="home-card-meta">
                <div>
                  <span>Capacidade</span>
                  <strong>80 pessoas</strong>
                </div>
                <div>
                  <span>Distância</span>
                  <strong>2.6 km</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-search container">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Busque abrigo, voluntário ou localidade" />
          </div>
          <button className="btn btn-primary search-button">Buscar</button>
          <div className="search-tags">
            <button type="button">Abrigos</button>
            <button type="button">Voluntários</button>
            <button type="button">Doações</button>
            <button type="button">Emergência</button>
          </div>
        </div>
      </section>

      <section className="home-intro container">
        <div className="intro-card">
          <div className="intro-icon">
            <MapPin size={20} />
          </div>
          <div>
            <h2>Conectando ajuda e quem precisa</h2>
            <p>Nosso sistema reúne informações de abrigos, voluntários e solicitações em um único lugar, com rapidez e segurança.</p>
          </div>
        </div>
      </section>

      <section className="features-section container">
        <h2>O que você pode fazer aqui?</h2>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon feature-icon-primary">
              <ShieldCheck size={24} />
            </div>
            <h3>Abrigos confiáveis</h3>
            <p>Identifique espaços seguros próximos a você com informações de capacidade e recursos atualizados.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon feature-icon-secondary">
              <Heart size={24} />
            </div>
            <h3>Voluntários disponíveis</h3>
            <p>Encontre pessoas prontas para resgate, transporte, entrega de mantimentos e apoio emergencial.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon feature-icon-tertiary">
              <MapPin size={24} />
            </div>
            <h3>Mapa em tempo real</h3>
            <p>Visualize recursos e solicitações na área de desastre para tomar decisões rápidas e seguras.</p>
          </article>
        </div>
      </section>

      <section className="cards-section container">
        <h2>Atue rapidamente onde mais importa</h2>
        <div className="cards-grid">
          <article className="action-card">
            <img src="/voluntario-resgate.jpg" alt="Voluntário de resgate" />
            <div className="card-body">
              <span>Voluntariado</span>
              <h3>Seja um voluntário de resgate</h3>
              <p>Apoie deslocamentos e salvamentos nas áreas inundadas.</p>
              <Link to="/registro?tipo=voluntario&acao=resgate" className="card-link">
                Quero ajudar <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <article className="action-card">
            <img src="/doacoes.jpg" alt="Doações" />
            <div className="card-body">
              <span>Doações</span>
              <h3>Envie mantimentos ou abrigo</h3>
              <p>Doe alimentos, roupas e abra espaço para famílias afetadas.</p>
              <Link to="/registro?tipo=voluntario&acao=doacao" className="card-link">
                Quero doar <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <article className="action-card">
            <img src="/abrigo-banner.jpg" alt="Abrigo" />
            <div className="card-body">
              <span>Abrigos</span>
              <h3>Cadastre um abrigo</h3>
              <p>Registre sua estrutura para acolher famílias em segurança.</p>
              <Link to="/registro?tipo=abrigo" className="card-link">
                Cadastrar abrigo <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-inner container">
          <div className="footer-content">
            <div className="footer-copy">
              ©Todos os direitos reservados. Desenvolvido por Jefferson David em 2026
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-icon">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-icon">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-icon">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
