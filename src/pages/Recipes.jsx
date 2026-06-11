import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import RecipeCard from '../components/RecipeCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Recipes({ recipes, loading }) {
  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumbs />

        <div className="recipes-header animate-fade-in-up">
          <h1 className="recipes-title">Recetas Generadas</h1>
          <p className="recipes-subtitle">
            {loading
              ? 'La IA esta trabajando en tus recetas...'
              : recipes.length > 0
                ? `Se encontraron ${recipes.length} recetas para ti`
                : 'Agrega ingredientes y genera recetas con IA'
            }
          </p>
        </div>

        {loading && <LoadingSpinner />}

        {!loading && recipes.length > 0 && (
          <div className="recipes-grid">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        )}

        {!loading && recipes.length === 0 && (
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
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <h2 className="empty-state-title">Sin recetas aun</h2>
            <p className="empty-state-text">
              Ve a tu nevera, agrega ingredientes y genera recetas personalizadas con inteligencia artificial.
            </p>
            <Link to="/nevera" className="btn btn-primary" style={{ marginTop: '24px' }} id="go-to-fridge-btn">
              Ir a Mi Nevera
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
