
import React, { useState, useEffect, Suspense, useSyncExternalStore } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import type { BlogPost, Appointment, LocationItem } from './types';
import { BLOG_POSTS_DATA } from './constants';

// Lazy load heavy or secondary components (Below the fold)
const About = React.lazy(() => import('./components/About'));
const Services = React.lazy(() => import('./components/Services'));
const Pricing = React.lazy(() => import('./components/Pricing')); // Loaded lazy but important for snippets
const Locations = React.lazy(() => import('./components/Locations')); // New component for SEO
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const InstagramFeed = React.lazy(() => import('./components/InstagramFeed'));
const ProfessionalRegistration = React.lazy(() => import('./components/ProfessionalRegistration'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Contact = React.lazy(() => import('./components/Contact'));
const Scheduling = React.lazy(() => import('./components/Scheduling'));
const Footer = React.lazy(() => import('./components/Footer'));
const WhatsAppButton = React.lazy(() => import('./components/WhatsAppButton'));
const CreatePost = React.lazy(() => import('./components/CreatePost'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const Notification = React.lazy(() => import('./components/Notification'));
const CookieConsentBanner = React.lazy(() => import('./components/CookieConsentBanner'));
const SchedulingAssistant = React.lazy(() => import('./components/SchedulingAssistant'));

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

// --- LOCATION CONFIGURATION SYSTEM ---
// Supports neighborhoods and specific service landing pages for local SEO
type LocationConfig = {
    heroTitle: React.ReactNode;
    heroSubtitle: React.ReactNode;
    seoTitle: string;
    seoDesc: string;
    locationsList?: LocationItem[]; // Optional: for dynamic locations component
};

const LOCATION_CONFIGS: Record<string, LocationConfig> = {
    // HIGH-INTENT Landing Page
    'podologa-perto-de-mim': {
        heroTitle: <>Encontrou sua <span className="text-brand-secondary">Podóloga Perto de Mim</span></>,
        heroSubtitle: <p>Atendimento especializado no coração da Zona Sul, no <strong>Campo Belo</strong>. Acesso rápido para <strong>Moema, Brooklin e Itaim</strong>. Agende e alivie suas dores hoje mesmo.</p>,
        seoTitle: "Podóloga Perto de Mim em Campo Belo • Sandra Barreto • Atendimento Já",
        seoDesc: "Procurando podóloga perto de você? Dra. Sandra Barreto atende no Campo Belo e região com foco em alívio imediato de dores e unhas encravadas. Agende!"
    },
    // São Paulo Neighborhoods
    'moema': {
        heroTitle: <>Manicure e Podologia em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Atendimento de referência para <strong>Unhas de Gel e Podologia</strong> em Moema e região do <strong>Shopping Ibirapuera</strong>. Biossegurança e conforto.</p>,
        seoTitle: "Podóloga em Moema • Sandra Barreto • Unha Encravada e Tratamentos",
        seoDesc: "Atendimento especializado em podologia e manicure para moradores de Moema. Tratamento de micose, calos e unhas de gel com biossegurança. Agende sua visita!"
    },
    'campo-limpo': {
        heroTitle: <>Podologia para o <span className="text-brand-secondary">Campo Limpo</span> e Região</>,
        heroSubtitle: <p>Sua saúde começa pelos pés! Atendimento de qualidade acessível para moradores do <strong>Campo Limpo, Vila das Belezas, Jardim Sul e Horto do Ypê</strong>. Livre-se da dor da unha encravada hoje mesmo.</p>,
        seoTitle: "Podóloga no Campo Limpo • Sandra Barreto • Saúde para seus Pés",
        seoDesc: "Podologia clínica atendendo a região do Campo Limpo e Jardim Sul. Especialista em tratamento de unhas e calosidades. Atendimento domiciliar disponível!"
    },
    'itaim': {
        heroTitle: <>Podologia e Unhas no <span className="text-brand-secondary">Itaim Bibi</span></>,
        heroSubtitle: <p>Excelência em cuidados com os pés e mãos para quem vive ou trabalha no <strong>Itaim Bibi</strong> e arredores. Biossegurança total e atendimento pontual.</p>,
        seoTitle: "Podóloga no Itaim Bibi • Sandra Barreto • Atendimento Especializado",
        seoDesc: "Cuidados profissionais para seus pés no Itaim Bibi. Especialista em podologia esportiva e tratamentos clínicos. Agende seu horário no consultório ou domicílio."
    },
    'brooklin': {
        heroTitle: <>Sua Manicure e Podóloga no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Conforto e beleza para mãos e pés no coração do <strong>Brooklin</strong> e região da <strong>Berrini</strong>. Tratamentos estéticos e clínicos com especialista qualificada.</p>,
        seoTitle: "Podóloga no Brooklin • Sandra Barreto • Unhas de Gel e Podologia",
        seoDesc: "Tratamentos completos de podologia e estética no Brooklin. Unha encravada, calos e unhas de gel com especialista. Agende agora seu atendimento!"
    },
    'zona-sul': {
        heroTitle: <>Manicure e Podologia na <span className="text-brand-secondary">Zona Sul de SP</span></>,
        heroSubtitle: <p>Clínica bem localizada para quem busca <strong>"Manicure perto de mim"</strong>. Fácil acesso via Av. Roberto Marinho. Atendimento para <strong>Campo Belo, Moema e Região</strong>.</p>,
        seoTitle: "Podóloga na Zona Sul de SP • Sandra Barreto • Campo Belo e Região",
        seoDesc: "A melhor opção em podologia na Zona Sul. Atendimento no Campo Belo, Moema e Brooklin. Especialista em saúde dos pés e unhas. Agende sua consulta!"
    },
    'perto-de-mim': {
        heroTitle: <>Podóloga <span className="text-brand-secondary">Perto de Você</span></>,
        heroSubtitle: <p>Localização estratégica no <strong>Campo Belo</strong> with fácil acesso para <strong>Moema, Brooklin e Aeroporto</strong>. A clínica mais completa da região.</p>,
        seoTitle: "Podóloga Perto de Mim • Sandra Barreto • Atendimento no Campo Belo",
        seoDesc: "Encontre alívio para dores nos pés com a Dra. Sandra Barreto. Atendimento especializado próximo a você no Campo Belo, Moema e Brooklin. Agende!"
    },
    // Service-specific Landing Pages
    'unha-encravada-perto-de-mim': {
        heroTitle: <>Tratamento para <span className="text-brand-secondary">Unha Encravada</span> Perto de Você</>,
        heroSubtitle: <p>Alívio imediato da dor com técnicas especializadas. Atendimento de emergência para <strong>unha inflamada e infeccionada</strong> no Campo Belo, perto de Moema.</p>,
        seoTitle: "Tratamento de Unha Encravada em Campo Belo • Sandra Barreto • Alívio Já",
        seoDesc: "Dor na unha? Especialista em unha encravada com atendimento de emergência no Campo Belo e Zona Sul. Alívio imediato e técnicas indolores. Agende!"
    },
    'unha-de-gel-moema': {
        heroTitle: <>Unhas de Gel em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Durabilidade e brilho para suas unhas com nossa técnica de <strong>esmaltação em gel e blindagem</strong>. Atendimento premium para a região de Moema, perto do <strong>Shopping Ibirapuera</strong>.</p>,
        seoTitle: "Unhas de Gel em Moema • Sandra Barreto • Blindagem e Esmaltação",
        seoDesc: "Unhas perfeitas e duradouras em Moema. Especialista em unhas de gel e blindagem com máxima biossegurança. Agende seu horário premium hoje!"
    },
    'reflexologia-brooklin': {
        heroTitle: <>Reflexologia Podal no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Relaxe e reequilibre suas energias com uma sessão de <strong>reflexologia podal terapêutica</strong>. Alívio de estresse e dores para quem trabalha ou mora na região da <strong>Berrini e Brooklin</strong>.</p>,
        seoTitle: "Reflexologia Podal no Brooklin • Sandra Barreto • Bem-estar e Saúde",
        seoDesc: "Reduza o estresse e melhore sua saúde com reflexologia podal no Brooklin. Massagem terapêutica especializada para alívio de tensões. Agende sua sessão!"
    },
};

interface MainContentProps {
  posts: BlogPost[];
  appointments: Appointment[];
  onAddPost: (post: BlogPost) => void;
  onAddAppointment: (appointment: Appointment) => void;
  heroTitle?: React.ReactNode;
  heroSubtitle?: React.ReactNode;
  locationsList?: LocationItem[];
}

const MainContent: React.FC<MainContentProps> = ({ 
    posts, 
    appointments, 
    onAddPost, 
    onAddAppointment, 
    heroTitle,
    heroSubtitle,
    locationsList
}) => {
  return (
      <>
        {/* Hero is Eager loaded to ensure fastest LCP */}
        <Hero title={heroTitle} subtitle={heroSubtitle} />
        
        {/* Below the fold content is lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
            <Services />
            <About />
            <Locations locations={locationsList} />
            <Pricing />
            <Testimonials />
            <InstagramFeed />
            <BlogSection posts={posts} />
            <Scheduling 
                appointments={appointments} 
                onAddAppointment={onAddAppointment}
            />
            <FAQ />
            <Contact />
            <CreatePost onAddPost={onAddPost} />
            <ProfessionalRegistration />
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
  let currentLocationConfig: LocationConfig | null = null;

  if (LOCATION_CONFIGS[hash]) {
      currentLocationConfig = LOCATION_CONFIGS[hash];
      currentPage = 'location';
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
            title: "Manicure e Unhas de Gel em Campo Belo • Sandra Barreto • Agende seu Horário", 
            desc: "Unhas de gel, blindagem e esmaltação premium com biossegurança total. Atendimento especializado no Campo Belo, Moema e Brooklin. Clique para agendar!" 
        };
    }
    // Default Home SEO - Updated for CTR Optimization
    return { 
        title: "Podóloga Sandra Barreto em Campo Belo • Atendimento Domiciliar e no Consultório", 
        desc: "Especialista em podologia clínica na Zona Sul de SP. Atendimento para unha encravada, micoses e pé diabético no Campo Belo, Moema e Brooklin. Agende agora!" 
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
        case 'location':
            // Renders the main content but with injected props from the location config
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                      heroTitle={currentLocationConfig?.heroTitle}
                      heroSubtitle={currentLocationConfig?.heroSubtitle}
                      locationsList={currentLocationConfig?.locationsList}
                    />;
        default:
            // Default Home Content - Updated "Perto de Mim" concept
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                      heroTitle={<>Podóloga Perto de Você: <br className="hidden md:block" /><span className="text-brand-primary">Atendimento Especializado</span> na Zona Sul</>}
                      heroSubtitle={<p>Sua busca por <strong>"podóloga perto de mim"</strong> termina aqui. Atendimento clínico no <strong>Campo Belo</strong> com acesso rápido para <strong>Moema e Brooklin</strong>. Alívio para unha encravada, micoses e mais. Agende sua consulta.</p>}
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
            <SchedulingAssistant appointments={appointments} onAddAppointment={handleAddAppointment} />
            <WhatsAppButton />
            <Notification message={notification} onClose={handleCloseNotification} />
            {showCookieBanner && <CookieConsentBanner onAccept={handleAcceptCookies} />}
          </Suspense>
      )}
    </div>
  );
};

export default App;
