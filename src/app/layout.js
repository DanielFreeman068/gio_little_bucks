import './globals.css'

export const metadata = {
  title: 'Gio "Little Bucks" Lyons',
  description: 'Professional Portfolio — Toilet Cleaner. Box Cutter. Vibe Manager.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}