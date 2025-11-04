import React, { useState } from 'react';
import { Job } from '../types';

interface CreateJobPostingProps {
    onAddJob: (job: Omit<Job, 'id' | 'datePosted'>) => void;
}

const CreateJobPosting: React.FC<CreateJobPostingProps> = ({ onAddJob }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('Tempo Integral');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            alert('Por favor, preencha todos os campos da vaga.');
            return;
        }
        onAddJob({ title, description, type });
        setTitle('');
        setDescription('');
        setType('Tempo Integral');
    };

    return (
        <div>
            <h4 className="text-2xl font-bold text-brand-dark mb-6 text-center">Publicar Nova Vaga</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Título da Vaga</label>
                    <input
                        type="text"
                        id="jobTitle"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                        placeholder="Ex: Podólogo(a) Especialista"
                    />
                </div>
                <div>
                    <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        id="jobDescription"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                        placeholder="Descreva as responsabilidades, requisitos, etc."
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Tipo de Contrato</label>
                    <select
                        id="jobType"
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    >
                        <option>Tempo Integral</option>
                        <option>Meio Período</option>
                        <option>Autônomo</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-md hover:bg-brand-dark transition-colors duration-300">
                    Publicar Vaga
                </button>
            </form>
        </div>
    );
};

export default CreateJobPosting;