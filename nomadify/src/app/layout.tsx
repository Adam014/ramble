import '@styles/globals.css';

import Navbar from '@components/Navbar';
import dynamic from "next/dynamic";

export const metadata = {
  title: 'Nomadify',
  description: 'Pocket Guide to the Prices of Life.',
}

export default function RootLayout({ children }) {

  // declaring the AnimatedCursor from react-animated-cursor library
  const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
      ssr: false,
  });

  return (
    <html lang="en">
      <body>
          <AnimatedCursor color="241,62,81"/>
          <div className='main'>
            
          </div>  

          <main className='app'>

            <Navbar />
            {children}
          </main>
  
      </body>
    </html>
  )
}
