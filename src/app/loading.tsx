export default function Loading() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      data-loading="custom"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large pulsing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-indigo-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        
        {/* Floating cosmic particles */}
        <div className="absolute top-1/6 left-1/6 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-1/4 right-1/6 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-3/4 left-1/5 w-1 h-1 bg-indigo-300 rounded-full animate-ping delay-1500"></div>
        
        {/* Floating symbols */}
        <div className="absolute top-20 left-20 text-4xl opacity-20 animate-float-slow">✨</div>
        <div className="absolute top-32 right-20 text-3xl opacity-15 animate-float">🌙</div>
        <div className="absolute bottom-20 left-32 text-5xl opacity-10 animate-float-delayed">🌌</div>
        <div className="absolute bottom-32 right-32 text-4xl opacity-25 animate-float-fast">⭐</div>
      </div>

      {/* Loading Content */}
      <div className="text-center z-10 relative">
        {/* App Logo/Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <span className="text-5xl">🌟</span>
            <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              AstroCircle
            </span>
          </h1>
        </div>

        {/* Cosmic Loading Spinner */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="h-16 w-16 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
            
            {/* Inner ring */}
            <div className="absolute inset-2 rounded-full border-2 border-blue-400/40"></div>
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            
            {/* Center cosmic symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-2xl animate-pulse">🔮</div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white mb-2">
            <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Awakening Your Cosmic Portal
            </span>
          </h2>
          <p className="text-gray-300 animate-pulse">
            Aligning with the universe...
          </p>
        </div>
        
        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
} 