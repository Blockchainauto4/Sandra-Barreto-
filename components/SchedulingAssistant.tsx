
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Appointment } from '../types';
import { SERVICES_DATA, MANICURE_SERVICES_DATA } from '../constants';

interface SchedulingAssistantProps {
    appointments: Appointment[];
    onAddAppointment: (appointment: Appointment) => void;
}

interface Message {
    role: 'user' | 'model';
    text: string;
}

const SchedulingAssistant: React.FC<SchedulingAssistantProps> = ({ appointments, onAddAppointment }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Olá! Sou a Carol, assistente virtual da Dra. Sandra. Posso agendar seu horário, tirar dúvidas ou consultar preços. Como posso ajudar?' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Prepare Context Data
            const today = new Date();
            const dayName = today.toLocaleDateString('pt-BR', { weekday: 'long' });
            const fullDate = today.toLocaleDateString('pt-BR');
            
            const allServices = [...SERVICES_DATA, ...MANICURE_SERVICES_DATA].map(s => s.title).join(', ');
            
            // Format existing appointments for context (anonymized)
            const busySlots = appointments.map(a => `${a.date} às ${a.time}`).join(', ');

            const systemPrompt = `
                Você é a Carol, recepcionista virtual da clínica de Podologia Sandra Barreto.
                Hoje é ${dayName}, ${fullDate}.
                
                SERVIÇOS DISPONÍVEIS: ${allServices}.
                HORÁRIO: Seg-Sex 09:00-20:00, Sáb 09:00-13:00. Dom fechado.
                HORÁRIOS JÁ OCUPADOS: ${busySlots || "Nenhum horário ocupado ainda"}.

                SEU OBJETIVO: Agendar um horário para o cliente.
                
                REGRAS:
                1. Seja simpática, breve e use emojis.
                2. Para agendar, você PRECISA de: Serviço, Data (AAAA-MM-DD), Hora (HH:MM), Nome do Cliente e Telefone.
                3. Se o cliente pedir um horário já ocupado, sugira outro próximo.
                4. Se o cliente pedir um horário fora do expediente ou domingo, avise educadamente.
                
                IMPORTANTE: 
                Sempre responda em JSON seguindo este schema exato, não adicione markdown:
                {
                    "textResponse": "Sua resposta textual para o cliente aqui.",
                    "bookingAction": {
                        "readyToBook": boolean, (True APENAS se tivermos TODOS os dados: serviço, data, hora, nome, telefone e o usuário confirmou)
                        "service": string | null,
                        "date": string | null, (Formato YYYY-MM-DD)
                        "time": string | null, (Formato HH:MM)
                        "clientName": string | null,
                        "clientPhone": string | null
                    }
                }
            `;

            const chatHistory = messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Carol'}: ${m.text}`).join('\n');
            const prompt = `${systemPrompt}\n\nHISTÓRICO:\n${chatHistory}\nCliente: ${userMessage}\nCarol (JSON):`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    temperature: 0.4
                }
            });

            const jsonResponse = JSON.parse(response.text || '{}');
            
            if (jsonResponse.textResponse) {
                setMessages(prev => [...prev, { role: 'model', text: jsonResponse.textResponse }]);
            }

            // Handle automatic booking if AI detects readiness
            if (jsonResponse.bookingAction?.readyToBook) {
                const { service, date, time, clientName, clientPhone } = jsonResponse.bookingAction;
                
                // Double check if slot is free (client side validation)
                const isTaken = appointments.some(a => a.date === date && a.time === time);
                
                if (isTaken) {
                     setMessages(prev => [...prev, { role: 'model', text: "Ops! Acabei de verificar e esse horário foi preenchido segundos atrás. Podemos tentar outro?" }]);
                } else {
                    const newAppointment: Appointment = {
                        id: Date.now().toString(),
                        service: service || 'Consulta Geral',
                        date: date || today.toISOString().split('T')[0],
                        time: time || '09:00',
                        clientName: clientName || 'Cliente Chat',
                        clientContact: clientPhone || '',
                        clientEmail: ''
                    };
                    onAddAppointment(newAppointment);
                    // AI message usually says "Agendado!", but we can add a system confirmation UI if needed.
                }
            }

        } catch (error) {
            console.error("Chat Error", error);
            setMessages(prev => [...prev, { role: 'model', text: "Desculpe, tive um problema técnico momentâneo. Pode repetir?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-24 right-6 bg-brand-secondary hover:bg-brand-primary text-white p-4 rounded-full shadow-2xl z-50 transition-all transform hover:scale-105 flex items-center gap-2 group"
                aria-label="Abrir assistente virtual"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <>
                        <span className="hidden group-hover:block font-bold text-sm pr-1">Agendar com IA</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-40 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 animate-[fadeIn_0.3s_ease-out] overflow-hidden">
                    {/* Header */}
                    <div className="bg-brand-primary p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="text-white font-bold">Carol - Assistente</h3>
                            <p className="text-brand-secondary text-xs">Online agora</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-brand-secondary text-white rounded-br-none' 
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Digite sua mensagem..."
                            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm"
                            disabled={isLoading}
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading || !input.trim()}
                            className="bg-brand-primary text-white p-2 rounded-full hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default SchedulingAssistant;
