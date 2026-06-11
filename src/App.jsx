import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyFridge from './pages/MyFridge';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import './index.css';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/nevera"
          element={
            <MyFridge
              ingredients={ingredients}
              setIngredients={setIngredients}
              setRecipes={setRecipes}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/recetas"
          element={<Recipes recipes={recipes} loading={loading} />}
        />
        <Route
          path="/recetas/:id"
          element={<RecipeDetail recipes={recipes} ingredients={ingredients} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
