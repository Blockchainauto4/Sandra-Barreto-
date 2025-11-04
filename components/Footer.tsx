import React from 'react';

const Footer: React.FC = () => {
    const navLinks = [
        { href: "#sobre", label: "Sobre" },
        { href: "#servicos", label: "Serviços" },
        { href: "#blog", label: "Blog" },
        { href: "#carreiras", label: "Carreiras" },
        { href: "#faq", label: "FAQ" },
    ];

    return (
        <footer className="bg-brand-dark text-brand-light">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Column 1: Brand & Social */}
                    <div className="flex flex-col">
                        <a href="#" className="flex flex-col leading-tight mb-4">
                            <span className="text-2xl font-serif font-bold text-white">Sandra Barreto</span>
                            <span className="text-xs text-brand-secondary tracking-widest">PODOLOGIA</span>
                        </a>
                        <p className="text-sm text-brand-secondary max-w-xs mb-4">
                           Cuidado profissional e especializado para a saúde e bem-estar dos seus pés.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Instagram" className="text-brand-secondary hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465 2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.002 6.363a4.902 4.902 0 100 9.804 4.902 4.902 0 000-9.804zM12 15.41a3.41 3.41 0 110-6.82 3.41 3.41 0 010 6.82zm5.438-8.132a1.23 1.23 0 100 2.46 1.23 1.23 0 000-2.46z" clipRule="evenodd" /></svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="text-brand-secondary hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Links Úteis</h4>
                        <ul className="space-y-2">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-brand-secondary hover:text-white hover:underline transition-colors">{link.label}</a>
                                </li>
                            ))}
                            <li><a href="#agendamento" className="text-brand-secondary hover:text-white hover:underline transition-colors">Agendar Consulta</a></li>
                            <li><a href="#admin" className="text-brand-secondary hover:text-white hover:underline transition-colors">Painel do Administrador</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal Links */}
                     <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#privacy-policy" className="text-brand-secondary hover:text-white hover:underline transition-colors">Política de Privacidade</a></li>
                            <li><a href="#terms-of-service" className="text-brand-secondary hover:text-white hover:underline transition-colors">Termos de Serviço</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Entre em Contato</h4>
                        <ul className="space-y-3 text-brand-secondary">
                            <li className="flex items-start">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                <span>R. Dr. Jesuíno Maciel, 1205<br/>Campo Belo, São Paulo - SP</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                                <a href="https://wa.me/5511989671299" className="hover:text-white hover:underline">(11) 98967-1299</a>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
                                <span>
                                    Seg - Sex: 9h às 18h<br/>
                                    Sáb: 9h às 13h
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-brand-secondary">
                    <p>&copy; {new Date().getFullYear()} Sandra Barreto Podologia. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;