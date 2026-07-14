import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login.jsx";
import './index.css'
import Success from "../components/Success.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
