import { GoShieldCheck } from "react-icons/go";
import Logo from "@/components/myui/Logo/Logo.tsx";

export default function HeaderSimples() {
    return (
        <div className="shadow-sm/5 ">
        <header className="flex flex-col my-2 w-full max-w-screen-xl mx-auto px-4 ">
            <div className="flex flex-row justify-between items-center py-2  ">
                <div className="flex flex-row w-98 justify-between items-center">
                    <Logo/>

                </div>
                <div className="flex flex-row font-dosis items-center gap-1">
                    <GoShieldCheck />
                    <h1>Ambiente 100% seguro</h1>
                </div>

            </div>

        </header>
        </div>
    )
}