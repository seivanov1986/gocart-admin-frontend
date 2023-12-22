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

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="admin">
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="" element={<Home />} />

            <Route path="pages" element={<Pages />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="attributes" element={<Attributes />} />

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
