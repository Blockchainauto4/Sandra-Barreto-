
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
            </div>
        </section>
    );
};

export default Services;
