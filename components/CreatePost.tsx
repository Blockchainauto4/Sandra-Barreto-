
import React, { useState } from 'react';
// import { GoogleGenAI } from "@google/genai"; // Removed static import to save bundle size
import { BlogPost } from '../types';

interface CreatePostProps {
    onAddPost: (post: BlogPost) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    const handleGenerateContent = async () => {
        if (!title.trim()) {
            alert('Por favor, insira um título para o post.');
            return;
        }
        setIsGeneratingContent(true);
        try {
            // Dynamically import the SDK only when needed
            const { GoogleGenAI } = await import("@google/genai");
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Escreva um post de blog informativo e otimizado para SEO local para um site de podologia. O tópico principal é "${title}". O texto deve ser útil para o público geral, com tom profissional e amigável, entre 200 e 300 palavras. Crucial: Incorpore naturalmente os seguintes termos e locais ao longo do texto: 'podologia no Campo Belo', 'podóloga em Moema', 'tratamento para pés no Brooklin', e 'saúde dos pés na Zona Sul de SP'. A chamada para ação final deve ser clara, incentivando o agendamento de uma consulta com a podóloga Sandra Barreto, destacando a conveniência para moradores do Campo Belo e regiões próximas como Moema e Brooklin.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            setContent(response.text);

        } catch (error) {
            console.error("Error generating content:", error);
            alert('Ocorreu um erro ao gerar o conteúdo. Tente novamente.');
        } finally {
            setIsGeneratingContent(false);
        }
    };
    
    const handleGenerateImage = async () => {
        if (!title.trim()) {
            alert('Por favor, insira um título para gerar uma imagem relevante.');
            return;
        }
        setIsGeneratingImage(true);
        try {
             // Dynamically import the SDK only when needed
             const { GoogleGenAI } = await import("@google/genai");
             
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const prompt = `Uma imagem profissional e limpa para um post de blog sobre podologia com o tema "${title}". Estilo: fotorealista, clínico, sereno, focado em pés saudáveis ou equipamentos de podologia.`;
             
             const response = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: prompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '16:9',
                },
            });

            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            const dataUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
            setImageUrl(dataUrl);

        } catch (error) {
            console.error("Error generating image:", error);
            alert('Ocorreu um erro ao gerar a imagem. Tente novamente.');
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && content.trim() && imageUrl) {
            const newPost: BlogPost = {
                id: Date.now().toString(),
                title,
                content,
                imageUrl,
                date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }),
                excerpt: content.substring(0, 150) + '...',
                author: 'Sandra Barreto',
                authorRole: 'Podóloga Especialista'
            };
            onAddPost(newPost);
            setTitle('');
            setContent('');
            setImageUrl('');
        } else {
            alert('Por favor, preencha o título, gere o conteúdo e a imagem antes de publicar.');
        }
    };
    
    const isLoading = isGeneratingContent || isGeneratingImage;

    return (
        <section id="create-post" className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                     <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Marketing Inteligente
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Painel de Criação de Conteúdo com IA
                    </h3>
                </div>
                <div className="bg-brand-light p-8 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">1. Título do Post</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Como cuidar de unhas encravadas"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleGenerateContent}
                                disabled={isLoading}
                                className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-dark transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
                            >
                                {isGeneratingContent ? (
                                    <> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Gerando Conteúdo... </>
                                ) : '2. Gerar Conteúdo com IA'}
                            </button>
                             <button
                                type="button"
                                onClick={handleGenerateImage}
                                disabled={isLoading}
                                className="w-full bg-brand-secondary text-brand-dark font-bold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
                            >
                               {isGeneratingImage ? (
                                    <> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Criando Imagem... </>
                                ) : '3. Gerar Imagem com IA'}
                            </button>
                        </div>
                        
                        <div>
                           <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">Prévia do Post</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={8}
                                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="O conteúdo gerado pela IA aparecerá aqui..."
                                disabled={isLoading}
                            />
                        </div>

                         {imageUrl && (
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-2">Imagem Gerada</label>
                                <img src={imageUrl} alt="Imagem gerada pela IA para o post" className="rounded-md shadow-lg w-full h-auto object-cover" />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-500 text-white font-bold py-4 px-4 rounded-md text-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400"
                        >
                            4. Publicar Post
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreatePost;
