import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Marquee from "./components/Marquee"
import OurWork from "./components/OurWork"
import SisterChannels from "./components/SisterChannels"
import Footer from "./components/Footer"
import "./index.css"

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Marquee />
      <OurWork />
      <SisterChannels />
      <Footer />
    </div>
  )
}

export default App