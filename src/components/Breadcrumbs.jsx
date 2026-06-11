import { Link, useLocation } from 'react-router-dom';

const routeLabels = {
  '': 'Inicio',
  'nevera': 'Mi Nevera',
  'recetas': 'Recetas',
};

export default function Breadcrumbs({ recipeTitle }) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on the home page
  if (pathSegments.length === 0) return null;

  const crumbs = [
    { label: 'Inicio', path: '/' },
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    // For recipe detail pages (numeric IDs), use the recipe title
    if (!isNaN(segment) && recipeTitle) {
      crumbs.push({
        label: recipeTitle,
        path: currentPath,
        isCurrent: isLast,
      });
    } else {
      crumbs.push({
        label: routeLabels[segment] || segment,
        path: currentPath,
        isCurrent: isLast,
      });
    }
  });

  return (
    <nav className="breadcrumbs" aria-label="Navegación de migas de pan" id="breadcrumbs">
      {crumbs.map((crumb, index) => (
        <div className="breadcrumb-item" key={crumb.path}>
          {index > 0 && (
            <svg
              className="breadcrumb-separator"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
          {crumb.isCurrent ? (
            <span className="breadcrumb-current">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="breadcrumb-link">
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
