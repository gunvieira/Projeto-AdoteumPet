import {Button} from "@/components/ui/button";
import {Link, useLocation} from "react-router";
import React from 'react';

interface BotaoGhostProps {
    children: string;
    to: string;
}

interface BotaoProps {
    children?: string;
    to?: string; // 'to' agora é opcional
    tsize?: string;
    growOnHover?: boolean;
    customClasses?: string;
    onClick?: () => void;
}

export function Botao(props: BotaoProps) {
    const {
        children,
        to,
        tsize,
        growOnHover,
        customClasses,
        onClick
    } = props;

    const textoinserido = children ?? "Botão";

    const buttonClassName = `bg-emerald-400 hover:bg-emerald-500 font-dosis cursor-pointer text-white 
        ${tsize ?? ""} 
        ${growOnHover ? "transition-transform duration-500 hover:scale-110 ease-in-out" : ""}
        ${customClasses ?? ""}
    `;

    if (to) {
        return (
            <Link to={to} onClick={onClick}>
                <Button size="lg" className={buttonClassName}>
                    {textoinserido}
                </Button>
            </Link>
        );
    }

    return (
        <Button size="lg" className={buttonClassName} onClick={onClick}>
            {textoinserido}
        </Button>
    );
}

export function BotaoSegundario(props: { children: string; to: string }) {
    const textoinseridosec = props.children ? props.children : "Botao";
    const to = props.to ?? "#";

    return (
        <Link to={to}>
            <Button
                variant="secondary"
                size="lg"
                className="bg-gray-200 hover:bg-gray-300 font-dosis cursor-pointer "
            >
                {textoinseridosec}
            </Button>
        </Link>
    );
}


export function BotaoGhost({children, to}: BotaoGhostProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to}>
            <Button
                variant="ghost"
                size="lg"
                className={`font-dosis cursor-pointer font-medium px-3 text-[16px] ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
            >
                {children}
            </Button>
        </Link>
    );
}

export function BotaoAdote(props: {
    children?: string;
    to: string;
    tsize?: string;
    growOnHover?: boolean;
}) {
    const textoinserido = props.children ?? "Botão";
    const { to, tsize, growOnHover } = props;

    return (
        <Link to={to}>
            <Button
                size="lg"
                className={`scale-150 bg-emerald-400 hover:bg-emerald-500 font-dosis cursor-pointer px-10 py-5 font-bold text-white ${tsize ?? ""} 
                    ${growOnHover ? "transition-transform duration-500 hover:scale-170 ease-in-out" : ""}`}
            >
                {textoinserido}
            </Button>
        </Link>
    );
}

interface FiltroBotaoProps {
    isActive: boolean;
    onClick: () => void;
    children: string;
}

export function FiltroBotao({ isActive, onClick, children }: FiltroBotaoProps) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md font-dosis font-medium text-sm transition-colors
        ${isActive ? "bg-emerald-400 text-white" : "bg-white text-black hover:bg-gray-100"}`}
        >
            {children}
        </button>
    );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    to?: string;
    className?: string;
    variant?: 'primary' | 'secondary';
    icon?: React.ReactNode;
    isLoading?: boolean;
}

const BotaoEntrar: React.FC<ButtonProps> = ({
                                                children,
                                                to,
                                                className = '',
                                                variant = 'primary',
                                                icon,
                                                isLoading = false,
                                                ...rest
                                            }) => {
    const baseClasses = "px-4 py-2 rounded-md transition text-white font-medium flex items-center justify-center gap-2";
    const variantClasses = {
        primary: "bg-emerald-400 hover:bg-emerald-500",
        secondary: "bg-teal-700 hover:bg-teal-800",
    };

    const loadingClasses = isLoading ? 'opacity-75 cursor-not-allowed' : '';
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${loadingClasses} ${className}`;

    const Spinner = () => (
        <div
            className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
            role="status"
            aria-live="polite"
        >
            <span className="sr-only">Carregando...</span>
        </div>
    );

    const content = (
        <>
            {isLoading ? <Spinner /> : (
                <>
                    {children}
                    {icon && icon}
                </>
            )}
        </>
    );

    if (to && !isLoading) {
        return (
            <Link to={to} className={combinedClasses}>
                {content}
            </Link>
        );
    }

    return (
        <Button
            size="lg"
            className={combinedClasses}
            disabled={isLoading || rest.disabled}
            {...rest}
        >
            {content}
        </Button>
    );
};

export default BotaoEntrar;

