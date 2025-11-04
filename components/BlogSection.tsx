import React from 'react';
import { BlogPost } from '../types';

interface BlogSectionProps {
    posts: BlogPost[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
    return (
        <section id="blog" className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Fique por Dentro
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Blog & Novidades
                    </h3>
                </div>
                {posts.length === 0 ? (
                    <p className="text-center text-gray-600">Nenhum post publicado ainda. Crie o primeiro no painel acima!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                                    <h4 className="text-xl font-bold text-brand-dark mb-3 flex-grow">{post.title}</h4>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <a href={`#post-${post.id}`} className="mt-auto font-semibold text-brand-primary hover:text-brand-dark transition-colors">
                                        Ler Mais &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
