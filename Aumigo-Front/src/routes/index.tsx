import {Routes, Route} from "react-router-dom";
import Home from "@/pages/home.tsx";
import Adotar from "@/pages/adotar.tsx";
import Colabore from "@/pages/colabore.tsx";
import TelaProcessos from "@/pages/processocliente.tsx";
import Entrar from "@/pages/entrar.tsx";
import QuemSomosTela from "@/pages/quemsomos.tsx";
import Cadastrar from "@/pages/cadastrar.tsx";
import TelaDadosPessoais from "@/pages/teladadospessoais.tsx";
import {PaginaDetalhesPet} from "@/components/myui/infoPets/InfoPets.tsx";
import TelacadastrarAnimal from "@/pages/telacadastraranimal.tsx";
import RotaProtegida from "@/components/myui/RotaProtegida/RotaProtegida.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adote" element={<Adotar/>} />
            <Route path="/quem-somos" element={<QuemSomosTela/>} />
            <Route path="/colabore" element={<Colabore/>} />
            <Route path="/entrar" element={<Entrar/>} />
            <Route path="/cadastro" element={<Cadastrar/>} />
            <Route path="/pet/:petId" element={<PaginaDetalhesPet />} />
            <Route element={<RotaProtegida />}>
                <Route path="/dadospessoais" element={<TelaDadosPessoais/>} />
                <Route path="/processos" element={<TelaProcessos/>} />
                <Route path="/cadastraranimal" element={<TelacadastrarAnimal/>} />
            </Route>
        </Routes>

    )
}