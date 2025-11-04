import React, { useState } from 'react';
import { Client } from '../types';

interface ClientManagementProps {
    clients: Client[];
}

const ClientManagement: React.FC<ClientManagementProps> = ({ clients }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contact.includes(searchTerm)
    );
    
    return (
        <div>
            <h4 className="text-2xl font-bold text-brand-dark mb-4 text-center">Sistema de Clientes</h4>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar por nome ou telefone..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                />
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredClients.length > 0 ? (
                    filteredClients.map(client => (
                        <div key={client.contact} className="bg-white p-4 rounded-lg shadow-md">
                            <h5 className="font-bold text-brand-dark">{client.name}</h5>
                            <p className="text-sm text-gray-600">{client.contact}</p>
                            {client.email && <p className="text-sm text-gray-600">{client.email}</p>}
                            <details className="mt-2">
                                <summary className="text-sm font-semibold text-brand-primary cursor-pointer">
                                    Ver Agendamentos ({client.appointments.length})
                                </summary>
                                <ul className="mt-2 space-y-1 text-xs list-disc list-inside text-gray-700">
                                    {client.appointments.map(app => (
                                        <li key={app.id}>
                                            {new Date(app.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})} às {app.time} - {app.service}
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 pt-8">Nenhum cliente encontrado ou agendado ainda.</p>
                )}
            </div>
        </div>
    );
};

export default ClientManagement;