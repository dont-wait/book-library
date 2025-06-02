import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookProvider } from "./contexts/BookContext.tsx";

createRoot(document.getElementById("root")!).render(
  //Chay nhieu lan de phat hien ra loi
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <Routes>
          <Route path='/*' element={<App />}></Route>
        </Routes>
      </BookProvider>
    </BrowserRouter>
  </StrictMode>
);
