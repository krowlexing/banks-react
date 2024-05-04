import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
} from "@mui/material";
import { Ed807 } from "../../data/Ed807";
import { Ed807Row } from "./Ed807Row";
import { tableHeader } from "../../utils/table";

interface Props {
    entries: Ed807[];
    onRowClick: (entry: Ed807) => void;
}

export function Ed807Table(props: Props) {
    const { entries, onRowClick } = props;

    const header = tableHeader(["reason", "fkalsdjf", "nitch"]);
    const rows = entries.map(entry => (
        <Ed807Row entry={entry} onClick={onRowClick} />
    ));
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>{header}</TableHead>
                <TableBody>{rows}</TableBody>
            </Table>
        </TableContainer>
    );
}
