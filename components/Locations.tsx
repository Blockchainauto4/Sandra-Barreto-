import React from 'react';

const Locations: React.FC = () => {
    const locations = [
        { name: "Campo Belo", detail: "Sede da Clínica" },
        { name: "Moema", detail: "5 min de carro" },
        { name: "Brooklin", detail: "Próximo à Berrini" },
        { name: "Itaim Bibi", detail: "Região da Faria Lima" },
        { name: "Vila Olímpia", detail: "Fácil acesso" },
        { name: "Campo Limpo", detail: "Atendimento Regional" },
        { name: "Jardim Sul", detail: "Região do Morumbi" },
        { name: "Aeroporto de Congonhas", detail: "Ponto de Referência" },
        { name: "Shopping Ibirapuera", detail: "Ponto de Referência" },
        { name: "Metrô Eucaliptos", detail: "Transporte Público" },
        { name: "Metrô Campo Belo", detail: "Transporte Público" },
        { name: "Vila Mascote", detail: "Bairro Vizinho" },
    ];

    return (
        <section id="localizacao" className="py-16 bg-brand-light relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-brand-secondary opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-primary opacity-5 blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Área de Cobertura
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Manicure e Podologia Perto de Você
                    </h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Nossa clínica está estrategicamente posicionada para oferecer fácil acesso aos moradores dos principais bairros da Zona Sul de São Paulo. Se você procurou por <strong>"manicure perto de mim"</strong> ou <strong>"podóloga na Zona Sul"</strong>, você encontrou o lugar certo.
                    </p>
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
                        <h4 className="text-xl font-bold text-brand-dark mb-2">Fácil Acesso no Campo Belo</h4>
                        <p className="text-gray-600">
                            Estamos localizados na <strong>R. Vieira de Morais, 1466</strong>, uma das principais vias do bairro, com conexões rápidas para a Av. Roberto Marinho, Corredor Norte-Sul e Av. Santo Amaro.
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
                        Como Chegar
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Locations;