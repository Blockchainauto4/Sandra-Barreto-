import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const TermsOfService: React.FC = () => {
    return (
        <LegalPageLayout title="Termos de Serviço">
            <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site Podologia Sandra Barreto, você concorda em cumprir estes Termos de Serviço e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.</p>

            <h2>2. Uso do Site</h2>
            <p>É concedida permissão para usar o site para fins pessoais e não comerciais, especificamente para buscar informações sobre serviços de podologia, agendar consultas e utilizar as ferramentas fornecidas, como o gerador de conteúdo.</p>
            <p>Este site não deve ser utilizado para fins ilegais ou não autorizados. Você concorda em não:</p>
            <ul>
                <li>Interferir no funcionamento normal do site.</li>
                <li>Tentar obter acesso não autorizado aos nossos sistemas.</li>
                <li>Utilizar o gerador de conteúdo para criar material difamatório, odioso ou ilegal.</li>
            </ul>

            <h2>3. Agendamento de Consultas</h2>
            <p>O sistema de agendamento online permite que você solicite um horário. Este agendamento é uma pré-reserva e está sujeito a confirmação por nossa equipe, que entrará em contato através dos dados fornecidos por você. A disponibilidade exibida é em tempo real, mas erros podem ocorrer. A confirmação final garante o seu horário.</p>

            <h2>4. Ferramenta de Geração de Conteúdo com IA</h2>
            <p>A ferramenta de criação de blog posts utiliza a API do Google Gemini para gerar texto e imagens. Você é responsável pelo conteúdo que solicita e publica. O conteúdo gerado é fornecido &quot;como está&quot;, sem garantias de precisão ou originalidade. Recomendamos que você revise e edite todo o conteúdo antes da publicação.</p>
            <p>Ao gerar conteúdo, você concede ao site Podologia Sandra Barreto o direito de exibir esse conteúdo publicamente na seção de blog do site.</p>
            
            <h2>5. Propriedade Intelectual</h2>
            <p>Todo o conteúdo presente neste site, incluindo textos, gráficos, logos e o design, é propriedade de Podologia Sandra Barreto ou de seus licenciadores de conteúdo e protegido pelas leis de direitos autorais. O conteúdo gerado por você através da ferramenta de IA para publicação no blog é licenciado para exibição neste site.</p>

            <h2>6. Isenção de Responsabilidade</h2>
            <p>As informações fornecidas neste site são para fins informativos gerais e não constituem aconselhamento médico ou de saúde. Sempre procure o conselho de um profissional qualificado para qualquer questão de saúde que você possa ter. Não nos responsabilizamos por quaisquer ações tomadas com base nas informações encontradas no site ou no conteúdo gerado pela IA.</p>
            
            <h2>7. Limitação de Responsabilidade</h2>
            <p>Em nenhuma circunstância o site Podologia Sandra Barreto ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro, ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais no site.</p>

            <h2>8. Alterações nos Termos</h2>
            <p>Reservamo-nos o direito de revisar estes Termos de Serviço a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual destes termos.</p>
            
            <h2>9. Contato</h2>
            <p>Se tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco através das informações de contato disponíveis no site.</p>
        </LegalPageLayout>
    );
};

export default TermsOfService;