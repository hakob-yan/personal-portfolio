// App.js (updated)
import React, { ReactElement } from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Error from "./pages/Error";
import * as paths from "./constants/routerPaths"

function App(): ReactElement {
  return (
    <BrowserRouter>
      <div className="relative bg-primary-1 ">
        <NavBar />
        <Routes>
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.ALL} element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
