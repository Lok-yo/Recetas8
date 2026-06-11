import { useParams, useLocation, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

export default function RecipeDetail({ recipes, ingredients }) {
  const { id } = useParams();
  const location = useLocation();

  // Try to get recipe from location state (passed from card click) or from recipes array
  const recipe = location.state?.recipe || recipes.find(r => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="page-content">
        <div className="container">
          <Breadcrumbs />
          <div className="empty-state">
            <svg
              className="empty-state-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <h2 className="empty-state-title">Receta no encontrada</h2>
            <p className="empty-state-text">
              La receta que buscas no existe. Genera nuevas recetas desde tu nevera.
            </p>
            <Link to="/nevera" className="btn btn-primary" style={{ marginTop: '24px' }}>
              Ir a Mi Nevera
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userIngredients = (ingredients || []).map(i => i.toLowerCase());

  const difficultyBadge = {
    'Fácil': 'badge-success',
    'Media': 'badge-primary',
    'Difícil': 'badge-accent',
  };

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumbs recipeTitle={recipe.name} />

        <div className="recipe-detail">
          {/* Header */}
          <div className="recipe-detail-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className={`badge ${difficultyBadge[recipe.difficulty] || 'badge-primary'}`}>
                {recipe.difficulty}
              </span>
              <span className="badge badge-primary">
                {recipe.category}
              </span>
            </div>
            <h1 className="recipe-detail-title">{recipe.name}</h1>
            <p className="recipe-detail-description">{recipe.description}</p>

            <div className="recipe-detail-meta">
              <div className="recipe-detail-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Preparacion: <strong>{recipe.prepTime}</strong></span>
              </div>
              <div className="recipe-detail-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                <span>Coccion: <strong>{recipe.cookTime}</strong></span>
              </div>
              <div className="recipe-detail-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Porciones: <strong>{recipe.servings}</strong></span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="recipe-detail-section" style={{ animationDelay: '100ms' }}>
            <h2 className="recipe-detail-section-title">Ingredientes</h2>

            {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
              <>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  De tu nevera
                </p>
                <div className="recipe-ingredients-list" style={{ marginBottom: '20px' }}>
                  {recipe.usedIngredients.map((ing, i) => (
                    <div key={i} className="recipe-ingredient-item">
                      <span className="recipe-ingredient-dot available" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {recipe.additionalIngredients && recipe.additionalIngredients.length > 0 && (
              <>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Ingredientes adicionales
                </p>
                <div className="recipe-ingredients-list">
                  {recipe.additionalIngredients.map((ing, i) => (
                    <div key={i} className="recipe-ingredient-item">
                      <span className="recipe-ingredient-dot additional" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Steps */}
          <div className="recipe-detail-section" style={{ animationDelay: '200ms' }}>
            <h2 className="recipe-detail-section-title">Preparacion</h2>
            <div className="recipe-steps-list">
              {recipe.steps.map((step, i) => {
                // Remove "Paso X:" prefix if present
                const cleanStep = step.replace(/^Paso\s*\d+\s*:\s*/i, '');
                return (
                  <div key={i} className="recipe-step">
                    <span className="recipe-step-number">{i + 1}</span>
                    <p className="recipe-step-text">{cleanStep}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tip */}
          {recipe.tips && (
            <div className="recipe-detail-section" style={{ animationDelay: '300ms' }}>
              <div className="recipe-tip">
                <strong>Consejo del chef</strong>
                {recipe.tips}
              </div>
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: '32px', animation: 'fadeInUp 400ms 400ms ease-out both' }}>
            <Link to="/recetas" className="btn btn-secondary" id="back-to-recipes-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Volver a Recetas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
