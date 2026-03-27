'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

function AudioPlayer() {
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const initPlayer = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: 'y6Ooy6dsCI8',
        playerVars: { controls: 0, disablekb: 1, fs: 0 },
        events: {
          onReady: (e) => {
            setDuration(e.target.getDuration())
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setPlaying(true)
              intervalRef.current = setInterval(() => {
                setProgress(playerRef.current.getCurrentTime())
              }, 500)
            }
            if (e.data === window.YT.PlayerState.PAUSED || e.data === window.YT.PlayerState.ENDED) {
              setPlaying(false)
              clearInterval(intervalRef.current)
            }
            if (e.data === window.YT.PlayerState.ENDED) {
              setProgress(0)
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.body.appendChild(tag)
      }
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      clearInterval(intervalRef.current)
      if (playerRef.current?.destroy) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [])

  const togglePlay = () => {
    const p = playerRef.current
    if (!p) return
    if (playing) p.pauseVideo()
    else p.playVideo()
  }

  const seek = (e) => {
    const p = playerRef.current
    if (!p || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    p.seekTo(((e.clientX - rect.left) / rect.width) * duration, true)
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur border-t border-stone-700 px-6 py-3 flex items-center gap-4">
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: 1, height: 1 }}>
        <div ref={containerRef} />
      </div>

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

      <div className="flex-1 h-1 bg-stone-700 rounded-full cursor-pointer" onClick={seek}>
        <div
          className="h-full bg-orange-500 rounded-full transition-all"
          style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
        />
      </div>

      <span className="text-xs text-stone-500 tracking-widest uppercase shrink-0 hidden sm:block">Live · Trumpet</span>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    // Dynamically load AOS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js'
    script.onload = () => {
      window.AOS.init({
        duration: 700,
        easing: 'ease-out-quart',
        once: true,
        offset: 60,
      })
    }
    document.body.appendChild(script)
  }, [])

  const roles = [
    { title: 'Toilet Cleaner', desc: 'Senior Specialist. Transforms the unthinkable into the immaculate with quite a bit of complaint.' },
    { title: 'Box Cutter', desc: 'Lead Operative. Clean lines, zero hesitation, more experience with boxes than bank accounts.' },
    { title: 'Vibe Manager', desc: 'Director of Atmosphere. Self-taught. Largely unrecognized. The results speak for themselves.' },
  ]

  return (
    <>
      <main className="min-h-screen bg-stone-950 text-stone-100 pb-16">

        {/* Nav — slides down */}
        <nav
          data-aos="fade-down"
          data-aos-duration="600"
          className="flex justify-between items-center px-10 py-6 border-b border-stone-800"
        >
          <span className="text-sm tracking-widest uppercase text-stone-400">Little Bucks</span>
          <Link href="/gallery" className="text-sm tracking-widest uppercase text-stone-400 hover:text-white transition-colors">
            Gallery →
          </Link>
        </nav>

        {/* Hero — text fades left, image fades right */}
        <section className="px-10 py-20 flex flex-col md:flex-row md:items-center gap-12 border-b border-stone-800">
          <div className="flex-1" data-aos="fade-right" data-aos-delay="100">
            <p className="text-xs tracking-widest uppercase text-orange-400 mb-4">Est. 2010 · Age 15</p>
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight leading-none mb-2">Gio Lyons</h1>
            <h2 className="text-2xl text-stone-400 italic mb-8">"Little Bucks"</h2>
            <p className="text-stone-400 text-base leading-relaxed max-w-md">
              A 15-year-old professional operating at the intersection of sanitation, logistics,
              and intangible atmosphere. Exceptionally dedicated. Exceptionally broke.
            </p>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="w-full md:w-72 aspect-square bg-stone-800 rounded-sm overflow-hidden shrink-0"
          >
            <img src="/image50.jpg" alt="Gio Lyons" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* Roles — staggered fade up */}
        <section className="px-10 py-16 border-b border-stone-800">
          <p
            data-aos="fade-up"
            className="text-xs tracking-widest uppercase text-stone-500 mb-10"
          >
            Positions Held
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-stone-800">
            {roles.map((role, i) => (
              <div
                key={role.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-stone-950 p-8"
              >
                <h3 className="text-lg font-semibold mb-3">{role.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Athletics — fade up staggered */}
        <section className="px-10 py-16 border-b border-stone-800">
          <p
            data-aos="fade-up"
            className="text-xs tracking-widest uppercase text-stone-500 mb-10"
          >
            Athletics
          </p>
          <div className="flex flex-col sm:flex-row gap-12">
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-lg font-semibold mb-2">Mountain Biking</h3>
              <p className="text-stone-400 text-sm max-w-xs">Conquers trails with reckless enthusiasm and a bike held together by hope.</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-lg font-semibold mb-2">Distance Running</h3>
              <p className="text-stone-400 text-sm max-w-xs">Runs primarily because transportation costs money. Poverty as cardio.</p>
            </div>
          </div>
        </section>

        {/* Featured performance — fade up */}
        <section className="px-10 py-16" data-aos="fade-up">
          <p className="text-xs tracking-widest uppercase text-stone-500 mb-4">Featured Performance</p>
          <p className="text-stone-300 text-lg italic max-w-xl">
            Gio performing live on trumpet — proof that the vibe extends well beyond the workplace.
            Available to play via the bar below.
          </p>
        </section>

        {/* Footer — fade in */}
        <footer
          data-aos="fade-up"
          data-aos-delay="100"
          className="px-10 py-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
        >
          <span className="text-stone-600 text-xs">© {new Date().getFullYear()} Giovanni "Little Bucks" Lyons</span>
          <span className="text-stone-600 text-xs italic">Rates negotiable. Please.</span>
        </footer>

      </main>

      <AudioPlayer />
    </>
  )
}