import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, EarthCanvas } from "./components";
import { useInView } from "./utils/useInView";

const App = () => {
   const { ref, inView } = useInView({ threshold: 0.35 });
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
           <section ref={ref} className="relative w-full h-screen mx-auto">
          <Hero enablePostprocessing={inView}/>
        </section>
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
