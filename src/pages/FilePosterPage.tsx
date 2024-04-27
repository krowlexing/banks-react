import { LegacyRef, useRef } from "react";
import { postFile } from "../network/api";

interface Props {}

export function FilePosterPage(props: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            Im posting very files there here
            <input ref={inputRef} type="file"></input>
            <button
                onClick={() => {
                    const files = inputRef.current!.files;
                    if (files) {
                        const file = files[0];
                        postFile(file);
                    }
                }}
            >
                Submit
            </button>
        </>
    );
}
