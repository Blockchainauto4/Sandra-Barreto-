import React, { useState } from 'react';
import type { BlogPost } from '../types';

interface CreatePostProps {
    onAddPost: (post: BlogPost) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onAddPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    
    // Social Media States
    const [showSocialConfig, setShowSocialConfig] = useState(false);
    const [socialConfig, setSocialConfig] = useState({
        pageId: '',
        instagramUserId: '',
        accessToken: ''
    });
    const [shareToFacebook, setShareToFacebook] = useState(false);
    const [shareToInstagram, setShareToInstagram] = useState(false);
    const [isPostingSocial, setIsPostingSocial] = useState(false);

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
            alert('Ocorreu um erro ao gerar o conteúdo. Verifique sua chave de API ou tente novamente.');
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
             const { GoogleGenAI } = await import("@google/genai");
             
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const prompt = `Uma imagem profissional e limpa para um post de blog sobre podologia com o tema "${title}". Estilo: fotorealista, clínico, sereno, focado em pés saudáveis ou equipamentos de podologia, iluminação suave, alta resolução.`;
             
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

    // Helper: Convert Base64 to Blob for API upload
    const dataURItoBlob = (dataURI: string) => {
        try {
            const byteString = atob(dataURI.split(',')[1]);
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        } catch (e) {
            console.error("Error converting data URI to blob", e);
            return null;
        }
    };

    const postToSocialMedia = async () => {
        if ((shareToFacebook || shareToInstagram) && !socialConfig.accessToken) {
            alert("Para publicar nas redes sociais, preencha o Token de Acesso na configuração.");
            return false;
        }

        setIsPostingSocial(true);
        let fbSuccess = false;
        let igSuccess = false;

        try {
            // 1. Post to Facebook Page (Photo + Caption)
            // Facebook Graph API allows uploading binary data (Blob) via 'source' param.
            if (shareToFacebook && socialConfig.pageId) {
                const blob = dataURItoBlob(imageUrl);
                if (blob) {
                    const formData = new FormData();
                    formData.append('access_token', socialConfig.accessToken);
                    formData.append('source', blob);
                    formData.append('message', `${title}\n\n${content.substring(0, 400)}...\n\nAgende aqui: https://podologiasandrabarreto.com.br`);

                    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${socialConfig.pageId}/photos`, {
                        method: 'POST',
                        body: formData
                    });
                    
                    const fbData = await fbRes.json();
                    if (fbData.error) {
                        throw new Error(`Facebook Error: ${fbData.error.message}`);
                    }
                    console.log("Facebook Post ID:", fbData.post_id);
                    fbSuccess = true;
                }
            }

            // 2. Post to Instagram
            // NOTE: Instagram Graph API requires an 'image_url' that is PUBLICLY accessible.
            // It does NOT support direct binary uploads (Blob) like Facebook Pages API.
            // Since this is a client-side app generating Base64 images, we cannot easily post to Instagram 
            // without an intermediate server to host the image.
            if (shareToInstagram && socialConfig.instagramUserId) {
                 console.warn("Instagram requires a public image URL. Skipping direct upload due to frontend-only limitation.");
                 alert("Aviso: A publicação no Instagram foi pulada.\n\nMotivo Técnico: A API do Instagram exige que a imagem esteja hospedada em uma URL pública (servidor), o que não é possível nesta demonstração local com imagens geradas no navegador.\n\nO post será salvo no Facebook (se selecionado) e no Blog.");
                 // We don't mark this as a fatal error to allow the flow to continue.
                 igSuccess = false; 
            }

        } catch (error: any) {
            console.error("Social Media Error:", error);
            alert(`Erro ao publicar nas redes sociais: ${error.message}`);
            setIsPostingSocial(false);
            return false;
        }

        setIsPostingSocial(false);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (title.trim() && content.trim() && imageUrl) {
            // Handle Social Posting first
            if (shareToFacebook || shareToInstagram) {
                const socialSuccess = await postToSocialMedia();
                // If social posting failed completely (and was requested), confirm before saving locally
                if (shareToFacebook && !socialSuccess) {
                     if (!confirm("Houve um erro na publicação do Facebook. Deseja salvar no blog mesmo assim?")) {
                        return;
                    }
                }
            }

            // Save to Local Blog State
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
            
            // Reset form
            setTitle('');
            setContent('');
            setImageUrl('');
            setShareToFacebook(false);
            setShareToInstagram(false);
            alert('Conteúdo publicado com sucesso!');
        } else {
            alert('Por favor, preencha o título, gere o conteúdo e a imagem antes de publicar.');
        }
    };
    
    const isLoading = isGeneratingContent || isGeneratingImage || isPostingSocial;

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
                        {/* Integration Settings Toggle */}
                        <div className="bg-white p-4 rounded-md border border-gray-200">
                            <button 
                                type="button"
                                onClick={() => setShowSocialConfig(!showSocialConfig)}
                                className="flex items-center justify-between w-full text-left font-semibold text-gray-700 hover:text-brand-primary focus:outline-none"
                            >
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                                    Configurações de Integração (Meta API)
                                </span>
                                <svg className={`w-5 h-5 transform transition-transform ${showSocialConfig ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            
                            {showSocialConfig && (
                                <div className="mt-4 space-y-3 animate-[fadeIn_0.3s]">
                                    <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded border border-blue-100 mb-2">
                                        <strong>Nota:</strong> Para integração funcionar, você precisa de uma conta de desenvolvedor Meta e um Token de Acesso válido com permissões <code>pages_manage_posts</code> e <code>pages_read_engagement</code>.
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase">Facebook Page ID</label>
                                        <input 
                                            type="text" 
                                            value={socialConfig.pageId}
                                            onChange={(e) => setSocialConfig({...socialConfig, pageId: e.target.value})}
                                            className="w-full text-sm p-2 border rounded"
                                            placeholder="Ex: 10023456789"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase">Instagram User ID (Business)</label>
                                        <input 
                                            type="text" 
                                            value={socialConfig.instagramUserId}
                                            onChange={(e) => setSocialConfig({...socialConfig, instagramUserId: e.target.value})}
                                            className="w-full text-sm p-2 border rounded"
                                            placeholder="Ex: 1784140000000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase">Graph API Access Token</label>
                                        <input 
                                            type="password" 
                                            value={socialConfig.accessToken}
                                            onChange={(e) => setSocialConfig({...socialConfig, accessToken: e.target.value})}
                                            className="w-full text-sm p-2 border rounded"
                                            placeholder="EAAB..."
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Token de longa duração recomendado.</p>
                                    </div>
                                </div>
                            )}
                        </div>

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

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <span className="block font-bold text-gray-700 mb-2">Opções de Publicação</span>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={shareToFacebook} 
                                        onChange={(e) => setShareToFacebook(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-brand-primary rounded focus:ring-brand-primary"
                                    />
                                    <span className="ml-2 text-gray-700">Publicar no Facebook</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={shareToInstagram} 
                                        onChange={(e) => setShareToInstagram(e.target.checked)}
                                        className="form-checkbox h-5 w-5 text-brand-primary rounded focus:ring-brand-primary"
                                    />
                                    <span className="ml-2 text-gray-700">Publicar no Instagram</span>
                                </label>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">* Instagram requer URL pública de imagem. Em modo local, o post será apenas simulado ou salvo no blog.</p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-green-500 text-white font-bold py-4 px-4 rounded-md text-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400 flex justify-center items-center"
                        >
                            {isPostingSocial ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                                    Publicando nas Redes...
                                </>
                            ) : '4. Publicar Post (Site + Redes)'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreatePost;
