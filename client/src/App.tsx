import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "./api/endpoints";
import Layout from "./components/common/Layout";
import Login from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import Users from "./pages/admin/Users";
import Categories from "./pages/admin/Categories";
import Authors from "./pages/admin/Authors";
import Borrows from "./pages/admin/Borrows";
import Returns from "./pages/admin/Returns";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(API_ENDPOINTS.USERS.GET_PROFILE);
        setIsAuthenticated(true);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" replace /> : <Login />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/books"
          element={
            isAuthenticated ? (
              <Layout>
                <Books />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            isAuthenticated ? (
              <Layout>
                <Users />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/categories"
          element={
            isAuthenticated ? (
              <Layout>
                <Categories />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/authors"
          element={
            isAuthenticated ? (
              <Layout>
                <Authors />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/borrows"
          element={
            isAuthenticated ? (
              <Layout>
                <Borrows />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/returns"
          element={
            isAuthenticated ? (
              <Layout>
                <Returns />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;