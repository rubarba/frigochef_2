'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const COMMON_INGREDIENTS = [
  'Ovos', 'Frango', 'Atum', 'Massa', 'Arroz',
  'Batata', 'Tomate', 'Cebola', 'Alho', 'Queijo',
  'Azeite', 'Sal', 'Pimenta', 'Limão', 'Manteiga'
]

export default function IngredientsPage() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const detected = localStorage.getItem('detectedIngredients')
    if (detected) {
      setIngredients(JSON.parse(detected))
    }
  }, [])

  const addIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      setIngredients([...ingredients, ingredient])
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient))
  }

  const addCustomIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient('')
    }
  }

  const generateRecipes = async () => {
    if (ingredients.length === 0) return
    
    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      })

      const data = await response.json()
      localStorage.setItem('generatedRecipes', JSON.stringify(data.recipes))
      localStorage.setItem('userIngredients', JSON.stringify(ingredients))
      router.push('/recipes')
    } catch (error) {
      console.error('Erro:', error)
      setIsGenerating(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream to-cream-dark px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl text-navy mb-2">
            Ingredientes detectados
          </h1>
          <p className="text-navy/60">
            Confirma ou edita a lista
          </p>
        </div>

        {/* Lista de ingredientes */}
        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-2">
          {ingredients.map((ingredient, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-cream to-white rounded-xl group hover:shadow-md transition-all"
            >
              <span className="text-navy font-medium">{ingredient}</span>
              <button
                onClick={() => removeIngredient(ingredient)}
                className="text-bronze opacity-0 group-hover:opacity-100 hover:text-bronze-dark text-2xl transition-all"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Tirar mais fotos */}
        <button
          onClick={() => router.push('/scan')}
          className="w-full bg-white text-navy py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span className="text-xl">📸</span>
          <span>Tirar mais fotos</span>
        </button>

        {/* Adicionar manual */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          <p className="text-sm text-navy/60">Adicionar manualmente</p>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomIngredient()}
              placeholder="Nome do ingrediente"
              className="flex-1 px-4 py-3 bg-cream rounded-xl outline-none focus:ring-2 focus:ring-bronze transition-all text-navy"
            />
            <button
              onClick={addCustomIngredient}
              className="bg-gradient-to-r from-bronze to-bronze-dark text-white px-6 rounded-xl hover:shadow-lg transition-all font-bold text-xl"
            >
              +
            </button>
          </div>

          {/* Sugestões */}
          <div className="flex flex-wrap gap-2 pt-2">
            {COMMON_INGREDIENTS.filter(i => !ingredients.includes(i)).slice(0, 6).map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => addIngredient(ingredient)}
                className="px-3 py-1.5 bg-cream text-navy text-sm rounded-full hover:bg-gradient-to-r hover:from-bronze/20 hover:to-bronze-dark/20 transition-all"
              >
                + {ingredient}
              </button>
            ))}
          </div>
        </div>

        {/* Gerar receitas */}
        <button
          onClick={generateRecipes}
          disabled={ingredients.length === 0 || isGenerating}
          className="w-full bg-gradient-to-r from-navy to-navy-light text-white py-5 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {isGenerating ? 'A criar receitas...' : 'Descobrir receitas'}
        </button>
      </div>
    </main>
  )
}
