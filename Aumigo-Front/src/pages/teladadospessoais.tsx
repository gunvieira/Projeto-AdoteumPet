import HeaderSimples from "@/components/myui/Header/HeaderSimples.tsx";
import Footer from "@/components/myui/Footer/Footer";
import ConteudoDadosPessoais from "@/components/myui/ConteudoDadosPessoais/ConteudoDadosPessoais.tsx";

export default function TelaDadosPessoais() {
    return (
        <>
            <HeaderSimples/>
            <ConteudoDadosPessoais/>
            <Footer/>
        </>
    );
}