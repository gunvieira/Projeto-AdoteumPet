import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: (usuarioId: string | number) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const usuarioId = sessionStorage.getItem('id');
        if (usuarioId) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (usuarioId: string | number) => {
        sessionStorage.setItem('id', String(usuarioId));
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem('id');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};