import {
    ActionReducerMapBuilder,
    AsyncThunk,
    PayloadAction,
    configureStore,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { requestBanks, requestEntries, requestInitBanks } from "../network/api";
import { useSelector, useDispatch } from "react-redux";
import { AsyncThunkConfig } from "./thunker";
import { Ed807 } from "../data/Ed807";

export const fetchBanks = createAsyncThunk(
    "banks/fetch",
    async (id: number) => {
        const response = await requestBanks(id);
        return response.data;
    },
);

export const initBanks = createAsyncThunk("banks/init", async () => {
    console.log("heuy");
    const response = await requestInitBanks();
    return response.data;
});

export const fetchEntries = createAsyncThunk("banks/entries2", async () => {
    const response = await requestEntries();
    return response.data;
});

export type State = {
    value: number;
    entries: Ed807[];
    requests: {
        singleEntry: RequestState<Ed807>;
    };
    initBanks: PromiseState;
    entriesStatus: PromiseState;
};

type PromiseState = "none" | "pending" | "fulfilled" | "error";

const initialState: State = {
    value: 0,
    entries: [],
    requests: {
        singleEntry: empty(),
    },
    initBanks: "none",
    entriesStatus: "none",
};

type RequestState<T> = {
    value: T | null;
    status: PromiseState;
};

function empty<T>(): RequestState<T> {
    return {
        value: null,
        status: "none",
    };
}

const slice = createSlice({
    name: "banks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        trackRequest(builder, "singleEntry", fetchBanks, {
            fulfill: (state, action) => {
                state.requests.singleEntry.value = action.payload;
            },
        });
        track(builder, "initBanks", initBanks);
        track(builder, "entriesStatus", fetchEntries, {
            fulfill: (state, action) => {
                state.entries = action.payload;
            },
        });
    },
});

function track<ReturnValue, X extends AsyncThunkConfig, S2 extends keyof State>(
    builder: ActionReducerMapBuilder<State>,
    stateParameter: S2,
    thunker: AsyncThunk<ReturnValue, void, X>,
    helper?: {
        fulfill: (state: State, action: PayloadAction<ReturnValue>) => void;
    },
) {
    builder.addCase(thunker.fulfilled, (state, action) => {
        (state as Record<string, unknown>)[stateParameter] = "fulfilled";
        helper?.fulfill(state, action);
    });
    builder.addCase(thunker.rejected, state => {
        (state as Record<string, unknown>)[stateParameter] = "error";
    });
    builder.addCase(thunker.pending, state => {
        (state as Record<string, unknown>)[stateParameter] = "pending";
    });
}

function trackRequest<
    ReturnValue,
    X extends AsyncThunkConfig,
    S2 extends keyof State["requests"],
    ThunkArg,
>(
    builder: ActionReducerMapBuilder<State>,
    stateParameter: S2,
    thunker: AsyncThunk<ReturnValue, ThunkArg, X>,
    helper?: {
        fulfill: (state: State, action: PayloadAction<ReturnValue>) => void;
    },
) {
    builder.addCase(thunker.fulfilled, (state, action) => {
        state["requests"][stateParameter].status = "fulfilled";
        helper?.fulfill(state, action);
    });
    builder.addCase(thunker.rejected, state => {
        state["requests"][stateParameter].status = "error";
    });
    builder.addCase(thunker.pending, state => {
        state["requests"][stateParameter].status = "pending";
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
