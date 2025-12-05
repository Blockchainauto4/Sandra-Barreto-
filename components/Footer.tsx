
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-brand-light">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    
                    {/* Brand Info */}
                    <div>
                        <h4 className="text-xl font-serif font-bold text-white mb-2">Podologia Sandra Barreto</h4>
                        <address className="not-italic text-brand-secondary text-sm leading-relaxed mb-4">
                            R. Vieira de Morais, 1466<br/>
                            Campo Belo, São Paulo - SP<br/>
                            CEP 04617-005
                        </address>
                        <p className="text-xs text-brand-secondary opacity-70">Registro Profissional: 12.345-SP</p>
                    </div>

                    {/* Service Areas (Great for SEO) */}
                    <div>
                        <h5 className="text-lg font-bold text-white mb-3">Atendimento na Região</h5>
                        <ul className="text-sm text-brand-secondary space-y-1">
                            <li><a href="#" className="hover:text-white transition-colors">Podóloga no Campo Belo</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Podóloga em Moema</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Podóloga no Brooklin</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Vila Olímpia e Itaim Bibi</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Aeroporto de Congonhas</a></li>
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <h5 className="text-lg font-bold text-white mb-3">Informações</h5>
                        <div className="flex flex-col space-y-2 mb-4">
                            <a href="#privacy-policy" className="text-sm text-brand-secondary hover:text-white transition-colors">Política de Privacidade</a>
                            <a href="#terms-of-service" className="text-sm text-brand-secondary hover:text-white transition-colors">Termos de Serviço</a>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" aria-label="Instagram da Podologia Sandra Barreto" className="text-brand-secondary hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.002 6.363a4.902 4.902 0 100 9.804 4.902 4.902 0 000-9.804zM12 15.41a3.41 3.41 0 110-6.82 3.41 3.41 0 010 6.82zm5.438-8.132a1.23 1.23 0 100 2.46 1.23 1.23 0 000-2.46z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Facebook da Podologia Sandra Barreto" className="text-brand-secondary hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-brand-secondary flex flex-col items-center gap-2">
                    <p>&copy; {new Date().getFullYear()} Sandra Barreto Podologia. Todos os direitos reservados.</p>
                    <a href="#admin" className="text-xs text-brand-secondary/40 hover:text-brand-secondary transition-colors">Admin</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;