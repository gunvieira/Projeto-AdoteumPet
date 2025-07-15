import { Card, CardContent } from "@/components/ui/card";

interface PetCardProps {
    nome: string;
    imagem: string;
    sexo: string;
    tidade: string;
    porte: string;
}

export function PetCard({ nome, imagem, sexo, tidade, porte }: PetCardProps) {
    return (
        <Card className="w-70 border rounded-xl overflow-hidden  ">
            <div className="flex flex-row p-5">
            <img
                src={imagem}
                alt={`Foto de ${nome}`}
                className="w-50 h-60 object-cover rounded-md"
            />
            </div>
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-black">{nome}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    {`${sexo} | ${tidade} | ${porte}`}
                </p>
            </CardContent>
        </Card>
    );
}
