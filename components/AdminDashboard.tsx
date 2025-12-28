
import React, { useState, useEffect } from 'react';

interface OpenRouterModel {
    id: string;
    name: string;
}

const AdminDashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [count, setCount] = useState(0);

    // OpenRouter States
    const [apiKey, setApiKey] = useState('');
    const [models, setModels] = useState<OpenRouterModel[]>([]);
    const [selectedModel, setSelectedModel] = useState('google/gemini-2.0-flash-exp:free');
    const [isFetchingModels, setIsFetchingModels] = useState(false);
    const [seoContext, setSeoContext] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedSEO, setGeneratedSEO] = useState({ title: '', description: '' });

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        
        const savedCount = localStorage.getItem('admin_counter');
        if (savedCount) {
            setCount(parseInt(savedCount, 10));
        }

        const savedKey = localStorage.getItem('openrouter_api_key');
        if (savedKey) {
            setApiKey(savedKey);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('admin_auth', 'true');
        } else {
            alert('Senha incorreta! Tente novamente.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_auth');
        setPassword('');
    };

    const handleSaveKey = () => {
        localStorage.setItem('openrouter_api_key', apiKey);
        alert('Chave API salva com sucesso!');
    };

    const fetchModels = async () => {
        if (!apiKey) {
            alert('Insira a chave API primeiro.');
            return;
        }
        setIsFetchingModels(true);
        try {
            const response = await fetch('https://openrouter.ai/api/v1/models', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                }
            });
            const data = await response.json();
            if (data.data) {
                setModels(data.data.slice(0, 20)); // Pegar os 20 primeiros para não poluir
            }
        } catch (error) {
            console.error('Erro ao buscar modelos:', error);
            alert('Falha ao buscar modelos. Verifique a chave.');
        } finally {
            setIsFetchingModels(false);
        }
    };

    const generateSEOMetadata = async () => {
        if (!apiKey || !seoContext) {
            alert('Preencha a chave API e o contexto desejado.');
            return;
        }
        setIsGenerating(true);
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Sandra Barreto Admin'
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: [
                        {
                            role: 'system',
                            content: 'Você é um especialista em SEO local e Copywriting de alta conversão. Seu objetivo é gerar títulos e descrições de metadados para o Google que maximizem os cliques (CTR). Foco: Podologia e Manicure em São Paulo (Campo Belo, Moema, Brooklin). Use prova social (Nota 5.0 ⭐) e gatilhos de urgência/alívio de dor. Responda APENAS em JSON no formato: {"title": "...", "description": "..."}'
                        },
                        {
                            role: 'user',
                            content: `Gere metadados otimizados para este contexto: ${seoContext}`
                        }
                    ],
                    response_format: { type: 'json_object' }
                })
            });
            const data = await response.json();
            const content = JSON.parse(data.choices[0].message.content);
            setGeneratedSEO(content);
        } catch (error) {
            console.error('Erro ao gerar SEO:', error);
            alert('Erro na geração. Tente outro modelo ou verifique o saldo da sua chave.');
        } finally {
            setIsGenerating(false);
        }
    };

    const incrementCounter = () => {
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem('admin_counter', newCount.toString());
    };

    const resetCounter = () => {
        if (window.confirm('Tem certeza que deseja zerar o contador?')) {
            setCount(0);
            localStorage.setItem('admin_counter', '0');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-lg shadow-2xl overflow-hidden animate-[fadeIn_0.5s_ease-out]">
                    <div className="bg-brand-dark py-8 text-center px-6">
                        <div className="mx-auto w-16 h-16 bg-brand-secondary rounded-full flex items-center justify-center mb-4 text-brand-dark">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-white font-serif">Área Restrita</h2>
                        <p className="text-brand-secondary text-sm mt-2">Acesso exclusivo para administradores</p>
                    </div>
                    <form onSubmit={handleLogin} className="p-8 space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Senha de Acesso
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none"
                                placeholder="Digite a senha..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 shadow-lg transform active:scale-95"
                        >
                            Entrar no Sistema
                        </button>
                        <div className="text-center mt-4">
                            <a href="#" className="text-sm text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Voltar para o site
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans pb-20">
            <nav className="bg-brand-dark text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-brand-secondary rounded-lg flex items-center justify-center text-brand-dark shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <span className="font-bold text-lg block leading-none">Super Admin</span>
                            <span className="text-xs text-brand-secondary">Painel de Controle IA</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-brand-secondary hover:text-white transition-colors text-sm hidden sm:block">Ver Site</a>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500/10 hover:bg-red-500 text-red-100 hover:text-white border border-red-500/50 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow container mx-auto px-6 py-10 space-y-10">
                {/* AI & SEO CONFIGURATION CARD */}
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-brand-primary text-white flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Inteligência Artificial & SEO (OpenRouter)
                        </h2>
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">Otimização Real-Time</span>
                    </div>
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Config Column */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Chave API OpenRouter</label>
                                <div className="flex gap-2">
                                    <input 
                                        type="password" 
                                        value={apiKey}
                                        onChange={(e) => setApiKey(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                                        placeholder="sk-or-v1-..."
                                    />
                                    <button 
                                        onClick={handleSaveKey}
                                        className="bg-brand-dark text-white px-4 py-2 rounded-lg hover:bg-brand-primary transition-colors"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Modelo de IA</label>
                                <div className="flex gap-2">
                                    <select 
                                        value={selectedModel}
                                        onChange={(e) => setSelectedModel(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none bg-white"
                                    >
                                        <option value="google/gemini-2.0-flash-exp:free">Gemini 2.0 Flash (Recomendado)</option>
                                        {models.map(m => (
                                            <option key={m.id} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                    <button 
                                        onClick={fetchModels}
                                        disabled={isFetchingModels}
                                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        {isFetchingModels ? '...' : 'Atualizar Lista'}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Contexto para Otimização</label>
                                <textarea 
                                    value={seoContext}
                                    onChange={(e) => setSeoContext(e.target.value)}
                                    rows={3}
                                    placeholder="Ex: Criar metadados para uma página de Unhas de Gel em Moema com foco em durabilidade e segurança."
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-brand-primary outline-none"
                                />
                                <button 
                                    onClick={generateSEOMetadata}
                                    disabled={isGenerating}
                                    className="mt-4 w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.189a2 2 0 001.166 2.301l2.301.92a2 2 0 002.503-1.018l.946-1.892a2 2 0 00-.476-2.387l-1.892-.946z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V5a2 2 0 114 0v6m-4 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                                    )}
                                    Gerar SEO de Alta Conversão
                                </button>
                            </div>
                        </div>

                        {/* Result Column */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-dashed border-gray-300">
                            <h3 className="text-gray-500 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                Visualização do Google (Snippet)
                            </h3>
                            
                            {generatedSEO.title ? (
                                <div className="space-y-6 animate-[fadeIn_0.5s]">
                                    <div className="bg-white p-4 rounded border shadow-sm">
                                        <p className="text-blue-600 text-xl font-medium mb-1 hover:underline cursor-pointer">{generatedSEO.title}</p>
                                        <p className="text-green-700 text-sm mb-1 truncate">www.sandrabarreto.com.br › {seoContext.toLowerCase().split(' ').slice(0, 2).join('-')}</p>
                                        <p className="text-gray-600 text-sm line-clamp-2">{generatedSEO.description}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-3">
                                        <button 
                                            onClick={() => {navigator.clipboard.writeText(generatedSEO.title); alert('Título copiado!')}}
                                            className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
                                        >
                                            Copiar Título
                                        </button>
                                        <button 
                                            onClick={() => {navigator.clipboard.writeText(generatedSEO.description); alert('Descrição copiada!')}}
                                            className="text-xs text-brand-primary font-bold hover:underline flex items-center gap-1"
                                        >
                                            Copiar Descrição
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-gray-400 text-sm italic">Aguardando geração do conteúdo...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Counter Card */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Contador de Ações
                            </h2>
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Ativo</span>
                        </div>
                        
                        <div className="p-10 flex flex-col items-center justify-center space-y-8">
                            <div className="text-center relative">
                                <span className="block text-gray-400 text-sm uppercase tracking-wider mb-2 font-medium">Contagem Atual</span>
                                <div className="text-9xl font-black text-brand-primary font-mono tabular-nums leading-none tracking-tight drop-shadow-sm">
                                    {count.toString().padStart(2, '0')}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center mt-4">
                                <button
                                    onClick={incrementCounter}
                                    className="flex-1 bg-brand-primary hover:bg-brand-dark text-white font-bold py-4 px-6 rounded-lg shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group"
                                    aria-label="Incrementar contador"
                                >
                                    <div className="bg-white/20 p-1 rounded-full group-hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <span className="text-lg">Incrementar</span>
                                </button>
                                <button
                                    onClick={resetCounter}
                                    className="flex-shrink-0 bg-white border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-600 hover:text-red-500 font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                                    title="Zerar contador"
                                    aria-label="Zerar contador"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info Card */}
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 h-fit">
                        <div className="p-6 border-b border-gray-100 bg-brand-primary text-white">
                            <h3 className="font-bold text-lg">Informações do Sistema</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status do Servidor</p>
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="font-medium text-gray-700">Online</span>
                                </div>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-sm text-gray-500 mb-1">Último Acesso</p>
                                <p className="font-medium text-gray-700">{new Date().toLocaleString('pt-BR')}</p>
                            </div>
                            <div className="border-t border-gray-100 pt-4">
                                <p className="text-sm text-gray-500 mb-1">Versão</p>
                                <p className="font-medium text-gray-700">1.2.0 (OpenRouter Ready)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
