import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DynamicImport from "./pages/DynamicImport";
import ImportOnVisibility from "./pages/ImportOnVisibility";
import ListVirtualization from "./pages/ListVirtualization";
import BlogDetail from "./pages/BlogDetail";

function App() {
  const prefetchPage = () => {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = "/blog/1"
    document.head.appendChild(link)
    console.log("prefetching")
}
  return (
    <>
      <BrowserRouter>
        <ul className="">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/dynamic-import">Dynamic Import</Link>
          </li>
          <li>
            <Link to="/visibility-import">Import Visibility</Link>
          </li>
          <li>
            <Link to="/list-Virtual">List Virtualization</Link>
          </li>
          <li>
            <Link to="/blog/:id" onMouseOver={prefetchPage}>Blog</Link>
          </li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dynamic-import" element={<DynamicImport />} />
          <Route path="/visibility-import" element={<ImportOnVisibility />} />
          <Route path="/list-Virtual" element={<ListVirtualization />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
