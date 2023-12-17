import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SideBar from './Pages/Side';
import Login from './Pages/Login';


function App() {
  return (
    <Router>

     

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<SideBar />} />
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
        </Routes>

    </Router>
  );
}

export default App;
