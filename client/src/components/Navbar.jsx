// client/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link to="/">Boom Feed</Link>
      <div className="space-x-4">
        <Link to="/upload">Upload</Link>
        {user ? (
          <>
            <span>Wallet: ₹{user.wallet}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
