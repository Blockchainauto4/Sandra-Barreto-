
import React from 'react';
import type { BlogPost } from '../types';

interface BlogSectionProps {
    posts: BlogPost[];
}

// Convert Portuguese full date to ISO date for Google schema
const convertToIsoDate = (dateStr: string): string => {
    try {
        const match = dateStr.match(/(\d+)\s+de\s+(\w+),?\s+(\d+)/i);
        if (match) {
            const day = parseInt(match[1], 10);
            const monthName = match[2].toLowerCase();
            const year = match[3];

            const months: { [key: string]: string } = {
                janeiro: '01',
                fevereiro: '02',
                marco: '03',
                março: '03',
                abril: '04',
                maio: '05',
                junho: '06',
                julho: '07',
                agosto: '08',
                setembro: '09',
                outubro: '10',
                novembro: '11',
                dezembro: '12'
            };

            const month = months[monthName] || '01';
            const formattedDay = day < 10 ? `0${day}` : `${day}`;
            return `${year}-${month}-${formattedDay}`;
        }
    } catch {
        // Fallback below
    }
    return '2026-01-01';
};

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
    return (
        <section id="blog" className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Fique por Dentro
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Blog & Dicas de Especialista
                    </h3>
                </div>
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600">Nenhum post publicado ainda. Crie o primeiro no painel acima!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => {
                            const isoDate = convertToIsoDate(post.date);
                            const jsonLd = {
                                "@context": "https://schema.org",
                                "@type": "BlogPosting",
                                "@id": `https://sandrabarretopodologia.com.br/#post-${post.id}`,
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": `https://sandrabarretopodologia.com.br/#post-${post.id}`
                                },
                                "headline": post.title,
                                "description": post.excerpt,
                                "image": post.imageUrl,
                                "datePublished": isoDate,
                                "dateModified": isoDate,
                                "author": {
                                    "@type": "Person",
                                    "name": post.author || "Dra. Sandra Barreto",
                                    "jobTitle": post.authorRole || "Podóloga Especialista",
                                    "url": "https://sandrabarretopodologia.com.br"
                                },
                                "publisher": {
                                    "@type": "MedicalBusiness",
                                    "name": "Sandra Barreto Podologia",
                                    "url": "https://sandrabarretopodologia.com.br",
                                    "logo": {
                                        "@type": "ImageObject",
                                        "url": "https://picsum.photos/seed/modern-clinic/1600/900"
                                    }
                                }
                            };

                            return (
                                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                    {/* Google structured data rich snippet */}
                                    <script 
                                        type="application/ld+json"
                                        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                                    />
                                    <img 
                                        src={post.imageUrl} 
                                        alt={post.title} 
                                        className="w-full h-48 object-cover"
                                        width="400"
                                        height="300"
                                        loading="lazy"
                                        fetchPriority="low"
                                    />
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide">{post.date}</p>
                                            {post.author && (
                                                <p className="text-xs text-gray-500">Por {post.author}</p>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-bold text-brand-dark mb-3 flex-grow">{post.title}</h4>
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{post.excerpt}</p>
                                        
                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                            {post.authorRole && (
                                                 <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-xs font-bold text-brand-dark">
                                                        {post.author?.charAt(0)}
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-500">{post.authorRole}</span>
                                                </div>
                                            )}
                                            <a href={`#post-${post.id}`} className="font-semibold text-brand-primary hover:text-brand-dark transition-colors text-sm">
                                                Ler Mais &rarr;
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
