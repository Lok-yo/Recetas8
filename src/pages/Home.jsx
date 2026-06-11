import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-content">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-label">
            Impulsado por Inteligencia Artificial
          </div>
          <h1 className="hero-title">
            Transforma tus ingredientes{' '}
            <br />
            <span className="hero-title-highlight">en recetas increibles</span>
          </h1>
          <p className="hero-subtitle">
            Agrega los ingredientes que tienes en tu nevera y deja que nuestra IA 
            genere recetas personalizadas, creativas y deliciosas para ti.
          </p>
          <div className="hero-actions">
            <Link to="/nevera" className="btn btn-primary btn-lg" id="cta-start">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="18" rx="3" />
                <path d="M2 8h20" />
                <path d="M9 8v13" />
              </svg>
              Abrir Mi Nevera
            </Link>
            <a href="#como-funciona" className="btn btn-secondary btn-lg" id="cta-learn">
              Como funciona
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="features" id="como-funciona">
          <div className="features-grid">
            <div className="glass-card feature-card animate-fade-in-up stagger-1">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <h3 className="feature-title">Agrega Ingredientes</h3>
              <p className="feature-description">
                Escribe los ingredientes que tienes disponibles en tu nevera o despensa. 
                Sin limite de cantidad.
              </p>
            </div>

            <div className="glass-card feature-card animate-fade-in-up stagger-2">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <h3 className="feature-title">IA Genera Recetas</h3>
              <p className="feature-description">
                Nuestra inteligencia artificial analiza tus ingredientes y crea 
                recetas unicas y variadas adaptadas a lo que tienes.
              </p>
            </div>

            <div className="glass-card feature-card animate-fade-in-up stagger-3">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h3 className="feature-title">Cocina y Disfruta</h3>
              <p className="feature-description">
                Sigue los pasos detallados de cada receta. Incluyen tiempos, 
                dificultad y consejos del chef.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
