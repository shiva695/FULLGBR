import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackgroundTheme from "./components/generalComponents/BackgroundTheme.jsx";
import { Provider } from "react-redux";
import store from "./components/global/redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: "#FAFBFC",
          padding: "12px, 16px, 12px, 16px",
          width: "400px",
          height: "48px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20%",
        }}
      />
      <App />
    </BrowserRouter>
    <BackgroundTheme />
  </Provider>
  // </React.StrictMode>
);
