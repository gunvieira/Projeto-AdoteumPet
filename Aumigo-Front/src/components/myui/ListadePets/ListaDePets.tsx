import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiltroPets } from "@/components/myui/FiltroPets/FiltroPets";
import { PetCard } from "@/components/myui/Cardpets/Cardpets";
import { LoaderCircle } from "lucide-react";
import api from "@/services/api.ts";

interface PetDaApi {
    idAnimal: number;
    nome: string;
    sexo: "Macho" | "Fêmea";
    especie: "Cachorro" | "Gato";
    dataNasc: string;
    porte: string;
    midiaImagem: string;
    status: string;
}

interface Pet {
    idAnimal: number;
    nome: string;
    sexo: "Macho" | "Fêmea";
    especie: "Cachorro" | "Gato";
    tidade: string;
    porte: string;
    midiaImagem: string;
}

type Filtros = {
    sexo: "Todos" | "Macho" | "Fêmea";
    especie: "Todos" | "Cachorro" | "Gato";
};

function calcularCategoriaIdade(dataNasc: string): string {
    const dataNascimento = new Date(dataNasc);
    const dataAtual = new Date();

    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    const m = dataAtual.getMonth() - dataNascimento.getMonth();

    if (m < 0 || (m === 0 && dataAtual.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    if (idade < 2) {
        return "Filhote";
    } else if (idade <= 10) {
        return "Adulto";
    } else {
        return "Senior";
    }
}


export function ListaDePets() {
    const [searchParams, setSearchParams] = useSearchParams();

    const especieInicial = (searchParams.get("especie") || "Todos") as Filtros['especie'];
    const sexoInicial = (searchParams.get("sexo") || "Todos") as Filtros['sexo'];

    const [filtros, setFiltros] = useState<Filtros>({
        sexo: sexoInicial,
        especie: especieInicial
    });

    const [pets, setPets] = useState<Pet[]>([]);
    const [petsFiltrados, setPetsFiltrados] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<PetDaApi[]>("/animais")
            .then((response) => {
                const petsProcessados = response.data
                    .filter(petDaApi => petDaApi.status === "CADASTRADO")
                    .map(petDaApi => ({
                        ...petDaApi,
                    tidade: calcularCategoriaIdade(petDaApi.dataNasc)
                }));
                setPets(petsProcessados);
            })
            .catch(error => console.error("Erro ao buscar a lista de pets:", error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const resultado = pets.filter((pet) => {
            const sexoOk = filtros.sexo === "Todos" || pet.sexo === filtros.sexo;
            const especieOk = filtros.especie === "Todos" || pet.especie === filtros.especie;
            return sexoOk && especieOk;
        });
        setPetsFiltrados(resultado);

        const params = new URLSearchParams();

        if (filtros.especie !== "Todos") {
            params.set("especie", filtros.especie);
        }
        if (filtros.sexo !== "Todos") {
            params.set("sexo", filtros.sexo);
        }
        setSearchParams(params, { replace: true });

    }, [filtros, pets, setSearchParams]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center"><LoaderCircle className="h-12 w-12 animate-spin text-primary" /></div>;
    }
    return (
        <div className="container mx-auto p-4 md:p-8 space-y-8">
            <div>
                <h1 className="text-4xl font-bold text-center">Encontre seu novo amigo</h1>
                <p className="text-center text-muted-foreground mt-2">Filtre para encontrar o pet ideal para você</p>
            </div>
            <FiltroPets filtrosAtuais={filtros} onChange={setFiltros} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {petsFiltrados.map((pet) => (
                    <Link to={`/pet/${pet.idAnimal}`} key={pet.idAnimal} className="no-underline">
                        <PetCard
                            nome={pet.nome}
                            imagem={pet.midiaImagem}
                            tidade={pet.tidade}
                            porte={pet.porte}
                            sexo={pet.sexo}
                        />
                    </Link>
                ))}
            </div>
            {petsFiltrados.length === 0 && !loading && (
                <p className="text-center text-lg text-muted-foreground py-10">Nenhum pet encontrado com esses filtros.</p>
            )}
        </div>
    );
}