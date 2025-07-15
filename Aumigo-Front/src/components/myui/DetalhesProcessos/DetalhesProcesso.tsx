import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import BotaoEntrar from "../BotaoPadrao/Botao";
import {IProcesso} from "@/context/Processo.ts";
import api from "@/services/api.ts";

interface DetalhesProcessoProps {
    children: ReactNode;
    processo: IProcesso;
    onUpdate: () => Promise<void>;
}

export default function DetalhesProcesso({ children, processo, onUpdate }: DetalhesProcessoProps) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateStatus = async (novoStatus: 'APROVADO' | 'RECUSADO') => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.post('/adocoes/status', {
                idAdocao: processo.idAdocao,
                status: novoStatus
            });
            await onUpdate();
            setOpen(false);
        } catch (err) {
            console.error(`Erro ao atualizar o status para ${novoStatus}:`, err);
            setError('Falha ao atualizar o status. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderActionFooter = () => {
        if (processo.animal?.status === 'PENDENTE') {
            return (
                <div className="flex flex-row justify-center gap-5 mt-6">
                    <BotaoEntrar
                        onClick={() => handleUpdateStatus('APROVADO')}
                        isLoading={isSubmitting}
                        variant="primary"
                        disabled={isSubmitting}
                    >
                        Aceitar
                    </BotaoEntrar>
                    <BotaoEntrar
                        onClick={() => handleUpdateStatus('RECUSADO')}
                        isLoading={isSubmitting}
                        className="bg-red-500 hover:bg-red-600"
                        disabled={isSubmitting}
                    >
                        Recusar
                    </BotaoEntrar>
                </div>
            );
        }

        return (
            <div className="mt-6 text-center">
                <p className="text-gray-600 font-medium bg-gray-100 p-3 rounded-md">
                    Este processo foi finalizado com o status: <strong>{processo.animal?.status}</strong>
                </p>
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
                setError(null);
            }
        }}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detalhes do processo de adoção</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col">
                    <div className="bg-white rounded-lg p-2 w-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <img
                                    src={processo.animal?.midiaImagem || '/imagem-placeholder.png'}
                                    alt={processo.animal?.nome || 'Animal'}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <h2 className="text-xl font-bold">{processo.animal?.nome || 'Animal sem nome'}</h2>
                            </div>
                            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                                 {processo.animal?.status}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                            {/* 2. Acesso seguro a todos os dados */}
                            <div><strong>Nome do animal:</strong> {processo.animal?.nome || 'Não informado'}</div>
                            <div><strong>Data do pedido:</strong> {new Date(processo.dataAdocao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</div>
                            <div><strong>Número do pedido:</strong> #{processo.idAdocao}</div>
                            <div><strong>Cidade:</strong> {processo.usuario?.endereco?.cidade || 'Não informado'}</div>
                            <div><strong>Nome do Solicitante:</strong> {processo.usuario?.nome || 'Não informado'}</div>
                            <div><strong>Email:</strong> {processo.usuario?.email || 'Não informado'}</div>
                            <div><strong>Telefone:</strong> {processo.usuario?.telefone || 'Não informado'}</div>
                        </div>
                    </div>
                    <DialogDescription className="sr-only">
                        Revise as informações do solicitante e do animal. Você pode aprovar ou recusar o pedido de adoção.
                    </DialogDescription>

                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

                    {renderActionFooter()}
                </div>
            </DialogContent>
        </Dialog>
    );
}