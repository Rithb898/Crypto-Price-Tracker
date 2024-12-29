// import TradingViewWidget from "../components/TradingViewWidget";
import { Button } from "../components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, LineChart, Search, Star } from "lucide-react";
import Home from "../components/Home";

function HomePage() {
  return (
    <Home />
    // <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    //   <div className="flex-grow">
    //     <div className="container mx-auto px-4 py-16">
    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5 }}
    //         className="mx-auto max-w-3xl space-y-8 text-center"
    //       >
    //         <h1 className="mb-4 bg-gradient-to-r from-[#00D7FE] to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
    //           Welcome to CryptoTracker
    //         </h1>
    //         <p className="mb-8 text-xl text-gray-300">
    //           Your ultimate destination for real-time cryptocurrency insights.
    //           Track prices, analyze trends, and make informed decisions with our
    //           cutting-edge platform.
    //         </p>
    //         <div className="space-y-4 md:space-x-4 md:space-y-0">
    //           <Button
    //             asChild
    //             size="lg"
    //             className="transform bg-[#00D7FE] text-black transition-transform duration-200 hover:scale-105 hover:bg-[#00c2e6]"
    //           >
    //             <Link href="/dashboard" className="flex items-center">
    //               Explore Dashboard
    //               <ArrowRight className="ml-2 h-5 w-5" />
    //             </Link>
    //           </Button>
    //           <Button
    //             asChild
    //             size="lg"
    //             variant="outline"
    //             className="transform border-[#00D7FE] text-[#00D7FE] transition-transform duration-200 hover:scale-105 hover:bg-[#00D7FE] hover:text-black"
    //           >
    //             <Link href="/watchlist">My Watchlist</Link>
    //           </Button>
    //         </div>
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0, y: 50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5, delay: 0.2 }}
    //         className="mt-20 grid gap-8 md:grid-cols-3"
    //       >
    //         <FeatureCard
    //           icon={<LineChart className="h-10 w-10 text-[#00D7FE]" />}
    //           title="Real-time Tracking"
    //           description="Get up-to-the-minute price updates and market trends for a wide range of cryptocurrencies."
    //         />
    //         <FeatureCard
    //           icon={<Star className="h-10 w-10 text-[#00D7FE]" />}
    //           title="Personalized Watchlists"
    //           description="Create and manage your own watchlist to keep track of your favorite cryptocurrencies."
    //         />
    //         <FeatureCard
    //           icon={<Search className="h-10 w-10 text-[#00D7FE]" />}
    //           title="Advanced Search"
    //           description="Easily find and analyze specific cryptocurrencies with our powerful search functionality."
    //         />
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0, y: 50 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5, delay: 0.4 }}
    //         className="mt-20 text-center"
    //       >
    //         <h2 className="mb-4 text-3xl font-bold">
    //           Ready to Start Your Crypto Journey?
    //         </h2>
    //         <p className="mb-8 text-xl text-gray-300">
    //           Join thousands of traders who trust CryptoTracker for their daily
    //           market insights.
    //         </p>
    //         <Button
    //           asChild
    //           size="lg"
    //           className="transform bg-[#00D7FE] text-black transition-transform duration-200 hover:scale-105 hover:bg-[#00c2e6]"
    //         >
    //           <Link href="/dashboard">Get Started Now</Link>
    //         </Button>
    //       </motion.div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default HomePage;

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="rounded-lg bg-gray-800 p-6 shadow-lg"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
