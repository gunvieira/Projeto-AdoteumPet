import {Botao, BotaoSegundario} from "@/components/myui/BotaoPadrao/Botao.tsx";


export default function Acesso() {
    return (
        <div className="flex flex-row items-center gap-5 ">
            <BotaoSegundario to="/entrar"> Entrar </BotaoSegundario>
            <Botao to="/cadastro" tsize="text-[18px]">Cadastre-se</Botao>
        </div>
    )
}