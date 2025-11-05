import React from 'react';
import { SERVICES_DATA } from '../constants';

const Services: React.FC = () => {
    return (
        <section id="servicos" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 -z-20">
                <img src="/image-4.jpeg" alt="Fundo de tratamento de podologia" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-brand-light/95 -z-10"></div>

            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Nossos Tratamentos
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Especialidades em Podologia
                    </h3>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Oferecemos uma gama completa de tratamentos para garantir a saúde e o bem-estar dos seus pés. Nossa clínica de podologia no Campo Belo é a referência para quem busca um tratamento para os pés no Brooklin ou uma podóloga em Moema, atendendo toda a Zona Sul de SP com excelência.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SERVICES_DATA.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center"
                        >
                            <div className="mb-4">{service.icon}</div>
                            <h4 className="text-xl font-bold text-brand-dark mb-3">
                                {service.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;