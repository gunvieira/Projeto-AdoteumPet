import { Botao } from "@/components/myui/BotaoPadrao/Botao.tsx";
import CampoDeDados from "../CampoDeDados/CampoDeDados";
import { useEffect, useState, Fragment } from "react";
import {useAuth} from "@/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import api from "@/services/api.ts";

interface Endereco {
    logradouro: string;
    bairro: string;
    numero: number;
    complemento: string;
    cep: string;
    cidade: string;
}

interface dadosUsuario {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    endereco: Endereco;
}

export default function ConteudoDadosPessoais() {
    const [dados, setDados] = useState<dadosUsuario | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const formatarNomeProprio = (nome: string | undefined): string => {
        if (!nome) {
            return "";
        }
        return nome
            .split(' ')
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
            .join(' ');
    };

    useEffect(() => {

        const usuarioId = sessionStorage.getItem('id');
        if (usuarioId) {
            api.get<dadosUsuario>(`/users/${usuarioId}`)
                .then((response) => {
                    setDados(response.data);
                })
                .catch(error => {
                    console.error("Erro ao buscar dados do usuário:", error);
                    setErro("Não foi possível carregar os dados. Tente novamente mais tarde.");
                });
        } else {
            console.error("ID do usuário não encontrado na sessão.");
            setErro("Sessão inválida. Por favor, faça o login novamente.");
        }
    }, []);


    const [podeCadastrar, setPodeCadastrar] = useState<boolean>(false);

    useEffect(() => {
        const tipoUsuario: string | null = sessionStorage.getItem('tipoUsuario');
        if (tipoUsuario !== '0') {
            setPodeCadastrar(true);
        }
    }, []);

    return (
        <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
            <div className="min-h-screen bg-white flex">
                <aside className="w-48 bg-white p-6 px-5 border-r border-gray-200 flex flex-col">
                    <h2 className="text-lg font-semibold mb-10">Minha conta</h2>
                    <nav className="flex flex-col gap-4">
                        <Botao to="#" tsize="text-[18px]" customClasses="w-40">Dados Pessoais</Botao>
                        <Botao to="/processos" tsize="text-[18px]" customClasses="w-40">Processos</Botao>

                        {podeCadastrar && (
                            <Botao to="/cadastraranimal" tsize="text-[18px]" customClasses="w-40">
                                Cadastrar animal
                            </Botao>
                        )}

                        <Botao onClick={handleLogout} tsize="text-[18px]" customClasses="w-40">Sair</Botao>
                    </nav>
                </aside>

                <main className="flex-1 p-10">
                    <h1 className="text-2xl font-semibold mb-8">Dados pessoais</h1>

                    <div className="max-w-2xl flex flex-col gap-4">
                        {erro && <p className="text-red-500">{erro}</p>}
                        {!dados && !erro && <p>Carregando dados...</p>}

                        {dados && (
                            <Fragment>
                                <CampoDeDados label="Nome" value={formatarNomeProprio(dados.nome)} />
                                <CampoDeDados label="Email" value={dados.email} />
                                <CampoDeDados label="CPF" value={dados.cpf} />
                                <CampoDeDados label="Telefone" value={dados.telefone} />

                                <CampoDeDados label="CEP" value={dados.endereco?.cep} />
                                <CampoDeDados label="Logradouro" value={dados.endereco?.logradouro} />
                                <CampoDeDados label="Número" value={String(dados.endereco?.numero)} />
                                <CampoDeDados label="Complemento" value={dados.endereco?.complemento || "Nenhum"} />
                                <CampoDeDados label="Bairro" value={dados.endereco?.bairro} />
                                <CampoDeDados label="Cidade" value={dados.endereco?.cidade} />
                            </Fragment>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}