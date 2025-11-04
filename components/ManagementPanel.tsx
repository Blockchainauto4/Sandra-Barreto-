import React from 'react';
import { Client, Job } from '../types';
import CreateJobPosting from './CreateJobPosting';
import ClientManagement from './ClientManagement';

interface ManagementPanelProps {
    clients: Client[];
    onAddJob: (job: Omit<Job, 'id' | 'datePosted'>) => void;
}

const ManagementPanel: React.FC<ManagementPanelProps> = ({ clients, onAddJob }) => {
    return (
        <section id="management-panel" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-semibold text-brand-primary uppercase tracking-wider mb-2">
                        Acesso Administrativo
                    </h2>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">
                        Painel de Gestão
                    </h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                        Gerencie clientes e publique novas vagas para a equipe. Esta seção é visível apenas para o administrador.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-brand-light p-8 rounded-lg shadow-xl">
                       <CreateJobPosting onAddJob={onAddJob} />
                    </div>
                     <div className="bg-brand-light p-8 rounded-lg shadow-xl">
                       <ClientManagement clients={clients} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManagementPanel;