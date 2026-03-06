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

    const prompt = `Analisa estas imagens e identifica APENAS os alimentos e ingredientes que CONSEGUES VER CLARAMENTE.

REGRAS CRÍTICAS:
- NUNCA inventes ingredientes
- NUNCA assumes o que pode estar dentro de embalagens fechadas
- Lista APENAS o que vês DIRECTAMENTE na imagem
- Se vês uma embalagem de leite fechada, escreve "Leite" (não o conteúdo)
- Se vês legumes/fruta, identifica apenas os que vês claramente
- Se não tens CERTEZA ABSOLUTA, NÃO INCLUIAS
- Prefere detectar MENOS do que inventar

IGNORA:
- Utensílios, pratos, recipientes vazios
- Decoração, mobília
- Coisas que POSSAM estar lá mas não vês

Responde APENAS com JSON válido:
{
  "ingredients": ["ingrediente1", "ingrediente2"]
}

Língua: Português de Portugal
Atitude: CONSERVADOR - só lista o que vês COM CERTEZA.`

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
      ingredients = response
        .split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map(line => line.replace(/^[-•]\s*/, '').trim())
        .filter(Boolean)
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
