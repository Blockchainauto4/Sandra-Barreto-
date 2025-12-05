import React, { useState, useEffect, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { BlogPost, Appointment } from './types';
import { BLOG_POSTS_DATA } from './constants';

// Lazy load heavy or secondary components (Below the fold)
const About = React.lazy(() => import('./components/About'));
const Services = React.lazy(() => import('./components/Services'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const ProfessionalRegistration = React.lazy(() => import('./components/ProfessionalRegistration'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Scheduling = React.lazy(() => import('./components/Scheduling'));
const Footer = React.lazy(() => import('./components/Footer'));
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton'));
const CreatePost = React.lazy(() => import('./components/CreatePost'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const Notification = React.lazy(() => import('./components/Notification'));
const CookieConsentBanner = React.lazy(() => import('./components/CookieConsentBanner'));

// Lazy load Pages
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-light">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
  </div>
);

const SectionLoader = () => (
    <div className="py-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
    </div>
);

const MainContent: React.FC<{
  posts: BlogPost[];
  appointments: Appointment[];
  onAddPost: (post: BlogPost) => void;
  onAddAppointment: (appointment: Appointment) => void;
}> = ({ posts, appointments, onAddPost, onAddAppointment }) => (
  <>
    {/* Hero is Eager loaded to ensure fastest LCP */}
    <Hero />
    
    {/* Below the fold content is lazy loaded */}
    <Suspense fallback={<SectionLoader />}>
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
    </Suspense>
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
        if (hash === 'privacy-policy' || hash === 'terms-of-service' || hash === 'admin') {
            setCurrentPage(hash);
            window.scrollTo(0, 0);
        } else {
            // Treat any other hash (like #services, #about) or empty string as 'main'
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
        case 'admin':
            return <AdminDashboard />;
        default:
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                    />;
    }
  }

  // Determine if we should show the standard public layout (Header, Footer, Floating Buttons)
  const isFullPageLayout = currentPage === 'admin';

  return (
    <div className="bg-brand-light font-sans text-brand-dark">
      {!isFullPageLayout && <Header />}
      <main className={isFullPageLayout ? "min-h-screen" : ""}>
        <Suspense fallback={<PageLoader />}>
            {renderCurrentPage()}
        </Suspense>
      </main>
      
      {!isFullPageLayout && (
          <Suspense fallback={null}>
             <Footer />
          </Suspense>
      )}

      {!isFullPageLayout && (
          <Suspense fallback={null}>
            <WhatsAppButton />
            <Notification message={notification} onClose={handleCloseNotification} />
            {showCookieBanner && <CookieConsentBanner onAccept={handleAcceptCookies} />}
          </Suspense>
      )}
    </div>
  );
};

export default App;