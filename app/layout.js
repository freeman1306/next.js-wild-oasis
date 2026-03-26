import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import '@/app/_styles/globals.css'

import { Josefin_Sans } from 'next/font/google'
import Header from "./_components/Header";


const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'swap',
})
console.log(josefin);


export const metadata = {
  // title: 'The Wild Oasis',
  title: {
    template: '%s | The Wild Oasis',
    default: 'The Wild Oasis',
  },
  description: 'Discover the untamed beauty of nature with The Wild Oasis. Explore our curated collection of nature-inspired products, from eco-friendly home decor to outdoor gear. Embrace the wild and bring a touch of the outdoors into your life.',

}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className} flex flex-col`}>
        <Header />
        <div className="flex-1 px-8 py-12 grid">

        <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
        
      </body>
    </html>
  )
}