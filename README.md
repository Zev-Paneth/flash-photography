# Flash Photography Website

A multilingual photography portfolio and service website built with React, TypeScript, and Vite.

## Features

- **Multilingual Support**: English, Hebrew, and Flemish (Dutch) languages with full RTL support
- **Responsive Design**: Fully responsive UI for all screen sizes
- **Modern Stack**: React 19, TypeScript, Vite, and Tailwind CSS
- **Image Gallery**: Filterable gallery with category navigation
- **Service Showcase**: Detailed service descriptions and booking options
- **Contact Form**: Customer inquiry form

## Project Structure

```
src/
├── assets/            # Static assets like SVG files
├── components/        # Reusable UI components
│   ├── Footer.tsx
│   ├── ImageGalleryPreview.tsx
│   ├── LanguageSwitcher.tsx
│   └── Navbar.tsx
├── pages/             # Page components
│   ├── Contact.tsx
│   ├── Gallery.tsx
│   ├── Home.tsx
│   └── Services.tsx
├── translations/      # Internationalization files
│   └── messages.ts    # Translations for all supported languages
├── App.css            # App-specific styles
├── App.tsx            # Main application component with routing
├── index.css          # Global styles and Tailwind directives
├── main.tsx           # Application entry point
└── vite-env.d.ts      # TypeScript declarations for Vite
```

## Required Images

The following images should be placed in the public directory:

```
public/
├── logo.svg           # Main logo (light version)
├── logo-white.svg     # White logo for dark backgrounds
└── images/
    ├── hero-bg.jpg    # Hero section background
    ├── photographer.jpg # Photographer image for About section
    ├── featured/      # Featured works preview
    │   ├── newborn1.jpg
    │   ├── family1.jpg
    │   └── children1.jpg
    ├── gallery/       # Gallery images
    │   ├── newborn1.jpg, newborn2.jpg, newborn3.jpg
    │   ├── children1.jpg, children2.jpg, children3.jpg
    │   └── family1.jpg, family2.jpg, family3.jpg
    └── services/      # Service section images
        ├── newborn.jpg
        ├── children.jpg
        └── family.jpg
```

## Setup & Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Customization

- **Colors**: Edit the `tailwind.config.js` file to customize the color scheme
- **Fonts**: The project uses Cormorant Garamond and Montserrat fonts. You can change these in both the `tailwind.config.js` and `index.css` files
- **Content**: Edit the text content in the `translations/messages.ts` file for each language

## Credits

This project uses:
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Intl](https://formatjs.io/docs/react-intl/)