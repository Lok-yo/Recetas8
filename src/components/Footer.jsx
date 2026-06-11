export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="main-footer">
      <div className="footer-inner">
        <p className="footer-text">
          <span>Recetas8</span> — Cocina inteligente con IA
        </p>
        <p className="footer-text">
          {currentYear}
        </p>
      </div>
    </footer>
  );
}
