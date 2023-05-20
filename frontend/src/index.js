import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/ResponsiveVariables.css"
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <CookiesProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </CookiesProvider>
);
