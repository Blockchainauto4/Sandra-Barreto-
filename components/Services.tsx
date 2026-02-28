
import React from 'react';
import { SERVICES_DATA } from '../constants';
import type { Service } from '../types';

interface ServicesProps {
    items?: Service[];
    title?: string;
    subtitle?: string;
}

const Services: React.FC<ServicesProps> = ({ items = SERVICES_DATA, title, subtitle }) => {
    return (
        <section id="servicos" className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        {subtitle || "Nossos Tratamentos"}
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        {title || "Especialidades em Podologia"}
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((service, index) => (
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
                <div className="mt-16 text-center">
                    <a href="#agendamento" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-brand-secondary font-sans rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary hover:bg-brand-dark shadow-xl transform hover:-translate-y-1 hover:scale-105">
                        Agendar Online Agora
                        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                     <p className="mt-4 text-sm text-gray-600">Pronta para cuidar de você. Agende via WhatsApp!</p>
                </div>
            </div>
        </section>
    );
};

export default Services;
