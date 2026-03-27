'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const photos = [
  { src: '/image1.jpg',  caption: '' },
  { src: '/image2.jpg',  caption: '' },
  { src: '/image3.jpg',  caption: '' },
  { src: '/image4.jpg',  caption: '' },
  { src: '/image5.jpg',  caption: '' },
  { src: '/image6.jpg',  caption: '' },
  { src: '/image7.jpg',  caption: '' },
  { src: '/image8.jpg',  caption: '' },
  { src: '/image9.jpg',  caption: '' },
  { src: '/image10.jpg', caption: '' },
  { src: '/image11.jpg', caption: '' },
  { src: '/image12.jpg', caption: '' },
  { src: '/image13.jpg', caption: '' },
  { src: '/image14.jpg', caption: '' },
]

export default function Gallery() {
  useEffect(() => {
    // Load AOS if not already present
    if (!document.querySelector('link[href*="aos"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css'
      document.head.appendChild(link)
    }

    if (!window.AOS) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js'
      script.onload = () => {
        window.AOS.init({
          duration: 600,
          easing: 'ease-out-quart',
          once: true,
          offset: 40,
        })
      }
      document.body.appendChild(script)
    } else {
      window.AOS.init({
        duration: 600,
        easing: 'ease-out-quart',
        once: true,
        offset: 40,
      })
    }
  }, [])

  return (
    <>
      <main className="min-h-screen bg-stone-950 text-stone-100">

        {/* Nav */}
        <nav
          data-aos="fade-down"
          data-aos-duration="500"
          className="flex justify-between items-center px-10 py-6 border-b border-stone-800"
        >
          <Link href="/" className="text-sm tracking-widest uppercase text-stone-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <span className="text-sm tracking-widest uppercase text-stone-400">Gallery</span>
        </nav>

        {/* Header */}
        <div className="px-10 py-14 border-b border-stone-800">
          <p
            data-aos="fade-up"
            data-aos-delay="50"
            className="text-xs tracking-widest uppercase text-orange-400 mb-3"
          >
            Gio Lyons · Little Bucks
          </p>
          <h1
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-5xl md:text-7xl font-bold tracking-tight leading-none"
          >
            The Archive
          </h1>
        </div>

        {/* Grid — each photo staggered, capped at 400ms so it doesn't drag */}
        <section className="px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={Math.min(i * 60, 400)}
                className="group relative aspect-square bg-stone-800 rounded-sm overflow-hidden"
              >
                <img
                  src={photo.src}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          data-aos="fade-up"
          className="px-10 py-8 border-t border-stone-800"
        >
          <span className="text-stone-600 text-xs">© {new Date().getFullYear()} Giovanni "Little Bucks" Lyons</span>
        </footer>

      </main>
    </>
  )
}