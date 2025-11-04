import React from 'react';
import { Job } from '../types';

interface JobPostingsProps {
    jobs: Job[];
}

const JobPostings: React.FC<JobPostingsProps> = ({ jobs }) => {
    return (
        <div className="bg-brand-light/10 p-8 rounded-lg shadow-2xl">
            <h4 className="text-2xl font-bold text-center text-white mb-6">Vagas Abertas</h4>
            {jobs.length > 0 ? (
                <div className="space-y-6">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white text-brand-dark p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-start">
                                <h5 className="text-xl font-bold text-brand-primary">{job.title}</h5>
                                <span className="text-xs font-semibold bg-brand-secondary text-brand-dark py-1 px-3 rounded-full">{job.type}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 mb-3">Publicado em: {job.datePosted}</p>
                            <p className="text-gray-600">{job.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-brand-light/80">Nenhuma vaga aberta no momento. Volte em breve!</p>
            )}
        </div>
    );
};

export default JobPostings;