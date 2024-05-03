import { useLoaderData, useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { tablefy } from "../components/tablefy";
import { BankEntry } from "../data/BankEntry";
import { participantInfoReadableNames } from "../data/ParticipantInfo";

export function BankPage() {
    const params = useParams();
    const navigate = useNavigate();
    const id = params["id"];
    const bank: BankEntry = useLoaderData() as BankEntry;
    const table = tablefy(bank.participantInfo, participantInfoReadableNames);
    return (
        <>
            <Container>
                BankPage - {id}
                {table}
                <button onClick={() => navigate(`/banks/${id}/edit`)}>
                    Edit
                </button>
            </Container>
        </>
    );
}

const Container = styled.div`
    background-color: lightgray;
`;
