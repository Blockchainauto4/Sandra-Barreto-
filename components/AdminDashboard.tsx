
import React, { useState, useEffect, Suspense } from 'react';


// Lazy load the CreatePost component as it's only needed after authentication
const CreatePost = React.lazy(() => import('./CreatePost'));



const AdminDashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Check for authentication status from localStorage on component mount
    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Use environment variable for the password
        if (password === process.env.VITE_ADMIN_PASSWORD) {
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-light">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
            </div>
        );
    }

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
                        <p className="text-brand-secondary text-sm mt-2">Painel de Conteúdo com IA</p>
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
                            Acessar Painel
                        </button>
                        <div className="text-center mt-4">
                            <a href="/" className="text-sm text-gray-500 hover:text-brand-primary transition-colors flex items-center justify-center gap-1">
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
        <div className="min-h-screen bg-gray-100 font-sans">
             <nav className="bg-brand-dark text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Painel de Conteúdo com IA</h1>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500/20 hover:bg-red-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
                    >
                        Sair
                    </button>
                </div>
            </nav>
            <main className="container mx-auto px-6 py-8">
                <Suspense fallback={
                    <div className="py-20 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                    </div>
                }>
                    <CreatePost />
                </Suspense>
            </main>
        </div>
    );
};

export default AdminDashboard;
