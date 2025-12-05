
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section
            className="relative text-white min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden"
        >
            <img 
                src="https://picsum.photos/1600/900?image=1073" 
                alt="Consultório de Podologia"
                className="absolute inset-0 w-full h-full object-cover -z-10"
                width="1600"
                height="900"
                // @ts-ignore
                fetchPriority="high"
            />
            <div className="absolute inset-0 bg-brand-dark bg-opacity-50 -z-10"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
                    Podologia no Campo Belo: <br className="hidden md:block" />
                    Saúde e Bem-Estar para Seus Pés
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Clínica especializada localizada na Zona Sul de SP. Atendimento de excelência para moradores de <strong>Moema, Brooklin, Vila Olímpia e Região</strong>. Agende sua avaliação com a Dra. Sandra Barreto.
                </p>
                <a
                    href="#agendamento"
                    className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                >
                    Agende sua Consulta
                </a>
            </div>
        </section>
    );
};

export default Hero;