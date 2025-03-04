import  Home  from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from "react-router-dom"
import Success from "./pages/Success";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state)=> state.user.currentUser)
  return (
    <div className="App">
      <Router>
        {user ? (
          <>
            <Routes>
              <Route exact path="/" Component={Home}/>
              <Route path="/products/:category" Component={ProductList}/>
              <Route path="/product/:id" Component={Product}/>
              <Route path="/register" element={user? <Navigate to="/" />: <Register/>} />
              <Route path="/login" element={user? <Navigate to="/" />: <Login/>} />
              <Route path="/cart" Component={Cart}/>
              <Route path="/success" Component={Success}/>
            </Routes>
        </>
      ): (
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      )}
        
      </Router>
    </div>
  );
}

export default App;
