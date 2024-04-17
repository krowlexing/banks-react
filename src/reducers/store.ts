import {
    ActionReducerMapBuilder,
    AsyncThunk,
    Draft,
    PayloadAction,
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { requestBanks, requestInitBanks } from "../network/api";
import { useSelector, useDispatch } from "react-redux";
import { AsyncThunkConfig } from "./thunker";
import { BankEntry } from "../data/BankEntry";

export const fetchBanks = createAsyncThunk("banks/fetch", async () => {
    const response = await requestBanks();
    return response.data;
});

export const initBanks = createAsyncThunk("banks/init", async () => {
    console.log("heuy");
    const response = await requestInitBanks();
    return response.data;
});

export type State = {
    value: number;
    banks: BankEntry[];
    initBanks: PromiseState;
};

type PromiseState = "none" | "pending" | "fulfilled" | "error";

const initialState: State = {
    value: 0,
    banks: [],
    initBanks: "none",
};

const thunkers = [] as const;
const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {
        banks(state, action: PayloadAction<BankEntry[]>) {
            state.banks = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchBanks.fulfilled, (state, action) => {
            state.banks = action.payload;
        });
        track(builder, "initBanks", initBanks);
    },
});

function track<ReturnValue, X extends AsyncThunkConfig, S2 extends keyof State>(
    builder: ActionReducerMapBuilder<State>,
    stateParameter: S2,
    thunker: AsyncThunk<ReturnValue, void, X>,
) {
    builder.addCase(thunker.fulfilled, state => {
        (state as Record<string, unknown>)[stateParameter] = "fulfilled";
    });
    builder.addCase(thunker.rejected, state => {
        (state as Record<string, unknown>)[stateParameter] = "error";
    });
    builder.addCase(thunker.pending, state => {
        (state as Record<string, unknown>)[stateParameter] = "pending";
    });
}

const reducer = slice.reducer;
export const store = configureStore({
    reducer,
});

const actions = slice.actions;
export { actions };

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
export const useAppSelector = useSelector.withTypes<State>();
