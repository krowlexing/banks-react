import { useNavigate } from "react-router";
import { Ed807Table } from "../../components/Ed807Table";
import {
    fetchEntries,
    useAppDispatch,
    useAppSelector,
} from "../../reducers/store";

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
                ></button>
            </div>
            <Ed807Table
                entries={entries}
                onRowClick={entry => navigate(`/files/${entry.id}`)}
            />
        </div>
    );
}
