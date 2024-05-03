import { TableCell, TableRow } from "@mui/material";

export function tableHeader(headers: string[]) {
    const cells = headers.map(header => (
        <TableCell>
            <b>{header}</b>
        </TableCell>
    ));

    return <TableRow>{cells}</TableRow>;
}
