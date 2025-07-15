import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyInput from "@/components/myui/Input/Input.tsx";
import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import api from "@/services/api.ts";

export default function TelaCadastro() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        cpf: '',
        tipoUsuario: 0,
        endereco: {
            logradouro: '',
            bairro: '',
            numero: '',
            complemento: '',
            cep: '',
            cidade: '',
            uf: '',
        }
    });

    // 1. Estado para armazenar as mensagens de erro
    const [errors, setErrors] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        endereco: {
            logradouro: '',
            bairro: '',
            numero: '',
            cep: '',
            cidade: '',
            uf: '',
        }
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 1) {
            setErrors(prev => ({ ...prev, [keys[0]]: '' }));
        } else {
            setErrors(prev => ({
                ...prev,
                endereco: { ...prev.endereco, [keys[1]]: '' }
            }));
        }

        if (keys.length === 1) {
            const key = keys[0] as keyof typeof formData;
            if (key !== 'endereco') {
                setFormData(prevState => ({
                    ...prevState,
                    [key]: value,
                }));
            }
        } else {
            const groupKey = keys[0];
            const fieldKey = keys[1];
            if (groupKey === 'endereco' && typeof formData.endereco === 'object' && formData.endereco !== null) {
                setFormData(prevState => ({
                    ...prevState,
                    endereco: {
                        ...prevState.endereco,
                        [fieldKey]: value,
                    },
                }));
            }
        }
    };

    const validateForm = () => {
        const tempErrors = {
            nome: '',
            email: '',
            senha: '',
            cpf: '',
            endereco: {
                logradouro: '',
                bairro: '',
                numero: '',
                cep: '',
                cidade: '',
                uf: '',
            }
        };
        let isValid = true;


        if (!formData.nome.trim()) {
            tempErrors.nome = 'O campo Nome é obrigatório.';
            isValid = false;
        }
        if (!formData.cpf.trim()) {
            tempErrors.cpf = 'O campo CPF é obrigatório.';
            isValid = false;
        }
        if (!formData.email.trim()) {
            tempErrors.email = 'O campo Email é obrigatório.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'O formato do email é inválido.';
            isValid = false;
        }
        if (!formData.senha.trim()) {
            tempErrors.senha = 'O campo Senha é obrigatório.';
            isValid = false;
        }


        if (!formData.endereco.cep.trim()) {
            tempErrors.endereco.cep = 'O campo CEP é obrigatório.';
            isValid = false;
        }
        if (!formData.endereco.logradouro.trim()) {
            tempErrors.endereco.logradouro = 'O campo Endereço é obrigatório.';
            isValid = false;
        }
        if (!formData.endereco.numero.trim()) {
            tempErrors.endereco.numero = 'O campo Número é obrigatório.';
            isValid = false;
        }
        if (!formData.endereco.bairro.trim()) {
            tempErrors.endereco.bairro = 'O campo Bairro é obrigatório.';
            isValid = false;
        }
        if (!formData.endereco.cidade.trim()) {
            tempErrors.endereco.cidade = 'O campo Cidade é obrigatório.';
            isValid = false;
        }
        if (!formData.endereco.uf.trim()) {
            tempErrors.endereco.uf = 'O campo UF é obrigatório.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!validateForm()) {
            console.log("Validação falhou. Formulário não enviado.");
            return;
        }

        setIsLoading(true);


        try {
            const response = await api.post('/users', formData);
            alert('Cadastro realizado com sucesso! ✅');
            console.log('Dados da resposta:', response.data);
            login(response.data.idUsuario);
            sessionStorage.setItem('tipoUsuario', String(response.data.tipoUsuario));
            navigate('/dadospessoais')

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Erro de resposta do servidor:', error.response.data);
                alert(`Erro no cadastro: ${error.response.data.message || 'Tente novamente.'} ❌`);
            } else {
                console.error('Erro de rede:', error);
                alert('Não foi possível conectar ao servidor. 🔌');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 w-full max-w-4xl border border-gray-200">
                <h1 className="text-3xl font-bold mb-8 text-emerald-700 text-center">Cadastre-se</h1>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col md:flex-row md:gap-8">
                        <div className="w-full md:w-1/2">
                            <MyInput
                                id="nome"
                                name="nome"
                                type="text"
                                label="Nome*"
                                placeholder="Nome completo"
                                value={formData.nome}
                                onChange={handleChange}
                                error={errors.nome}

                            />
                            <MyInput
                                id="cpf"
                                name="cpf"
                                type="text"
                                label="CPF*"
                                placeholder="000.000.000-00"
                                value={formData.cpf}
                                onChange={handleChange}
                                error={errors.cpf}
                                validationType="numbers"
                                applyCpfMask
                            />
                            <MyInput
                                id="telefone"
                                name="telefone"
                                type="text"
                                label="Celular"
                                placeholder="(00) 90000-0000"
                                value={formData.telefone}
                                onChange={handleChange}
                                validationType="numbers"

                            />
                            <MyInput
                                id="email"
                                name="email"
                                type="email"
                                label="Email*"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <MyInput
                                id="senha"
                                name="senha"
                                type="password"
                                label="Senha*"
                                placeholder="Crie uma senha forte"
                                value={formData.senha}
                                onChange={handleChange}
                                error={errors.senha}
                            />
                        </div>

                        <div className="hidden md:block border-l border-gray-200 mx-4"></div>
                        <hr className="my-6 border-gray-200 md:hidden" />

                        <div className="w-full md:w-1/2">
                            <MyInput
                                id="endereco.cep"
                                name="endereco.cep"
                                type="text"
                                label="CEP*"
                                placeholder="00000-000"
                                value={formData.endereco.cep}
                                onChange={handleChange}
                                error={errors.endereco.cep}
                                validationType="numbers"
                            />
                            <MyInput
                                id="endereco.logradouro"
                                name="endereco.logradouro"
                                type="text"
                                label="Endereço*"
                                placeholder="Rua, Avenida, etc."
                                value={formData.endereco.logradouro}
                                onChange={handleChange}
                                error={errors.endereco.logradouro}
                            />
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <div className="w-full sm:w-1/2">
                                    <MyInput
                                        id="endereco.numero"
                                        name="endereco.numero"
                                        type="text"
                                        label="Número*"
                                        placeholder="Ex: 123"
                                        value={formData.endereco.numero}
                                        onChange={handleChange}
                                        error={errors.endereco.numero}
                                        validationType="numbers"
                                    />
                                </div>
                                <div className="w-full sm:w-1/2">
                                    <MyInput
                                        id="endereco.complemento"
                                        name="endereco.complemento"
                                        type="text"
                                        label="Complemento"
                                        placeholder="Apto, Bloco"
                                        value={formData.endereco.complemento}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <MyInput
                                id="endereco.bairro"
                                name="endereco.bairro"
                                type="text"
                                label="Bairro*"
                                placeholder="Seu bairro"
                                value={formData.endereco.bairro}
                                onChange={handleChange}
                                error={errors.endereco.bairro}

                            />
                            <div className="flex flex-col sm:flex-row sm:gap-4">
                                <div className="w-full sm:w-2/3">
                                    <MyInput
                                        id="endereco.cidade"
                                        name="endereco.cidade"
                                        type="text"
                                        label="Cidade*"
                                        placeholder="Sua cidade"
                                        value={formData.endereco.cidade}
                                        onChange={handleChange}
                                        error={errors.endereco.cidade}

                                    />
                                </div>
                                <div className="w-full sm:w-1/3">
                                    <MyInput
                                        id="endereco.uf"
                                        name="endereco.uf"
                                        type="text"
                                        label="UF*"
                                        placeholder="UF"
                                        value={formData.endereco.uf}
                                        onChange={handleChange}
                                        error={errors.endereco.uf}
                                        validationType="letters"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <BotaoEntrar
                            type="submit"
                            className="w-full md:w-auto"
                            isLoading={isLoading}
                        >
                            {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                        </BotaoEntrar>
                    </div>
                </form>
            </div>
        </div>
    );
}
