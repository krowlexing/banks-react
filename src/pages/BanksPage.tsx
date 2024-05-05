import { useNavigate } from "react-router";
import { initBanks, useAppDispatch, useAppSelector } from "../reducers/store";
import { GenericTable, TableDescription } from "../components/GenericTable";
import { ParticipantInfo } from "../data/ParticipantInfo";
import {
    Input,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";

export function BanksPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const entry = useAppSelector(state => state.requests.singleEntry.value);
    const init = useAppSelector(state => state.initBanks);
    const [searchKey, setSearchKey] =
        useState<keyof TableDescription<ParticipantInfo>>("russianName");

    const [query, setQuery] = useState("");
    const [sortingCriteria, setSortingCriteria] = useState<
        keyof TableDescription<ParticipantInfo> | undefined
    >();

    const [isReverse, setReverse] = useState(false);

    const banks = entry?.entries.map(e => e.participantInfo);

    const filteredBanks = banks?.filter(bank =>
        `${bank[searchKey]}`!.toLowerCase().includes(query.toLowerCase()),
    );

    if (sortingCriteria) {
        filteredBanks?.sort((a, b) => {
            const valueA = a[sortingCriteria];
            const valueB = b[sortingCriteria];

            const k = isReverse ? -1 : 1;

            if (typeof valueA == "string" && typeof valueB == "string") {
                return k * valueA.localeCompare(valueB);
            } else if (typeof valueA == "string" && valueB == undefined) {
                return k * 1;
            } else if (valueA == undefined && typeof valueB == "string") {
                return k * -1;
            } else if (typeof valueA == "number" && typeof valueB == "number") {
                return k * (valueA - valueB);
            }

            return 0;
        });
    }

    const keys = Object.keys(
        bankDescription,
    ) as (keyof TableDescription<ParticipantInfo>)[];

    return (
        <>
            <Stack direction={"row"}>
                <Typography children={"Search:"} />
                <Input onChange={e => setQuery(e.target.value)}></Input>
                <Select
                    value={searchKey}
                    onChange={e =>
                        setSearchKey(
                            e.target
                                .value as keyof TableDescription<ParticipantInfo>,
                        )
                    }
                    sx={{ height: "2.5rem" }}
                >
                    {keys.map(key => (
                        <MenuItem value={key} children={bankDescription[key]} />
                    ))}
                </Select>
            </Stack>

            <div>
                {banks && (
                    <Paper sx={{ overflow: "hidden" }}>
                        <GenericTable
                            sx={{ overflow: "hidden" }}
                            description={bankDescription}
                            values={filteredBanks!}
                            onRowClick={() => {}}
                            onColumnHeaderClick={key => {
                                if (sortingCriteria == key) {
                                    setReverse(!isReverse);
                                } else {
                                    setReverse(false);
                                }

                                setSortingCriteria(key);
                            }}
                        />
                    </Paper>
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
    dateOut: "dateOut",
    participantStatus: "status",
    region: "region",
    svrvcs: "serrse",
    countryCode: "code",
    adr: "adr",
    ind: "ind",
    parentBic: "parent bic",
    regN: "regn",
};
