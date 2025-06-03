import AppRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import { ToastProvider } from "./contexts/ToastContext";

const App = () => {
  return (
    <>
      <ToastProvider>
        <Navigation />
        <AppRoutes />
        <Footer />
      </ToastProvider>
    </>
  );
};

export default App;
