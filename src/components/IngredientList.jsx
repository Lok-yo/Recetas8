export default function IngredientList({ ingredients, onRemove, onClear }) {
  if (ingredients.length === 0) {
    return (
      <div className="ingredient-empty">
        <svg
          className="ingredient-empty-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="18" rx="3" />
          <path d="M2 8h20" />
          <path d="M9 8v13" />
          <path d="M15 8v13" />
        </svg>
        <p className="ingredient-empty-text">
          Tu nevera esta vacia. Agrega ingredientes para comenzar a generar recetas.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="ingredient-tags" id="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <span key={`${ingredient}-${index}`} className="tag ingredient-tag">
            {ingredient}
            <button
              className="tag-remove"
              onClick={() => onRemove(index)}
              aria-label={`Eliminar ${ingredient}`}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </span>
        ))}
      </div>
      <div className="ingredient-counter">
        <span>
          <strong>{ingredients.length}</strong> ingrediente{ingredients.length !== 1 ? 's' : ''} en tu nevera
        </span>
        <button
          className="btn btn-secondary"
          onClick={onClear}
          style={{ padding: '4px 12px', fontSize: '0.75rem' }}
          id="clear-ingredients-btn"
        >
          Limpiar todo
        </button>
      </div>
    </div>
  );
}
