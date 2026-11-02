import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Calculators from '@/components/sections/Calculators';
import DietPlanner from '@/components/sections/DietPlanner';
import NutritionTips from '@/components/sections/NutritionTips';
import Contact from '@/components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Calculators />
        <DietPlanner />
        <NutritionTips />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
