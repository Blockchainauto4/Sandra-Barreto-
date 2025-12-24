
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
const InstagramFeed = React.lazy(() => import('./components/InstagramFeed'));
const ProfessionalRegistration = React.lazy(() => import('./components/ProfessionalRegistration'));
const FAQ = React.lazy(() => import('./components/FAQ'));
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
    },
    'unha-encravada-perto-de-mim': {
        heroTitle: <>Tratamento para <span className="text-brand-secondary">Unha Encravada</span> Perto de Você</>,
        heroSubtitle: <p>Alívio imediato da dor com técnicas especializadas. Atendimento de emergência para <strong>unha inflamada e infeccionada</strong> no Campo Belo, perto de Moema.</p>,
        seoTitle: "Unha Encravada Perto de Mim | Podologia de Emergência Zona Sul",
        seoDesc: "Precisa de um especialista em unha encravada perto de você? Tratamento rápido e eficaz da dor e inflamação no Campo Belo, Zona Sul de SP."
    },
    'micose-unha-perto-de-mim': {
        heroTitle: <>Tratamento para <span className="text-brand-secondary">Micose de Unha</span> Perto de Você</>,
        heroSubtitle: <p>Solução definitiva para fungos nas unhas com <strong>tratamentos a laser e tópicos</strong>. Recupere a saúde e a aparência das suas unhas na nossa clínica no Campo Belo.</p>,
        seoTitle: "Micose de Unha Perto de Mim | Tratamento a Laser Zona Sul SP",
        seoDesc: "Busca tratamento para micose de unha (onicomicose) perto de você? Especialista em podologia com as melhores tecnologias no Campo Belo, SP."
    },
    'ortese-unha-perto-de-mim': {
        heroTitle: <>Aplicação de <span className="text-brand-secondary">Órtese de Unha</span> Perto de Você</>,
        heroSubtitle: <p>Corrija o formato da sua unha e evite que ela encrave novamente com a <strong>aplicação de órtese ungueal</strong>. Técnica indolor e eficaz.</p>,
        seoTitle: "Órtese para Unha Encravada Perto de Mim | Podologia Zona Sul",
        seoDesc: "Encontre aplicação de órtese para correção de unha perto de você. Tratamento preventivo para unha encravada no Campo Belo, próximo ao Brooklin."
    },
    'reflexologia-perto-de-mim': {
        heroTitle: <>Sessão de <span className="text-brand-secondary">Reflexologia Podal</span> Perto de Você</>,
        heroSubtitle: <p>Relaxe, alivie o estresse e equilibre seu corpo através da <strong>massagem terapêutica em pontos específicos dos pés</strong>. Uma experiência única de bem-estar.</p>,
        seoTitle: "Reflexologia Podal Perto de Mim | Terapia e Massagem nos Pés",
        seoDesc: "Procurando por uma sessão de reflexologia podal perto de você? Alivie dores e tensões com nossa terapeuta especializada no Campo Belo."
    },
    'unha-de-gel-moema': {
        heroTitle: <>Unhas de Gel em <span className="text-brand-secondary">Moema</span></>,
        heroSubtitle: <p>Durabilidade e brilho para suas unhas com nossa técnica de <strong>esmaltação em gel e blindagem</strong>. Atendimento premium para a região de Moema, perto do <strong>Shopping Ibirapuera</strong>.</p>,
        seoTitle: "Unhas de Gel em Moema | Manicure Especializada | Sandra Barreto",
        seoDesc: "Procurando por unhas de gel em Moema? Especialista em blindagem e esmaltação em gel com alta durabilidade. Agende seu horário perto do Shopping Ibirapuera."
    },
    'reflexologia-brooklin': {
        heroTitle: <>Reflexologia Podal no <span className="text-brand-secondary">Brooklin</span></>,
        heroSubtitle: <p>Relaxe e reequilibre suas energias com uma sessão de <strong>reflexologia podal terapêutica</strong>. Alívio de estresse e dores para quem trabalha ou mora na região da <strong>Berrini e Brooklin</strong>.</p>,
        seoTitle: "Reflexologia Podal no Brooklin | Massagem Terapêutica | Perto Berrini",
        seoDesc: "Sessão de reflexologia podal no Brooklin, perto da Berrini. Alivie o estresse e dores com nossa massagem terapêutica especializada. Agende seu momento de bem-estar."
    },
    'spa-dos-pes-itaim-bibi': {
        heroTitle: <>SPA dos Pés no <span className="text-brand-secondary">Itaim Bibi</span></>,
        heroSubtitle: <p>Renove a saúde e a maciez dos seus pés com nosso <strong>SPA completo: esfoliação, hidratação profunda e massagem</strong>. Um cuidado essencial para quem vive a rotina agitada do <strong>Itaim Bibi e Faria Lima</strong>.</p>,
        seoTitle: "SPA dos Pés no Itaim Bibi | Hidratação e Relaxamento | Podologia",
        seoDesc: "Procurando um SPA dos Pés no Itaim Bibi? Oferecemos esfoliação, hidratação profunda e massagem relaxante. Devolva a maciez e o conforto aos seus pés."
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
            <InstagramFeed />
            <BlogSection posts={posts} />
            <Scheduling 
                appointments={appointments} 
                onAddAppointment={onAddAppointment}
            />
            <CreatePost onAddPost={onAddPost} />
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
        title: "Hospital dos Pés: Podologia na Zona Sul SP | Unha Encravada e Micoses", 
        desc: "Clínica de Podologia no Campo Belo (Hospital dos Pés). Tratamento para Unha Encravada, Micose, Órtese e Reflexologia. Atendimento perto de Moema e Itaim." 
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
            // Default Home Content - Updated "Hospital dos Pés" concept
            return <MainContent 
                      posts={posts} 
                      appointments={appointments}
                      onAddPost={handleAddPost}
                      onAddAppointment={handleAddAppointment}
                      heroTitle={<>Hospital dos Pés: <span className="text-brand-secondary">Podologia Clínica</span><br/>na Zona Sul de SP</>}
                      heroSubtitle={<p>Centro de excelência em saúde podal. Tratamentos especializados para <strong>Unha Encravada, Micoses, Órteses e Reflexologia</strong>. Cuidado e tecnologia para seus pés no Campo Belo.</p>}
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
