import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json()

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const ingredientsList = ingredients.join(', ')
    const prompt = `Com estes ingredientes: ${ingredientsList}

Sugere 3 receitas de culinária francesa clássica que usem o MÁXIMO destes ingredientes.

Requisitos:
- Estilo francês elegante
- Usa principalmente os ingredientes listados
- Pode adicionar básicos (sal, pimenta, azeite)
- Tempo: 15-50 minutos
- Dificuldade: Fácil a Média

Responde APENAS em JSON:
{
  "recipes": [
    {
      "name": "Nome da receita",
      "time": "25 min",
      "difficulty": "Fácil",
      "ingredients": ["ingrediente 1", "ingrediente 2"],
      "steps": ["passo 1", "passo 2", "passo 3"]
    }
  ]
}

Português de Portugal. Passos claros e concisos.`

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    let recipes = []
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        recipes = parsed.recipes || []
      }
    } catch (error) {
      console.error('Erro ao parsear JSON:', error)
      recipes = [
        {
          name: 'Omelete Française',
          time: '12 min',
          difficulty: 'Fácil',
          ingredients: ['3 ovos', 'Manteiga', 'Sal', 'Pimenta', 'Ervas frescas'],
          steps: [
            'Bate os ovos levemente numa tigela',
            'Aquece a manteiga numa frigideira em lume médio-alto',
            'Verte os ovos e mexe delicadamente com uma espátula',
            'Quando quase cozida, dobra a omelete em três',
            'Deixa repousar 30 segundos e serve imediatamente'
          ]
        },
        {
          name: 'Gratin Dauphinois',
          time: '45 min',
          difficulty: 'Média',
          ingredients: ['Batatas', 'Natas', 'Queijo gruyère', 'Alho', 'Noz-moscada'],
          steps: [
            'Corta as batatas em rodelas finas',
            'Esfrega alho num tabuleiro',
            'Alterna camadas de batata e natas',
            'Adiciona queijo ralado por cima',
            'Tempera com noz-moscada',
            'Cozinha a 180°C durante 40 minutos'
          ]
        }
      ]
    }

    return NextResponse.json({ recipes })
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar receitas' },
      { status: 500 }
    )
  }
}
