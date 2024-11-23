import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <>
        <Header />
        <Sidebar />
        <MainContent />
      </>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
