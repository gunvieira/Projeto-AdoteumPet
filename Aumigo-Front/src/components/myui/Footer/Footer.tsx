import { FaFacebook, FaInstagram, FaXTwitter, FaTiktok} from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <section className="bg-teal-700 p-5 text-white">
            <div className="flex flex-col w-full items-center max-w-screen-xl mx-auto px-4 gap-6">
                <div className="w-fit text-emerald-400 p-3 rounded flex flex-col items-center">
                    <img
                        src="/Imagens/Icons/logo.svg"
                        alt="Logo"
                        className="h-12 w-auto fill-emerald-400"
                    />
                    <span className="text-lg font-semibold">Adote um Pet</span>
                </div>
                <div>
                    <ul className="flex flex-row gap-8">
                        <li><Link to="/quem-somos" className="hover:underline">Quem Somos</Link></li>
                        <li><Link to="/" className="hover:underline">Contato</Link></li>
                        <li><Link to="/adote" className="hover:underline">Adote</Link></li>
                        <li><Link to="/colabore" className="hover:underline">Colabore</Link></li>
                    </ul>
                </div>
                <div>
                    <div className="flex gap-8 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70">
                            <FaXTwitter />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70">
                            <FaTiktok />
                        </a>
                    </div>
                </div>
                <div className="text-sm text-gray-200 mt-4">
                    © 2025 Adote um Pet. Todos os direitos reservados.
                </div>
            </div>
        </section>
    );
}
