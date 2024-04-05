import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import NavbarComponent from "./components/NavbarComponent";
import {  UserPage } from "./pages/UserPage";
import UserForm from "./components/UserComponents/addOrUpdateUserForm";
import Footer from "./components/Footer";
import BookForm from "./components/BookComponents/AddOrUpdateBook";
import BookPage from "./pages/BookPage";
import BookDetails from "./components/BookComponents/BookDetails";
import Home from "./pages/Home";
import UserDetails from "./components/UserComponents/userDetails";

function App() {

  return (
    <>
      <BrowserRouter>
      <NavbarComponent/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/add" element={<UserForm />} />
          <Route path="/user/detail/:id" element={<UserDetails />} />
          <Route path="/user/update/:id" element={<UserForm />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/book/add" element={<BookForm />} />
          <Route path="/book/update/:id" element={<BookForm />} />
          <Route path="/book/detail/:id" element={<BookDetails />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
