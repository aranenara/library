import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { SearchBookDoc } from "../types/searchBookDoc";
import { searchBooks } from "../services/openLibrary";

import "./Search.css"


function Search() {
    const [params] = useSearchParams();
    const query = params.get("q");

    const [results, setResults] = useState<SearchBookDoc[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;

        setLoading(true);

        searchBooks(query).then((books) => {
            setResults(books);
            setLoading(false);
        })
    },[query]);

    return(
        <div className="search">
            <h1>Résultats pour : "{query}"</h1>
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

export default Search