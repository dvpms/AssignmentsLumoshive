import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BlogDetail from "./pages/BlogDetailPage";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./assets/css/output.css";
import Footer from "./components/Footer";

const App = () => {

  return (
    <Provider store={store}>

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:year/:month/:day/:slug" element={<BlogDetail />} />
          </Routes>
        <Footer/>
      </Router>
    </Provider>
  );
};

export default App;
