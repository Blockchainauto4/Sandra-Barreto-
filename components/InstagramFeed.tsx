
import React from 'react';

const InstagramFeed: React.FC = () => {
    // Placeholder data for the feed. In a real app, this would come from an API.
    const posts = [
        { id: 1, imageUrl: 'https://picsum.photos/seed/foot-care/400/400', likes: 152, comments: 12 },
        { id: 2, imageUrl: 'https://picsum.photos/seed/nail-art/400/400', likes: 231, comments: 25 },
        { id: 3, imageUrl: 'https://picsum.photos/seed/clinic-interior/400/400', likes: 189, comments: 8 },
        { id: 4, imageUrl: 'https://picsum.photos/seed/happy-client/400/400', likes: 305, comments: 41 },
        { id: 5, imageUrl: 'https://picsum.photos/seed/podiatry-tools/400/400', likes: 120, comments: 5 },
        { id: 6, imageUrl: 'https://picsum.photos/seed/self-care/400/400', likes: 250, comments: 19 },
    ];
    
    const instagramProfileUrl = "https://www.instagram.com/sandrabarretopodologa";

    return (
        <section id="instagram" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Acompanhe nosso dia a dia
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Siga-nos no Instagram
                    </h3>
                    <a href={instagramProfileUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-brand-accent hover:text-brand-primary transition-colors mt-2 inline-block">
                        @sandrabarretopodologa
                    </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                    {posts.map(post => (
                        <a 
                            href={instagramProfileUrl} 
                            key={post.id} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative block aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            <img 
                                src={post.imageUrl} 
                                alt={`Post do Instagram ${post.id}`} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <div className="flex items-center space-x-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                                        <span className="ml-1 text-sm font-bold">{post.likes}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.08-3.242A8.932 8.932 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.832 15.026L5.75 12.35A6.983 6.983 0 0010 15c3.866 0 7-2.686 7-6s-3.134-6-7-6-7 2.686-7 6c0 1.34.423 2.586 1.168 3.65L4.832 15.026z" clipRule="evenodd" /></svg>
                                        <span className="ml-1 text-sm font-bold">{post.comments}</span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a 
                        href={instagramProfileUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                         <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427.465C9.795 2.013 10.148 2 12.315 2zm-1.002 6.363a4.902 4.902 0 100 9.804 4.902 4.902 0 000-9.804zM12 15.41a3.41 3.41 0 110-6.82 3.41 3.41 0 010 6.82zm5.438-8.132a1.23 1.23 0 100 2.46 1.23 1.23 0 000-2.46z" clipRule="evenodd" />
                        </svg>
                        Seguir no Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramFeed;
