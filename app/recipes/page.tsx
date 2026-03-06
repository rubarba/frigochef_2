'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'

interface Recipe {
  name: string
  time: string
  difficulty: string
  ingredients: string[]
  steps: string[]
}

function RecipesContent() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('generatedRecipes')
    if (stored) {
      setRecipes(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-cream-dark px-6">
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-3">🍳</div>
          <p className="text-navy/60">A preparar receitas...</p>
        </div>
      </main>
    )
  }

  if (selectedRecipe) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-cream to-cream-dark px-6 py-12">
        <div className="w-full max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedRecipe(null)}
            className="text-navy/60 hover:text-navy transition-colors mb-8 flex items-center gap-2"
          >
            <span className="text-xl">←</span>
            <span>Voltar</span>
          </button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
            {/* Header */}
            <div>
              <h1 className="font-serif text-4xl text-navy mb-4">
                {selectedRecipe.name}
              </h1>
              <div className="flex gap-6 text-navy/60">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏱️</span>
                  <span>{selectedRecipe.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">👨‍🍳</span>
                  <span>{selectedRecipe.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Ingredientes */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                <span className="text-2xl">🥘</span>
                <span>Ingredientes</span>
              </h2>
              <div className="space-y-2">
                {selectedRecipe.ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2 px-4 bg-gradient-to-r from-cream to-white rounded-xl"
                  >
                    <div className="w-2 h-2 bg-bronze rounded-full"></div>
                    <span className="text-navy">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparação */}
            <div>
              <h2 className="text-xl font-semibold text-navy mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                <span>Preparação</span>
              </h2>
              <ol className="space-y-4">
                {selectedRecipe.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-navy to-navy-light text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                      {idx + 1}
                    </span>
                    <p className="text-navy/80 pt-2 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-cream to-cream-dark px-6 py-12">
      <div className="w-full max-w-md mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-bronze to-bronze-dark rounded-2xl mb-4 shadow-xl">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="font-serif text-3xl text-navy mb-2">
            Receitas sugeridas
          </h1>
          <p className="text-navy/60">
            Escolhe e começa a cozinhar
          </p>
        </div>

        {/* Lista */}
        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🥘</div>
            <p className="text-navy/60 mb-6">
              Ainda não há receitas geradas
            </p>
            <button
              onClick={() => router.push('/scan')}
              className="bg-gradient-to-r from-navy to-navy-light text-white py-4 px-8 rounded-xl font-medium hover:shadow-xl transition-all"
            >
              Fazer scan da cozinha
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {recipes.map((recipe, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRecipe(recipe)}
                className="w-full bg-white hover:shadow-2xl p-6 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl group"
              >
                <h3 className="font-serif text-2xl text-navy mb-3 group-hover:text-bronze transition-colors">
                  {recipe.name}
                </h3>
                <div className="flex gap-4 text-sm text-navy/60 mb-4">
                  <span>⏱️ {recipe.time}</span>
                  <span>👨‍🍳 {recipe.difficulty}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.slice(0, 4).map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gradient-to-r from-navy/10 to-bronze/10 text-navy text-xs rounded-full font-medium"
                    >
                      {ing.split(' ')[0]}
                    </span>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <span className="px-3 py-1.5 bg-gradient-to-r from-bronze/20 to-bronze-dark/20 text-navy text-xs rounded-full font-medium">
                      +{recipe.ingredients.length - 4}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => {
            router.push('/')
          }}
          className="w-full text-navy/60 py-4 text-sm hover:text-navy transition-colors"
        >
          ← Voltar ao início
        </button>
      </div>
    </main>
  )
}

export default function RecipesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream to-cream-dark px-6">
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-3">🍳</div>
          <p className="text-navy/60">A carregar...</p>
        </div>
      </main>
    }>
      <RecipesContent />
    </Suspense>
  )
}
