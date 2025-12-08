import React, { useState } from 'react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "#manicure", label: "Manicure e Gel" }, // Prioritized
        { href: "/#", label: "Podologia" },
        { href: "/#sobre", label: "Sobre" },
        { href: "/#blog", label: "Blog" },
        { href: "/#profissionais", label: "Profissionais" },
    ];

    return (
        <header className="bg-brand-light/80 backdrop-blur-md shadow-md sticky top-0 z-50 h-20 flex items-center">
            <div className="container mx-auto px-6 flex justify-between items-center h-full">
                <a href="/#" className="text-2xl font-serif font-bold text-brand-primary flex-shrink-0">
                    Sandra Barreto
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="text-gray-600 hover:text-brand-primary transition-colors duration-300 font-medium">
                            {link.label}
                        </a>
                    ))}
                    <a href="#agendamento" className="bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-brand-dark transition-transform duration-300 hover:scale-105 shadow-md">
                        Agendar Consulta
                    </a>
                </nav>

                {/* Mobile Nav Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-brand-primary focus:outline-none" aria-label="Abrir menu de navegação">
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
                <div className="md:hidden bg-brand-light absolute top-20 left-0 w-full shadow-lg border-t border-gray-100 animate-[fadeIn_0.3s_ease-out]">
                    <nav className="flex flex-col items-center space-y-4 py-6">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="text-gray-700 hover:text-brand-primary transition-colors duration-300 text-lg font-medium" onClick={() => setIsOpen(false)}>
                                {link.label}
                            </a>
                        ))}
                        <a href="#agendamento" className="bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-brand-dark transition-transform duration-300 hover:scale-105 font-bold shadow-lg mt-2" onClick={() => setIsOpen(false)}>
                            Agendar Consulta
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;