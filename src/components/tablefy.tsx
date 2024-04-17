import { Table, TableCell, TableRow, Tooltip } from "@mui/material";
import { ReactNode } from "react";
import { Tableficator } from "../data/ParticipantInfo";

export function tablefy<T>(tableObject: T, names?: Tableficator<T>) {
    let rows;
    if (names) {
        rows = Object.keys(names).map(key => {
            const row = names[key];
            if (typeof row === "string") {
                return (
                    <TableRow>
                        <TableCell>{row}</TableCell>
                        <TableCell>{"" + tableObject[key]}</TableCell>
                    </TableRow>
                );
            } else {
                const tooltip = row.valueHint ? (
                    <Tooltip title={row.valueHint(tableObject[key])}>
                        {tableObject[key]}
                    </Tooltip>
                ) : (
                    tableObject[key]
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
