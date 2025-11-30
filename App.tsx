import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ProfessionalRegistration from './components/ProfessionalRegistration';
import FAQ from './components/FAQ';
import Scheduling from './components/Scheduling';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CreatePost from './components/CreatePost';
import BlogSection from './components/BlogSection';
import Notification from './components/Notification';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookieConsentBanner from './components/CookieConsentBanner';
import { BlogPost, Appointment } from './types';
import { BLOG_POSTS_DATA } from './constants';

const MainContent: React.FC<{
  posts: BlogPost[];
  appointments: Appointment[];
  onAddPost: (post: BlogPost) => void;
  onAddAppointment: (appointment: Appointment) => void;
}> = ({ posts, appointments, onAddPost, onAddAppointment }) => (
  <>
    <Hero />
    <About />
    <Services />
    <Testimonials />
    <CreatePost onAddPost={onAddPost} />
    <BlogSection posts={posts} />
    <Scheduling 
      appointments={appointments} 
      onAddAppointment={onAddAppointment}
    />
    <ProfessionalRegistration />
    <FAQ />
  </>
);


const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('main');
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
    
    const handleHashChange = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'privacy-policy' || hash === 'terms-of-service') {
            setCurrentPage(hash);
            window.scrollTo(0, 0);
        } else if (hash === '') {
            setCurrentPage('main');
        }
    };
    
    window.addEventListener('hashchange', handleHashChange, false);
    handleHashChange(); // Check hash on initial load

    return () => {
        window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, []);


  const handleAddPost = (newPost: BlogPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments(prev => [...prev, newAppointment]);
    const notificationMessage = `Novo agendamento de ${newAppointment.clientName} para ${newAppointment.date} às ${newAppointment.time}.`;
    setNotification(notificationMessage);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };
  
  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
        case 'privacy-policy':
            return <PrivacyPolicy />;
        case 'terms-of-service':
            return <TermsOfService />;
        default:
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                    />;
    }
  }

  return (
    <div className="bg-brand-light font-sans text-brand-dark">
      <Header />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
      <WhatsAppButton />
      <Notification message={notification} onClose={handleCloseNotification} />
      {showCookieBanner && <CookieConsentBanner onAccept={handleAcceptCookies} />}
    </div>
  );
};

export default App;