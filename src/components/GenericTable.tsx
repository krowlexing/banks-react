import {
    Paper,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { Ed807Metadata } from "../data/Ed807";
import { ReactNode } from "react";

interface Props<T> {
    description: TableDescription<T>;
    values: T[];
    onRowClick: (value: T) => void;
    sx?: SxProps;
}

export function GenericTable<T>(props: Props<T>) {
    const { description, values, onRowClick, sx } = props;

    const header = generateHeader(description);
    const body = generateBody(description, values, onRowClick);

    return (
        <Table sx={sx}>
            {header}
            {body}
        </Table>
    );
}

function generateHeader<T>(description: TableDescription<T>) {
    const values: string[] = Object.values(description);

    const cells = values.map(value => (
        <TableCell>
            <b>{value}</b>
        </TableCell>
    ));

    return (
        <TableHead>
            <TableRow>{cells}</TableRow>
        </TableHead>
    );
}

function generateBody<T>(
    description: TableDescription<T>,
    values: T[],
    onRowClick: (value: T) => void,
) {
    const keys = Object.keys(description) as (keyof TableDescription<T>)[];

    const rowStyle = {
        transition: "all 0.1s linear",
        ":hover": {
            backgroundColor: "gray",
        },
    };
    const rows = values.map(value => {
        const rowContent = keys.map(key => (
            <TableCell>{value[key] as ReactNode}</TableCell>
        ));
        return (
            <TableRow onClick={() => onRowClick(value)} sx={rowStyle}>
                {rowContent}
            </TableRow>
        );
    });
    return <TableBody>{rows}</TableBody>;
}

export type TableDescription<T> = {
    [K in keyof T]: string;
};

export const ed807Description: TableDescription<Ed807Metadata> = {
    id: "Id",
    author: "Author",
    businessDay: "Business day",
    creationDateTime: "Creation Date Time",
    creationReason: "Creation Reason",
    edDate: "Ed Date",
    edNo: "Ed No",
    infoTypeCode: "Info Type Code",
    directoryVersion: "Directory Version",
    receiver: "Receiver",
};
