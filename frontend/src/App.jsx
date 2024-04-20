import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Category from "./pages/Category"
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Login from "./pages/Login"


function App() {

  return (
  <main className="bg-primary text-tertiary">
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mens" element={<Category />} />
      <Route path="/womens" element={<Category />} />
      <Route path="/kids" element={<Category />} />
      <Route path="/product" element={<Product />} >
        <Route path=":productId" element={<Product />} />
      </Route>
      <Route path="/cart-page" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    <Footer />
    </BrowserRouter>
   
  </main>
  )
}

export default App
