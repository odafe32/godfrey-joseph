import React, { useState, useEffect } from 'react'

const Preloader = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

    const phrases = [
    'Building Reliable Systems',
    'Turning Ideas Into Products',
    'Designing for Scale',
    'Engineering with Clarity',
  ]

  const [phraseIndex, setPhraseIndex] = useState(0)


    useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(i => (i + 1) % phrases.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setFadeOut(true)
          setTimeout(() => setIsLoading(false), 800)
          return 100
        }
        return prev + 1
      })
    },34)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return <>{children}</>

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#3d5a8c] via-[#2d4466] to-[#1e2f4d] transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Circular progress indicator */}
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="white"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))',
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-white text-3xl font-bold tracking-tight">
              {progress}
              <span className="text-lg">%</span>
            </div>
          </div>

          {/* Rotating ring */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
            <div className="w-full h-full rounded-full border-2 border-transparent border-t-white/30" />
          </div>
        </div>

        {/* Brand name */}
        <div className="mt-8 text-center">
                  <h2
              key={phraseIndex}
              className="text-white text-xl font-semibold tracking-wide mb-2
                        transition-all duration-500 ease-out"
            >
              {phrases[phraseIndex]}
            </h2>

            <p className="text-white/70 text-sm tracking-wide">
              Godfrey Joseph Sule
            </p>

          <p className="text-white/70 text-sm font-light tracking-wider uppercase">
            Loading Experience...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-1.5 mt-6">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }} />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }} />
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }} />
        </div>
      </div>
    </div>
  )
}

export default Preloader
