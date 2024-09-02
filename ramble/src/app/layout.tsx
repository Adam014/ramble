import '@styles/globals.css'

import Navbar from '@components/titlepage_sections/Navbar'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@components/titlepage_sections/Footer'

export const metadata = {
  title: 'Ramble',
  description: 'Pocket Guide to the Prices of Life.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main"></div>

        <main className="app">
          <Navbar />
          {children}
          <Footer />
        </main>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
