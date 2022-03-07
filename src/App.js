import "./styles.css";
import Navbar from "./Components/Navbar/Navbar";
import Pages from "./Components/Pages/Pages";

export default function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Pages />
      </div>
    </>
  );
}
