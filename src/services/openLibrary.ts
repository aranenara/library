import { Book } from "../types/book";
import { Work } from "../types/work";
import { Author } from "../types/author";
import { RecentChange } from "../types/recentChanges";
import { WikipediaSummary } from "../types/wikipedia";
import { advancedSearch, type advancedSearch } from "../types/advancedSearch";


const BASE_URL = "https://openlibrary.org/";

export async function getBookById(id:string): Promise<Book> {
    const response = await fetch(BASE_URL+"books/"+id+'.json');
    if (!response.ok) {
        throw new Error('ERROR')
    }
    return response.json();
}

export async function getWorkById(id:string): Promise<Work> {
    const response = await fetch(BASE_URL+"works/"+id+'.json');
    if (!response.ok) {
        throw new Error('ERROR')
    }
    return response.json();
}

export async function getAuthorById(id:string): Promise<Author> {
    const response = await fetch(BASE_URL+"authors/"+id+'.json');
    if (!response.ok) {
        throw new Error('ERROR')
    }
    return response.json();
}

export async function getRecentChanges() {
    const response = await fetch(BASE_URL+"recentchanges.json?limit=10");
    if (!response.ok) {
        throw new Error('ERROR')
    }
    return response.json();
}

export async function searchBooks(query:string) {
    const response = await fetch(`${BASE_URL}search.json?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
        throw new Error ('ERROR')
    }
    const data = await response.json()

    return data.docs;
}

export async function getWikipediaSummary(title:string): Promise<WikipediaSummary> {
    const formatedTitle = title.replaceAll(" ", "_")
    const response = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/"+formatedTitle
    );

    if(!response.ok) {
        throw new Error ("Wikipedia undefined");
    }
    return response.json()
}

export async function advancedSearch(params: {
  title?: string;
  author?: string;
  subject?: string;
  year?: string;
}) {
  const queryParams: string[] = [];

  if (params.title) {
    queryParams.push(`title=${encodeURIComponent(params.title)}`);
  }
  if (params.author) {
    queryParams.push(`author=${encodeURIComponent(params.author)}`);
  }
  if (params.subject) {
    queryParams.push(`subject=${encodeURIComponent(params.subject)}`);
  }
  if (params.year) {
    queryParams.push(`year=${encodeURIComponent(params.year)}`);
  }
  
  if (queryParams.length === 0) {
    return [];
}


  const url = BASE_URL+"search.json?"+queryParams.join("&");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error ('Erreur de la recherche avancée');
  }
  const data = await response.json();

  return data.docs;
}
