import AppRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from "./contexts/ToastContext";

const App = () => {
  return (
    <>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </>
  );
};

export default App;
