
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
const ManicurePage = React.lazy(() => import('./components/ManicurePage')); // New Page

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
        heroTitle: <>Manicure e Podologia em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Atendimento de referência para <strong>Unhas de Gel e Podologia</strong> em Moema e região do <strong>Shopping Ibirapuera</strong>. Biossegurança e conforto.</p>,
        seoTitle: "Manicure e Podóloga em Moema | Unha Encravada e Gel | Dra. Sandra",
        seoDesc: "Procurando Manicure ou Podóloga em Moema? Especialista em unhas de gel, blindagem e tratamento de pé diabético. Agende sua consulta!"
    },
    'campo-limpo': {
        heroTitle: <>Podologia para o <span className="text-brand-secondary">Campo Limpo</span> e Região</>,
        heroSubtitle: <p>Sua saúde começa pelos pés! Atendimento de qualidade acessível para moradores do <strong>Campo Limpo, Vila das Belezas, Jardim Sul e Horto do Ypê</strong>. Livre-se da dor da unha encravada hoje mesmo.</p>,
        seoTitle: "Podóloga no Campo Limpo e Jardim Sul | Dra. Sandra Barreto",
        seoDesc: "Podologia especializada atendendo moradores do Campo Limpo, Vila das Belezas, Jardim Sul e Horto do Ypê. Tratamento de unhas, calos e micoses."
    },
    'itaim': {
        heroTitle: <>Podologia e Unhas no <span className="text-brand-secondary">Itaim Bibi</span></>,
        heroSubtitle: <p>Excelência em cuidados com os pés e mãos para quem vive ou trabalha no <strong>Itaim Bibi</strong> e arredores. Biossegurança total e atendimento pontual.</p>,
        seoTitle: "Podóloga e Manicure no Itaim Bibi | Dra. Sandra Barreto",
        seoDesc: "Clínica de Podologia e Manicure próxima ao Itaim Bibi. Especialista em calosidades, unhas de gel e podologia esportiva. Atendimento exclusivo."
    },
    'brooklin': {
        heroTitle: <>Sua Manicure e Podóloga no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Conforto e beleza para mãos e pés no coração do <strong>Brooklin</strong> e região da <strong>Berrini</strong>. Tratamentos estéticos e clínicos com especialista qualificada.</p>,
        seoTitle: "Manicure e Podóloga no Brooklin | Zona Sul SP",
        seoDesc: "Podologia e Unhas de Gel no Brooklin e Berrini. Tratamento para unha encravada e SPA dos pés. Agende sua avaliação com a Dra. Sandra Barreto."
    },
    'zona-sul': {
        heroTitle: <>Manicure e Podologia na <span className="text-brand-secondary">Zona Sul de SP</span></>,
        heroSubtitle: <p>Clínica bem localizada para quem busca <strong>"Manicure perto de mim"</strong>. Fácil acesso via Av. Roberto Marinho. Atendimento para <strong>Campo Belo, Moema e Região</strong>.</p>,
        seoTitle: "Manicure e Podóloga Perto de Mim | Zona Sul SP | Sandra Barreto",
        seoDesc: "Procurando manicure e podóloga na Zona Sul? Localização central no Campo Belo. Unhas de gel, blindagem e tratamentos especializados."
    },
    'perto-de-mim': {
        heroTitle: <>Podóloga <span className="text-brand-secondary">Perto de Você</span></>,
        heroSubtitle: <p>Localização estratégica no <strong>Campo Belo</strong> com fácil acesso para <strong>Moema, Brooklin e Aeroporto</strong>. A clínica mais completa da região.</p>,
        seoTitle: "Podólogo Perto de Mim | Clínica Sandra Barreto Zona Sul",
        seoDesc: "Encontre a melhor podóloga perto de você na Zona Sul de SP. Atendimento especializado no Campo Belo, próximo a Moema e Brooklin."
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
            <Services />
            <About />
            <Locations />
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
  } else if (hash === 'privacy-policy' || hash === 'terms-of-service' || hash === 'admin' || hash === 'manicure') {
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
    if (currentPage === 'manicure') {
        // Optimized Local SEO for Manicure
        return { 
            title: "Manicure e Unha de Gel em Campo Belo, Moema e Brooklin | Sandra Barreto", 
            desc: "Esmaltação em Gel, Blindagem e SPA dos Pés com biossegurança (Autoclave). Manicure perto do Aeroporto de Congonhas e Shopping Ibirapuera. Agende!" 
        };
    }
    // Default Home SEO - Updated to reflect High Demand for Manicure
    return { 
        title: "Manicure e Podóloga na Zona Sul SP | Unhas de Gel e Podologia", 
        desc: "Especialista em Unhas de Gel, Blindagem, Manicure e Podologia no Campo Belo, Moema e Itaim. Dra. Sandra Barreto: Estética e saúde para seus pés e mãos." 
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
        case 'manicure':
            return <ManicurePage appointments={appointments} onAddAppointment={handleAddAppointment} />;
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
            // Default Home Content - Manicure First Priority
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                      heroTitle={<>Manicure Premium e <span className="text-brand-secondary">Podologia</span><br/>na Zona Sul de SP</>}
                      heroSubtitle={<p>Realce sua beleza com <strong>Unhas de Gel e Blindagem</strong> ou cuide da saúde dos seus pés. Atendimento no Campo Belo e Moema com biossegurança hospitalar.</p>}
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
