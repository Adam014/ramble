import '@styles/globals.css';

import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

export const metadata = {
  title: 'Nomadify',
  description: 'Pocket Guide to the Prices of Life.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>

          <main className='app'>
            <Navbar />
            {children}
          </main>
  
        </Provider>
      </body>
    </html>
  )
}
