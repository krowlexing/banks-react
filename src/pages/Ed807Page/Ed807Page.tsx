import { useNavigate } from "react-router";
import {
    fetchEntries,
    useAppDispatch,
    useAppSelector,
} from "../../reducers/store";
import { GenericTable, ed807Description } from "../../components/GenericTable";
import { IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export function Ed807Page() {
    const navigate = useNavigate();

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
                <Stack direction="row" alignItems="center">
                    <IconButton>
                        <Add color="secondary" />
                    </IconButton>
                    <Typography>Добавить</Typography>
                </Stack>

                <GenericTable
                    sx={{}}
                    description={ed807Description}
                    values={entries}
                    onRowClick={entry => navigate(`/files/${entry.id}`)}
                />
            </Paper>
        </div>
    );
}
