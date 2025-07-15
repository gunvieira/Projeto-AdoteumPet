import Acesso from "@/components/myui/Acesso/Acesso.tsx";
import NavBar from "@/components/myui/NavBar/NavBar.tsx";
import Logo from "@/components/myui/Logo/Logo.tsx";
import { FaUserCircle } from "react-icons/fa";
import {useAuth} from "@/context/AuthContext.tsx";
import {Link} from "react-router";
export default function Header() {
    const {isLoggedIn} = useAuth();
    return (
        <div className="shadow-sm/5 ">
        <header className="flex flex-col my-0 w-full max-w-screen-xl mx-auto px-4 pt-1 ">
            <div className="flex flex-row justify-between items-center py-3 ">
                <div className="flex flex-row w-98 justify-between items-center">
                    <Logo/>
                    <NavBar/>
                </div>
                <nav>
                    {isLoggedIn ? (
                        <>
                            <Link to="/dadospessoais">
                            <div className="flex font-dosis items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                                <FaUserCircle className="text-4xl text-emerald-400" />
                                <h1 className="font-semibold">Perfil</h1>
                            </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Acesso/>
                        </>
                    )}
                </nav>
            </div>
        </header>
        </div>
    )
}


