import {
    ActionReducerMapBuilder,
    AsyncThunk,
    Dispatch,
    Draft,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import { requestBanks } from "../network/api";
// const initBanks = createAsyncThunk("banks/init", async () => {
//     const response = await requestBanks();
//     return response.data;
// });

// copied from @reduxjs/toolkit/createAsyncThunk.d.ts because it's private
export type AsyncThunkConfig = {
    state?: unknown;
    dispatch?: Dispatch;
    extra?: unknown;
    rejectValue?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
};

// class Thunker<
//     State,
//     Thunk extends AsyncThunk<Value, void, AsyncApiConfig>,
//     Value,
//     AsyncApiConfig extends AsyncThunkConfig,
// > {
//     constructor(
//         private builder: ActionReducerMapBuilder<State>,
//         private thunk: Thunk,
//     ) {}

//     trackStatus<S extends keyof Draft<S> & string>(x: keyof Draft<S>) {
//         this.builder.addCase(this.thunk.pending, (state, action) => {
//             state[x];
//         });
//     }
// }

// type Split<S extends string, D extends string> = string extends S
//     ? string[]
//     : S extends ""
//       ? []
//       : S extends `${infer T}${D}${infer U}`
//         ? [T, ...Split<U, D>]
//         : [S];
