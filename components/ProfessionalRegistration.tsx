
import React, { useState } from 'react';

const ProfessionalRegistration: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        license: '',
        address: '',
    });
    const [isLocating, setIsLocating] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocalização não é suportada pelo seu navegador.');
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // In a real app, you would use a reverse geocoding service here.
                // For this example, we'll just use the coordinates.
                setFormData(prev => ({ ...prev, address: `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}` }));
                setIsLocating(false);
            },
            (error) => {
                alert(`Erro ao obter localização: ${error.message}`);
                setIsLocating(false);
            }
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
    };

    return (
        <section id="profissionais" className="py-20 bg-brand-primary text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-sm font-semibold text-brand-accent uppercase tracking-wider mb-2">
                            Junte-se a Nós
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Você é Podólogo(a)?
                        </h3>
                        <p className="text-brand-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                            Estamos expandindo nossa rede de profissionais parceiros para atender a crescente demanda na região. Se você é um profissional qualificado e busca novas oportunidades, cadastre-se para avaliarmos uma possível parceria.
                        </p>
                    </div>
                    <div className="lg:w-1/2 w-full max-w-md">
                        {submitted ? (
                            <div className="bg-white text-brand-dark p-8 rounded-lg shadow-2xl text-center">
                                <h4 className="text-2xl font-bold mb-2">Obrigado!</h4>
                                <p>Seu cadastro foi recebido com sucesso. Entraremos em contato em breve.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white text-brand-dark p-8 rounded-lg shadow-2xl space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone / WhatsApp</label>
                                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                                <div>
                                    <label htmlFor="license" className="block text-sm font-medium text-gray-700">Nº de Certificação/Conselho</label>
                                    <input type="text" id="license" name="license" value={formData.license} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço do Consultório</label>
                                     <div className="relative">
                                        <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                                        <button 
                                            type="button" 
                                            onClick={handleLocation} 
                                            disabled={isLocating} 
                                            className="absolute top-2 right-2 text-brand-primary hover:text-brand-dark disabled:opacity-50"
                                            aria-label="Usar minha localização atual"
                                        >
                                            {isLocating ? (
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                            )}
                                        </button>
                                     </div>
                                </div>
                                <button type="submit" className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-300">
                                    Enviar Cadastro
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalRegistration;
