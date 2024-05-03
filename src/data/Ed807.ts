import { BankEntry } from "./BankEntry";

export interface Ed807 {
    edNo: number;
    creationReason: string;
    infoTypeCode: string;
    id: number;
    author: number;
    receiver?: number;

    creationDateTime: string;
    edDate: string;
    businessDay: string;
    directoryVersion?: number;

    entries: BankEntry[];
}
