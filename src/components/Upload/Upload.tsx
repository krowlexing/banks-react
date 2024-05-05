import { Box, Button, Input } from "@mui/material";
import { useRef, useState } from "react";
import { postFile } from "../../network/api";
import { fetchEntries, useAppDispatch } from "../../reducers/store";

interface Props {}

export function Upload(props: Props) {
    const [files, openFile] = useFileInput();
    const dispatch = useAppDispatch();

    return (
        <>
            <Button onClick={openFile}>Выбрать файл</Button>
            <Box>Selected: {files?.length && files[0].name}</Box>
            <Button
                onClick={() => {
                    if (files?.length) {
                        postFile(files[0]).then(() => dispatch(fetchEntries()));
                    }
                }}
            >
                Загрузить
            </Button>
        </>
    );
}

function funnyFunFunction(onFilesChange: (files: FileList | null) => void) {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e: Event) => {
        const inputElement = e.target as HTMLInputElement;
        const files = inputElement.files;
        onFilesChange(files);
    };
    return input;
}

function useFileInput() {
    const [files, setFiles] = useState<FileList | null>(null);
    const input = useRef(funnyFunFunction(setFiles));

    return [files, () => input.current.click()] as const;
}
