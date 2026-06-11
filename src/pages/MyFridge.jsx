import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import IngredientInput from '../components/IngredientInput';
import IngredientList from '../components/IngredientList';

export default function MyFridge({ ingredients, setIngredients, setRecipes, setLoading }) {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const addIngredient = (ingredient) => {
    const normalized = ingredient.toLowerCase().trim();
    if (ingredients.some(i => i.toLowerCase() === normalized)) {
      setError(`"${ingredient}" ya esta en tu lista.`);
      setTimeout(() => setError(''), 3000);
      return;
    }
    setIngredients([...ingredients, ingredient]);
    setError('');
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const clearIngredients = () => {
    setIngredients([]);
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;

    setLoading(true);
    setRecipes([]);
    navigate('/recetas');

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al generar recetas');
      }

      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error('Error:', err);
      setRecipes([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="container">
        <Breadcrumbs />

        <div className="fridge-layout">
          {/* Left panel: Ingredient management */}
          <div className="glass-card fridge-panel animate-fade-in-up">
            <div className="panel-header">
              <h1 className="panel-title">Mi Nevera</h1>
              <p className="panel-subtitle">
                Agrega los ingredientes que tienes disponibles
              </p>
            </div>

            <IngredientInput onAdd={addIngredient} />

            {error && (
              <div
                style={{
                  padding: '8px 16px',
                  marginBottom: '16px',
                  background: 'rgba(231, 76, 60, 0.1)',
                  border: '1px solid rgba(231, 76, 60, 0.2)',
                  borderRadius: '10px',
                  fontSize: '0.875rem',
                  color: '#e74c3c',
                  animation: 'fadeIn 200ms ease-out',
                }}
                id="error-message"
              >
                {error}
              </div>
            )}

            <IngredientList
              ingredients={ingredients}
              onRemove={removeIngredient}
              onClear={clearIngredients}
            />
          </div>

          {/* Right panel: Generate */}
          <div className="glass-card generate-panel animate-fade-in-up stagger-2">
            <div className="generate-info">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: 'var(--color-primary)', marginBottom: '16px' }}
              >
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="generate-title">Generar Recetas</h2>
              <p className="generate-subtitle">
                {ingredients.length === 0
                  ? 'Agrega al menos un ingrediente para comenzar'
                  : `Listo para generar recetas con ${ingredients.length} ingrediente${ingredients.length !== 1 ? 's' : ''}`
                }
              </p>
              <button
                className="btn btn-primary btn-generate"
                onClick={handleGenerate}
                disabled={ingredients.length === 0}
                id="generate-recipes-btn"
              >
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
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Generar con IA
              </button>

              {ingredients.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Ingredientes seleccionados:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', justifyContent: 'center' }}>
                    {ingredients.slice(0, 8).map((ing, i) => (
                      <span
                        key={i}
                        style={{
                          padding: '2px 10px',
                          fontSize: '0.7rem',
                          background: 'var(--color-primary-muted)',
                          borderRadius: '999px',
                          color: 'var(--color-primary)',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                    {ingredients.length > 8 && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        +{ingredients.length - 8} mas
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
