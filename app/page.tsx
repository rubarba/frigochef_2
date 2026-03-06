'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-cream to-cream-dark">
      
      {/* Header com logo */}
      <div className="pt-16 pb-8 px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-navy rounded-2xl mb-6 shadow-2xl">
            <span className="text-4xl">👨‍🍳</span>
          </div>
          <h1 className="font-serif text-5xl text-navy mb-3 tracking-tight">
            Frigo Chef
          </h1>
          <p className="text-navy/60 text-lg font-light">
            L'art de cuisiner avec ce que vous avez
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
          
          {/* Card principal */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-bronze to-bronze-dark rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <span className="text-2xl">📸</span>
              </div>
              <h2 className="text-2xl font-semibold text-navy mb-3">
                Scan da cozinha
              </h2>
              <p className="text-navy/60 leading-relaxed">
                Tira até 5 fotos do frigorífico, despensa ou ingredientes que tenhas
              </p>
            </div>

            <button
              onClick={() => router.push('/scan')}
              className="w-full bg-gradient-to-r from-navy to-navy-light text-white py-5 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <span className="relative z-10">Começar scan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-bronze to-bronze-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Decoração elegante */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-bronze"></div>
            <div className="flex gap-2">
              <div className="w-1.5 h-1.5 bg-bronze rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-navy rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-bronze rounded-full"></div>
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-bronze"></div>
          </div>
          
        </div>
      </div>
    </main>
  )
}
