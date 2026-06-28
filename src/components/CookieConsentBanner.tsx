import React from 'react';

interface CookieConsentBannerProps {
    onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept }) => {
    return (
        <div 
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-brand-primary shadow-[0_-8px_30px_rgba(0,0,0,0.15)] text-gray-900 p-6 z-50 animate-[slide-up_0.5s_ease-out]"
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
                <p className="text-sm text-center sm:text-left leading-relaxed font-medium">
                    Este site utiliza cookies para garantir que você tenha a melhor experiência. Ao continuar, você concorda com nossa 
                    <a href="#privacy-policy" className="text-brand-primary font-bold underline hover:text-brand-dark ml-1 transition-colors">
                        Política de Privacidade
                    </a>.
                </p>
                <button
                    onClick={onAccept}
                    className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-all duration-300 flex-shrink-0 shadow-lg transform hover:scale-105"
                >
                    Aceitar e Fechar
                </button>
            </div>
        </div>
    );
};

export default CookieConsentBanner;