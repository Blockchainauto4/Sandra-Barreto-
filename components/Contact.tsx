
import React from 'react';

const Contact: React.FC = () => {
    const contactInfo = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
            title: "Telefone & WhatsApp",
            content: "(11) 95285-1860",
            actionText: "Agendar Agora",
            href: "https://wa.me/5511952851860"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            title: "Endereço da Clínica",
            content: "R. Vieira de Morais, 1466, Campo Belo, SP",
            actionText: "Ver no Mapa",
            href: "https://www.google.com/maps/dir//R.+Vieira+de+Morais,+1466+-+Campo+Belo,+S%C3%A3o+Paulo+-+SP,+04617-005"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
            title: "Horário de Atendimento",
            content: "Seg a Sex: 9h - 20h | Sáb: 9h - 13h",
            actionText: "Ver Disponibilidade",
            href: "#agendamento"
        }
    ];

    return (
        <section id="contato" className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Fale Conosco
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Entre em Contato
                    </h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Estamos à disposição para tirar suas dúvidas e agendar sua consulta. Escolha a melhor forma de nos contatar.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {contactInfo.map((item, index) => (
                        <div key={index} className="bg-brand-primary text-white p-8 rounded-lg shadow-xl text-center flex flex-col items-center group transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                            <p className="flex-grow mb-4">{item.content}</p>
                            <a 
                                href={item.href}
                                target={item.href.startsWith('http') ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className="mt-auto bg-white text-brand-dark font-bold py-2 px-6 rounded-full hover:bg-brand-secondary transition-colors duration-300"
                            >
                                {item.actionText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
