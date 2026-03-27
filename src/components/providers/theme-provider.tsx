// documentation: https://github.com/pacocoursey/next-themes

"use client";
// This must be a Client Component because it needs access to browser features (like checking your system theme or saving to local storage).

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}
// It's used in the Root Layout (src/app/layout.tsx). In layout, it wraps the children with the ThemeProvider so that every page and component  knows weather it should be rendered in light or dark mode.

// It saves the user's choice (Light, Dark, or System) in localStorage so the site stays dark even if they refresh the page.

// It handles the logic so that when a user with Dark Mode enabled loads your site, they don't see a bright white flash for half a second before it turns dark.


export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // "class" is the recommended way to handle themes in Next.js 16+ and tailwind v4. It's a more modern way to handle themes and it's more efficient. It means your CSS will use .dark { ... } to apply dark styles.
      defaultTheme="system" // automatically match the user's Mac/Windows/Phone theme settings by default.
      enableSystem
      disableTransitionOnChange // This is a performance/UX trick. It prevents CSS transitions (like colors fading) from triggering while the theme is switching, which prevents weird visual glitches during the initial page load.
    >
      {children}
    </NextThemesProvider>
  );
}

// workflow: Use the dark: prefix on any Tailwind class.

// The background is white normally, but slate-900 in dark mode
// <div className="bg-white dark:bg-slate-900 text-black dark:text-white">
//   Hello World
// </div>
