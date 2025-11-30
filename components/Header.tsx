import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "#sobre", label: "Sobre" },
        { href: "#servicos", label: "Serviços" },
        { href: "#blog", label: "Blog" },
        { href: "#profissionais", label: "Profissionais" },
        { href: "#agendamento", label: "Agendar" },
    ];

    return (
        <header className="bg-brand-light/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-serif font-bold text-brand-primary">
                    Sandra Barreto
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-gray-600 hover:text-brand-primary transition-colors duration-300">
                            {link.label}
                        </a>
                    ))}
                    <a href="#agendamento" className="bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-brand-dark transition-transform duration-300 hover:scale-105">
                        Agendar Consulta
                    </a>
                </nav>

                {/* Mobile Nav Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-brand-primary focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isOpen && (
                <div className="md:hidden bg-brand-light">
                    <nav className="flex flex-col items-center space-y-4 py-4">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="text-gray-600 hover:text-brand-primary transition-colors duration-300" onClick={() => setIsOpen(false)}>
                                {link.label}
                            </a>
                        ))}
                        <a href="#agendamento" className="bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-brand-dark transition-transform duration-300 hover:scale-105" onClick={() => setIsOpen(false)}>
                            Agendar Consulta
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;