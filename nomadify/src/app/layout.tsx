import '@styles/globals.css';

import Navbar from '@components/Navbar';
// import Image from 'next/image';
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
            {/* <Image 
              src="/assets/images/elipsa.svg"    
              alt='elipsse'
              width={1000}
              height={1000}
              className='object-fit absolute right-0'
            /> */}

            <Navbar />
            {children}
          </main>
  
      </body>
    </html>
  )
}
