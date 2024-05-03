import { Table, TableCell, TableRow, Tooltip } from "@mui/material";
import { Tableficator } from "../data/ParticipantInfo";

export function tablefy<T>(tableObject: T, names?: Tableficator<T>) {
    let rows;
    if (names) {
        rows = Object.keys(names).map(k => {
            const key = k as keyof Tableficator<T>;
            const row = names[key];
            if (typeof row === "string") {
                return (
                    <TableRow>
                        <TableCell>{row}</TableCell>
                        <TableCell>{"" + tableObject[key]}</TableCell>
                    </TableRow>
                );
            } else {
                const rowValue = tableObject[key] as JSX.Element;

                const tooltip = row.valueHint ? (
                    <Tooltip title={row.valueHint(tableObject[key])}>
                        {rowValue}
                    </Tooltip>
                ) : (
                    rowValue
                );
                return (
                    <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{tooltip}</TableCell>
                    </TableRow>
                );
            }
        });
    } else {
        rows = <TableCell>biggger</TableCell>;
    }

    return <Table>{rows}</Table>;
}
