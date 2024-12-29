import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, LineChart, Search, Star, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
              className="w-full h-full bg-[url('/crypto-bg.jpg')] bg-cover bg-center"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-50 z-10" />
          <div className="container mx-auto px-4 z-20 flex-grow flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00D7FE] to-purple-600">
                CryptoTracker
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Your ultimate destination for real-time cryptocurrency insights and tracking.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild size="lg" className="bg-[#00D7FE] text-black hover:bg-[#00c2e6]">
                  <Link href="/dashboard">Explore Markets</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#00D7FE] text-[#00D7FE] hover:bg-[#00D7FE] hover:text-black">
                  <Link href="/watchlist">My Watchlist</Link>
                </Button>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white opacity-80" />
          </motion.div>
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <CryptoTicker />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12"
            >
              Why Choose CryptoTracker?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<LineChart className="w-8 h-8 text-[#00D7FE]" />}
                title="Real-time Charts"
                description="Advanced TradingView integration for professional-grade analysis"
              />
              <FeatureCard
                icon={<Star className="w-8 h-8 text-[#00D7FE]" />}
                title="Custom Watchlists"
                description="Track your favorite cryptocurrencies in one place"
              />
              <FeatureCard
                icon={<Search className="w-8 h-8 text-[#00D7FE]" />}
                title="Smart Search"
                description="Find any cryptocurrency instantly with our powerful search"
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-[#00D7FE]" />}
                title="Market Analysis"
                description="Comprehensive market data and price tracking"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Start Your Crypto Journey?
            </motion.h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of traders who trust CryptoTracker for their daily market insights.
            </p>
            <Button asChild size="lg" className="bg-[#00D7FE] text-black hover:bg-[#00c2e6]">
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }){
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-700 p-6 rounded-lg shadow-lg"
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 p-3 bg-gray-600 rounded-full">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

