'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function ScanPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      const newPhotos = [...photos, base64]
      setPhotos(newPhotos)
    }
    reader.readAsDataURL(file)
  }

  const handleFinishScan = async () => {
    if (photos.length === 0) return
    
    setIsProcessing(true)

    try {
      const response = await fetch('/api/detect-ingredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: photos }),
      })

      const data = await response.json()
      localStorage.setItem('detectedIngredients', JSON.stringify(data.ingredients))
      router.push('/ingredients')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao processar imagens. Verifica a conexão.')
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-cream to-cream-dark">
      <div className="flex-1 flex flex-col px-6 py-12">
        <div className="w-full max-w-md mx-auto flex-1 flex flex-col">
          
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/')}
              className="text-navy/60 hover:text-navy transition-colors mb-6 flex items-center gap-2"
            >
              <span className="text-xl">←</span>
              <span>Voltar</span>
            </button>
            
            <h1 className="font-serif text-3xl text-navy mb-2">
              Captura as tuas fotos
            </h1>
            <p className="text-navy/60">
              {photos.length}/5 fotos tiradas
            </p>
          </div>

          {/* Grid de fotos */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-3 mb-8">
              {photos.map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-white rounded-2xl shadow-lg flex items-center justify-center animate-scale-in"
                >
                  <span className="text-4xl">✓</span>
                </div>
              ))}
              {photos.length < 5 && (
                <div className="aspect-square bg-white/50 rounded-2xl border-2 border-dashed border-bronze flex items-center justify-center">
                  <span className="text-2xl text-bronze">📷</span>
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="space-y-3">
            {photos.length < 5 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-gradient-to-r from-navy to-navy-light text-white py-5 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {photos.length === 0 ? 'Tirar primeira foto' : 'Tirar outra foto'}
              </button>
            )}

            {photos.length > 0 && (
              <button
                onClick={handleFinishScan}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-bronze to-bronze-dark text-white py-5 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? 'A processar fotos...' : 'Ver ingredientes'}
              </button>
            )}
          </div>

          {/* Input escondido */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhotoCapture}
            className="hidden"
          />
        </div>
      </div>
    </main>
  )
}
