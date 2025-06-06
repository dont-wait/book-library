import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BookProvider } from "./contexts/BookContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <Routes>
            <Route path='/*' element={<App />}></Route>
          </Routes>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
