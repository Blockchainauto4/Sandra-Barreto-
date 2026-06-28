import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const TermsOfService: React.FC = () => {
    return (
        <LegalPageLayout title="Termos de Serviço">
            <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site Podologia Sandra Barreto, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.</p>

            <h2>2. Uso do Site</h2>
            <p>É concedida permissão para usar o site para fins pessoais e não comerciais, especificamente para buscar informações sobre serviços de podologia e entrar em contato para consultas.</p>
            <p>Este site não deve ser utilizado para fins ilegais ou não autorizados. Você concorda em não:</p>
            <ul>
                <li>Interferir no funcionamento normal do site.</li>
                <li>Tentar obter acesso não autorizado aos nossos sistemas.</li>
            </ul>

            <h2>3. Agendamento de Consultas</h2>
            <p>Os agendamentos de consultas são realizados diretamente via contato telefônico ou WhatsApp, sujeitos à confirmação de nossa equipe conforme a disponibilidade de horários.</p>
            
            <h2>4. Propriedade Intelectual</h2>
            <p>Todo o conteúdo presente neste site, incluindo textos, gráficos, logos e o design, é propriedade de Podologia Sandra Barreto ou de seus licenciadores de conteúdo e protegido pelas leis de direitos autorais.</p>

            <h2>5. Isenção de Responsabilidade</h2>
            <p>As informações fornecidas neste site são para fins informativos gerais e não constituem aconselhamento médico ou de saúde. Sempre procure o conselho de um profissional qualificado para qualquer questão de saúde que você possa ter. Não nos responsabilizamos por quaisquer ações tomadas com base nas informações encontradas no site.</p>
            
            <h2>6. Limitação de Responsabilidade</h2>
            <p>Em nenhuma circunstância o site Podologia Sandra Barreto ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no site.</p>

            <h2>7. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de revisar estes Termos de Serviço a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual destes termos.</p>
            
            <h2>8. Contato</h2>
            <p>Se tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através das informações de contato disponíveis no site.</p>
        </LegalPageLayout>
    );
};

export default TermsOfService;