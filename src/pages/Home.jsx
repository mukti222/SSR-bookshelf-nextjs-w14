import { VStack } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Homepage from "./Homepage"; 
import BookDetails from "./BooksDetail";
import EditBook from "./Editbook";
import Register from "./Register";

function Home() {
  return (
    <VStack minH="100vh" minW="100vw" bgGradient="linear(to-b, white, rgb(179, 255, 244))">
      <Router bgGradient="linear(to-b, white, rgb(179, 255, 244))">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} /> 
          <Route path={"/books/:id"} element={<BookDetails />} />
          <Route path={"/editbook/:id"} element={<EditBook />} />
          <Route path={"/register"} element={<Register />} />
        </Routes>
      </Router>
    </VStack>
  );
}

export default Home;