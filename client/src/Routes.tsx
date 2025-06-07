import { Routes, Route } from "react-router-dom";
import * as pages from "./pages/index.ts";
import RequireAuth from "./components/RequireAuth.tsx";
import { ROLES } from "./type.ts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<pages.Login />} />

      <Route element={<RequireAuth allowedRole={ROLES.ADMIN} />}>
        <Route path='/admin' element={<pages.Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRole={ROLES.LIBRARIAN} />}>
        <Route path='/admin' element={<pages.Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRole={ROLES.MEMBER} />}>
        <Route path='/home' element={<pages.Home />} />
        <Route path='/product' element={<pages.Product />} />
        <Route path='/borrowed-books' element={<pages.BorrowedBooksPage />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
