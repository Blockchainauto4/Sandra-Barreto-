
import React from 'react';

interface HeroProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
    return (
        <section
            className="relative text-brand-light min-h-[60vh] md:min-h-[85vh] flex items-center overflow-hidden"
        >
            <img 
                src="https://picsum.photos/1600/900?image=1073" 
                alt="Consultório de Podologia"
                className="absolute inset-0 w-full h-full object-cover -z-20"
                width="1600"
                height="900"
                loading="eager"
                fetchPriority="high"
            />
            
            {/* Blue Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 to-brand-dark/90 -z-10"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10 pt-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight text-white drop-shadow-md">
                    {title || (
                        <>
                            Podologia em Campo Belo e Moema: <br className="hidden md:block" />
                            <span className="text-brand-secondary">Saúde e Bem-Estar</span> para Seus Pés
                        </>
                    )}
                </h1>
                
                {/* Decorative separator */}
                <div className="w-24 h-1 bg-brand-secondary mx-auto mb-8 rounded-full shadow-sm"></div>

                <div className="text-lg md:text-xl text-brand-light mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                    {subtitle ? (
                        subtitle
                    ) : (
                        <p>
                             Clínica especializada localizada na Zona Sul de SP. Atendimento de excelência para moradores de <strong>Campo Belo, Moema, Brooklin e Vila Olímpia</strong>. Agende sua avaliação com a Dra. Sandra Barreto.
                        </p>
                    )}
                </div>
                <a
                    href="#agendamento"
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-dark transition-all duration-200 bg-white font-sans rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white hover:bg-brand-secondary shadow-lg transform hover:-translate-y-1"
                >
                    Agende sua Consulta
                    <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
            </div>
        </section>
    );
};

export default Hero;
