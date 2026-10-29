import Background from "@/components/ui/Background";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import GitHub from "@/components/sections/GitHub";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
export default function Home() {
  return <><Background /><Navigation /><main id="main"><Hero /><Projects /><Skills /><Experience /><About /><GitHub /><Contact /></main><Footer /></>;
}
