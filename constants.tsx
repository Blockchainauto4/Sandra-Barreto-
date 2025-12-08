
import React from 'react';
import { Service, Review, FAQItem, BlogPost, PricingItem } from './types';

// Icons
export const FootIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S9 9.33 9 8.5 9.67 7 10.5 7zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-6 6c0 3.31 2.69 6 6 6s6-2.69 6-6H7.5z" />
    </svg>
);

export const NailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.25 2.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM12.25 21.25a.75.75 0 00-1.5 0v-1.5a.75.75 0 001.5 0v1.5zM3 13a.75.75 0 00-.75.75h1.5A.75.75 0 003 13zm18 0a.75.75 0 00-.75.75h1.5a.75.75 0 00-.75-.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25a.75.75 0 00-.75.75v12a.75.75 0 001.5 0v-12A.75.75 0 0012 5.25zM4.5 12a.75.75 0 00-.75.75h12a.75.75 0 000-1.5H4.5a.75.75 0 00-.75.75z" />
        <path d="M16 3.75a3.25 3.25 0 00-6.5 0V12h6.5V3.75z" />
    </svg>
);


export const DiabeticFootIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.016V12a.016.016 0 100 0z" />
    </svg>
);

export const OrthoticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6.24a3.24 3.24 0 013.24-3.24h0A3.24 3.24 0 0115.48 6.24V19" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19h7.5" />
    </svg>
);

export const PolishIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
);

export const HandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Services Data (Updated to include Manicure on Homepage)
export const SERVICES_DATA: Service[] = [
    {
        icon: <PolishIcon />,
        title: "Manicure e Unhas de Gel",
        description: "Esmaltação em gel, blindagem e design de unhas com biossegurança hospitalar. Atendimento no Campo Belo e Moema."
    },
    {
        icon: <FootIcon />,
        title: "Podologia Clínica",
        description: "Tratamento completo para unhas, calos e calosidades, garantindo a saúde e o bem-estar dos seus pés."
    },
    {
        icon: <DiabeticFootIcon />,
        title: "Cuidado para Pés Diabéticos",
        description: "Atendimento especializado e preventivo para pés de pessoas com diabetes, evitando complicações."
    },
    {
        icon: <NailIcon />,
        title: "Tratamento de Micoses",
        description: "Soluções eficazes e modernas para o tratamento de fungos nas unhas (Onicomicose), recuperando a aparência saudável."
    }
];

export const MANICURE_SERVICES_DATA: Service[] = [
    {
        icon: <PolishIcon />,
        title: "Manicure Clássica",
        description: "Cutilagem detalhada e esmaltação tradicional com materiais 100% esterilizados em autoclave, ideal para clientes em Moema e Campo Belo."
    },
    {
        icon: <NailIcon />,
        title: "Esmaltação em Gel",
        description: "Durabilidade superior e brilho intenso. A escolha preferida para quem busca unhas perfeitas por semanas na Zona Sul de SP."
    },
    {
        icon: <HandIcon />,
        title: "Blindagem de Unhas",
        description: "Reforço estrutural para unhas naturais, prevenindo quebras e descamações. Técnica avançada disponível no Brooklin."
    },
    {
        icon: <OrthoticsIcon />,
        title: "SPA das Mãos e Pés",
        description: "Esfoliação, hidratação profunda e massagem relaxante para renovar a pele e o bem-estar."
    }
];

export const PODIATRY_PRICING_DATA: PricingItem[] = [
    { treatment: "Podologia Tradicional (Completa)", indication: "Corte técnico, desbaste de calos, hidratação.", price: "R$ 120,00 - R$ 150,00" },
    { treatment: "Tratamento de Unha Encravada", indication: "Remoção de espícula (canto de unha) com curativo.", price: "R$ 150,00 - R$ 220,00" },
    { treatment: "Pé Diabético (Preventivo)", indication: "Avaliação de sensibilidade e corte seguro.", price: "R$ 130,00 - R$ 160,00" },
    { treatment: "Tratamento de Verruga Plantar", indication: "Sessão de cauterização (Olho de Peixe).", price: "A partir de R$ 100,00" },
    { treatment: "Órtese para Correção (Unidade)", indication: "Aplicação de fibra/botão para correção ungueal.", price: "R$ 80,00 - R$ 120,00" },
    { treatment: "Laserterapia (Sessão)", indication: "Para micoses, cicatrização e inflamações.", price: "R$ 60,00 - R$ 90,00" }
];

export const MANICURE_PRICING_DATA: PricingItem[] = [
    { treatment: "Manicure Tradicional", indication: "Cutilagem e Esmaltação Nacional/Importada", price: "R$ 45,00" },
    { treatment: "Pedicure Tradicional", indication: "Cutilagem e Esmaltação", price: "R$ 55,00" },
    { treatment: "Pé e Mão (Combo)", indication: "Serviço completo tradicional", price: "R$ 90,00" },
    { treatment: "Esmaltação em Gel (Mãos)", indication: "Alta durabilidade (sem cutilagem)", price: "R$ 80,00" },
    { treatment: "Manicure + Esmaltação em Gel", indication: "Serviço completo com Gel", price: "R$ 110,00" },
    { treatment: "Blindagem (Banho de Gel)", indication: "Proteção para unha natural", price: "R$ 120,00" },
    { treatment: "SPA dos Pés", indication: "Esfoliação + Hidratação + Massagem", price: "R$ 60,00" },
];

// Reviews Data from Google
export const REVIEWS_DATA: Review[] = [
    {
        quote: "Super atenciosa, educada e pontual! Meus pés estão renovados! Recomendo de olhos fechados!",
        author: "Gabi Alves",
        rating: 5,
    },
    {
        quote: "Atendimento maravilhoso, a Sandra é muito atenciosa e uma excelente profissional!",
        author: "Ana Flavia",
        rating: 5,
    },
    {
        quote: "Ótima profissional, super atenciosa, preço justo e o consultório é um ambiente extremamente agradável. Recomendo muito!",
        author: "Lucas M.",
        rating: 5,
    },
    {
        quote: "Excelente profissional! Atenciosa, delicada e cuidadosa. Nota 10!",
        author: "Marcia Galdino Pereira",
        rating: 5,
    },
    {
        quote: "Sandra é uma profissional excelente, muito atenciosa e cuidadosa. O espaço é muito agradável e de fácil acesso. Recomendo muito!",
        author: "Silvia Barreto",
        rating: 5,
    },
    {
        quote: "Atendimento impecável! Profissional qualificada e muito simpática! Recomendo!",
        author: "Carolina Vitas",
        rating: 5,
    }
];

// FAQ Data
export const FAQ_DATA: FAQItem[] = [
    {
        question: "Com que frequência devo ir ao podólogo?",
        answer: "A frequência ideal varia de acordo com cada caso. Para manutenção e prevenção, uma visita mensal ou a cada 45 dias é recomendada. Em casos de tratamentos específicos, o profissional indicará o intervalo correto."
    },
    {
        question: "O tratamento de unha encravada dói?",
        answer: "Utilizamos técnicas modernas e, se necessário, anestésicos locais para minimizar qualquer desconforto. Nosso objetivo é que o procedimento seja o mais tranquilo e indolor possível."
    },
    {
        question: "Qual a diferença entre o trabalho do podólogo e da pedicure?",
        answer: "A pedicure realiza um trabalho estético de embelezamento das unhas e pés. O podólogo é um profissional da área da saúde, com formação técnica para tratar afecções e patologias dos pés, como unhas encravadas, calos, micoses, e realizar cuidados preventivos em pés diabéticos."
    },
    {
        question: "Atendem por convênio médico?",
        answer: "No momento, não atendemos por convênio médico, mas emitimos recibo para que você possa solicitar o reembolso, caso seu plano ofereça essa opção."
    }
];

export const MANICURE_FAQ_DATA: FAQItem[] = [
    {
        question: "Os materiais de manicure são esterilizados?",
        answer: "Sim, absolutamente todos os nossos alicates e espátulas passam por um rigoroso processo de esterilização em Autoclave, o mesmo padrão utilizado em procedimentos cirúrgicos. Sua saúde e segurança são nossa prioridade."
    },
    {
        question: "Vocês fazem esmaltação em gel e blindagem?",
        answer: "Sim! Oferecemos Esmaltação em Gel (que dura até 20 dias) e Blindagem (Banho de Gel) para fortalecer suas unhas naturais. Utilizamos produtos de alta qualidade para garantir durabilidade e brilho."
    },
    {
        question: "Onde vocês estão localizados em São Paulo?",
        answer: "Estamos no coração do Campo Belo (Rua Vieira de Morais, 1466), com fácil acesso para quem vem de Moema, Brooklin, Itaim Bibi e Vila Olímpia."
    },
    {
        question: "Preciso agendar horário para manicure?",
        answer: "Sim, trabalhamos com agendamento prévio para garantir um atendimento pontual e exclusivo, sem espera. Você pode agendar facilmente pelo WhatsApp ou aqui pelo site."
    }
];

// Blog Posts Data
export const BLOG_POSTS_DATA: BlogPost[] = [
    {
        id: '1',
        title: 'Pés Saudáveis no Verão: Dicas da sua Podóloga no Campo Belo',
        content: 'O verão é uma estação que exige cuidados redobrados com os pés. O uso constante de calçados abertos, o contato com areia e a umidade podem causar problemas. Por isso, separamos 5 dicas essenciais para você curtir a estação sem preocupações: hidrate diariamente, use protetor solar, seque bem os pés, escolha calçados confortáveis e, claro, visite seu podólogo regularmente. Se você está na Zona Sul de SP, especialmente no Campo Belo, Moema ou Brooklin, agende uma avaliação e garanta que seus pés estejam prontos para aproveitar o melhor do verão!',
        imageUrl: 'https://picsum.photos/seed/summerfeet/800/600',
        date: '15 de Julho, 2024',
        excerpt: 'O verão chegou na Zona Sul de SP! Se você mora no Campo Belo, Moema ou Brooklin, descubra 5 dicas essenciais para manter a saúde dos seus pés...',
        author: 'Sandra Barreto',
        authorRole: 'Podóloga Especialista'
    },
    {
        id: '2',
        title: 'Podologia Esportiva no Brooklin e Região: Como Evitar Lesões',
        content: 'Para atletas, os pés são a base de tudo. Impactos constantes, atrito e transpiração excessiva podem levar a lesões, bolhas, calos e problemas nas unhas. A podologia preventiva atua diretamente na minimização desses riscos. Se você pratica esportes e está na região do Brooklin, Campo Belo ou Itaim Bibi, investir na saúde dos seus pés é investir na sua performance. Entre em contato e saiba como podemos ajudar você a alcançar seus objetivos com segurança e conforto.',
        imageUrl: 'https://picsum.photos/seed/athletefoot/800/600',
        date: '28 de Junho, 2024',
        excerpt: 'Para atletas do Brooklin, Campo Belo e Itaim Bibi, os pés são a base de tudo. Entenda como a podologia preventiva pode otimizar sua performance...',
        author: 'Sandra Barreto',
        authorRole: 'Podóloga Especialista'
    }
];