import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa";

import MyInput from "@/components/myui/Input/Input.tsx";

import BotaoEntrar from "@/components/myui/BotaoPadrao/Botao.tsx";
import {useAuth} from "@/context/AuthContext.tsx";
import api from "@/services/api.ts";

const TelaLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await api.post('/users/login', {
                email: email,
                senha: senha,
            });
            console.log('Login bem-sucedido:', response.data);
            login(response.data.idUsuario);
            sessionStorage.setItem('tipoUsuario', String(response.data.tipoUsuario));
            navigate('/processos');

        } catch (err) {
            console.error("Falha no login:", err);
            setError("Falha no login. Verifique o seu e-mail e senha.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen max-w-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleLoginSubmit} className="bg-white shadow-xl rounded-lg p-8 sm:p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-emerald-700">Entrar</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <MyInput
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="o.seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                />

                <div className="mb-2">
                    <MyInput
                        id="senha"
                        type="password"
                        label="Senha"
                        placeholder="A sua Senha"
                        className="mb-0"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <div className="flex justify-end mt-1">
                        <a href="/" className="text-xs text-emerald-600 hover:text-emerald-700 transition">
                            Esqueci a senha
                        </a>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <BotaoEntrar type="submit" className="w-full" isLoading={isLoading}>
                        Entrar
                    </BotaoEntrar>
                    <BotaoEntrar
                        to="/cadastro"
                        className="w-full"
                        icon={<FaUserPlus size={14} />}
                        variant="secondary"
                    >
                        Cadastre-se
                    </BotaoEntrar>
                </div>
            </form>
        </div>
    );
};

export default TelaLogin;
