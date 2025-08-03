import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';


const App = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={token ? <Home /> : <Navigate to="/login" />}
      />
      <Route path="/profile/:userId" element={token ? <UserProfile /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
