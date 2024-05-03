import { useNavigate } from "react-router";
import { BankCard } from "../components/BankCard";
import { initBanks, useAppDispatch, useAppSelector } from "../reducers/store";

export function BanksPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const entry = useAppSelector(state => state.requests.singleEntry.value);
    const init = useAppSelector(state => state.initBanks);
    const banks = entry?.entries;
    return (
        <>
            <div>BankPage</div>

            <button
                onClick={() => {
                    dispatch(initBanks());
                }}
            >
                Init
            </button>
            <div>
                {banks &&
                    banks.map(bank => (
                        <BankCard
                            bank={bank}
                            onClick={bank => navigate(`/banks/${bank.bic}`)}
                        />
                    ))}
            </div>
            {init}
        </>
    );
}
