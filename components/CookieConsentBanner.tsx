import React from 'react';

interface CookieConsentBannerProps {
    onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept }) => {
    return (
        <div 
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] text-gray-800 p-6 z-50 animate-[slide-up_0.5s_ease-out]"
            role="dialog"
            aria-live="polite"
            aria-label="Cookie consent"
        >
            <style>
                {`
                    @keyframes slide-up {
                        from { transform: translateY(100%); }
                        to { transform: translateY(0); }
                    }
                `}
            </style>
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-center sm:text-left leading-relaxed">
                    Este site utiliza cookies para garantir que você tenha a melhor experiência. Ao continuar, você concorda com nossa 
                    <a href="#privacy-policy" className="text-blue-600 font-bold underline hover:text-blue-800 ml-1 transition-colors">
                        Política de Privacidade
                    </a>.
                </p>
                <button
                    onClick={onAccept}
                    className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700 transition-colors duration-300 flex-shrink-0 shadow-md"
                >
                    Aceitar e Fechar
                </button>
            </div>
        </div>
    );
};

export default CookieConsentBanner;