import { useState, useEffect } from 'react';

const messages = [
  'Analizando tus ingredientes...',
  'Buscando combinaciones perfectas...',
  'Creando recetas unicas para ti...',
  'Casi listo, dale un toque final...',
];

export default function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container" id="loading-spinner">
      <div className="loading-spinner" />
      <p className="loading-text">{messages[messageIndex]}</p>
    </div>
  );
}
