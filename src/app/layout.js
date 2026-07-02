import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Plus_Jakarta_Sans, Outfit, Fira_Code } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata = {
  metadataBase: new URL('https://portfolio.apps.armanruhit.dev'),
  title: "ArmanRuhit — Personal Portfolio",
  description: "Personal portfolio of Arman Ruhit — full-stack developer. Projects, resume, blog, and contact.",
  applicationName: "ArmanRuhit Portfolio",
  authors: [{ name: "Arman Ruhit", url: "https://github.com/ArmanRuhit" }],
  creator: "Arman Ruhit",
  keywords: ["Arman Ruhit", "portfolio", "full-stack developer", "software engineer", "Next.js"],
  icons: {
    icon: '/jenitsu.jpeg',
    apple: '/jenitsu.jpeg',
  },
  openGraph: {
    type: "website",
    url: "https://portfolio.apps.armanruhit.dev",
    siteName: "ArmanRuhit Portfolio",
    title: "ArmanRuhit — Personal Portfolio",
    description: "Personal portfolio of Arman Ruhit — full-stack developer. Projects, resume, blog, and contact.",
    images: ['/jenitsu.jpeg'],
  },
  twitter: {
    card: "summary",
    title: "ArmanRuhit — Personal Portfolio",
    description: "Personal portfolio of Arman Ruhit — full-stack developer. Projects, resume, blog, and contact.",
    images: ['/jenitsu.jpeg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('portfolio-theme');
                  if (savedTheme) {
                    document.documentElement.setAttribute('data-theme', savedTheme);
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const theme = prefersDark ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${outfit.variable} ${firaCode.variable} font-sans antialiased bg-background text-foreground transition-colors duration-500 min-h-screen relative overflow-x-hidden selection:bg-foreground selection:text-background paper-pattern`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
