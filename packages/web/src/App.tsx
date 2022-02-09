import {BrowserRouter, Routes, Route} from "react-router-dom";
import {QueryClientProvider} from "react-query";
import ReactModal from "react-modal";
import queryClient from "./setup/query";
import {useAutoRefresh} from "./services/auth";
import Loader from "./components/Loader";
import Feed from "./pages/Feed";

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
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<div></div>} />
          </Routes>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
