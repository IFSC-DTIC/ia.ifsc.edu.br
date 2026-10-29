# 🛡️ Diretrizes de Segurança, Privacidade e Melhores Práticas (`ia.ifsc.edu.br`)

Este documento estabelece as diretrizes técnicas, arquiteturais e normativas de segurança da informação adotadas no **Portal de Inteligência Artificial do IFSC** ([ia.ifsc.edu.br](https://ia.ifsc.edu.br/)), sob coordenação técnica de **FLM** (DTIC/CGD), em conformidade com a **Orientação Técnica nº 04/2025 (DTIC/CGD)**, a **Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)** e o **ECA Digital (Estatuto da Criança e do Adolescente)**.

---

## 📋 Checklist de Segurança e Melhores Práticas Implementadas

| Status | Mecanismo | Implementação Técnica | Nível de Risco Mitigado |
| :---: | :--- | :--- | :--- |
| ✅ | **Gestão de Segredos (Zero Secrets)** | Repositório 100% público sem credenciais, API Keys ou senhas. Filosofia BYOK (*Bring Your Own Key*) quando aplicável. | Crítico (Prevenção de vazamento) |
| ✅ | **Proteção de Identidade (Zero PII)** | Vedação absoluta à exposição de dados pessoais ou nomes civis em código, commits e documentações públicas; identificação técnica padronizada pela sigla **`FLM`** (DTIC/CGD). | Alto (Privacidade em repositório público) |
| ✅ | **Anonimização de Telemetria** | Google Analytics 4 com `anonymize_ip: true`, `allow_google_signals: false` e personalização desativada. Microsoft Clarity com máscara LGPD. | Crítico (Privacidade de servidores e discentes) |
| ✅ | **Proteção de Menores (ECA Digital)** | Avisos normativos da OT 04/2025 e vedação expressa à submissão de dados de menores ou de saúde em IAs públicas externas. | Crítico (Conformidade legal e ética) |
| ✅ | **Content Security Policy (CSP)** | Meta tags CSP ativas em `index.html`, `404.html`, `form/index.html`, `ripd/index.html` e `termo/index.html` limitando fontes confiáveis. | Alto (Prevenção de injeção de código) |
| ✅ | **Cabeçalhos de Segurança Client-Side** | `Referrer-Policy: strict-origin-when-cross-origin` e `X-Content-Type-Options: nosniff` ativos em todas as páginas e rotas curtas. | Alto (Prevenção de vazamento de URL e MIME-sniffing) |
| ✅ | **Sanitização contra XSS** | Parâmetros de rota, busca e renderização dinâmica tratados via `escapeHtml()` e `textContent` antes da inserção no DOM. | Alto (Prevenção de Cross-Site Scripting) |
| ✅ | **Links Externos Seguros** | Todas as âncoras para sistemas externos utilizam `target="_blank"` e `rel="noopener noreferrer"`. | Médio (Prevenção de *Reverse Tabnabbing*) |
| ✅ | **Ofuscação Anti-Scraping de E-mails** | E-mails institucionais ofuscados em Base64 no HTML estático e reconstruídos via JavaScript (`js-safe-email`) sob interação do navegador. | Médio (Proteção contra SPAM/Phishing) |
| ✅ | **Arquitetura Zero-Backend (Local-First)** | Sem banco de dados em nuvem nem retenção de prompts no portal. Preferências e termos gerados 100% no dispositivo do usuário. | Crítico (Superfície de ataque zero no servidor) |

---

## 🏛️ Princípios de Arquitetura e Privacidade

### 1. Modelo Local-First e Zero-Backend
O portal atua estritamente como **Hub Institucional de Diretrizes e Aplicações Estáticas**. Não há backend intermediário, banco de dados ou captura de conversas/prompts dos usuários. As interações ocorrem diretamente entre o navegador do usuário e os serviços homologados (Google Workspace for Education, Microsoft 365 Education A1 ou formulários institucionais).

### 2. Tratamento de Dados no Gerador de Termos (`/termo/`)
O módulo do Gerador de Termos de Consentimento (LGPD / ECA Digital) processa as informações exclusivamente em memória no navegador do cliente (Vue 3 + `html2pdf.js`). **Nenhum dado pessoal é transmitido pela rede ou armazenado em servidores externos.**

### 3. Delimitação de Contas Institucionais vs. Contas Pessoais
- **Diagnósticos e Ambientes Restritos ao Domínio IFSC (`/form` e Workspace Education):** O **Questionário de Maturidade de IA no IFSC** (`https://ia.ifsc.edu.br/form`) exibe caixa suspensa com trava informativa explícita exigindo login com conta institucional oficial **`@ifsc.edu.br`** (servidores) ou **`@aluno.ifsc.edu.br`** (estudantes), bloqueando respostas oriundas de contas `@gmail.com` pessoais no Google Forms e assegurando governança institucional sobre os dados coletados.
- **Aplicações Públicas Homologadas (`/ripd`, Guardião LGPD, sez.iO, LaRDiC, etc.):** Operam como protótipos e utilitários abertos, acompanhados de aviso normativo da OT nº 04/2025 vedando a inserção de dados pessoais sensíveis ou documentos sigilosos e exigindo validação humana (*Human-in-the-Loop*).
- **Descontinuação Segura de Gems:** Com a descontinuação do recurso *Gems* pela Google, os antigos links de *Agentes Especialistas* foram removidos de produção (`GitHubPage` e `main`) para evitar rotas quebradas ou confusão de acesso, mantendo-se arquivados apenas para histórico técnico na branch `archive/agentes-especialistas-gems` visando futura avaliação de **Skills**.

---

## 💻 Orientações para Contribuidores

Ao submeter alterações ou Pull Requests para o repositório público `IFSC-DTIC/ia.ifsc.edu.br`:

1. **Jamais inclua arquivos `.env`, chaves de API, nomes civis pessoais ou dados sensíveis** em arquivos ou mensagens de commit (utilize apenas siglas institucionais como `FLM` / `DTIC` / `CGD`).
2. **Utilize sempre `escapeHtml()` ou `textContent`** na renderização de dados dinâmicos.
3. **Mantenha todos os links externos com `rel="noopener noreferrer"` e `target="_blank"`.**
4. **Garanta paridade entre as branches `GitHubPage` (produção ativa) e `main`.**
