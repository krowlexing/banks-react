import axios from "axios";
import { BankEntry } from "../data/BankEntry";

export async function requestBanks() {
    return await axios.get<BankEntry[]>("/api/banks");
}

export async function requestInitBanks() {
    return await axios.get<void>("/api/banks/init/init");
}

export async function requestBank(bic: number) {
    return await axios.get<BankEntry>(`/api/banks/${bic}`);
}

export async function updateBank(bank: BankEntry) {
    return await axios.post<BankEntry>(`/api/banks/${bank.bic}`, bank);
}

export async function postFile(file: File) {
    return await axios.postForm(`/api/`, { file });
}
