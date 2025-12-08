
import React, { useState, useEffect, Suspense, useSyncExternalStore } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import type { BlogPost, Appointment } from './types';
import { BLOG_POSTS_DATA } from './constants';

// Lazy load heavy or secondary components (Below the fold)
const About = React.lazy(() => import('./components/About'));
const Services = React.lazy(() => import('./components/Services'));
const Pricing = React.lazy(() => import('./components/Pricing')); // Loaded lazy but important for snippets
const Locations = React.lazy(() => import('./components/Locations')); // New component for SEO
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

// --- NEIGHBORHOOD SYSTEM CONFIGURATION ---
// Add new neighborhoods here to automatically generate landing page logic
type NeighborhoodConfig = {
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    seoTitle: string;
    seoDesc: string;
};

const NEIGHBORHOODS: Record<string, NeighborhoodConfig> = {
    'moema': {
        heroTitle: <>Podologia Especializada em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Sofrendo com dores nos pés? Atendimento de referência para moradores de <strong>Moema</strong> e região do <strong>Shopping Ibirapuera</strong>. Tratamentos para unhas encravadas, micoses e pés diabéticos.</p>,
        seoTitle: "Podóloga em Moema | Unha Encravada e Pé Diabético | Dra. Sandra",
        seoDesc: "Procurando Podóloga em Moema? Tratamento especializado para unhas encravadas, calos e pé diabético próximo ao Shopping Ibirapuera. Agende sua consulta!"
    },
    'campo-limpo': {
        heroTitle: <>Podologia para o <span className="text-brand-secondary">Campo Limpo</span> e Região</>,
        heroSubtitle: <p>Sua saúde começa pelos pés! Atendimento de qualidade acessível para moradores do <strong>Campo Limpo, Vila das Belezas, Jardim Sul e Horto do Ypê</strong>. Livre-se da dor da unha encravada hoje mesmo.</p>,
        seoTitle: "Podóloga no Campo Limpo e Jardim Sul | Dra. Sandra Barreto",
        seoDesc: "Podologia especializada atendendo moradores do Campo Limpo, Vila das Belezas, Jardim Sul e Horto do Ypê. Tratamento de unhas, calos e micoses."
    },
    'itaim': {
        heroTitle: <>Podologia Premium no <span className="text-brand-secondary">Itaim Bibi</span></>,
        heroSubtitle: <p>Excelência em cuidados com os pés para quem vive ou trabalha no <strong>Itaim Bibi</strong> e arredores da <strong>Av. Faria Lima</strong>. Biossegurança total e atendimento pontual.</p>,
        seoTitle: "Podóloga no Itaim Bibi e Vila Olímpia | Dra. Sandra Barreto",
        seoDesc: "Clínica de Podologia próxima ao Itaim Bibi. Especialista em calosidades, unhas encravadas e podologia esportiva. Atendimento exclusivo na Zona Sul."
    },
    'brooklin': {
        heroTitle: <>Sua Podóloga no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Conforto e saúde para seus pés no coração do <strong>Brooklin</strong> e região da <strong>Berrini</strong>. Tratamentos preventivos e corretivos com especialista qualificada.</p>,
        seoTitle: "Podóloga no Brooklin Novo e Velho | Zona Sul SP",
        seoDesc: "Podologia no Brooklin e Berrini. Tratamento para unha encravada, olho de peixe e pés diabéticos. Agende sua avaliação com a Dra. Sandra Barreto."
    },
    'zona-sul': {
        heroTitle: <>Podologia na <span className="text-brand-secondary">Zona Sul de SP</span></>,
        heroSubtitle: <p>Clínica de Podologia bem localizada para quem busca <strong>"Podólogo perto de mim"</strong>. Fácil acesso via Av. Roberto Marinho e Corredor Norte-Sul. Atendimento para <strong>Campo Belo, Moema, Santo Amaro e Região</strong>.</p>,
        seoTitle: "Podóloga Perto de Mim | Zona Sul SP | Dra. Sandra Barreto",
        seoDesc: "Procurando podóloga perto de você na Zona Sul? Localização central no Campo Belo com fácil acesso. Tratamentos especializados e horários flexíveis."
    }
};

interface MainContentProps {
  posts: BlogPost[];
  appointments: Appointment[];
  onAddPost: (post: BlogPost) => void;
  onAddAppointment: (appointment: Appointment) => void;
  heroTitle?: React.ReactNode;
  heroSubtitle?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ 
    posts, 
    appointments, 
    onAddPost, 
    onAddAppointment, 
    heroTitle,
    heroSubtitle
}) => {
  return (
      <>
        {/* Hero is Eager loaded to ensure fastest LCP */}
        <Hero title={heroTitle} subtitle={heroSubtitle} />
        
        {/* Below the fold content is lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
            <About />
            <Locations />
            <Services />
            <Pricing />
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
};

// External Store subscription for Hash Navigation
const subscribeToHash = (callback: () => void) => {
    window.addEventListener('hashchange', callback);
    return () => window.removeEventListener('hashchange', callback);
};

const getHashSnapshot = () => window.location.hash;
const getServerHashSnapshot = () => '';

const App: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  
  // React 19 / Modern: Use SyncExternalStore for hash navigation
  const rawHash = useSyncExternalStore(subscribeToHash, getHashSnapshot, getServerHashSnapshot);
  const hash = rawHash.replace('#', '');

  // Derived State (Render-as-you-fetch pattern for routing)
  let currentPage = 'main';
  let currentLocationConfig: NeighborhoodConfig | null = null;

  if (NEIGHBORHOODS[hash]) {
      currentLocationConfig = NEIGHBORHOODS[hash];
      currentPage = 'neighborhood';
  } else if (hash === 'privacy-policy' || hash === 'terms-of-service' || hash === 'admin') {
      currentPage = hash;
  }
  
  // Side Effect: Scroll to top only when hash changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [hash]);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowCookieBanner(true);
    }
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

  // Helper to determine current SEO tags
  const getSeoData = () => {
    if (currentLocationConfig) {
        return { 
            title: currentLocationConfig.seoTitle, 
            desc: currentLocationConfig.seoDesc 
        };
    }
    if (currentPage === 'privacy-policy' || currentPage === 'terms-of-service' || currentPage === 'admin') {
        return { 
            title: "Podologia Sandra Barreto | Área Legal", 
            desc: "Informações legais e administrativas. Política de Privacidade e Termos de Serviço." 
        };
    }
    // Default Home SEO
    return { 
        title: "Podóloga na Zona Sul SP | Campo Belo, Moema e Itaim", 
        desc: "Podologia em Moema, Campo Belo e Itaim Bibi. Dra. Sandra Barreto: Especialista em unha encravada, pé diabético e calos. Clínica na Zona Sul de SP." 
    };
  };

  const seoData = getSeoData();

  const renderCurrentPage = () => {
    switch (currentPage) {
        case 'privacy-policy':
            return <PrivacyPolicy />;
        case 'terms-of-service':
            return <TermsOfService />;
        case 'admin':
            return <AdminDashboard />;
        case 'neighborhood':
            // Renders the main content but with injected props from the neighborhood config
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                      heroTitle={currentLocationConfig?.heroTitle}
                      heroSubtitle={currentLocationConfig?.heroSubtitle}
                    />;
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
      {/* React 19 Document Metadata: Automatically hoisted to <head> */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.desc} />

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
