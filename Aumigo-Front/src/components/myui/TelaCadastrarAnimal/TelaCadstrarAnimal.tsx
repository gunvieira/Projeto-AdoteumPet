import {Botao} from "@/components/myui/BotaoPadrao/Botao";
import MyInput from "@/components/myui/Input/Input.tsx";
import React, {useState} from "react";
import axios from 'axios';
import {FiPlus} from "react-icons/fi";
import {useAuth} from "@/context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import api from "@/services/api.ts";

export default function CadastrarAnimal() {
    const MAX_FILE_SIZE_MB = 5;
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    const [formData, setFormData] = useState({
        nome: '',
        dataNasc: '',
        raca: '',
        especie: '',
        sexo: '',
        porte: 'Pequeno',
    });

    const [errors, setErrors] = useState({
        nome: '',
        raca: '',
        dataNasc: '',
        especie: '',
        sexo: '',
        foto: '',
    });
    const {logout} = useAuth();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const tempErrors = {
            nome: '',
            raca: '',
            dataNasc: '',
            especie: '',
            sexo: '',
            foto: '',
        };
        let isValid = true;

        if (!formData.nome.trim()) {
            tempErrors.nome = 'O campo Nome é obrigatório.';
            isValid = false;
        }
        if (!formData.raca.trim()) {
            tempErrors.raca = 'O campo Raça é obrigatório.';
            isValid = false;
        }
        if (!formData.dataNasc.trim()) {
            tempErrors.dataNasc = 'O campo Data de Nascimento é obrigatório.';
            isValid = false;
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dataNasc)) {
            tempErrors.dataNasc = 'Formato de data inválido. Use DD/MM/AAAA.';
            isValid = false;
        }
        if (!formData.especie) {
            tempErrors.especie = 'Por favor, selecione uma espécie.';
            isValid = false;
        }
        if (!formData.sexo) {
            tempErrors.sexo = 'Por favor, selecione o sexo.';
            isValid = false;
        }
        if (!selectedFile) {
            tempErrors.foto = 'A foto do animal é obrigatória.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        if (errors[name as keyof typeof errors]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';

        if (!file) return;

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setErrors(prev => ({...prev, foto: 'Tipo de arquivo inválido. Use JPG, PNG, GIF ou WEBP.'}));
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }

        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setErrors(prev => ({...prev, foto: `O arquivo é muito grande. Máximo: ${MAX_FILE_SIZE_MB}MB.`}));
            setSelectedFile(null);
            setPreviewUrl(null);
            return;
        }

        setErrors(prev => ({...prev, foto: ''}));
        setSelectedFile(file);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitStatus(null);

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        let midiaImagem = '';

        if (selectedFile) {
            try {
                const imgbbFormData = new FormData();
                imgbbFormData.append('image', selectedFile);
                const imgbbApiKey = '3c5d80cd1bcb454aa7cbb09f05b9e101';
                const imgbbResponse = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                    imgbbFormData
                );
                midiaImagem = imgbbResponse.data.data.url;
            } catch (error) {
                console.error('Erro ao fazer upload para o imgbb:', error);
                setSubmitStatus({
                    message: 'Falha ao fazer upload da imagem. Verifique sua chave de API e tente novamente.',
                    type: 'error'
                });
                setIsSubmitting(false);
                return;
            }
        }

        try {

            const idString = sessionStorage.getItem('id');
            const status = "CADASTRADO";
            if (!idString) {
                setSubmitStatus({message: 'Erro: Usuário não autenticado.', type: 'error'});
                setIsSubmitting(false);
                return;
            }
            const idUsuario = parseInt(idString, 10);
            const [dia, mes, ano] = formData.dataNasc.split('/');
            const dataFormatada = `${ano}-${mes}-${dia}`;

            const animalData = {
                ...formData,
                dataNasc: dataFormatada,
                midiaImagem: midiaImagem,
                status: status
            };
            const dataToSubmit = {
                animal: animalData,
                idUsuario: idUsuario
            };


            const response = await api.post('/animais', dataToSubmit);
            console.log('Resposta do servidor:', response.data);
            setSubmitStatus({message: 'Animal cadastrado com sucesso!', type: 'success'});
            setFormData({
                nome: '', raca: '', dataNasc: '', especie: '', sexo: '', porte: 'Pequeno',
            });
            setErrors({nome: '', raca: '', dataNasc: '', especie: '', sexo: '', foto: ''});
            setSelectedFile(null);
            setPreviewUrl(null);

        } catch (error) {
            console.error('Erro ao enviar para o servidor:', error);
            setSubmitStatus({message: 'Falha ao cadastrar o animal. Tente novamente.', type: 'error'});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-screen-xl mx-auto gap-6">
            <div className="min-h-screen bg-white flex">
                <aside className="w-64 bg-white p-6 px-5 border-r border-gray-200">
                    <h2 className="text-lg font-semibold mb-10">Minha conta</h2>
                    <nav className="flex flex-col gap-4">
                        <Botao to="/dadospessoais" tsize="text-[18px]" customClasses="w-40">Dados Pessoais</Botao>
                        <Botao to="/processos" tsize="text-[18px]" customClasses="w-40">Processos</Botao>
                        <Botao to="#" tsize="text-[18px]" customClasses="w-40">Cadastrar animal</Botao>
                        <Botao onClick={handleLogout} tsize="text-[18px]" customClasses="w-40">Sair</Botao>
                    </nav>
                </aside>
                <main className="flex-1 p-10">
                    <form onSubmit={handleSubmit} noValidate>
                        <h1 className="text-2xl font-semibold mb-8">Cadastrar Novo Animal</h1>

                        <div className="flex flex-col lg:flex-row gap-10">
                            <div className="flex flex-col gap-4 flex-grow">
                                <div className="flex flex-wrap gap-10 items-start">
                                    <div>
                                        <h3 className="font-medium mb-2 text-sm text-gray-700">Espécie:</h3>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="especie" value="Cachorro"
                                                       onChange={handleChange} checked={formData.especie === 'Cachorro'}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Cachorro
                                            </label>

                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="especie" value="Gato" onChange={handleChange}
                                                       checked={formData.especie === 'Gato'}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Gato
                                            </label>
                                        </div>
                                        {errors.especie &&
                                            <p className="text-red-600 text-xs mt-1">{errors.especie}</p>}
                                    </div>
                                    <div>
                                        <h3 className="font-medium mb-2 text-sm text-gray-700">Sexo:</h3>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="sexo" value="Macho" onChange={handleChange}
                                                       checked={formData.sexo === 'Macho'}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Macho
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input type="radio" name="sexo" value="Fêmea" onChange={handleChange}
                                                       checked={formData.sexo === 'Fêmea'}
                                                       className="h-4 w-4 text-[#4EC9B0] focus:ring-[#4EC9B0] border-gray-300"/>
                                                Fêmea
                                            </label>
                                        </div>
                                        {errors.sexo && <p className="text-red-600 text-xs mt-1">{errors.sexo}</p>}
                                    </div>
                                </div>

                                <MyInput id="nome" name="nome" label="Nome" type="text"
                                         placeholder="Digite o nome do animal" value={formData.nome}
                                         onChange={handleChange} error={errors.nome} validationType="letters"/>

                                <MyInput id="raca" name="raca" label="Raça" type="text"
                                         placeholder="Ex: Sem Raça Definida (SRD)" value={formData.raca}
                                         onChange={handleChange} error={errors.raca}/>

                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-1/2">
                                        <MyInput id="dataNasc" name="dataNasc" label="Data de Nascimento" type="text"
                                                 placeholder="DD/MM/AAAA" value={formData.dataNasc}
                                                 onChange={handleChange} error={errors.dataNasc} applyDateMask/>
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label htmlFor="porte"
                                               className="block text-sm font-medium mb-1 text-gray-700">Porte</label>
                                        <select id="porte" name="porte" value={formData.porte} onChange={handleChange}
                                                className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:ring-emerald-500 focus:border-emerald-500 outline-none border-gray-300">
                                            <option>Pequeno</option>
                                            <option>Médio</option>
                                            <option>Grande</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="file-upload"
                                       className={`flex flex-col items-center justify-center w-full lg:w-72 h-72 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-cover bg-center ${errors.foto ? 'border-red-500' : 'border-gray-300'}`}
                                       style={{backgroundImage: previewUrl ? `url(${previewUrl})` : 'none'}}>
                                    {!previewUrl && (
                                        <div className="text-center">
                                            <div
                                                className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3">
                                                <FiPlus className="text-3xl text-gray-500"/>
                                            </div>
                                            <p className="text-gray-500">Adicione uma Foto!</p>
                                        </div>
                                    )}
                                    <input id="file-upload" name="file-upload" type="file" className="hidden"
                                           onChange={handleFileChange} accept="image/*"/>
                                </label>

                                {errors.foto &&
                                    <p className="text-red-600 text-xs mt-2 text-center w-full lg:w-72">{errors.foto}</p>}
                            </div>
                        </div>
                        <div className="mt-8">
                            <button type="submit" disabled={isSubmitting}
                                    className="bg-emerald-400 text-white font-bold py-2 px-10 rounded-md hover:bg-emerald-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isSubmitting ? 'Salvando...' : 'Salvar'}
                            </button>
                            {submitStatus && (
                                <p className={`mt-4 text-sm ${submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                    {submitStatus.message}
                                </p>
                            )}
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}