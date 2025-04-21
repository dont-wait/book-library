import { useEffect, useState } from "react"
import axios from "./api/axios";
interface Book {
  BookName: string,
  Title: string;
  Author: string;
  ImageBook: string;
  CategoryId: string;
  ISBN: string;
  PublishedDate: string;
}

const App = () => {
  const [books, setBook] = useState<Book[]>([])
  //useState cap nhat trang thai
  //useEffect chay khi component duoc render
  

  useEffect(
    () => {
      const getBooks = async () => {
        const bookList = await axios.get("/books")
        setBook(bookList.data)
        return;
      }
      getBooks();
    }, [books]); //rong, [], [books]

  return (
    <div>{books.map(books => (
      <div key={books.ISBN}>
        <h1>{books.Title}</h1>
        <h2>{books.Author}</h2>
        <img src={books.ImageBook} alt={books.Title} />
        <p>{books.PublishedDate}</p>
        <p>{books.CategoryId}</p>
      </div>
    ))}</div>
  )
}

export default App