
import React, { useState, useEffect, useCallback } from 'react';
import { REVIEWS_DATA } from '../constants';
import type { Review } from '../types';

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = 'w-5 h-5' }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`${className} ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.07 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
            ))}
        </div>
    );
};

const Testimonials: React.FC = () => {
    // We stick to the provided data for the slider
    const [reviews] = useState<Review[]>(REVIEWS_DATA);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 6000); // 6 seconds per slide
        return () => clearInterval(interval);
    }, [currentIndex, nextSlide]); // Depend on currentIndex to reset timer on manual interaction roughly

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, [reviews.length]);

    return (
        <section id="depoimentos" className="py-24 bg-brand-light relative overflow-hidden">
             {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-brand-secondary opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 bg-brand-primary opacity-5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-3">
                        O que nossos pacientes dizem
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6">
                        Avaliações Reais
                    </h3>
                    
                    {/* Trust Badge */}
                     <div className="inline-flex items-center bg-white px-6 py-3 rounded-full shadow-md border border-gray-100 transform transition-transform hover:scale-105">
                        <svg className="w-6 h-6 text-yellow-400 mr-2" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <span className="font-bold text-gray-800 text-lg mr-2">5.0</span>
                        <span className="text-gray-500 text-sm font-medium">Excelente no Google</span>
                     </div>
                </div>

                {/* Carousel/Slider */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Review Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 text-center relative flex flex-col justify-center items-center min-h-[400px] transition-all duration-500">
                        {/* Quote Icon Top */}
                        <div className="absolute top-8 left-8 text-8xl text-brand-secondary opacity-10 font-serif leading-none select-none">“</div>
                        
                        <div className="mb-8 transform transition-all duration-500">
                            <StarRating rating={reviews[currentIndex].rating} className="w-8 h-8 mx-auto" />
                        </div>
                        
                        <p className="text-xl md:text-3xl text-gray-700 font-light italic mb-10 relative z-10 leading-relaxed max-w-3xl">
                            {reviews[currentIndex].quote}
                        </p>

                        <div className="animate-[fadeIn_0.5s_ease-in]">
                            <h4 className="font-bold text-brand-dark text-xl mb-1">{reviews[currentIndex].author}</h4>
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Paciente Verificado</p>
                            </div>
                        </div>
                        
                        {/* Quote Icon Bottom */}
                         <div className="absolute bottom-4 right-8 text-8xl text-brand-secondary opacity-10 font-serif rotate-180 leading-none select-none">“</div>
                    </div>

                    {/* Navigation Arrows */}
                     <button 
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white text-brand-dark p-4 rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300 focus:outline-none z-20 group"
                        aria-label="Avaliação Anterior"
                    >
                        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                     <button 
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white text-brand-dark p-4 rounded-full shadow-lg hover:bg-brand-primary hover:text-white transition-all duration-300 focus:outline-none z-20 group"
                         aria-label="Próxima Avaliação"
                    >
                        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-10 space-x-3">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${
                                    index === currentIndex ? 'w-10 bg-brand-primary' : 'w-3 bg-gray-300 hover:bg-brand-secondary'
                                }`}
                                aria-label={`Ir para avaliação ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* "Avaliar Agora" CTA Section */}
                <div className="mt-20 text-center">
                    <div className="bg-brand-dark rounded-2xl p-10 md:p-14 max-w-3xl mx-auto shadow-2xl relative overflow-hidden group">
                        {/* Hover Glow Effect */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-primary opacity-20 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h4 className="text-3xl font-bold text-white mb-6">Já é nosso paciente?</h4>
                            <p className="text-brand-light/90 mb-10 text-lg leading-relaxed max-w-xl mx-auto">
                                Sua opinião é fundamental para nós. Compartilhe sua experiência no Google e nos ajude a continuar oferecendo o melhor atendimento da Zona Sul.
                            </p>
                            
                            <a 
                                href="https://share.google/ipLtSJ7VPsbYPsM5X" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center bg-white text-brand-dark font-bold py-4 px-10 rounded-full hover:bg-brand-secondary hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-2.15-.15-2.15z"/>
                                </svg>
                                Avaliar Agora
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
