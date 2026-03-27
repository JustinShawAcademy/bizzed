import { Inter, JetBrains_Mono } from "next/font/google";

// Next.js creates a CSS variable that contains the font-family name. Next.js handles the downloading and hosting of the font files automatically.

// this is then injected into the html element in the layout.tsx file

// className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
