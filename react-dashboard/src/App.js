import Home from "./Pages/Home/Home";
import Product from "./Pages/Products/Product";
import Users from "./Pages/Users/Users";
import Card from "./Pages/Card/Card";
import About from "./Pages/About/About";
import Setting from "./Pages/Setting/Setting";

import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/users" exact element={<Users />}></Route>
          <Route path="/products" exact element={<Product />}></Route>
          <Route path="/card" exact element={<Card />}></Route>
          <Route path="/about" exact element={<About />}></Route>
          <Route path="/setting" exact element={<Setting />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
