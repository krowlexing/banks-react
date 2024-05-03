import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routers/router.tsx";
import { Provider } from "react-redux";
import { store } from "./reducers/store.ts";
import { StyledEngineProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <RouterProvider router={router} />
            </StyledEngineProvider>
        </Provider>
    </React.StrictMode>,
);
