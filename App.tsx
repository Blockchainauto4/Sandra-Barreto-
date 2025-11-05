import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Careers from './components/Careers';
import FAQ from './components/FAQ';
import Scheduling from './components/Scheduling';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BlogSection from './components/BlogSection';
import Notification from './components/Notification';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookieConsentBanner from './components/CookieConsentBanner';
import AdminPage from './components/AdminPage';
import BeforeAfter from './components/BeforeAfter';
import LoginModal from './components/LoginModal';
import { BlogPost, Appointment, Job, Client, BeforeAfterImage } from './types';
import { BLOG_POSTS_DATA } from './components/constants';

const MainContent: React.FC<{
  posts: BlogPost[];
  appointments: Appointment[];
  jobs: Job[];
  onAddAppointment: (appointment: Appointment) => void;
  beforeAfterImages: BeforeAfterImage[];
  isAuthenticated: boolean;
  onLoginRequest: () => void;
}> = ({ posts, appointments, onAddAppointment, jobs, beforeAfterImages, isAuthenticated, onLoginRequest }) => (
  <>
    <Hero />
    <About />
    <Services />
    <BeforeAfter images={beforeAfterImages} />
    <Testimonials />
    <BlogSection posts={posts} />
    <Scheduling 
      appointments={appointments} 
      onAddAppointment={onAddAppointment}
      isAuthenticated={isAuthenticated}
      onLoginRequest={onLoginRequest}
    />
    <Careers jobs={jobs} />
    <FAQ />
  </>
);


const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [beforeAfterData, setBeforeAfterData] = useState<BeforeAfterImage[]>([
    {
        id: '1',
        title: 'Tratamento de Onicocriptose',
        beforeUrl: '/image-2.jpeg',
        afterUrl: '/image-3.jpeg',
    },
    {
        id: '2',
        title: 'Cuidado e Higienização',
        beforeUrl: '/image-1.jpeg',
        afterUrl: '/image-4.jpeg',
    },
     {
        id: '3',
        title: 'Ambiente Clínico',
        beforeUrl: '/image-5.jpeg',
        afterUrl: '/image-7.jpeg',
    },
  ]);
  const [notification, setNotification] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('main');
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
    
    const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'privacy-policy' || hash === 'terms-of-service' || hash === 'admin') {
            setCurrentPage(hash);
            window.scrollTo(0, 0);
        } else {
            setCurrentPage('main');
        }
    };
    
    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Check hash on initial load

    return () => {
        window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);
  
  const clients = useMemo<Client[]>(() => {
    const clientMap = new Map<string, Client>();
    appointments.forEach(appointment => {
        const key = `${appointment.clientName}-${appointment.clientContact}`;
        if (!clientMap.has(key)) {
            clientMap.set(key, {
                name: appointment.clientName,
                contact: appointment.clientContact,
                email: appointment.clientEmail,
                appointments: []
            });
        }
        clientMap.get(key)!.appointments.push(appointment);
    });
    return Array.from(clientMap.values());
  }, [appointments]);


  const handleAddPost = (newPost: BlogPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  
  const handleAddBeforeAfter = (newCase: Omit<BeforeAfterImage, 'id'>) => {
    const caseToAdd: BeforeAfterImage = {
        ...newCase,
        id: Date.now().toString(),
    };
    setBeforeAfterData(prevData => [caseToAdd, ...prevData]);
    setNotification(`Novo caso "${caseToAdd.title}" adicionado à galeria de resultados!`);
  };

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => [...prev, newAppointment].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    const notificationMessage = `Novo agendamento de ${newAppointment.clientName} para ${newAppointment.date} às ${newAppointment.time}.`;
    setNotification(notificationMessage);
  };
  
  const handleAddJob = (newJob: Omit<Job, 'id' | 'datePosted'>) => {
    const jobToAdd: Job = {
      ...newJob,
      id: Date.now().toString(),
      datePosted: new Date().toLocaleDateString('pt-BR'),
    };
    setJobs(prevJobs => [jobToAdd, ...prevJobs]);
    setNotification(`Nova vaga "${jobToAdd.title}" publicada com sucesso!`);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  
  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  const handleLoginRequest = () => setIsLoginModalOpen(true);

  const handleLoginSuccess = (provider: 'Google' | 'Facebook') => {
      setIsAuthenticated(true);
      setIsLoginModalOpen(false);
      const name = provider === 'Google' ? 'Maria G.' : 'João S.';
      setUserName(name);
      setNotification(`Login com ${provider} realizado com sucesso! Bem-vindo(a), ${name}.`);
      setTimeout(() => {
          document.getElementById('agendamento')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
  };
  
  const handleLogout = () => {
      setIsAuthenticated(false);
      setUserName(null);
      setNotification('Você foi desconectado.');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
        case 'privacy-policy':
            return <PrivacyPolicy />;
        case 'terms-of-service':
            return <TermsOfService />;
        case 'admin':
            return <AdminPage 
                      clients={clients}
                      onAddJob={handleAddJob}
                      onAddPost={handleAddPost}
                      onAddBeforeAfter={handleAddBeforeAfter}
                    />;
        default:
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      jobs={jobs}
                      onAddAppointment={handleAddAppointment}
                      beforeAfterImages={beforeAfterData}
                      isAuthenticated={isAuthenticated}
                      onLoginRequest={handleLoginRequest}
                    />;
    }
  }

  return (
    <div className="bg-brand-light font-sans text-brand-dark">
      <Header 
        isAuthenticated={isAuthenticated}
        userName={userName}
        onLoginRequest={handleLoginRequest}
        onLogout={handleLogout}
      />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
      <WhatsAppButton />
      <Notification message={notification} onClose={handleCloseNotification} />
      {showCookieBanner && <CookieConsentBanner onAccept={handleAcceptCookies} />}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;