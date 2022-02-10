import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClientProvider} from "react-query";
import ReactModal from "react-modal";
import queryClient from "./setup/query";
import {useAutoRefresh} from "./services/auth";
import Loader from "./components/Loader";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

ReactModal.setAppElement("#root");

function App() {
  const {isLoading, isAuth} = useAutoRefresh();

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isAuth ? (
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
