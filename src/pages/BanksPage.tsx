import { useNavigate } from "react-router";
import { BankCard } from "../components/BankCard";
import { requestInitBanks } from "../network/api";
import { initBanks, useAppDispatch, useAppSelector } from "../reducers/store";

interface Props {}

export function BanksPage(props: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const banks = useAppSelector(state => state.banks);
    const init = useAppSelector(state => state.initBanks);
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
                {banks.map(bank => (
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
