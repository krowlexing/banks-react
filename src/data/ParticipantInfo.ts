export interface ParticipantInfo {
    russianName: string;
    englishName?: string;
    regN?: string;
    countryCode?: string;
    region: string;
    ind?: string;
    tnp: string;
    nnp?: string;
    adr?: string;
    parentBic?: number;
    dateIn: string;
    dateOut?: string;
    svrvcs: string;
    xchType: string;
    uid: number;
    participantStatus: ParticipantStatus;
    restriction: Restriction[];
}

export const participantInfoReadableNames: Tableficator<
    Omit<ParticipantInfo, "restriction">
> = {
    russianName: "название",
    englishName: "инглиш",
    regN: "region N",
    countryCode: "contryCode",
    region: "region",
    ind: "ind",
    tnp: "tnp",
    nnp: "nnp",
    adr: "adr",
    parentBic: "parentBic",
    dateIn: "date in",
    dateOut: "date out",
    svrvcs: "svrvrsvs",
    xchType: "xch type",
    uid: "uid",
    participantStatus: {
        name: "Статус участника",
        valueHint: (value: ParticipantStatus) => {
            if (value === "PSAC") {
                return "Активный";
            } else {
                return "Удаленный";
            }
        },
    },
};

export type RowTableficator<T> = {
    name: string;
    valueHint: (value: T) => string;
};

export type Tableficator<T> = {
    [key in keyof T]: RowTableficator<T[key]> | string;
};

export type ParticipantStatus = "PSAC" | "PSDL";

interface Restriction {}
