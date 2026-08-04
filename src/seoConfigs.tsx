
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
        heroTitle: <>Sua <span className="text-brand-secondary">Podóloga Profissional Local</span> Perto de Mim</>,
        heroSubtitle: <p>Atendimento clínico no coração da Zona Sul, no <strong>Campo Belo</strong>. Acesso rápido para <strong>Moema, Brooklin e Itaim</strong>. Alívio de dores, tratamento de viroses (verruga plantar) e onicomicose.</p>,
        seoTitle: "Podóloga Perto de Mim em Campo Belo • Dra. Sandra Barreto • Profissional Local",
        seoDesc: "Procurando podóloga perto de você? Dra. Sandra Barreto, profissional local no Campo Belo, atende com foco em alívio imediato de dores e unhas encravadas."
    },
    // São Paulo Neighborhoods
    'moema': {
        heroTitle: <>Podologia Clínica em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Atendimento de referência como <strong>profissional local</strong> perto de Moema e região do <strong>Shopping Ibirapuera</strong>. Especialista em virologia podológica e tratamentos clínicos avançados.</p>,
        seoTitle: "Podologia em Moema • Dra. Sandra Barreto • Clínica Especializada Local",
        seoDesc: "Atendimento especializado em podologia clínica perto de Moema. Tratamento de verruga plantar (HPV), micose e unha encravada com biossegurança. Agende!"
    },
    'campo-limpo': {
        heroTitle: <>Podologia para o <span className="text-brand-secondary">Campo Limpo</span> e Região</>,
        heroSubtitle: <p>Sua saúde começa pelos pés! Atendimento de qualidade acessível e seguro. Livre-se da dor da unha encravada, trate micoses e lesões virais com uma profissional especializada.</p>,
        seoTitle: "Podóloga perto do Campo Limpo • Dra. Sandra Barreto • Especialista",
        seoDesc: "Podologia clínica perto da região do Campo Limpo. Profissional local especialista em tratamento de virologia, unhas e calosidades."
    },
    'itaim': {
        heroTitle: <>Podologia Clínica no <span className="text-brand-secondary">Itaim Bibi</span></>,
        heroSubtitle: <p>Excelência em cuidados clínicos com os pés para quem vive ou trabalha no <strong>Itaim Bibi</strong> e arredores. Tratamento definitivo para micoses e verrugas plantares.</p>,
        seoTitle: "Podóloga no Itaim Bibi • Dra. Sandra Barreto • Profissional Local",
        seoDesc: "Cuidados profissionais e clínicos para seus pés no Itaim Bibi. Especialista em podologia para tratamentos de alta performance e virologia."
    },
    'brooklin': {
        heroTitle: <>Sua Podóloga Clínica no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Saúde e conforto para seus pés no coração do <strong>Brooklin</strong> e região da <strong>Berrini</strong>. Tratamentos de onicomicose e viroses com especialista qualificada.</p>,
        seoTitle: "Podóloga no Brooklin • Dra. Sandra Barreto • Podologia e Virologia",
        seoDesc: "Tratamentos completos de podologia clínica no Brooklin. Verruga plantar, micose, unha encravada e calos com profissional local. Agende agora!"
    },
    'zona-sul': {
        heroTitle: <>Podologia Clínica na <span className="text-brand-secondary">Zona Sul de SP</span></>,
        heroSubtitle: <p>Clínica de referência como <strong>profissional local</strong>. Fácil acesso via Av. Roberto Marinho. Atendimento especializado para <strong>Campo Belo, Moema e Região</strong>.</p>,
        seoTitle: "Podóloga na Zona Sul SP • Dra. Sandra Barreto • Profissional Local",
        seoDesc: "A melhor opção em podologia na Zona Sul. Atendimento no Campo Belo, Moema e Brooklin. Especialista em virologia e saúde clínica dos pés."
    },
    'perto-de-mim': {
        heroTitle: <>Podóloga Profissional <span className="text-brand-secondary">Local Perto de Você</span></>,
        heroSubtitle: <p>Localização estratégica no <strong>Campo Belo</strong> com fácil acesso para <strong>Moema, Brooklin e Aeroporto</strong>. A clínica especializada mais completa da região.</p>,
        seoTitle: "Podóloga Perto de Mim • Dra. Sandra Barreto • Profissional Local",
        seoDesc: "Encontre tratamento clínico definitivo para dores nos pés com a Dra. Sandra Barreto. Atendimento especializado próximo a você no Campo Belo."
    },
    // Service-specific Landing Pages
    'unha-encravada-perto-de-mim': {
        heroTitle: <>Tratamento para <span className="text-brand-secondary">Unha Encravada</span> Perto de Você</>,
        heroSubtitle: <p>Alívio imediato da dor com técnicas clínicas especializadas. Atendimento de urgência por uma <strong>profissional local</strong> no Campo Belo e arredores.</p>,
        seoTitle: "Tratamento de Unha Encravada em Campo Belo • Dra. Sandra Barreto",
        seoDesc: "Dor na unha? Profissional local especialista em unha encravada no Campo Belo e Zona Sul. Alívio imediato e técnicas clínicas indolores. Agende!"
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
    'verruga-plantar-perto-de-mim': {
        heroTitle: <>Tratamento de <span className="text-brand-secondary">Verruga Plantar (HPV / Olho de Peixe)</span></>,
        heroSubtitle: <p>Eliminação segura de lesões virais plantares com a <strong>Dra. Sandra Barreto, profissional local no Campo Belo</strong>. Tratamento de viroses podológicas e remoção sem complicações.</p>,
        seoTitle: "Tratamento de Verruga Plantar em Campo Belo • Dra. Sandra Barreto • Virologia Podológica",
        seoDesc: "Livre-se da verruga plantar (olho de peixe / HPV). Atendimento especializado no Campo Belo, Zona Sul de SP. Dra. Sandra Barreto, profissional local. Agende!"
    },
};
