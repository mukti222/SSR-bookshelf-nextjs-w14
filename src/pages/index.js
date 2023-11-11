import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
// import "./index.css";

function App() {
  useEffect(() => {
    ReactDOM.createRoot(document.getElementById("root")).render(
      <React.StrictMode>
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </React.StrictMode>
    );
  }, []); 

  return <div id="root" />; 
}

export default App;