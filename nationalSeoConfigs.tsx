
import React from 'react';
import type { LocationItem } from './types';

export type LocationConfig = {
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    seoTitle: string;
    seoDesc: string;
    locationsList?: LocationItem[];
};

export const NATIONAL_SEO_CONFIGS: Record<string, LocationConfig> = {
    'parana': {
        heroTitle: <>Guia de Podologia no <span className="text-brand-secondary">Paraná</span></>,
        heroSubtitle: <p>Informações e dicas sobre saúde dos pés, tratamentos para <strong>unha encravada e micoses</strong> para moradores de <strong>Curitiba, Londrina</strong> e todo o estado do Paraná.</p>,
        seoTitle: "Podologia no Paraná (PR) | Guia de Clínicas e Tratamentos em Curitiba",
        seoDesc: "Encontre informações sobre podologia no Paraná. Dicas para tratamento de unha encravada, micose e saúde dos pés em Curitiba, Londrina, Maringá e região.",
        locationsList: [
            { name: "Curitiba", detail: "Capital do Estado" },
            { name: "Londrina", detail: "Norte do Paraná" },
            { name: "Maringá", detail: "Noroeste Paranaense" },
            { name: "Foz do Iguaçu", detail: "Região da Fronteira" },
            { name: "Cascavel", detail: "Oeste Paranaense" },
            { name: "Ponta Grossa", detail: "Campos Gerais" },
        ]
    },
    'rio-de-janeiro': {
        heroTitle: <>Podologia no Estado do <span className="text-brand-secondary">Rio de Janeiro</span></>,
        heroSubtitle: <p>Um guia completo sobre cuidados com os pés, incluindo <strong>podologia esportiva e tratamentos a laser</strong>, para a <strong>capital, Niterói, Baixada Fluminense</strong> e todo o RJ.</p>,
        seoTitle: "Podologia no Rio de Janeiro (RJ) | Tratamentos na Capital, Niterói e Baixada",
        seoDesc: "Guia de podologia para o Rio de Janeiro. Saiba mais sobre tratamentos para calos, micoses e pés diabéticos na capital, Niterói, São Gonçalo e Baixada.",
        locationsList: [
            { name: "Rio de Janeiro (Capital)", detail: "Zona Sul, Barra, Centro" },
            { name: "Niterói", detail: "Região Metropolitana" },
            { name: "São Gonçalo", detail: "Região Metropolitana" },
            { name: "Duque de Caxias", detail: "Baixada Fluminense" },
            { name: "Nova Iguaçu", detail: "Baixada Fluminense" },
            { name: "Campos dos Goytacazes", detail: "Norte Fluminense" },
        ]
    },
    'rio-grande-do-sul': {
        heroTitle: <>Saúde dos Pés no <span className="text-brand-secondary">Rio Grande do Sul</span></>,
        heroSubtitle: <p>Informações valiosas sobre <strong>prevenção e tratamento de afecções nos pés</strong>, direcionado para os gaúchos de <strong>Porto Alegre, Caxias do Sul</strong> e outras cidades.</p>,
        seoTitle: "Podologia no Rio Grande do Sul (RS) | Porto Alegre e Caxias do Sul",
        seoDesc: "Tudo sobre saúde dos pés no Rio Grande do Sul. Informações sobre podólogos e tratamentos em Porto Alegre, Caxias do Sul, Pelotas e Santa Maria.",
        locationsList: [
            { name: "Porto Alegre", detail: "Capital Gaúcha" },
            { name: "Caxias do Sul", detail: "Serra Gaúcha" },
            { name: "Pelotas", detail: "Zona Sul do Estado" },
            { name: "Canoas", detail: "Região Metropolitana" },
            { name: "Santa Maria", detail: "Centro do Estado" },
            { name: "Passo Fundo", detail: "Norte Gaúcho" },
        ]
    },
    'goias': {
        heroTitle: <>Guia de Podologia em <span className="text-brand-secondary">Goiás</span></>,
        heroSubtitle: <p>Descubra a importância dos <strong>cuidados com os pés diabéticos</strong> e outros tratamentos podológicos. Informações para moradores de <strong>Goiânia, Anápolis</strong> e região.</p>,
        seoTitle: "Podologia em Goiás (GO) | Dicas para Goiânia e Anápolis",
        seoDesc: "Portal de informações sobre podologia em Goiás. Dicas de saúde para os pés, tratamentos e cuidados para moradores de Goiânia, Anápolis e Aparecida de Goiânia.",
         locationsList: [
            { name: "Goiânia", detail: "Capital do Estado" },
            { name: "Aparecida de Goiânia", detail: "Região Metropolitana" },
            { name: "Anápolis", detail: "Centro Goiano" },
            { name: "Rio Verde", detail: "Sudoeste Goiano" },
            { name: "Luziânia", detail: "Entorno do DF" },
            { name: "Catalão", detail: "Sudeste Goiano" },
        ]
    },
    'distrito-federal': {
        heroTitle: <>Cuidados Podológicos no <span className="text-brand-secondary">Distrito Federal</span></>,
        heroSubtitle: <p>Artigos e dicas de especialistas sobre <strong>saúde dos pés, órteses e reflexologia</strong> para quem vive em <strong>Brasília, Taguatinga</strong> e cidades satélites.</p>,
        seoTitle: "Podologia no Distrito Federal (DF) | Brasília e Cidades Satélites",
        seoDesc: "Informações essenciais de podologia para o Distrito Federal. Saiba mais sobre tratamentos e cuidados com os pés em Brasília, Taguatinga, Ceilândia e Guará.",
        locationsList: [
            { name: "Brasília (Plano Piloto)", detail: "Capital Federal" },
            { name: "Taguatinga", detail: "Região Administrativa" },
            { name: "Ceilândia", detail: "Região Administrativa" },
            { name: "Guará", detail: "Região Administrativa" },
            { name: "Águas Claras", detail: "Região Administrativa" },
            { name: "Gama", detail: "Região Administrativa" },
        ]
    },
};
