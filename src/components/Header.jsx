import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="main-header">
      <div className="header-inner">
        <Link to="/" className="header-logo">
          <div className="header-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M8 12l2 2 4-4" />
            </svg>
          </div>
          <span className="header-logo-text">
            Recetas<span>8</span>
          </span>
        </Link>
        <nav className="header-nav" id="main-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/nevera"
            className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
          >
            Mi Nevera
          </NavLink>
          <NavLink
            to="/recetas"
            className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}
          >
            Recetas
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
