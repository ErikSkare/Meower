import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClientProvider} from "react-query";
import ReactModal from "react-modal";
import queryClient from "./setup/query";
import {useAutoRefresh} from "./services/auth";
import Loader from "./components/Loader";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Meow from "./pages/Meow";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
            <Route path="/meows/:id" element={<Meow />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
