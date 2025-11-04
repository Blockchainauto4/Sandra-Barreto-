
import React from 'react';
import { Service, Review, FAQItem, BlogPost } from './types';

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


// Services Data
export const SERVICES_DATA: Service[] = [
    {
        icon: <FootIcon />,
        title: "Podologia Clássica",
        description: "Tratamento completo para unhas, calos e calosidades, garantindo a saúde e o bem-estar dos seus pés."
    },
    {
        icon: <NailIcon />,
        title: "Tratamento de Onicomicose",
        description: "Soluções eficazes e modernas para o tratamento de fungos nas unhas, recuperando sua aparência saudável."
    },
    {
        icon: <DiabeticFootIcon />,
        title: "Cuidado para Pés Diabéticos",
        description: "Atendimento especializado e preventivo para pés de pessoas com diabetes, evitando complicações."
    },
    {
        icon: <OrthoticsIcon />,
        title: "Órteses e Palmilhas",
        description: "Confecção de órteses personalizadas para correção de unhas e palmilhas para melhor conforto e pisada."
    }
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

// Blog Posts Data
export const BLOG_POSTS_DATA: BlogPost[] = [
    {
        id: '1',
        title: 'Pés Saudáveis no Verão: Dicas da sua Podóloga no Campo Belo',
        content: 'O verão é uma estação que exige cuidados redobrados com os pés. O uso constante de calçados abertos, o contato com areia e a umidade podem causar problemas. Por isso, separamos 5 dicas essenciais para você curtir a estação sem preocupações: hidrate diariamente, use protetor solar, seque bem os pés, escolha calçados confortáveis e, claro, visite seu podólogo regularmente. Se você está na Zona Sul de SP, especialmente no Campo Belo, Moema ou Brooklin, agende uma avaliação e garanta que seus pés estejam prontos para aproveitar o melhor do verão!',
        imageUrl: 'https://picsum.photos/seed/summerfeet/800/600',
        date: '15 de Julho, 2024',
        excerpt: 'O verão chegou na Zona Sul de SP! Se você mora no Campo Belo, Moema ou Brooklin, descubra 5 dicas essenciais para manter a saúde dos seus pés...'
    },
    {
        id: '2',
        title: 'Podologia Esportiva no Brooklin e Região: Como Evitar Lesões',
        content: 'Para atletas, os pés são a base de tudo. Impactos constantes, atrito e transpiração excessiva podem levar a lesões, bolhas, calos e problemas nas unhas. A podologia preventiva atua diretamente na minimização desses riscos. Se você pratica esportes e está na região do Brooklin, Campo Belo ou Itaim Bibi, investir na saúde dos seus pés é investir na sua performance. Entre em contato e saiba como podemos ajudar você a alcançar seus objetivos com segurança e conforto.',
        imageUrl: 'https://picsum.photos/seed/athletefoot/800/600',
        date: '28 de Junho, 2024',
        excerpt: 'Para atletas do Brooklin, Campo Belo e Itaim Bibi, os pés são a base de tudo. Entenda como a podologia preventiva pode otimizar sua performance...'
    }
];