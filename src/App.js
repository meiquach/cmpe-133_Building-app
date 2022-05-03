import "./styles.css";
import Navbar from "./Components/Navbar/Navbar";
import Pages from "./Components/Pages/Pages";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Service from "./Components/Service";
import Blog from "./Components/Blog";

export default function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Pages />
        <Service />
        <About />
        <Blog />
        <Footer />
      </div>
    </>
  );
}
