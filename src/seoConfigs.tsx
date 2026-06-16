
import React from 'react';
import type { LocationItem } from './types';

export type LocationConfig = {
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    seoTitle: string;
    seoDesc: string;
    locationsList?: LocationItem[];
};

export const LOCATION_CONFIGS: Record<string, LocationConfig> = {
    // HIGH-INTENT Landing Page
    'podologa-perto-de-mim': {
        heroTitle: <>Encontrou sua <span className="text-brand-secondary">Podóloga Perto de Mim</span></>,
        heroSubtitle: <p>Atendimento especializado no coração da Zona Sul, no <strong>Campo Belo</strong>. Acesso rápido para <strong>Moema, Brooklin e Itaim</strong>. Agende e alivie suas dores hoje mesmo.</p>,
        seoTitle: "Podóloga Perto de Mim em Campo Belo • Sandra Barreto • Atendimento Já",
        seoDesc: "Procurando podóloga perto de você? Dra. Sandra Barreto atende no Campo Belo e região com foco em alívio imediato de dores e unhas encravadas. Agende!"
    },
    // São Paulo Neighborhoods
    'moema': {
        heroTitle: <>Manicure e Podologia em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Atendimento de referência para <strong>Unhas de Gel e Podologia</strong> em Moema e região do <strong>Shopping Ibirapuera</strong>. Biossegurança e conforto.</p>,
        seoTitle: "Podóloga em Moema • Sandra Barreto • Unha Encravada e Tratamentos",
        seoDesc: "Atendimento especializado em podologia e manicure para moradores de Moema. Tratamento de micose, calos e unhas de gel com biossegurança. Agende sua visita!"
    },
    'campo-limpo': {
        heroTitle: <>Podologia para o <span className="text-brand-secondary">Campo Limpo</span> e Região</>,
        heroSubtitle: <p>Sua saúde começa pelos pés! Atendimento de qualidade acessível para moradores do <strong>Campo Limpo, Vila das Belezas, Jardim Sul e Horto do Ypê</strong>. Livre-se da dor da unha encravada hoje mesmo.</p>,
        seoTitle: "Podóloga no Campo Limpo • Sandra Barreto • Saúde para seus Pés",
        seoDesc: "Podologia clínica atendendo a região do Campo Limpo e Jardim Sul. Especialista em tratamento de unhas e calosidades. Atendimento domiciliar disponível!"
    },
    'itaim': {
        heroTitle: <>Podologia e Unhas no <span className="text-brand-secondary">Itaim Bibi</span></>,
        heroSubtitle: <p>Excelência em cuidados com os pés e mãos para quem vive ou trabalha no <strong>Itaim Bibi</strong> e arredores. Biossegurança total e atendimento pontual.</p>,
        seoTitle: "Podóloga no Itaim Bibi • Sandra Barreto • Atendimento Especializado",
        seoDesc: "Cuidados profissionais para seus pés no Itaim Bibi. Especialista em podologia esportiva e tratamentos clínicos. Agende seu horário no consultório ou domicílio."
    },
    'brooklin': {
        heroTitle: <>Sua Manicure e Podóloga no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Conforto e beleza para mãos e pés no coração do <strong>Brooklin</strong> e região da <strong>Berrini</strong>. Tratamentos estéticos e clínicos com especialista qualificada.</p>,
        seoTitle: "Podóloga no Brooklin • Sandra Barreto • Unhas de Gel e Podologia",
        seoDesc: "Tratamentos completos de podologia e estética no Brooklin. Unha encravada, calos e unhas de gel com especialista. Agende agora seu atendimento!"
    },
    'zona-sul': {
        heroTitle: <>Manicure e Podologia na <span className="text-brand-secondary">Zona Sul de SP</span></>,
        heroSubtitle: <p>Clínica bem localizada para quem busca <strong>"Manicure perto de mim"</strong>. Fácil acesso via Av. Roberto Marinho. Atendimento para <strong>Campo Belo, Moema e Região</strong>.</p>,
        seoTitle: "Podóloga na Zona Sul de SP • Sandra Barreto • Campo Belo e Região",
        seoDesc: "A melhor opção em podologia na Zona Sul. Atendimento no Campo Belo, Moema e Brooklin. Especialista em saúde dos pés e unhas. Agende sua consulta!"
    },
    'perto-de-mim': {
        heroTitle: <>Podóloga <span className="text-brand-secondary">Perto de Você</span></>,
        heroSubtitle: <p>Localização estratégica no <strong>Campo Belo</strong> with fácil acesso para <strong>Moema, Brooklin e Aeroporto</strong>. A clínica mais completa da região.</p>,
        seoTitle: "Podóloga Perto de Mim • Sandra Barreto • Atendimento no Campo Belo",
        seoDesc: "Encontre alívio para dores nos pés com a Dra. Sandra Barreto. Atendimento especializado próximo a você no Campo Belo, Moema e Brooklin. Agende!"
    },
    // Service-specific Landing Pages
    'unha-encravada-perto-de-mim': {
        heroTitle: <>Tratamento para <span className="text-brand-secondary">Unha Encravada</span> Perto de Você</>,
        heroSubtitle: <p>Alívio imediato da dor com técnicas especializadas. Atendimento de emergência para <strong>unha inflamada e infeccionada</strong> no Campo Belo, perto de Moema.</p>,
        seoTitle: "Tratamento de Unha Encravada em Campo Belo • Sandra Barreto • Alívio Já",
        seoDesc: "Dor na unha? Especialista em unha encravada com atendimento de emergência no Campo Belo e Zona Sul. Alívio imediato e técnicas indolores. Agende!"
    },
    'unha-de-gel-moema': {
        heroTitle: <>Unhas de Gel em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Durabilidade e brilho para suas unhas com nossa técnica de <strong>esmaltação em gel e blindagem</strong>. Atendimento premium para a região de Moema, perto do <strong>Shopping Ibirapuera</strong>.</p>,
        seoTitle: "Unhas de Gel em Moema • Sandra Barreto • Blindagem e Esmaltação",
        seoDesc: "Unhas perfeitas e duradouras em Moema. Especialista em unhas de gel e blindagem com máxima biossegurança. Agende seu horário premium hoje!"
    },
    'reflexologia-brooklin': {
        heroTitle: <>Reflexologia Podal no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Relaxe e reequilibre suas energias com uma sessão de <strong>reflexologia podal terapêutica</strong>. Alívio de estresse e dores para quem trabalha ou mora na região da <strong>Berrini e Brooklin</strong>.</p>,
        seoTitle: "Reflexologia Podal no Brooklin • Sandra Barreto • Bem-estar e Saúde",
        seoDesc: "Reduza o estresse e melhore sua saúde com reflexologia podal no Brooklin. Massagem terapêutica especializada para alívio de tensões. Agende sua sessão!"
    },
    'podologia-perto-de-mim-aberto-agora': {
        heroTitle: <>Podologia Perto de Mim: <span className="text-brand-secondary">Aberto Agora / Plantão Único</span></>,
        heroSubtitle: <p>Buscando atendimento imediato? Conte com a Dra. Sandra Barreto no <strong>Campo Belo</strong> para alívio rápido de dores, unha com pus, encravada ou inflamada. <strong>Horários flexíveis e encaixes rápidos de urgência hoje mesmo!</strong></p>,
        seoTitle: "Podologia Perto de Mim Aberto Agora • Sandra Barreto • Urgências Zona Sul SP",
        seoDesc: "Buscando podólogo aberto agora perto de você? Agende sua consulta com encaixe rápido de urgência com a Dra. Sandra Barreto no Campo Belo. Alívio de dor garantido!"
    },
    'podologia-perto-de-mim-bem-avaliada': {
        heroTitle: <>Clínica de Podologia <span className="text-brand-secondary">Mais Bem Avaliada no Google</span></>,
        heroSubtitle: <p>Sua saúde em mãos de quem os pacientes confiam! <strong>Nota 5.0 ⭐ no Google ratings</strong>. Atendimento humanizado, biossegurança rigorosa em autoclave e resultados garantidos no <strong>Campo Belo</strong> e Zona Sul.</p>,
        seoTitle: "Podóloga Perto de Mim Bem Avaliada • Sandra Barreto • Nota 5.0 ⭐",
        seoDesc: "Confira a opinião de quem já se tratou conosco. Clínica de podologia no Campo Belo classificada com avaliação máxima 5.0 ⭐ pelos pacientes do Google."
    },
    'micose-unha-perto-de-mim': {
        heroTitle: <>Tratamento Eficaz de <span className="text-brand-secondary">Micose de Unha</span> Perto de Você</>,
        heroSubtitle: <p>Recupere a saúde e beleza das suas unhas (onicomicose) com tratamento especializado, laserterapia e acompanhamento profissional no <strong>Campo Belo / Moema</strong>. Resultados rápidos e definitivos.</p>,
        seoTitle: "Tratamento de Micose de Unha em Campo Belo • Sandra Barreto • Laserterapia",
        seoDesc: "Acabe de vez com a micose de unha! Tratamentos modernos de alta eficácia com laserterapia na clínica da Dra. Sandra Barreto no Campo Belo. Agende sua consulta."
    },
};
