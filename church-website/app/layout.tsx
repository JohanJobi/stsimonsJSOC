import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import ScrollProgress from "@/components/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"
import { Analytics } from "@vercel/analytics/next"
import AuthProvider from "@/components/session-provider" // 👈 use new client wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "St. Simon's Jacobite Syrian Orthodox Church | Gloucester",
  description:
    "St. Simon's Jacobite Syrian Orthodox Church in Gloucester - A place of worship, fellowship, and spiritual growth.",
  generator: "v0.dev",
  icons: {
    icon: "/images/e2.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <div className="flex min-h-screen flex-col">
              <ScrollToTop />
              <ScrollProgress />
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
