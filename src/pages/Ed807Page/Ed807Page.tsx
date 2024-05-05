import { useNavigate } from "react-router";
import {
    fetchEntries,
    useAppDispatch,
    useAppSelector,
} from "../../reducers/store";
import { GenericTable, ed807Description } from "../../components/GenericTable";
import { Box, Button, Modal, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Upload } from "../../components/Upload";

export function Ed807Page() {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);

    const dispatch = useAppDispatch();
    const entriesStatus = useAppSelector(state => state.entriesStatus);
    const entries = useAppSelector(state => state.entries);

    return (
        <div>
            <div>
                {entriesStatus}
                <button
                    onClick={() => {
                        dispatch(fetchEntries());
                    }}
                >
                    Update
                </button>
            </div>

            <Paper>
                <Button
                    sx={{
                        margin: "5px",
                    }}
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleOpen}
                >
                    Добавить
                </Button>

                <GenericTable
                    sx={{}}
                    description={ed807Description}
                    values={entries}
                    onRowClick={entry => navigate(`/files/${entry.id}`)}
                />
            </Paper>
            <Modal open={modal} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        top: "50%",
                        left: "50%",
                        padding: "10rem",
                        width: "30rem",
                        height: "50%",
                    }}
                >
                    <Paper
                        sx={{
                            height: "100%",
                        }}
                    >
                        <Upload />
                    </Paper>
                </Box>
            </Modal>
        </div>
    );
}
