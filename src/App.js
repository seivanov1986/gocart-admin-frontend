import { Routes, Route } from 'react-router-dom';
import RequireAuth from './middlewares/RequireAuth';
import IsAuth from './middlewares/IsAuth';
import AppLayout from './layouts/AppLayout';
import Home from './routes/Home';
import Login from './routes/Login/Login';
import Logout from './routes/Logout';
import Users from './routes/Users/Users';
import User from './routes/Users/User';
import Pages from './routes/Pages/Pages';
import Categories from './routes/Categories/Categories';
import Products from './routes/Products/Products';
import Attributes from './routes/Attributes/Attributes';
import Sefurls from './routes/Sefurls/Sefurls';
import Attribute from './routes/Attributes/Attribute';
import Product from './routes/Products/Product';
import Category from './routes/Categories/Category';
import Page from './routes/Pages/Page';

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="admin">
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="" element={<Home />} />

            <Route path="pages" element={<Pages />} />
            <Route path="page" element={<Page />} />
            <Route path="page/:id" element={<Page />} />

            <Route path="categories" element={<Categories />} />
            <Route path="category" element={<Category />} />
            <Route path="category/:id" element={<Category />} />

            <Route path="products" element={<Products />} />
            <Route path="product" element={<Product />} />
            <Route path="product/:id" element={<Product />} />

            <Route path="attributes" element={<Attributes />} />
            <Route path="attribute" element={<Attribute />} />
            <Route path="attribute/:id" element={<Attribute />} />

            <Route path="sefurls" element={<Sefurls />} />

            <Route path="users" element={<Users />} />
            <Route path="user" element={<User />} />
            <Route path="user/:id" element={<User />} />

          </Route>
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route element={<IsAuth />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
