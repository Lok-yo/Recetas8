import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  methods: ['GET', 'POST'],
}));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Recetas8 API is running' });
});

// Generate recipes from ingredients
app.post('/api/recipes', async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: 'Debes proporcionar al menos un ingrediente.',
      });
    }

    const ingredientList = ingredients.join(', ');

    const systemPrompt = `Eres un chef profesional experto en cocina internacional. 
Tu tarea es generar recetas creativas y deliciosas basadas en los ingredientes que el usuario tiene disponibles.

REGLAS:
- Genera exactamente 4 recetas variadas (diferentes tipos de plato: entrada, principal, postre, snack, etc.)
- Cada receta debe usar AL MENOS 2 de los ingredientes proporcionados
- Puedes asumir que el usuario tiene ingredientes básicos de despensa (sal, pimienta, aceite, agua)
- Las recetas deben ser realistas y fáciles de seguir
- Responde SIEMPRE en español
- NO uses emojis en ninguna parte de la respuesta

Responde ÚNICAMENTE con un JSON válido con la siguiente estructura (sin markdown, sin backticks, solo JSON puro):
{
  "recipes": [
    {
      "id": 1,
      "name": "Nombre de la receta",
      "description": "Descripción breve y apetitosa de la receta",
      "difficulty": "Fácil|Media|Difícil",
      "prepTime": "15 min",
      "cookTime": "30 min",
      "servings": 4,
      "category": "Entrada|Principal|Postre|Snack|Sopa|Ensalada",
      "usedIngredients": ["ingrediente1", "ingrediente2"],
      "additionalIngredients": ["ingrediente extra necesario"],
      "steps": [
        "Paso 1: descripción detallada",
        "Paso 2: descripción detallada"
      ],
      "tips": "Consejo o variación opcional"
    }
  ]
}`;

    const userPrompt = `Tengo estos ingredientes en mi nevera: ${ingredientList}. 
Genera 4 recetas variadas que pueda preparar con estos ingredientes.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 3000,
    });

    const responseText = completion.choices[0].message.content.trim();

    let recipes;
    try {
      recipes = JSON.parse(responseText);
    } catch (parseError) {
      // Try to extract JSON from potential markdown code blocks
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('La respuesta de la IA no es un JSON válido.');
      }
    }

    res.json(recipes);
  } catch (error) {
    console.error('Error generating recipes:', error);

    if (error.code === 'invalid_api_key') {
      return res.status(401).json({
        error: 'API key de OpenAI inválida. Revisa tu archivo .env',
      });
    }

    if (error.code === 'insufficient_quota') {
      return res.status(429).json({
        error: 'Se ha excedido la cuota de la API de OpenAI.',
      });
    }

    res.status(500).json({
      error: 'Error al generar las recetas. Inténtalo de nuevo.',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Recetas8 API running on http://localhost:${PORT}`);
});
