import {
    Paper,
    SxProps,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { Ed807Metadata } from "../data/Ed807";
import { ReactNode, useMemo } from "react";
import { TableComponents, TableVirtuoso, Virtuoso } from "react-virtuoso";
import React from "react";

interface Props<T> {
    description: TableDescription<T>;
    values: T[];
    onRowClick: (value: T) => void;
    onColumnHeaderClick?: (key: keyof TableDescription<T>) => void;
    sx?: SxProps;
}

export function GenericTable<T>(props: Props<T>) {
    const { description, values, sx } = props;
    const { onRowClick, onColumnHeaderClick } = props;

    const header = generateHeader(description, onColumnHeaderClick);
    const body = generateBody(description, values, onRowClick);

    return (
        <>
            <TableVirtuoso
                style={{ height: "900px" }}
                data={values}
                components={components(onRowClick)}
                fixedHeaderContent={() =>
                    generateHeader(description, onColumnHeaderClick)
                }
                itemContent={(_, entry) => rowContent(description, entry)}
            />
        </>
    );
}

function rowContent<T>(description: TableDescription<T>, value: T) {
    const keys = Object.keys(description) as (keyof TableDescription<T>)[];

    const cells = keys.map(key => (
        <TableCell>{value[key] as ReactNode}</TableCell>
    ));

    return <>{cells}</>;
}

function nativeRowContent<T>(description: TableDescription<T>, value: T) {
    const keys = Object.keys(description) as (keyof TableDescription<T>)[];

    const cells = keys.map(key => <td>{value[key] as ReactNode}</td>);

    return <>{cells}</>;
}

function generateHeader<T>(
    description: TableDescription<T>,
    onColumnClicked?: (key: keyof TableDescription<T>) => void,
) {
    const keys = Object.keys(description) as (keyof TableDescription<T>)[];

    const cells = keys.map(key => (
        <TableCell onClick={() => onColumnClicked && onColumnClicked(key)}>
            <b>{description[key]}</b>
        </TableCell>
    ));

    return <TableRow>{cells}</TableRow>;
}

function generateNativeHeader<T>(
    description: TableDescription<T>,
    onColumnClicked?: (key: keyof TableDescription<T>) => void,
) {
    const keys = Object.keys(description) as (keyof TableDescription<T>)[];

    const cells = keys.map(key => (
        <td onClick={() => onColumnClicked && onColumnClicked(key)}>
            <b>{description[key]}</b>
        </td>
    ));

    return <tr>{cells}</tr>;
}

function components<T>(onRowClick: (item: T) => void): TableComponents<T> {
    return {
        Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: props => (
            <Table
                {...props}
                sx={{
                    borderCollapse: "separate",
                    tableLayout: "fixed",
                }}
            />
        ),
        TableHead: props => (
            // @ts-expect-error Virtuoso's props and TableHead's props are not exact match
            <TableHead {...props} sx={{ background: "white" }} />
        ),
        TableRow: ({ item, ...props }) => (
            <TableRow
                {...props}
                onClick={() => onRowClick(item)}
                sx={{
                    transition: "all 0.1s linear",
                    ":hover": {
                        backgroundColor: "gray",
                    },
                }}
            />
        ),
        TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
            <TableBody {...props} ref={ref} />
        )),
    };
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
