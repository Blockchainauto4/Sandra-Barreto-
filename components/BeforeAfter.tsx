import React from 'react';
import { BeforeAfterImage } from '../types';

interface BeforeAfterProps {
    images: BeforeAfterImage[];
}

const BeforeAfter: React.FC<BeforeAfterProps> = ({ images }) => {
    if (images.length === 0) {
        return null;
    }

    return (
        <section id="resultados" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Resultados Reais
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Antes e Depois
                    </h3>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Veja a transformação e o alívio que nossos tratamentos proporcionam. Cada caso é tratado com o máximo de cuidado e profissionalismo.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((item) => (
                        <div key={item.id} className="bg-brand-light rounded-lg shadow-lg overflow-hidden flex flex-col">
                            <div className="p-6">
                                <h4 className="text-xl font-bold text-brand-dark mb-4 text-center">{item.title}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <img src={item.beforeUrl} alt={`Antes - ${item.title}`} className="w-full h-48 object-cover rounded-md border-2 border-gray-200" />
                                        <p className="text-center font-semibold text-gray-600 mt-2">Antes</p>
                                    </div>
                                    <div>
                                        <img src={item.afterUrl} alt={`Depois - ${item.title}`} className="w-full h-48 object-cover rounded-md border-2 border-gray-200" />
                                        <p className="text-center font-semibold text-brand-primary mt-2">Depois</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeforeAfter;
