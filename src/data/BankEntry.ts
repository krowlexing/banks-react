import { ParticipantInfo } from "./ParticipantInfo";

export interface BankEntry {
    bic: number;
    changeType: "";
    participantInfo: ParticipantInfo;
    swiftBics: SwiftBic[];
    accounts: Account[];
}

interface Account {}

interface SwiftBic {}
