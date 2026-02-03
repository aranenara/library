import { getRecentChanges } from "../services/openLibrary";
import { RecentChanges as RecentChangesType } from "../types/recentChanges";
import { getBookById } from "../services/openLibrary";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"


function Home () {
    const [recentChange, setRecentChange]=useState<RecentChangesType[]>([]);
    const [recentBooks, setRecentBooks] = useState<BookType[]>([]);  

    useEffect(() => {
        getRecentChanges().then((recentChange) => {
            setRecentChange(recentChange)})
    },[])

    const bookIds = recentChange.flatMap(rc => 
        rc.changes
              .filter(change => change.key.startsWith("/books/"))
            .map(change => change.key.replace("/books/",""))
    )

    useEffect(() => {
        Promise.all(bookIds.map(id => getBookById(id)))
        .then (recentBooks => {
            setRecentBooks(recentBooks);
        })
    }, [bookIds]);

    return (
    <div className="home">
        {recentBooks.map((book) => {
    const coverId = book.covers?.[0];

    const coverUrl = coverId
      ? "https://covers.openlibrary.org/b/id/" + coverId + "-M.jpg"
      : null;

    const bookId = book.key.replace("/books/", "");

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
 )
}   

export default Home 