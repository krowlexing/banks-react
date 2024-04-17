import { useLoaderData, useNavigate } from "react-router";
import { BankEntry } from "../data/BankEntry";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateBank } from "../network/api";

interface BankFormInput {
    russianName: string;
}

export function EditPage() {
    const { register, handleSubmit } = useForm<BankFormInput>();
    const existingBank = useLoaderData() as BankEntry;
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<BankFormInput> = data => {
        updateBank({
            ...existingBank,
            participantInfo: { ...existingBank.participantInfo, ...data },
        }).then(() => navigate(-1));
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>название</label>
                <input {...register("russianName")}></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
