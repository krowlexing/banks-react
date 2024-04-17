import styled from "@emotion/styled";
import { BankEntry } from "../data/BankEntry";

interface Props {
    bank: BankEntry;
    onClick: (bank: BankEntry) => void;
}

export function BankCard(props: Props) {
    const { bank, onClick } = props;

    return (
        <Container onClick={() => onClick(bank)}>
            <div>{bank.bic}</div>
            <div>{bank.participantInfo.russianName}</div>
        </Container>
    );
}

const Container = styled.div`
    background-color: lightgray;
    padding: 0.5rem;
    margin: 5px;
`;
