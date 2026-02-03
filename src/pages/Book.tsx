import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getBookById } from "../services/openLibrary";
import { getAuthorById } from "../services/openLibrary";
import { getWorkById } from "../services/openLibrary";
import { getWikipediaSummary } from "../services/openLibrary";

import { Book as BookType } from "../types/book";
import { Author as AuthorType } from "../types/author";
import { Work as WorkType } from "../types/work";
import { WikipediaSummary as WikiType } from "../types/wikipedia";

import "./Book.css";

function Book() {
  const { id } = useParams();

  const [book, setBook] = useState<BookType | null>(null);        //protection si pas de livre
  const [author, setAuthor] = useState<AuthorType | null>(null);  // protection du pas d'auteur
  const [work,setWork] = useState<WorkType | null>(null);
  const [wiki, setWiki] = useState<WikiType | null>(null);

  // charger le livre
  useEffect(() => {
    if (!id) return;

    getBookById(id).then((data) => {
      setBook(data);
    });
  }, [id]);

  // charger l’auteur quand le livre arrive
  useEffect(() => {
    if (!book) return;
    if (!book.authors || book.authors.length === 0) return;

    const authorKey = book.authors[0].key;        
    const authorId = authorKey.replace("/authors/", "");

    getAuthorById(authorId).then((authorData) => {
      setAuthor(authorData);
    });
  }, [book]);

  useEffect(() => {
    if(!book) return;
    if(!book.works || book.works.length === 0) return;

    const worksKey = book.works[0].key;
    const worksId = worksKey.replace("/works/","");

    getWorkById(worksId).then((workData) => {
      setWork(workData)
    })
  },[book]);

  useEffect(() => {
    if (!book) return;

    getWikipediaSummary(book.title)
    .then(setWiki)
    .catch(() => setWiki(null))
  },[book])


  if (!book) {
    return <p>Chargement...</p>;
  }

  let coverUrl: string | null = null;

  if (book.covers && book.covers.length > 0) {
    const coverId = book.covers[0];
    coverUrl =
      "https://covers.openlibrary.org/b/id/" + coverId + "-L.jpg";
  }

  
  return (
  <div className="book-page">
    <h1>{book.title}</h1>

    {coverUrl && (
      <img
        className="card"
        src={coverUrl}
        alt={book.title}
        style={{ width: "200px" }}
      />
    )}

    {author && <p>Auteur : {author.name}</p>}

    {work?.description && (
      <p className="book-description">
        {typeof work.description === "string"
          ? work.description
          : work.description.value}
      </p>
    )}

    {wiki && (
      <div className="wiki-box">
        <h2>Wikipedia</h2>

        {wiki.thumbnail?.source && (
          <img
            src={wiki.thumbnail.source}
            alt={wiki.title}
          />
        )}

        {wiki.extract && <p>{wiki.extract}</p>}

        <a
          href={wiki.content_urls.desktop.page}
          target="_blank"
          rel="noreferrer"
        >
          Aller sur Wikipedia
        </a>
      </div>
    )}
  </div>
);
}

export default Book