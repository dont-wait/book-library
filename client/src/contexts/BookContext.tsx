// src/context/BookContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";
import { Book } from "../type";

type BookContextType = {
  selectedBook: Book | null;
  setSelectedBook: (book: Book) => void;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <BookContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a BookProvider");
  }
  return context;
};
