import axios from "axios";
import { BankEntry } from "../data/BankEntry";
import { Ed807 } from "../data/Ed807";

export async function requestBanks(id: number) {
    return await axios.get<Ed807>(`/api/ed807/${id}`);
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
    return await axios.postForm(`/api/files/`, { file });
}

export async function requestEntries() {
    return await axios.get(`/api/ed807/`);
}
