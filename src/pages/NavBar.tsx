import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"

function NavBar () {
    const [search, setSearch] = useState("");
    const navigate = useNavigate()  
    
    function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;
        navigate("/search?q=" + encodeURIComponent(search));
  }
return (
    <div>
        <form className="search-bar" onSubmit={handleSubmit}>
        <input
            value = {search}
            onChange = {(e) => setSearch(e.target.value)}
            placeholder="Rechercher un livre..."
            />
        <button type="submit"> Rechercher </button>
        </form>
    </div>
);
};

export default NavBar
