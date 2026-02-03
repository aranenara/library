import { useState } from "react";

import { advancedSearch } from "../services/openLibrary";
import { SearchBookDoc } from "../types/searchBookDoc";
import { Link } from "react-router-dom";

import "./AdvancedSearch.css"

function AdvancedSearch() {

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const [results, setResults] = useState<SearchBookDoc[]>([]);
  const [loading, setLoading] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    advancedSearch({
      title,
      author,
      subject,
      year
    }).then((books) => {
      setResults(books);
      setLoading(false);
    });
  }

  return (
    <div className="search">
      <h1>Recherche avancée</h1>

      <form onSubmit={handleSearch}>
        <input 
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        placeholder="Titre"/>
        <input 
        value={author}
        onChange={(e)=> setAuthor(e.target.value)}
        placeholder="Auteur"/>
        <input 
        value={subject}
        onChange={(e)=> setSubject(e.target.value)}
        placeholder="Sujet"/>
        <input 
        value={year}
        onChange={(e)=> setYear(e.target.value)}
        placeholder="Année"/>
        <button type="submit">Rechercher</button>
      </form>

      {loading && <p>Chargement...</p>}

      {!loading &&
  results.map((book) => {
    const coverId = book.cover_i;

    const coverUrl = coverId
      ? "https://covers.openlibrary.org/b/id/" + coverId + "-M.jpg"
      : null;

    const bookId = book.key.replace("/works/", "");

    return (
      <Link to={"/book/" + bookId} key={book.key} className="card">
        {coverUrl && (
          <img src={coverUrl} alt={book.title} />
        )}
        <h3>{book.title}</h3>
      </Link>
    );
  })}
    </div>
  );
}

export default AdvancedSearch;
