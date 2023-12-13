import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookDetails from "./pages/BooksDetail";
import EditBookPage from "./pages/Editbook";
import DeleteBookPage from "./pages/Deletebook";
import Homepage from "./pages/Homepage";
import NewBookPage from "./pages/NewBooks";
import Register from "./pages/Register";
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <VStack minH="100vh" minW="100vw"bg="#f4cccc" >
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Homepage />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/newbook"} element={<NewBookPage />} />
          <Route path={"/books/:id"} element={<BookDetails />} />
          <Route path={"/editbook/:id"} element={<EditBookPage />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<PrivateRoute element={<Homepage />} />} />
          <Route path={"/newbook"} element={<PrivateRoute element={<NewBookPage />} />} />
          <Route path={"/books/:id"} element={<PrivateRoute element={<BookDetails />} />} />
          <Route path={"/editbook/:id"} element={<PrivateRoute element={<EditBookPage />} />} />
          <Route path={"/deletebook/:id"} element={<PrivateRoute element={<DeleteBookPage />} />} />   
        </Routes>
      </Router>
    </VStack>
  );
}

export default App;
