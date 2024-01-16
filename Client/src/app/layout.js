import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata = {
  title: {
    template: "%s | PawFinder",
    default: "PawFinder",
  },
  description: "PawFinder is a web app that helps you find your new best friend. Join our community and find your new best friend today!",
  name: "PawFinder",
  url: "https://pawfinders.vercel.app/",
  metadataBase: new URL("https://pawfinders.vercel.app/"),
  image: "icon/icon.png",
  keywords: [
    "PawFinder",
    "Pet social network",
    "Pet social media",
    "Pet adoption",
  ],
  categories: [
    "Social",
    "Pets",
    "Adoption",
  ],
  openGraph: {
    title: "PawFinder",
    description: "PawFinder is a web app that helps you find your new best friend. Join our community and find your new best friend today!",
    url: "https://pawfinders.vercel.app/",
    siteName: "PawFinder",
    images: [
      {
        url: "https://pawfinders.vercel.app/icon/icon.png",
        width: 400,
        height: 400,
        alt: "PawFinder App"
      }
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PawFinder App",
    description: "PawFinder is a web app that helps you find your new best friend. Join our community and find your new best friend today!",
    images: [
      {
        url: "https://pawfinders.vercel.app/icon/icon.png",
        width: 800,
        height: 418,
        alt: "PawFinder App"
      }
    ],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
