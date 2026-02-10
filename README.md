# 🌻 Will You Be My Valentine? - A Digital Love Story

A romantic, interactive Valentine's Day experience crafted with React, TypeScript, and Vite. This isn't just a website—it's a journey through moments, memories, and heartfelt confessions.

## 💕 The Experience

This Valentine's Day application takes your loved one through a beautiful, multi-section journey:

### 🎨 **What Makes It Special**
- **Interactive Sunflower**: Click each petal to reveal heartfelt compliments
- **Timeline of Memories**: Discover special moments together
- **Paint to Reveal**: Brush away layers to uncover hidden messages
- **Personal Letter**: A heartfelt message waiting to be saved
- **Confetti Celebration**: Joyful explosions when love is accepted

### 🌟 **Key Features**
- **Smooth Animations**: Gentle transitions and micro-interactions
- **Responsive Design**: Perfect on mobile and desktop
- **Accessibility**: Thoughtful UX for everyone
- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Vite

## 🎨 **Design Philosophy**

Built with an impressionist's touch—soft textures, warm colors, and organic interactions. Every element feels handcrafted and personal, like a love letter written with care.

### 🎨 **Color Palette**
- **Sunflower Gold** (#F2C94C) - Warmth and happiness
- **Saffron** (#E6A23C) - Passion and energy  
- **Soft Brown** (#5a3d35) - Earth and comfort
- **Cream Canvas** (#FBF7F2) - Purity and new beginnings

## 🚀 **Getting Started**

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/rahulhiremath123/Will-you-be-my-valentine-Gayathri-.git

# Navigate to project
cd Will-you-be-my-valentine-Gayathri-

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Start local development
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview
```

## 🌻 **Project Structure**

```
src/
├── sections/           # Main experience sections
│   ├── HeroSection.tsx
│   ├── TimelineSection.tsx  
│   ├── SunflowerGrowSection.tsx
│   ├── PaintRevealSection.tsx
│   ├── LetterSection.tsx
│   └── FinaleModal.tsx
├── components/ui/       # Reusable UI components
├── lib/              # Utilities and helpers
└── styles/            # Global styles and themes
```

## 💝 **Built With**

- **React 18** - Modern hooks and patterns
- **TypeScript** - Type safety and better DX
- **Vite** - Lightning-fast development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Canvas Confetti** - Celebration effects

## 🎯 **Deployment**

Ready for deployment to Vercel, Netlify, or any static hosting platform:

```bash
# Build and deploy to Vercel
npm run build
# Then deploy the dist/ folder
```

## 💌 **The Story Behind**

This project was created to make asking "Will you be my Valentine?" more than just a question—it's an experience. Each section represents a different aspect of love:

1. **Beginning** - The gentle invitation
2. **Memories** - The journey you've shared  
3. **Growth** - How you've bloomed together
4. **Discovery** - Layers of affection revealed
5. **Words** - The heartfelt letter
6. **Celebration** - The joyous yes!

## 📝 **License**

MIT License - Feel free to use this as inspiration for your own declarations of love.

---

*Made with ❤️ for someone special*

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
