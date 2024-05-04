import { useNavigate } from "react-router";
import { initBanks, useAppDispatch, useAppSelector } from "../reducers/store";
import { GenericTable, TableDescription } from "../components/GenericTable";
import { ParticipantInfo } from "../data/ParticipantInfo";

export function BanksPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const entry = useAppSelector(state => state.requests.singleEntry.value);
    const init = useAppSelector(state => state.initBanks);
    const banks = entry?.entries.map(e => e.participantInfo);
    return (
        <>
            <div>BankPage</div>

            <button
                onClick={() => {
                    dispatch(initBanks());
                }}
            >
                Init
            </button>
            <div>
                {banks && (
                    <GenericTable
                        sx={{}}
                        description={bankDescription}
                        values={banks}
                        onRowClick={() => {}}
                    />
                )}
            </div>
            {init}
        </>
    );
}

const bankDescription: TableDescription<Partial<ParticipantInfo>> = {
    russianName: "Название",
    englishName: "english",
    uid: "uid",
    xchType: "xch type",
    tnp: "тип",
    nnp: "Населенный пункт",
    dateIn: "Date in",
    participantStatus: "status",
    region: "region",
    svrvcs: "serrse",
    countryCode: "code",
    adr: "adr",
    dateOut: "dateOut",
    ind: "ind",
    parentBic: "parent bic",
    regN: "regn",
};
