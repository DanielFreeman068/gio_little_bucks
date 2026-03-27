'use client'
import { useRef, useState, useEffect } from 'react'
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

function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.play().then(() => setPlaying(true)).catch(() => {})

    const onTimeUpdate = () => setProgress(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoaded)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play(); setPlaying(true) }
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * duration
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur border-t border-stone-700 px-6 py-3 flex items-center gap-4">
      <audio ref={audioRef} src="/trumpet.mp4" />

      <button
        onClick={togglePlay}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-400 transition-colors shrink-0"
      >
        {playing ? (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>

      <div className="shrink-0">
        <p className="text-xs text-stone-100 font-medium leading-none mb-1">Gio Lyons — Live Trumpet</p>
        <p className="text-xs text-stone-500 leading-none">{fmt(progress)} / {fmt(duration)}</p>
      </div>

      <div
        className="flex-1 h-1 bg-stone-700 rounded-full cursor-pointer"
        onClick={seek}
      >
        <div
          className="h-full bg-orange-500 rounded-full"
          style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
        />
      </div>

      <span className="text-xs text-stone-500 tracking-widest uppercase shrink-0 hidden sm:block">Live · Trumpet</span>
    </div>
  )
}

export default function Gallery() {
  return (
    <>
      <main className="min-h-screen bg-stone-950 text-stone-100 pb-16">

        {/* Nav */}
        <nav className="flex justify-between items-center px-10 py-6 border-b border-stone-800">
          <Link href="/" className="text-sm tracking-widest uppercase text-stone-400 hover:text-white transition-colors">
            ← Back
          </Link>
          <span className="text-sm tracking-widest uppercase text-stone-400">Gallery</span>
        </nav>

        {/* Header */}
        <div className="px-10 py-14 border-b border-stone-800">
          <p className="text-xs tracking-widest uppercase text-orange-400 mb-3">Gio Lyons · Little Bucks</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">The Archive</h1>
        </div>

        {/* Grid */}
        <section className="px-10 py-14">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <div key={i} className="group relative aspect-square bg-stone-800 rounded-sm overflow-hidden">
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
        <footer className="px-10 py-8 border-t border-stone-800">
          <span className="text-stone-600 text-xs">© {new Date().getFullYear()} Giovanni "Little Bucks" Lyons</span>
        </footer>

      </main>

      <AudioPlayer />
    </>
  )
}
