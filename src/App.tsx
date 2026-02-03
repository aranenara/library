import { Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Book from "./pages/Book";
import NavBar from "./pages/NavBar";
import AdvancedSearch from "./pages/AdvancedSearch";

import "./App.css"



function App() {
  return (
    <>
    <Link to={""} className="ma-librairie"><h1 className="ma-librairie">Ma librairie </h1></Link>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={
        <>
          <AdvancedSearch/>
          <Search/>
           </>} />
      <Route path="/book/:id" element={<Book />} />
    </Routes>
    </>
  );
}

export default App;
