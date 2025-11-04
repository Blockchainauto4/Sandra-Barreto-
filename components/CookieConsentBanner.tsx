import React from 'react';

interface CookieConsentBannerProps {
    onAccept: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAccept }) => {
    return (
        <div 
            className="fixed bottom-0 left-0 right-0 bg-brand-dark/90 backdrop-blur-sm text-white p-4 z-50 animate-[slide-up_0.5s_ease-out]"
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
                <p className="text-sm text-center sm:text-left">
                    Este site utiliza cookies para garantir que você tenha a melhor experiência. Ao continuar, você concorda com nossa 
                    <a href="#privacy-policy" className="underline hover:text-brand-secondary ml-1">
                        Política de Privacidade
                    </a>.
                </p>
                <button
                    onClick={onAccept}
                    className="bg-brand-primary text-white font-bold py-2 px-6 rounded-full hover:bg-brand-secondary hover:text-brand-dark transition-colors duration-300 flex-shrink-0"
                >
                    Aceitar e Fechar
                </button>
            </div>
        </div>
    );
};

export default CookieConsentBanner;