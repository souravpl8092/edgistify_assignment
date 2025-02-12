import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TaskPage />} />
          </Route> */}
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </>
  );
}

export default App;
