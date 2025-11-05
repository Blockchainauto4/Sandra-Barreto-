import React from 'react';
import { BlogPost, Client, Job, BeforeAfterImage } from '../types';
import CreatePost from './CreatePost';
import ManagementPanel from './ManagementPanel';
import UploadBeforeAfter from './UploadBeforeAfter';

interface AdminPageProps {
    clients: Client[];
    onAddJob: (job: Omit<Job, 'id' | 'datePosted'>) => void;
    onAddPost: (post: BlogPost) => void;
    onAddBeforeAfter: (newCase: Omit<BeforeAfterImage, 'id'>) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ clients, onAddJob, onAddPost, onAddBeforeAfter }) => {
    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-6 py-16">
                 <div className="mb-8">
                    <a href="/#" className="text-brand-primary hover:text-brand-dark transition-colors">&larr; Voltar para a página inicial</a>
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-8 text-center border-b pb-4">
                    Painel Administrativo
                </h1>
                
                {/* Create Post Section */}
                <div className="mb-16">
                    <CreatePost onAddPost={onAddPost} />
                </div>

                {/* Upload Before/After Section */}
                <div className="mb-16">
                    <UploadBeforeAfter onAdd={onAddBeforeAfter} />
                </div>

                {/* Management Panel Section */}
                <div>
                     <ManagementPanel clients={clients} onAddJob={onAddJob} />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
