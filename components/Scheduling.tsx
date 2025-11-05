import React, { useState, useMemo } from 'react';
import { Appointment } from '../types';

interface SchedulingProps {
    appointments: Appointment[];
    onAddAppointment: (appointment: Appointment) => void;
    isAuthenticated: boolean;
    onLoginRequest: () => void;
}

const timeSlots = {
    week: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"],
    saturday: ["09:00", "10:00", "11:00", "12:00"],
};

const Scheduling: React.FC<SchedulingProps> = ({ appointments, onAddAppointment, isAuthenticated, onLoginRequest }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [clientDetails, setClientDetails] = useState({ name: '', phone: '', email: '' });
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const serviceName = "Consulta de Podologia";

    const bookedSlots = useMemo(() => {
        if (!selectedDate) return new Set();
        const dateString = selectedDate.toISOString().split('T')[0];
        return new Set(
            appointments
                .filter(a => a.date === dateString)
                .map(a => a.time)
        );
    }, [appointments, selectedDate]);

    const handleDateSelect = (day: number) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (newDate < new Date(new Date().toDateString())) return; // Disable past dates
        if (newDate.getDay() === 0) return; // Disable Sundays
        setSelectedDate(newDate);
        setSelectedTime('');
    };

    const handleNextStep = () => setStep(s => s + 1);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(selectedDate && selectedTime && clientDetails.name && clientDetails.phone) {
            const newAppointment: Appointment = {
                id: Date.now().toString(),
                service: serviceName,
                date: selectedDate.toISOString().split('T')[0],
                time: selectedTime,
                clientName: clientDetails.name,
                clientContact: clientDetails.phone,
                clientEmail: clientDetails.email,
            };
            onAddAppointment(newAppointment);
            setStep(3); // Confirmation step
        }
    };
    
    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        const days = Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`}></div>);
        
        for(let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isPast = date < new Date(today.toDateString());
            const isSunday = date.getDay() === 0;
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isDisabled = isPast || isSunday;
            
            days.push(
                <button
                    key={day}
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(day)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                        isSelected ? 'bg-brand-primary text-white' : 
                        isDisabled ? 'text-gray-400 cursor-not-allowed' : 
                        'text-gray-700 hover:bg-brand-secondary'
                    }`}
                >
                    {day}
                </button>
            );
        }
        
        return (
            <div>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}>&lt;</button>
                    <h4 className="font-bold">{currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}</h4>
                    <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}>&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d} className="font-semibold text-sm">{d}</div>)}
                    {days}
                </div>
            </div>
        );
    };

    const renderTimeSlots = () => {
        if (!selectedDate) return null;
        const dayOfWeek = selectedDate.getDay();
        const availableSlots = dayOfWeek === 6 ? timeSlots.saturday : timeSlots.week;
        
        return (
            <div className="mt-6">
                <h4 className="font-bold mb-4">Selecione um horário:</h4>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {availableSlots.map(time => {
                        const isBooked = bookedSlots.has(time);
                        return (
                            <button
                                key={time}
                                disabled={isBooked}
                                onClick={() => { setSelectedTime(time); handleNextStep(); }}
                                className={`p-2 rounded-md border transition-colors ${
                                    selectedTime === time ? 'bg-brand-primary text-white' :
                                    isBooked ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through' :
                                    'bg-white hover:bg-brand-secondary'
                                }`}
                            >
                                {time}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div>
                        <h3 className="text-xl font-bold mb-4">1. Escolha Data e Hora</h3>
                        {renderCalendar()}
                        {selectedDate && renderTimeSlots()}
                    </div>
                );
            case 2:
                 return (
                    <div>
                        <h3 className="text-xl font-bold mb-4">2. Seus Dados</h3>
                        <p className="mb-4">Você está agendando uma <span className="font-semibold">{serviceName}</span> para <span className="font-semibold">{selectedDate?.toLocaleDateString('pt-BR')}</span> às <span className="font-semibold">{selectedTime}</span>.</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                                <input type="text" id="name" value={clientDetails.name} onChange={e => setClientDetails({...clientDetails, name: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
                                <input type="tel" id="phone" value={clientDetails.phone} onChange={e => setClientDetails({...clientDetails, phone: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail (Opcional)</label>
                                <input type="email" id="email" value={clientDetails.email} onChange={e => setClientDetails({...clientDetails, email: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-md hover:bg-brand-dark transition-colors">Confirmar Agendamento</button>
                        </form>
                    </div>
                );
            case 3:
                return (
                    <div className="text-center">
                         <h3 className="text-2xl font-bold text-brand-primary mb-4">Obrigado!</h3>
                         <p className="text-gray-700">Seu agendamento para uma <span className="font-semibold">{serviceName}</span> em <span className="font-semibold">{selectedDate?.toLocaleDateString('pt-BR')} às {selectedTime}</span> foi solicitado.</p>
                         <p className="mt-2 text-gray-600">Entraremos em contato em breve pelo telefone para confirmar. Obrigado por sua preferência!</p>
                         <button onClick={() => { setStep(1); setSelectedDate(null); setSelectedTime(''); setClientDetails({name:'',phone:'',email:''})}} className="mt-6 bg-brand-secondary text-brand-dark font-bold py-2 px-6 rounded-full hover:bg-opacity-80">Fazer Novo Agendamento</button>
                    </div>
                );
        }
    }

    return (
        <section id="agendamento" className="py-20 bg-brand-light">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                Agendamento Online
              </h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                Reserve Seu Horário
              </h3>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 bg-white p-8 rounded-lg shadow-xl">
              <div className="lg:w-2/5 space-y-6">
                {/* Static Info */}
                <h4 className="text-xl font-bold text-brand-dark border-b pb-2">Informações de Contato</h4>
                 <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold">Endereço</h5>
                    <p className="text-gray-600">R. Dr. Jesuíno Maciel, 1205<br/>Campo Belo, São Paulo - SP</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold">WhatsApp</h5>
                    <p className="text-gray-600">(11) 95285-1860</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h5 className="font-bold">Horário de Atendimento</h5>
                    <p className="text-gray-600">Seg a Sex: 9h às 18h<br/>Sáb: 9h às 13h</p>
                  </div>
                </div>
                <div className="h-48 w-full bg-gray-200 rounded-lg overflow-hidden mt-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.856980477218!2d-46.68007482565612!3d-23.6093259632836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a07c4b03473%3A0xf639925e13514034!2sR.%20Dr.%20Jesu%C3%ADno%20Maciel%2C%201205%20-%20Campo%20Belo%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004615-003!5e0!3m2!1spt-BR!2sbr!4v1683123456789!5m2!1spt-BR!2sbr"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" title="Mapa da localização">
                    </iframe>
                </div>
              </div>
              <div className="lg:w-3/5">
                <div className="bg-gray-50 p-6 rounded-lg min-h-[400px] flex">
                    {isAuthenticated ? (
                        renderStep()
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center h-full w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-brand-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <h4 className="text-xl font-bold text-brand-dark mb-2">Faça login para agendar</h4>
                            <p className="text-gray-600 mb-6 max-w-sm">Para visualizar os horários disponíveis e agendar sua consulta, você precisa acessar sua conta.</p>
                            <button 
                                onClick={onLoginRequest} 
                                className="bg-brand-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-dark transition-all duration-300 transform hover:scale-105"
                            >
                                Entrar ou Cadastrar
                            </button>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};

export default Scheduling;