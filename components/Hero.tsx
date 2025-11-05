import React from 'react';

const Hero: React.FC = () => {
    return (
        <section
            className="relative bg-cover bg-center text-white min-h-[60vh] md:min-h-[80vh] flex items-center"
            style={{ backgroundImage: "url('/image-1.jpeg')" }}
        >
            <div className="absolute inset-0 bg-brand-dark bg-opacity-50"></div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">
                    Podologia no Campo Belo: Cuidado e Saúde para Seus Pés
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Sua referência em podologia na Zona Sul de SP. Oferecemos atendimento especializado no coração do Campo Belo, com fácil acesso para quem busca uma podóloga em Moema ou o melhor tratamento para os pés no Brooklin. Agende sua avaliação e sinta a diferença.
                </p>
                <a
                    href="#agendamento"
                    className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-white transition-all duration-300 transform hover:scale-110"
                >
                    Agende sua Consulta
                </a>
            </div>
        </section>
    );
};

export default Hero;