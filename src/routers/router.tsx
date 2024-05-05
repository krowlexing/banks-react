import { createBrowserRouter } from "react-router-dom";
import { BanksPage } from "../pages/BanksPage";
import { requestBank } from "../network/api";
import { fetchBanks, fetchEntries, store } from "../reducers/store";
import { BankPage } from "../pages/BankPage";
import { EditPage } from "../pages/EditPage";
import { FilePosterPage } from "../pages/FilePosterPage";
import { Ed807Page } from "../pages/Ed807Page/Ed807Page";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Ed807Page />,
        loader: async () => {
            store.dispatch(fetchEntries());
            return 0;
        },
    },
    {
        path: "/banks/:id/edit",
        element: <EditPage />,
        loader: async ({ params }) => {
            return (await requestBank(+params["id"]!)).data;
        },
    },
    {
        path: "/banks/:id",
        element: <BankPage />,
        loader: async ({ params }) => {
            return (await requestBank(+params["id"]!)).data;
        },
    },

    {
        path: "/files/upload",
        element: <FilePosterPage />,
    },
    {
        path: "/files/:id",
        element: <BanksPage />,
        loader: async req => {
            const id = req.params["id"]!;
            store.dispatch(fetchBanks(+id));
            return 0;
        },
    },
    {
        path: "/files",
        element: <Ed807Page />,
    },
]);
