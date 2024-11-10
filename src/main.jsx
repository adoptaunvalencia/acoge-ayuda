import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration.js";
import { ReducerProvider } from "./contexts/reducer.contexts/ReducerContext.jsx";
import { RefProvider } from "./contexts/ref.context/RefContext.jsx";
import App from "./App.jsx";
import "./styles/global.css";
import { FunctionProvider } from "./contexts/function.contexts/FunctionContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ReducerProvider>
        <FunctionProvider>
          <RefProvider>
            <App />
          </RefProvider>
        </FunctionProvider>
      </ReducerProvider>
    </BrowserRouter>
  </StrictMode>
);

//serviceWorkerRegistration.register()
