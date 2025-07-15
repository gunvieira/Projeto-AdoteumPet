import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "@/context/AuthContext.tsx";

const RotaProtegida = () => {
    const {isLoggedIn} = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/entrar" replace/>;
    }

    return <Outlet/>;
}
export default RotaProtegida;


