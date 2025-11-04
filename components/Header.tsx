import React, { useState, useEffect } from 'react';
import { SERVICES_DATA } from '../constants';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const navLinks = [
        { href: "#sobre", label: "Sobre" },
        { href: "#servicos", label: "Serviços" },
        { href: "#blog", label: "Blog" },
        { href: "#carreiras", label: "Carreiras" },
        { href: "#faq", label: "FAQ" },
    ];

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(`#${entry.target.id}`);
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <header className="bg-brand-light/80 backdrop-blur-md shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex flex-col leading-tight">
                    <span className="text-2xl font-serif font-bold text-brand-primary">Sandra Barreto</span>
                    <span className="text-xs text-brand-secondary tracking-widest">PODOLOGIA</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <div key={link.href} className="relative group">
                            <a 
                                href={link.href} 
                                className={`text-gray-600 hover:text-brand-primary transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-brand-primary after:transform after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${activeLink === link.href ? 'after:scale-x-100 text-brand-primary' : 'group-hover:after:scale-x-100'}`}
                                onMouseEnter={link.label === "Serviços" ? () => setIsServicesOpen(true) : undefined}
                                onMouseLeave={link.label === "Serviços" ? () => setIsServicesOpen(false) : undefined}
                            >
                                {link.label}
                            </a>
                             {link.label === "Serviços" && isServicesOpen && (
                                <div 
                                    onMouseEnter={() => setIsServicesOpen(true)}
                                    onMouseLeave={() => setIsServicesOpen(false)}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 animate-[fadeIn_0.2s_ease-out]"
                                >
                                    {SERVICES_DATA.map(service => (
                                        <a key={service.title} href="#servicos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-light hover:text-brand-primary">
                                            {service.title}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
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