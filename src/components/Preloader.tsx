import React, { useState, useEffect } from 'react'

const Preloader = ({ children }: { children?: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(timer)
  }, [])

  if (!isLoading) return <>{children}</>

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#7d4934]">
      <div className="relative">
        {/* Animated circles */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        
        {/* Progress bar */}
        <div className="absolute  -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-sm font-light tracking-wider">
          {progress}%
        </div>
        
        {/* Loading text */}
       <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center text-white/80 text-xs font-light tracking-wide uppercase">
  Please wait...
</div>

      </div>
    </div>
  )
}

export default Preloader
