import { Routes, Route } from "react-router-dom";
import * as pages from "./pages/index.ts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<pages.Home />} />
      <Route path='/admin' element={<pages.Admin />} />
      <Route path='/product' element={<pages.Product />} />
      <Route path='/borrowed-books' element={<pages.BorrowedBooksPage />} />
      {/* <Route path='/browse-books' element={<pages.BrowseBook />} /> */}
      <Route path="/login" element={<pages.Login />} />
    </Routes>
  );
};

export default AppRoutes;
