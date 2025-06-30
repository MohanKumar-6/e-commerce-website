import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import UserProfile from "./pages/UserProfile";
import ForgotPassword from "./pages/ForgotPassword";
import SearchResults from "./components/SearchResults";
import ResetPassword from "./pages/ResetPassword";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/search" element={<SearchResults />} />
        
        {/* Auth routes */}
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Profile route - only accessible when logged in */}
        <Route
          path="/profile"
          element={user ? <UserProfile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
