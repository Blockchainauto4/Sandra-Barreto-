
import React from 'react';

const Pricing: React.FC = () => {
    return (
        <section id="valores" className="py-16 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-10">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Transparência e Valor
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Tabela de Preços Referencial (2025)
                    </h3>
                    <p className="mt-4 text-gray-600">
                        Investir na saúde dos seus pés é investir em qualidade de vida. Abaixo, apresentamos uma estimativa de valores para nossos principais tratamentos atendendo toda a <strong>Zona Sul (Campo Belo, Moema, Itaim Bibi, Brooklin e Campo Limpo)</strong>.
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
                            <tr className="hover:bg-brand-light transition-colors">
                                <td className="py-4 px-6 font-medium text-brand-dark">Podologia Tradicional (Completa)</td>
                                <td className="py-4 px-6 text-gray-600">Corte técnico, desbaste de calos, hidratação.</td>
                                <td className="py-4 px-6 text-right font-bold text-brand-primary">R$ 120,00 - R$ 150,00</td>
                            </tr>
                            <tr className="hover:bg-brand-light transition-colors">
                                <td className="py-4 px-6 font-medium text-brand-dark">Tratamento de Unha Encravada</td>
                                <td className="py-4 px-6 text-gray-600">Remoção de espícula (canto de unha) com curativo.</td>
                                <td className="py-4 px-6 text-right font-bold text-brand-primary">R$ 150,00 - R$ 220,00</td>
                            </tr>
                            <tr className="hover:bg-brand-light transition-colors">
                                <td className="py-4 px-6 font-medium text-brand-dark">Pé Diabético (Preventivo)</td>
                                <td className="py-4 px-6 text-gray-600">Avaliação de sensibilidade e corte seguro.</td>
                                <td className="py-4 px-6 text-right font-bold text-brand-primary">R$ 130,00 - R$ 160,00</td>
                            </tr>
                            <tr className="hover:bg-brand-light transition-colors">
                                <td className="py-4 px-6 font-medium text-brand-dark">Tratamento de Verruga Plantar</td>
                                <td className="py-4 px-6 text-gray-600">Sessão de cauterização (Olho de Peixe).</td>
                                <td className="py-4 px-6 text-right font-bold text-brand-primary">A partir de R$ 100,00</td>
                            </tr>
                            <tr className="hover:bg-brand-light transition-colors">
                                <td className="py-4 px-6 font-medium text-brand-dark">Órtese para Correção (Unidade)</td>
                                <td className="py-4 px-6 text-gray-600">Aplicação de fibra/botão para correção ungueal.</td>
                                <td className="py-4 px-6 text-right font-bold text-brand-primary">R$ 80,00 - R$ 120,00</td>
                            </tr>
                             <tr className="hover:bg-brand-light transition-colors">
                                <td className="py-4 px-6 font-medium text-brand-dark">Laserterapia (Sessão)</td>
                                <td className="py-4 px-6 text-gray-600">Para micoses, cicatrização e inflamações.</td>
                                <td className="py-4 px-6 text-right font-bold text-brand-primary">R$ 60,00 - R$ 90,00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                    * Os valores podem variar conforme a complexidade do caso após avaliação presencial. Preços de referência para a Zona Sul de SP.
                </div>
                
                <div className="mt-8 text-center">
                     <a href="#agendamento" className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-full shadow-md hover:bg-opacity-80 transition-transform hover:scale-105">
                        Agendar Avaliação Gratuita
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
