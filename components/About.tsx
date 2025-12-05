import React from 'react';

const About: React.FC = () => {
    return (
        <section id="sobre" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2 relative">
                         {/* Experience Badge */}
                        <div className="absolute -top-6 -left-6 bg-brand-secondary text-brand-dark p-6 rounded-lg shadow-xl z-10 hidden md:block">
                            <p className="text-4xl font-bold font-serif">15+</p>
                            <p className="text-sm font-semibold uppercase tracking-wider">Anos de<br/>Experiência</p>
                        </div>
                        <img
                            src="https://picsum.photos/600/700?image=349"
                            alt="Podóloga Sandra Barreto no consultório em Campo Belo"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover"
                            width="600"
                            height="700"
                            loading="lazy"
                            fetchPriority="low"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                            Experiência e Confiança
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">
                            Sandra Barreto - Sua Podóloga na Zona Sul
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Com mais de <strong>15 anos de experiência clínica</strong>, sou especialista graduada em Podologia, oferecendo tratamentos avançados para <strong>Pés Diabéticos</strong>, <strong>Unhas Encravadas</strong> e <strong>Podologia Esportiva</strong> aqui no bairro do Campo Belo.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Meu consultório está estrategicamente localizado para atender pacientes de <strong>Moema</strong>, <strong>Brooklin</strong>, <strong>Itaim Bibi</strong> e <strong>Vila Olímpia</strong>. Sigo rigorosos protocolos de biossegurança e esterilização (Autoclave), garantindo saúde e conforto. Sou membro ativo da Associação Brasileira de Podólogos.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                <span className="text-sm font-medium text-gray-700">Certificação Técnica</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                <span className="text-sm font-medium text-gray-700">Especialista em Pés Diabéticos</span>
                            </div>
                             <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                <span className="text-sm font-medium text-gray-700">Registro Profissional Ativo</span>
                            </div>
                             <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                <span className="text-sm font-medium text-gray-700">Protocolos Rigorosos de Higiene</span>
                            </div>
                        </div>

                        <a href="#servicos" className="bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-dark transition-colors duration-300">
                            Conheça Meus Tratamentos
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;