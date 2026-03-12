import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-context";
import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description:
    "Portfolio showcasing skills, certifications, projects, and qualifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('site-theme');if(t==='dark'){document.documentElement.classList.add('dark');document.documentElement.dataset.theme='dark';return;}if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.dataset.theme='light';return;}var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList[d?'add':'remove']('dark');document.documentElement.dataset.theme=d?'dark':'light';}catch(e){}})();",
          }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
