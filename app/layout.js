import Logo from "./components/Logo";
import Navigation from "./components/Navigation";

export const metadata = {
  title: 'The Wild Oasis',
  description: 'A website for a cabin rental business in the mountains.',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
        <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copy © 2023 The Wild Oasis. All rights reserved.</footer>
      </body>
    </html>
  )
}