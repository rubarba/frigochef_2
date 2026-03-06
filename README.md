# 👨‍🍳 Frigo Chef

**L'art de cuisiner avec ce que vous avez**

Uma PWA elegante para descobrir receitas francesas através de scan da tua cozinha.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 📸 **Scan livre** - Tira até 5 fotos do frigorífico ou despensa
- 🤖 **Detecção inteligente** - IA detecta ingredientes automaticamente via Gemini Vision
- ✏️ **Edição fácil** - Confirma, remove ou adiciona ingredientes manualmente
- 🍳 **Receitas francesas** - Sugestões elegantes personalizadas aos teus ingredientes
- 📱 **PWA** - Instala como app nativa no telemóvel
- 🎨 **Design elegante** - Inspirado na cozinha francesa clássica

## 🎨 Design

- **Paleta**: Navy (#1A2B3C) + Bronze (#C5A572) + Cream (#F8F6F4)
- **Tipografia**: Playfair Display (serif) + Inter (sans)
- **Estilo**: Elegância francesa clássica

## 🚀 Quick Start

### 1. Clonar o repositório
```bash
git clone https://github.com/[USERNAME]/frigo-chef.git
cd frigo-chef
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar API key

Cria um ficheiro `.env.local` na raiz do projeto:

```env
GEMINI_API_KEY=your_api_key_here
```

**Como obter a API key gratuita:**
1. Vai a [Google AI Studio](https://aistudio.google.com/apikey)
2. Clica em "Create API Key"
3. Copia a key gerada
4. Cola no ficheiro `.env.local`

### 4. Correr em desenvolvimento
```bash
npm run dev
```

Abrir **http://localhost:3000**

## 📱 Testar no Telemóvel

### Descobrir o teu IP local:
```bash
# Mac/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

### No telemóvel:
Abre o browser em: `http://[TEU_IP]:3000`

Exemplo: `http://192.168.1.100:3000`

## 🛠️ Stack Técnica

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS
- **IA**: Gemini API (Google)
- **Fonts**: Playfair Display + Inter (Google Fonts)
- **PWA**: Manifest.json incluído

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/[USERNAME]/frigo-chef)

1. Clica no botão acima
2. Importa o repositório
3. Adiciona variável de ambiente:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: [tua API key]
4. Deploy!

### Netlify / Outras

Funciona em qualquer plataforma que suporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

Não te esqueças de adicionar a variável de ambiente `GEMINI_API_KEY`.

## 🎯 Como Funciona

1. **Home** → Clica "Começar scan"
2. **Scan** → Tira até 5 fotos da cozinha (frigorífico, despensa, bancada)
3. **Ingredientes** → IA detecta ingredientes, tu confirmas/editas
4. **Receitas** → Vê sugestões elegantes baseadas nos teus ingredientes
5. **Cozinha!** → Segue os passos da receita

## 📁 Estrutura do Projeto

```
frigo-chef/
├── app/
│   ├── api/
│   │   ├── detect-ingredients/  # API de detecção via Gemini
│   │   └── generate-recipes/    # API de geração de receitas
│   ├── ingredients/             # Página de confirmação
│   ├── recipes/                 # Lista de receitas
│   ├── scan/                    # Captura de fotos
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                 # Home
├── public/
│   └── manifest.json            # PWA manifest
├── .env.local                   # API keys (NÃO commitar!)
├── .env.example                 # Template
└── ...
```

## 🤝 Contribuir

Pull requests são bem-vindos!

1. Fork o projeto
2. Cria a tua branch (`git checkout -b feature/AmazingFeature`)
3. Commit as mudanças (`git commit -m 'Add AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abre um Pull Request

## 📝 Licença

MIT License - sente-te livre para usar este projeto!

## 🐛 Problemas Conhecidos

- A detecção de ingredientes funciona melhor com fotos bem iluminadas
- Alguns ingredientes específicos podem não ser reconhecidos (adiciona manualmente)
- A API Gemini gratuita tem limites de uso (15 requests/min)

## 🚧 Roadmap

- [ ] Modo chef (variações de receitas)
- [ ] Guardar receitas favoritas
- [ ] Partilhar receitas
- [ ] Modo offline
- [ ] Múltiplos idiomas

## 📧 Contacto

Criado com ❤️ para amantes de boa cozinha francesa.

---

**Nota**: Esta app usa a Gemini API (Google). A API key é gratuita mas tem limites de uso. Para uso em produção, considera fazer upgrade do plano.
