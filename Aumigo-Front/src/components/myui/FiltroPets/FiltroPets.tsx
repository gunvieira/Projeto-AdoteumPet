import { FiltroBotao } from "@/components/myui/BotaoPadrao/Botao.tsx";

type Filtros = {
    sexo: "Todos" | "Macho" | "Fêmea";
    especie: "Todos" | "Cachorro" | "Gato";
};

interface FiltroPetsProps {
    filtrosAtuais: Filtros;
    onChange: (novosFiltros: Filtros) => void;
}
export function FiltroPets({ filtrosAtuais, onChange }: FiltroPetsProps) {
    return (
        <div className="mb-6">
            <div className="mb-4">
                <h4 className="font-semibold mb-2">Sexo</h4>
                <div className="flex flex-wrap gap-2">
                    {(["Todos", "Fêmea", "Macho"] as const).map((s) => (
                        <FiltroBotao
                            key={s}
                            isActive={filtrosAtuais.sexo === s}
                            onClick={() => onChange({ ...filtrosAtuais, sexo: s })}
                        >
                            {s}
                        </FiltroBotao>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Espécie</h4>
                <div className="flex flex-wrap gap-2">
                    {(["Todos", "Cachorro", "Gato"] as const).map((e) => (
                        <FiltroBotao
                            key={e}
                            isActive={filtrosAtuais.especie === e}
                            onClick={() => onChange({ ...filtrosAtuais, especie: e })}
                        >
                            {e}
                        </FiltroBotao>
                    ))}
                </div>
            </div>
        </div>
    );
}