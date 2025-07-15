import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, LoaderCircle, AlertTriangle, CheckCircle } from "lucide-react";
import Header from "@/components/myui/Header/Header.tsx";
import Footer from "@/components/myui/Footer/Footer.tsx";
import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao";
import api from "@/services/api.ts";

interface Pet {
    idAnimal: number;
    nome: string;
    sexo: "Macho" | "Fêmea";
    especie: "Cachorro" | "Gato";
    dataNasc: string;
    porte: string;
    midiaImagem: string;
}

interface Usuario {
    id: number;
}

function calcularIdade(dataNasc: string): string {
    const dataNascimento = new Date(dataNasc);
    const hoje = new Date();
    let anos = hoje.getFullYear() - dataNascimento.getFullYear();
    let meses = hoje.getMonth() - dataNascimento.getMonth();
    if (meses < 0 || (meses === 0 && hoje.getDate() < dataNascimento.getDate())) {
        anos--;
        meses = meses < 0 ? meses + 12 : 11;
    }
    if (anos === 0 && meses === 0) return "Menos de 1 mês";
    const partes: string[] = [];
    if (anos > 0) partes.push(`${anos} ${anos > 1 ? 'anos' : 'ano'}`);
    if (meses > 0) partes.push(`${meses} ${meses > 1 ? 'mês' : 'meses'}`);
    return partes.join(' e ');
}

export function PaginaDetalhesPet() {
    const { petId } = useParams<{ petId: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [idade, setIdade] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isAdopting, setIsAdopting] = useState(false);
    const [adoptionError, setAdoptionError] = useState<string | null>(null);
    const [adoptionSuccess, setAdoptionSuccess] = useState(false);

    useEffect(() => {
        if (!petId) return;
        const buscarPet = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get<Pet>(`/animais/${petId}`);
                setPet(response.data);
                setIdade(calcularIdade(response.data.dataNasc));
            } catch (err) {
                setError(axios.isAxiosError(err) && err.response?.status === 404
                    ? "Pet não encontrado."
                    : "Não foi possível carregar as informações."
                );
            } finally {
                setLoading(false);
            }
        };
        buscarPet();
    }, [petId]);

    const handleAdocao = async () => {
        const usuarioJson = sessionStorage.getItem('id');
        if (!usuarioJson) {
            setAdoptionError("Você precisa estar logado para adotar.");
            return;
        }
        if (!pet) return;

        const usuario: Usuario = JSON.parse(usuarioJson);
        const adoptionPayload = {
            dataAdocao: new Date().toISOString().split('T')[0],
            status: "PENDENTE",
            idUsuario: usuario,
            idAnimal: pet.idAnimal,
        };

        setIsAdopting(true);
        setAdoptionError(null);
        setAdoptionSuccess(false);
        try {
            console.log(adoptionPayload)
            await api.post('/adocoes', adoptionPayload);
            setAdoptionSuccess(true);
        } catch (err) {
            setAdoptionError("Ocorreu um erro ao processar seu pedido.");
        } finally {
            setIsAdopting(false);
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-10 w-10 animate-spin text-primary" /></div>;
    }

    if (error || !pet) {
        return <div className="flex h-screen items-center justify-center text-red-600"><AlertTriangle className="mr-2"/>{error}</div>;
    }

    return (
        <>
            <Header />
            <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
                <div className="container mx-auto p-4 md:p-8">
                    <Link to="/adote" className="inline-flex items-center text-primary mb-6 hover:underline font-semibold">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para a lista
                    </Link>
                    <Card className="w-full max-w-5xl mx-auto overflow-hidden shadow-lg">
                        <div className="grid md:grid-cols-2">
                            <div className="h-[400px] md:h-[600px]">
                                <img src={pet.midiaImagem} alt={`Foto de ${pet.nome}`} className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col p-6 sm:p-8">
                                <CardHeader>
                                    <CardTitle className="text-4xl lg:text-5xl font-extrabold">{pet.nome}</CardTitle>
                                    <CardDescription className="text-lg">{pet.especie}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4 text-base">
                                    <p><strong>Sexo:</strong> {pet.sexo}</p>
                                    <p><strong>Idade:</strong> {idade}</p>
                                    <p><strong>Porte:</strong> {pet.porte}</p>
                                </CardContent>
                                <CardFooter className="flex-col items-start gap-4">
                                    <BotaoEntrar
                                        onClick={handleAdocao}
                                        isLoading={isAdopting}
                                        disabled={adoptionSuccess}
                                        className="w-80 h-12 text-[24px]"
                                    >
                                        Quero Adotar!
                                    </BotaoEntrar>
                                    {adoptionSuccess && (
                                        <div className="flex items-center text-green-600 font-semibold">
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                            Pedido de adoção enviado com sucesso!
                                        </div>
                                    )}
                                    {adoptionError && (
                                        <div className="flex items-center text-red-600 font-semibold">
                                            <AlertTriangle className="mr-2 h-5 w-5" />
                                            {adoptionError}
                                        </div>
                                    )}
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
}