import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { images } = await request.json()

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma imagem fornecida' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const imageParts = images.map((base64Image: string) => ({
      inlineData: {
        data: base64Image.split(',')[1],
        mimeType: 'image/jpeg',
      },
    }))

    const prompt = `Analisa estas imagens e identifica apenas os alimentos visiveis.

Regras:
- NUNCA inventes ingredientes
- Lista apenas o que ves claramente
- Se nao tens certeza, nao incluas
- Ignora utensilios e decoracao

Responde em JSON:
{
  "ingredients": ["ingrediente1", "ingrediente2"]
}

Portugues de Portugal.`

    const result = await model.generateContent([prompt, ...imageParts])
    const response = result.response.text()

    let ingredients: string[] = []
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        ingredients = parsed.ingredients || []
      }
    } catch {
      ingredients = []
    }

    ingredients = Array.from(new Set(ingredients.map(i => i.toLowerCase())))
      .map(i => i.charAt(0).toUpperCase() + i.slice(1))

    return NextResponse.json({ ingredients })
  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro ao processar imagens' },
      { status: 500 }
    )
  }
}
