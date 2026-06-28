import React from 'react';

interface LegalPageLayoutProps {
    title: string;
    children: React.ReactNode;
}

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-8">
                    <a href="/#" className="text-brand-primary hover:text-brand-dark transition-colors">&larr; Voltar para a página inicial</a>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-6 border-b pb-4">
                    {title}
                </h1>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LegalPageLayout;