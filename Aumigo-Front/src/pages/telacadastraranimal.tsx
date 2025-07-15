import HeaderSimples from "@/components/myui/Header/HeaderSimples.tsx";
import Footer from "@/components/myui/Footer/Footer";
import CadastrarAnimal from "@/components/myui/TelaCadastrarAnimal/TelaCadstrarAnimal.tsx";

export default function TelacadastrarAnimal() {
    return (
        <>
            <HeaderSimples/>
            <CadastrarAnimal/>
            <Footer/>
        </>
    );
}