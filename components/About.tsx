
import React from 'react';

const About: React.FC = () => {
    return (
        <section id="sobre" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img
                            src="https://picsum.photos/600/700?image=349"
                            alt="Podóloga Sandra Barreto"
                            className="rounded-lg shadow-2xl w-full h-auto object-cover"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                            Conheça a Profissional
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6">
                            Sandra Barreto
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Com vasta experiência e paixão pelo cuidado com os pés, sou especialista em tratamentos podológicos, visando não apenas a estética, mas principalmente a saúde e o bem-estar dos meus pacientes. Minha abordagem é focada em um atendimento humanizado e personalizado.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Atuando no coração do Campo Belo, meu consultório é um espaço de tranquilidade e profissionalismo, convenientemente localizado para atender pacientes de bairros vizinhos como Moema, Brooklin e Itaim Bibi. Acredito que pés saudáveis são a base para uma vida mais ativa e feliz.
                        </p>
                        <a href="#servicos" className="bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-dark transition-colors duration-300">
                            Ver Serviços
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;