import '@styles/globals.css';

import Navbar from '@components/Navbar';
import Provider from '@components/Provider';
import Image from 'next/image';

export const metadata = {
  title: 'Nomadify',
  description: 'Pocket Guide to the Prices of Life.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>

          <div className='main'>
            
          </div>  

          <main className='app'>
            <Image 
              src="./assets/images/elipsa.svg"    
              alt='elipsse'
              width={1000}
              height={1000}
              className='object-fit fixed right-0'
            />
            <Image 
              src="./assets/images/world-animate.svg"    
              alt='animation'
              width={600}
              height={600}
              className='world-animation object-fit fixed right-0 m-40 mr-40 lg:mr-0 md:mr-0 sm:mr-0'
            />

            <Navbar />
            {children}
          </main>
  
        </Provider>
      </body>
    </html>
  )
}
