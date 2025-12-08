
import React from 'react';
import { PODIATRY_PRICING_DATA } from '../constants';
import type { PricingItem } from '../types';

interface PricingProps {
    items?: PricingItem[];
    title?: string;
}

const Pricing: React.FC<PricingProps> = ({ items = PODIATRY_PRICING_DATA, title }) => {
    return (
        <section id="valores" className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Transparência e Valor
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        {title || "Tabela de Preços Referencial (2025)"}
                    </h3>
                    <p className="mt-4 text-gray-600">
                        Investir na saúde e beleza dos seus pés e mãos é investir em qualidade de vida. Abaixo, apresentamos uma estimativa de valores para nossos principais serviços.
                    </p>
                </div>

                {/* Table structure is critical for Google Snippets */}
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-100">
                    <table className="min-w-full bg-white">
                        <thead className="bg-brand-primary text-white">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold text-lg">Tratamento / Procedimento</th>
                                <th className="py-4 px-6 text-left font-semibold text-lg">Indicação</th>
                                <th className="py-4 px-6 text-right font-semibold text-lg">Valor Estimado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item, index) => (
                                <tr key={index} className="hover:bg-brand-light transition-colors">
                                    <td className="py-4 px-6 font-medium text-brand-dark">{item.treatment}</td>
                                    <td className="py-4 px-6 text-gray-600">{item.indication}</td>
                                    <td className="py-4 px-6 text-right font-bold text-brand-primary">{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                    * Os valores podem variar conforme a complexidade ou personalização (arte, pedrarias) do serviço.
                </div>
                
                <div className="mt-8 text-center">
                     <a href="#agendamento" className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-full shadow-md hover:bg-opacity-80 transition-transform hover:scale-105">
                        Agendar Horário
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
