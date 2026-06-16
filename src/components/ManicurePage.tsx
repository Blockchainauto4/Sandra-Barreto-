
import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Scheduling from './Scheduling';
import FAQ from './FAQ';
import Locations from './Locations';
import type { Appointment } from '../types';
import { MANICURE_SERVICES_DATA, MANICURE_PRICING_DATA, MANICURE_FAQ_DATA } from '../constants';

interface ManicurePageProps {
    appointments: Appointment[];
    onAddAppointment: (appointment: Appointment) => void;
}

const ManicurePage: React.FC<ManicurePageProps> = ({ appointments, onAddAppointment }) => {
    // Structured Data for Local SEO (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "NailSalon",
        "name": "Manicure e Pedicure Sandra Barreto",
        "image": "https://picsum.photos/600/700?image=106",
        "priceRange": "$$",
        "telephone": "+55-11-95285-1860",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "R. Vieira de Morais, 1466",
          "addressLocality": "São Paulo",
          "addressRegion": "SP",
          "postalCode": "04617-005",
          "addressCountry": "BR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -23.6265,
          "longitude": -46.6800
        },
        "areaServed": [
            { "@type": "Place", "name": "Campo Belo" },
            { "@type": "Place", "name": "Moema" },
            { "@type": "Place", "name": "Brooklin" },
            { "@type": "Place", "name": "Itaim Bibi" },
            { "@type": "Place", "name": "Vila Olímpia" }
        ],
        "url": "https://yoursite.com/#manicure",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "09:00",
            "closes": "20:00"
          },
           {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Saturday"
            ],
            "opens": "09:00",
            "closes": "13:00"
          }
        ],
        "sameAs": [] 
    };

    return (
        <>
             {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            <Hero 
                title={
                    <>
                        Manicure e Nail Design no <br className="hidden md:block" />
                        <span className="text-brand-primary">Campo Belo e Moema</span>: Beleza e Biossegurança
                    </>
                }
                subtitle={
                    <p>
                        Unhas impecáveis com a segurança de um ambiente clínico. Especialistas em <strong>Esmaltação em Gel, Blindagem e SPA dos Pés</strong>. Materiais 100% esterilizados em Autoclave. Atendimento próximo ao Shopping Ibirapuera.
                    </p>
                }
            />
            
            <About 
                title="Cuidado Estético com Padrão Clínico"
                subtitle="Segurança e Beleza"
                image="https://picsum.photos/600/700?image=106" // Imagem mais voltada para beleza/fêmea
                description={
                    <>
                        <p className="mb-4">
                            Muito mais do que uma esmaltação, oferecemos um verdadeiro ritual de cuidado para suas mãos e pés. Nossa abordagem de <strong>Manicure Clínica</strong> une a estética refinada aos rigorosos protocolos de higiene da Podologia.
                        </p>
                        <p>
                            Utilizamos autoclave para esterilização de todos os instrumentais, garantindo risco zero de contaminação. Trabalhamos com as melhores marcas de esmaltes nacionais e importados, além de técnicas modernas como <strong>Gel e Blindagem</strong> para maior durabilidade. Localização privilegiada para moradores do <strong>Campo Belo, Brooklin e Moema</strong>.
                        </p>
                    </>
                }
                badges={[
                    { text: "Instrumentais Esterilizados (Autoclave)" },
                    { text: "Esmaltes Hipoalergênicos" },
                    { text: "Técnicas de Nail Design" },
                    { text: "Ambiente Confortável" }
                ]}
            />
            
            <Services 
                items={MANICURE_SERVICES_DATA}
                title="Nossos Serviços de Unhas"
                subtitle="Menu de Tratamentos"
            />
            
            <Pricing 
                items={MANICURE_PRICING_DATA}
                title="Menu de Valores - Manicure"
            />
            
            <Locations />
            
            <Testimonials />
            
            <Scheduling 
                appointments={appointments} 
                onAddAppointment={onAddAppointment} 
            />
            
            <FAQ 
                items={MANICURE_FAQ_DATA}
                title="Dúvidas sobre Manicure"
                subtitle="Tudo sobre nossos cuidados"
            />
        </>
    );
};

export default ManicurePage;