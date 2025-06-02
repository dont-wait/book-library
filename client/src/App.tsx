import AppRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;
