import Home from "./Pages/Home/Home";
import Product from "./Pages/Products/Product";
import Users from "./Pages/Users/Users";
import Card from "./Pages/Cart/Cart";
import About from "./Pages/About/About";
import Setting from "./Pages/Setting/Setting";
import AddProduct from "./Pages/Products/AddProduct";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EditUsers from "./Pages/Users/EditUsers";
import EditProduct from "./Pages/Products/EditProduct";
import AddUser from "./Pages/Users/AddUser";
import UserView from "./Pages/Users/UserView";
import ProductView from "./Pages/Products/ProductView";
import Cart from "./Pages/Cart/Cart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="users">
            <Route index element={<Users />} />
            <Route path="detail/:id" element={<UserView />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUsers />} />
          </Route>
          <Route path="products">
            <Route index element={<Product />} />
            <Route path="detail/:id" element={<ProductView />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="edit/:id" element={<EditProduct />} />
          </Route>
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/setting" exact element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
