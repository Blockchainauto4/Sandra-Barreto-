
import React from 'react';
import type { LocationItem } from '../types';

const defaultLocations: LocationItem[] = [
    // Core Areas
    { name: "Campo Belo (Sede)", detail: "Rua Vieira de Morais, 1466" },
    { name: "Moema", detail: "Moema Pássaros e Moema Índios, Shopping Ibirapuera" },
    { name: "Brooklin", detail: "Brooklin Novo, Brooklin Velho e Av. Engenheiro Luís Carlos Berrini" },
    { name: "Itaim Bibi", detail: "Próximo à Av. Brigadeiro Faria Lima e Av. Juscelino Kubitschek" },
    { name: "Vila Olímpia", detail: "Zona Sul de SP, fácil acesso pela Av. Santo Amaro" },
    // Extended Radius
    { name: "Vila Nova Conceição", detail: "Ao lado do Parque Ibirapuera e Praça Louveira" },
    { name: "Planalto Paulista", detail: "Acesso direto via Av. dos Bandeirantes e Indianópolis" },
    { name: "Indianópolis", detail: "Bairro contíguo com atendimento rápido à domicílio" },
    { name: "Santo Amaro", detail: "Próximo à Estação Adolfo Pinheiro e Av. João Dias" },
    { name: "Chácara Santo Antônio", detail: "Região corporativa e residencial da Zona Sul" },
    { name: "Vila Mariana", detail: "Acesso rápido pela Av. Sena Madureira e Ruas Locais" },
    { name: "Saúde / São Judas", detail: "Eixo azul do metrô, proximidades do Jabaquara" },
    { name: "Jardim Paulista / Jardins", detail: "Acesso simplificado pela Av. Brasil e Av. Santo Amaro" },
    { name: "Vila Clementino", detail: "Próximo à Estação AACD-Servidor e Hospital São Paulo" },
];

interface LocationsProps {
    locations?: LocationItem[];
}

const Locations: React.FC<LocationsProps> = ({ locations = defaultLocations }) => {
    
    return (
        <section id="localizacao" className="py-16 bg-brand-light relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-secondary opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-primary opacity-5 blur-3xl"></div>

            {/* Radius Badge Block */}
            <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary w-full"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Área de Cobertura e Raio de Atendimento
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Podologia em Toda a Zona Sul de São Paulo
                    </h3>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Buscando por <strong>"podóloga perto de mim"</strong> ou <strong>"clínica de podologia próxima a mim"</strong>? Nosso consultório está localizado no coração do <strong>Campo Belo</strong>, atendendo com rapidez e agilidade um raio de até 15km, incluindo atendimento domiciliar (home care) e no consultório para diversos bairros parceiros em SP.
                    </p>
                </div>

                {/* Radius/Zone Segments */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md text-center">
                        <div className="text-brand-secondary text-2xl font-bold font-serif mb-2">Zona Central (0 a 3 km)</div>
                        <p className="text-sm text-gray-600">Tempo de deslocamento estimado em 5 minutos.</p>
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Campo Belo (Sede)</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Brooklin Novo</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Indianópolis</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md text-center">
                        <div className="text-brand-primary text-2xl font-bold font-serif mb-2">Zona Intermediária (3 a 7 km)</div>
                        <p className="text-sm text-gray-600">Tempo de deslocamento estimado em 10 minutos.</p>
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Moema</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Brooklin Velho</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Vila Olímpia</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Planalto Paulista</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Vila Nova Conceição</span>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-md text-center">
                        <div className="text-brand-primary text-2xl font-bold font-serif mb-2">Zona Estendida (7 a 15 km)</div>
                        <p className="text-sm text-gray-600">Atendimento clínico e atendimento domiciliar em SP.</p>
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Itaim Bibi</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Santo Amaro</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Vila Mariana</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Chácara Santo Antônio</span>
                            <span className="px-2 py-1 bg-brand-light rounded text-xs font-semibold text-brand-dark">Jardins</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {locations.map((loc, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-brand-secondary hover:shadow-md transition-shadow duration-300">
                            <h4 className="font-bold text-brand-dark">{loc.name}</h4>
                            <p className="text-xs text-gray-500 uppercase mt-1">{loc.detail}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="text-xl font-bold text-brand-dark mb-2">Clínica de Referência em São Paulo</h4>
                        <p className="text-gray-600">
                           Para consultas e tratamentos presenciais, nossa clínica principal está localizada na <strong>R. Vieira de Morais, 1466, no Campo Belo</strong>, com fácil acesso para toda a Zona Sul.
                        </p>
                    </div>
                    <a 
                        href="https://www.google.com/maps/dir//R.+Vieira+de+Morais,+1466+-+Campo+Belo,+S%C3%A3o+Paulo+-+SP,+04617-005" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full hover:bg-brand-dark transition-all duration-300 whitespace-nowrap flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Ver no Mapa
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Locations;
