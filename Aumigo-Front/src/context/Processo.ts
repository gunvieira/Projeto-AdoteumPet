export interface IProcesso {
    idAdocao: number;
    dataAdocao: string;

    animal: {
        idAnimal: number;
        nome: string;
        midiaImagem: string;
        porte: string;
        sexo: string;
        raca: string
        especie: string;
        status: 'PENDENTE' | 'APROVADO' | 'CADASTRADO';
    } | null;
    usuario: {
        id_usuario: number;
        nome: string;
        email: string;
        endereco: {cidade: string} | null;
        telefone: string;
    } | null;
}