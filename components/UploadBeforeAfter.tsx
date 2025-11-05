import React, { useState } from 'react';
import { BeforeAfterImage } from '../types';

interface UploadBeforeAfterProps {
    onAdd: (imageData: Omit<BeforeAfterImage, 'id'>) => void;
}

const UploadBeforeAfter: React.FC<UploadBeforeAfterProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [beforeImage, setBeforeImage] = useState<File | null>(null);
    const [afterImage, setAfterImage] = useState<File | null>(null);
    const [beforePreview, setBeforePreview] = useState<string | null>(null);
    const [afterPreview, setAfterPreview] = useState<string | null>(null);

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'before') {
                setBeforeImage(file);
                setBeforePreview(URL.createObjectURL(file));
            } else {
                setAfterImage(file);
                setAfterPreview(URL.createObjectURL(file));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !beforeImage || !afterImage) {
            alert('Por favor, preencha o título e selecione as duas imagens.');
            return;
        }

        try {
            const beforeUrl = await fileToBase64(beforeImage);
            const afterUrl = await fileToBase64(afterImage);

            onAdd({ title, beforeUrl, afterUrl });

            // Reset form
            setTitle('');
            setBeforeImage(null);
            setAfterImage(null);
            setBeforePreview(null);
            setAfterPreview(null);
            const beforeInput = document.getElementById('beforeImage') as HTMLInputElement;
            if(beforeInput) beforeInput.value = "";
            const afterInput = document.getElementById('afterImage') as HTMLInputElement;
            if(afterInput) afterInput.value = "";

        } catch (error) {
            console.error("Error converting images:", error);
            alert("Ocorreu um erro ao processar as imagens.");
        }
    };

    return (
        <section id="upload-results" className="py-20 bg-white">
            <div className="container mx-auto px-6 max-w-4xl">
                 <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Galeria de Resultados
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Adicionar Novo Caso
                    </h3>
                </div>
                <div className="bg-brand-light p-8 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="caseTitle" className="block text-lg font-medium text-gray-700 mb-2">Título do Caso</label>
                            <input
                                type="text"
                                id="caseTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Tratamento de Onicomicose"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="beforeImage" className="block text-lg font-medium text-gray-700 mb-2">Foto "Antes"</label>
                                <input type="file" id="beforeImage" accept="image/*" onChange={(e) => handleFileChange(e, 'before')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary file:text-brand-dark hover:file:bg-brand-secondary/80" />
                                {beforePreview && <img src={beforePreview} alt="Pré-visualização Antes" className="mt-4 rounded-md shadow-md h-40 w-full object-cover" />}
                            </div>
                             <div>
                                <label htmlFor="afterImage" className="block text-lg font-medium text-gray-700 mb-2">Foto "Depois"</label>
                                <input type="file" id="afterImage" accept="image/*" onChange={(e) => handleFileChange(e, 'after')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-dark" />
                                {afterPreview && <img src={afterPreview} alt="Pré-visualização Depois" className="mt-4 rounded-md shadow-md h-40 w-full object-cover" />}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-bold py-4 px-4 rounded-md text-lg hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-400"
                        >
                            Adicionar Caso à Galeria
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UploadBeforeAfter;
