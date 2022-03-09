import "./styles.css";
import Navbar from "./Components/Navbar/Navbar";
import Pages from "./Components/Pages/Pages";
import About from "./Components/About";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Pages />
        <About />
        <Footer />
      </div>
    </>
  );
}
