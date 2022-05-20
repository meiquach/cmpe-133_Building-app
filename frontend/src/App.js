import { Routes, Route } from "react-router-dom";
import AppointmentPage from "./User/AppointmentPage";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./User/Login/Login"
import Register from "./User/SignUp/SignUp";
import Content from "./Components/Videos/Content";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Service from "./Components/Service";
import Blog from "./Components/Blog";
import Search from "./Diagnosed/Search";
import "./styles.css";
import PersistLogin from "./User/Login/PersistLogin";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route element={<><PersistLogin /></>}>
          <Route path="/" element={<><Content /><Service /><About /><Blog /><Footer /></>} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/diagnosed" element = {<Search/>}/>
        </Route>
      </Routes>
    </div>
  );
}
