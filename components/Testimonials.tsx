import React, { useState } from 'react';
import { REVIEWS_DATA } from '../constants';
import { Review } from '../types';

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
    const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
    const [showForm, setShowForm] = useState(false);
    const [newReview, setNewReview] = useState({ author: '', quote: '', rating: 5 });
    const [ratingHover, setRatingHover] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewReview(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating: number) => {
        setNewReview(prev => ({ ...prev, rating }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newReview.author.trim() && newReview.quote.trim()) {
            const reviewToAdd: Review = { ...newReview, date: 'Agora mesmo' };
            setReviews([reviewToAdd, ...reviews]);
            setNewReview({ author: '', quote: '', rating: 5 });
            setShowForm(false);
        }
    };

    const totalRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);

    return (
        <section id="depoimentos" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        O que nossos pacientes dizem
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Avaliações de Clientes
                    </h3>
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <span className="text-2xl font-bold text-gray-700">{totalRating}</span>
                        <StarRating rating={Math.round(parseFloat(totalRating))} className="w-6 h-6" />
                        <span className="text-gray-600">({reviews.length} avaliações)</span>
                    </div>
                </div>

                <div className="text-center mb-12">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-brand-secondary text-brand-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105"
                    >
                        {showForm ? 'Cancelar Avaliação' : 'Deixar uma Avaliação'}
                    </button>
                </div>

                {showForm && (
                    <div className="max-w-2xl mx-auto mb-12 bg-brand-light p-8 rounded-lg shadow-lg transition-all duration-500 animate-[fadeIn_0.5s_ease-in-out]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <h4 className="text-xl font-bold text-brand-dark text-center">Sua Avaliação é Importante</h4>
                            <div>
                                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Seu Nome</label>
                                <input type="text" id="author" name="author" value={newReview.author} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sua Nota</label>
                                <div className="flex items-center mt-1" onMouseLeave={() => setRatingHover(null)}>
                                    {[...Array(5)].map((_, index) => {
                                        const ratingValue = index + 1;
                                        return (
                                            <button
                                                type="button"
                                                key={ratingValue}
                                                onClick={() => handleRatingChange(ratingValue)}
                                                onMouseEnter={() => setRatingHover(ratingValue)}
                                                className="focus:outline-none transform transition-transform hover:scale-110"
                                                aria-label={`Rate ${ratingValue} stars`}
                                            >
                                                <svg className={`w-8 h-8 cursor-pointer ${ratingValue <= (ratingHover || newReview.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.176 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.07 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                                                </svg>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                             <div>
                                <label htmlFor="quote" className="block text-sm font-medium text-gray-700">Seu Comentário</label>
                                <textarea id="quote" name="quote" value={newReview.quote} onChange={handleInputChange} required rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-dark transition-colors duration-300">
                                Enviar Avaliação
                            </button>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start mt-12">
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {reviews.map((review, index) => (
                            <div key={index} className="bg-brand-light p-6 rounded-lg shadow-md flex flex-col h-full">
                               <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-bold text-brand-dark">{review.author}</p>
                                        {review.date && <p className="text-xs text-brand-primary">{review.date}</p>}
                                    </div>
                                    <StarRating rating={review.rating} />
                               </div>
                                <p className="text-gray-600 italic flex-grow">
                                    "{review.quote}"
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-2 hidden lg:block">
                        <img src="/image-7.jpeg" alt="Consultório de Podologia Sandra Barreto" className="rounded-lg shadow-xl w-full h-auto object-cover sticky top-28" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;