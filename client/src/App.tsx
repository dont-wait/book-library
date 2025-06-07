import AppRoutes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastProvider } from "./contexts/ToastContext";
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  return (
    <>
      <UserProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider >
      </UserProvider >
    </>

  );
};

export default App;
