import About from "./components/about";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import Services from "./components/services";

export default async function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </main>
  );
}
