import { createBrowserRouter } from "react-router-dom";
import { BanksPage } from "../pages/BanksPage";
import { requestBank, requestBanks } from "../network/api";
import { actions, store } from "../reducers/store";
import { BankPage } from "../pages/BankPage";
import { EditPage } from "../pages/EditPage";
import { FilePosterPage } from "../pages/FilePosterPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <BanksPage />,
        loader: async () => {
            const result = await requestBanks();
            store.dispatch(actions.banks(result.data));
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
        path: "/files",
        element: <FilePosterPage />,
    },
]);
