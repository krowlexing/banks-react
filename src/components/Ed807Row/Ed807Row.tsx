import { TableCell, TableRow } from "@mui/material";
import { Ed807 } from "../../data/Ed807";
import emotionStyled from "@emotion/styled";

interface Props {
    entry: Ed807;
    onClick: (entry: Ed807) => void;
}

export function Ed807Row(props: Props) {
    const { entry, onClick } = props;

    return (
        <Container onClick={() => onClick(entry)}>
            <TableRow>
                <TableCell>{entry.creationReason}</TableCell>
                <TableCell>{entry.edNo}</TableCell>
                <TableCell>{entry.creationDateTime}</TableCell>
                <TableCell>{entry.businessDay}</TableCell>
            </TableRow>
        </Container>
    );
}

const Container = emotionStyled.div`
    transition: all 0.15s linear;

    :hover {
        background: gray;
    }
`;
