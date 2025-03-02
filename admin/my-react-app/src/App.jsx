import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
import {useSelector} from "react-redux"
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./Pages/Home/Home";
import UserList from "./Pages/userList/UserList";
import User from './Pages/User/User';
import NewUser from './Pages/NewUser/NewUser';
import ProductList from './Pages/ProductList/ProductList';
import Products from './Pages/product/Products';
import NewProduct from './Pages/newProduct/NewProduct';
import Login from './Pages/login/Login';


function App() {
  const currentUser = useSelector((state) => state.user?.currentUser || {});
  const isAdmin = currentUser.isAdmin || false;
  
  return (
    <Router>
      <Switch>
        {isAdmin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users" component={UserList} />
                <Route path="/user/:userId" component={User} />
                <Route path="/newUser" component={NewUser} />
                <Route path="/products" component={ProductList} />
                <Route path="/product/:productId" component={Products} />
                <Route path="/newproduct" component={NewProduct} />
                <Redirect from="/login" to="/" /> {/* Redirect if logged in */}
              </Switch>
            </div>
          </>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" /> {/* Redirect non-admin users */}
          </Switch>
        )}
      </Switch>
    </Router>
  );
}

export default App;