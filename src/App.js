import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShortenerPage from "./page/shortnerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;