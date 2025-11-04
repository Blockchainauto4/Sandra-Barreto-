import React from 'react';
import LegalPageLayout from './LegalPageLayout';

const PrivacyPolicy: React.FC = () => {
    return (
        <LegalPageLayout title="Política de Privacidade">
            <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

            <h2>1. Introdução</h2>
            <p>A sua privacidade é importante para nós. É política do site Podologia Sandra Barreto respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no nosso site e outros sites que possuímos e operamos.</p>
            
            <h2>2. Dados que Coletamos</h2>
            <p>Coletamos informações que você nos fornece diretamente, bem como dados gerados automaticamente quando você utiliza nosso site.</p>
            <ul>
                <li><strong>Informações Pessoais:</strong> Nome, telefone e e-mail fornecidos nos formulários de agendamento e de cadastro profissional.</li>
                <li><strong>Dados de Geolocalização:</strong> Com sua permissão explícita, coletamos sua localização para pré-preencher o campo de endereço no formulário de cadastro de profissionais, facilitando o uso.</li>
                <li><strong>Dados de Uso e Cookies:</strong> Informações sobre como você acessa e usa o site, incluindo seu endereço IP, tipo de navegador, páginas visitadas e horários de acesso. Utilizamos cookies para melhorar a funcionalidade e a experiência do usuário.</li>
            </ul>

            <h2>3. Como Usamos Seus Dados</h2>
            <p>Utilizamos os dados coletados para as seguintes finalidades:</p>
            <ul>
                <li><strong>Operar e Manter o Serviço:</strong> Para gerenciar agendamentos, entrar em contato para confirmação e avaliar parcerias com profissionais.</li>
                <li><strong>Melhorar a Experiência:</strong> Para personalizar o conteúdo, entender como nossos usuários utilizam o site e otimizar nossas funcionalidades.</li>
                <li><strong>Comunicação:</strong> Para responder às suas solicitações e enviar informações importantes sobre seus agendamentos.</li>
                <li><strong>Segurança:</strong> Para proteger nosso site contra fraudes e abusos.</li>
            </ul>

            <h2>4. Cookies e Tecnologias de Rastreamento</h2>
            <p>Utilizamos cookies essenciais para o funcionamento do site (como o controle do seu consentimento) e cookies de análise (de forma anônima) para entender o tráfego do site. Ao continuar a usar nosso site, você concorda com o uso de cookies. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.</p>
            
            <h2>5. Uso de Inteligência Artificial (IA)</h2>
            <p>Nossa ferramenta de criação de conteúdo utiliza a API do Google Gemini. Os tópicos que você insere para gerar posts de blog são enviados à API para processamento. Não enviamos nenhuma informação pessoal sua juntamente com essas solicitações. O uso desta ferramenta está sujeito aos termos de serviço da Google API.</p>

            <h2>6. Seus Direitos</h2>
            <p>Você tem o direito de acessar, corrigir ou solicitar a exclusão dos seus dados pessoais. Para exercer esses direitos, entre em contato conosco através das informações fornecidas no site.</p>

            <h2>7. Segurança dos Dados</h2>
            <p>Empregamos medidas de segurança para proteger suas informações contra acesso, alteração, divulgação ou destruição não autorizada. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.</p>
            
            <h2>8. Links para Sites de Terceiros</h2>
            <p>Nosso site pode conter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e as práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>

            <h2>9. Alterações a Esta Política</h2>
            <p>Podemos atualizar nossa Política de Privacidade de tempos em tempos. Notificaremos sobre quaisquer alterações publicando a nova Política de Privacidade nesta página.</p>

            <h2>10. Contato</h2>
            <p>Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do telefone ou WhatsApp disponível no rodapé deste site.</p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicy;