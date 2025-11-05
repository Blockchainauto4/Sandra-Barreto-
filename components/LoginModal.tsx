import React from 'react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginSuccess: (provider: 'Google' | 'Facebook') => void;
}

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.223 0-9.655-3.373-11.284-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.011 35.797 44 30.222 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
    </svg>
);


const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] transition-opacity"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
        >
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: scale(0.95); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}
            </style>
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full m-4 relative" style={{animation: 'fadeIn 0.3s ease-out forwards'}}>
                 <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fechar modal de login"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="text-center">
                    <h2 id="login-modal-title" className="text-2xl font-bold font-serif text-brand-dark mb-2">Acesse ou Crie sua Conta</h2>
                    <p className="text-gray-600 mb-6">Rápido e fácil com sua rede social preferida.</p>
                </div>
                <div className="space-y-4">
                     <button 
                        onClick={() => onLoginSuccess('Google')}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        <GoogleIcon />
                        Continuar com Google
                    </button>
                    <button 
                        onClick={() => onLoginSuccess('Facebook')}
                        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1877F2] hover:bg-[#166fe5] transition-colors"
                    >
                        <FacebookIcon />
                        Continuar com Facebook
                    </button>
                </div>
                 <p className="text-xs text-gray-500 mt-6 text-center">
                    Ao continuar, você concorda com nossos <a href="#terms-of-service" onClick={onClose} className="underline hover:text-brand-primary">Termos de Serviço</a> e <a href="#privacy-policy" onClick={onClose} className="underline hover:text-brand-primary">Política de Privacidade</a>.
                </p>
            </div>
        </div>
    );
};

export default LoginModal;