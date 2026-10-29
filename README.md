# Portal de Inteligência Artificial do IFSC — ia.ifsc.edu.br

[![Status: Homologado OT 04/2025](https://img.shields.io/badge/IFSC-OT%2004%2F2025-00823B.svg)](https://www.ifsc.edu.br/web/portal-do-servidor/gestao-de-dados)
[![Arquitetura: Zero-Backend](https://img.shields.io/badge/Arquitetura-Zero--Backend-blue.svg)](ARQUITETURA.md)
[![Conformidade: LGPD & ECA](https://img.shields.io/badge/Conformidade-LGPD%20%26%20ECA-success.svg)](SEGURANCA.md)
[![Hospedagem: GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-informational.svg)](https://ia.ifsc.edu.br/)
[![Analytics: GA4 + Clarity](https://img.shields.io/badge/Telemetria-GA4%20%2B%20Clarity-orange.svg)](#-observabilidade-telemetria-ética--seo)

🛡️ **Portal oficial de diretrizes, ferramentas homologadas, diagnóstico de maturidade e parcerias educacionais de Inteligência Artificial (IA)** do Instituto Federal de Educação, Ciência e Tecnologia de Santa Catarina (IFSC), mantido e coordenado pela **Diretoria de Tecnologia da Informação e Comunicação (DTIC)** e pela **Coordenadoria de Gestão de Dados (CGD)** (gestão técnica: **FLM**).

Disponível publicamente em: **[https://ia.ifsc.edu.br/](https://ia.ifsc.edu.br/)**

> O endereço legado `apps.ifsc.edu.br` conta com redirecionamento automático permanente (301-equivalent) preservando rotas e parâmetros para `ia.ifsc.edu.br`.

---

## 🏛️ Orientação Técnica nº 04/2025 (CGD / DTIC - IFSC)

Este portal foi concebido e estruturado para operacionalizar as diretrizes da **Orientação Técnica nº 04/2025**, elaborada pela Coordenadoria de Gestão de Dados (CGD/DTIC/PRODIN) do IFSC, normatizando o uso seguro, ético e responsável de IA por toda a comunidade acadêmica (estudantes, docentes e servidores técnico-administrativos):

1. **Priorização de Plataformas Homologadas:** Servidores e alunos devem priorizar o uso das ferramentas integradas às suas contas institucionais (`@ifsc.edu.br` e `@aluno.ifsc.edu.br`) nos ecossistemas **Google for Education** e **Microsoft 365 Education (A1)**. Nesses ambientes, os acordos institucionais asseguram que dados e prompts **não sejam utilizados no treinamento de modelos públicos de IA**.
2. **Proibição de "Shadow AI" e Proteção de Dados (LGPD / ECA Digital):** É terminantemente vedada a inserção ou processamento de dados pessoais (nomes, CPFs, contatos, dados de menores de idade, dados acadêmicos ou de saúde) e documentos sigilosos em ferramentas externas pessoais não homologadas.
3. **Primazia da Decisão Humana (*Human-in-the-Loop*):** A IA atua estritamente como suporte ao ensino, pesquisa, extensão e administração. Toda informação ou resultado gerado por IA deve ser **obrigatoriamente validado por um ser humano**.
4. **Transparência Acadêmica e Não-Coautoria:** A IA não possui autoria nem coautoria em produções acadêmicas. O uso de IA deve ser declarado expressamente, sob pena de caracterização de má conduta acadêmica.
5. **Filosofia *Local-First* e Governança:** O portal opera sob o princípio *Zero-Backend*, sem banco de dados intermediário, sem coleta ou retenção de prompts ou dados de usuários.

---

## 🚀 Funcionalidades do Portal em Produção

### 1. 4 Abas Temáticas Homologadas (Navegação em Fichário)
- 🛠️ **Aplicações com IA:** Ferramentas desenvolvidas para automação de processos, auditoria, conformidade LGPD e apoio administrativo (Guardião LGPD, sez.iO, LaRDiC, Form2RIPD, Mapeamento de Dados, SIADS, RSC-TAE, etc.), além do **Questionário de Maturidade de IA no IFSC** (`/form`, exclusivo para contas `@ifsc.edu.br` e `@aluno.ifsc.edu.br`).
- 🎓 **Google for Education (Workspace IFSC):** Recursos de IA integrados com suporte institucional e garantia contratual de não-treinamento sob login `@ifsc.edu.br` e `@aluno.ifsc.edu.br` (AI Studio, Gemini, NotebookLM, Colab com GPU T4, Jules, Antigravity, Opal, Pomelli, Stitch).
- 💼 **Microsoft 365 Education (A1):** Copilot Web, Office Web, Teams, OneDrive (**100 GB por usuário**, conforme política global da Microsoft de 2024), Power BI e guia de autocadastro institucional.
- 🤝 **Parcerias Oficiais para Estudantes e Servidores:** Hub de ferramentas de ponta com planos educacionais e gratuidades verificadas por e-mail institucional (`@aluno.ifsc.edu.br` ou `@ifsc.edu.br`):
  - **Google AI Pro (Gemini Advanced):** Gemini Pro, Veo, Flow, Whisk, NotebookLM expandido e 2 TB de armazenamento.
  - **Microsoft Copilot:** Assistente de IA integrado ao MS365 na licença educacional A1.
  - **Canva para Educação (Canva Pro):** Acesso a Magic Write e Magic Media para discentes e docentes.
  - **GitHub Copilot (Education Pack):** Autocomplete e pair programming inteligente para estudantes e professores.
  - **Notion AI (Plano Plus):** Assistente de redação e organização acadêmica com IA.
  - **Perplexity Pro (Parceria RNP):** Assinatura Pro de busca conversacional com fontes acadêmicas via RNP.
  - **Adobe Creative Cloud & Firefly:** Descontos educacionais superiores a 60% com IA generativa.
  - **Grammarly for Education:** Revisor inteligente de redação, estilo e clareza.

### 2. Rotas Curtas Institucionais, CTA de Topo e Caixas Suspensas (Deep Linking)
- **Botão Institucional de Topo (`Participe da Pesquisa sobre IA no IFSC`):** Posicionado no cabeçalho ao lado de *Diretrizes conforme OT 04/2025* com layout responsivo adaptativo (inline em telas `sm+` e barra dedicada *full-width* em dispositivos móveis `< 640px`) e *progressive enhancement* (`href="./form"` + abertura instantânea do modal SPA).
- **`https://ia.ifsc.edu.br/form`** ([`form/index.html`](form/index.html)): Abre automaticamente a caixa suspensa (*modal*) concisa do **Questionário de Maturidade de IA no IFSC** na paleta verde institucional do IFSC (`#32a041` / `emerald`), informando de forma objetiva a obrigatoriedade de autenticação com conta **`@ifsc.edu.br` (servidores) ou `@aluno.ifsc.edu.br` (estudantes)** para responder no Google Forms.
- **`https://ia.ifsc.edu.br/ripd`** ([`ripd/index.html`](ripd/index.html)): Abre a caixa suspensa institucional da ferramenta **IFSC-DTIC-CGD: Form2RIPD** (Gerador de Relatórios de Impacto à Proteção de Dados — LGPD), anteriormente associada por busca parcial ao termo `form`.
- **`https://ia.ifsc.edu.br/termo/`** ([`termo/index.html`](termo/index.html)): Aplicação 100% client-side (Vue 3 + html2pdf) para emissão de termos de consentimento LGPD e ECA Digital em PDF, sem transmissão de dados para servidores externos.
- Suporte integral via [`404.html`](404.html) e [`router.js`](assets/js/modules/router.js) a links diretos para ferramentas (`ia.ifsc.edu.br/?app=guardiao`) e abas (`ia.ifsc.edu.br/?tab=partnerships`) no GitHub Pages.

### 3. Filtros Unificados, Acessibilidade e Privacidade no Cliente
- **Segmentação por Público-Alvo:** Filtros em linha única para `Todos`, `Servidores`, `Alunos` e `Comunidade`, combinados com filtros por área temática e favoritos locais (`localStorage`).
- **Proteção Anti-Scraping de E-mails com JS/Base64:** Todos os e-mails institucionais exibidos no portal são ofuscados no HTML estático e reconstruídos dinamicamente apenas durante a interação do navegador (`js-safe-email`).

---

## 📦 Histórico Evolutivo: Descontinuação das Gems e Branch de Arquivo (`Skills`)

Em alinhamento às mudanças de plataforma anunciadas pela Google referentes à **descontinuação das Gems no ecossistema Gemini**, a coordenação técnica (**FLM** — DTIC/CGD) removeu completamente da produção (`GitHubPage` e `main`) o menu **Agentes Especialistas (Gems)** (`#tab-experts`, rotas `/gem/*` e catálogo ativo de `agents.json`).

- **Preservação Integral em Branch Separada:** Todo o código-fonte, interface, roteamento e definições dos agentes especialistas originais (SiBI, Silv.IA Compras/SIPAC, DGP e CGD Governança de TI) foram integralmente preservados na branch dedicada **`archive/agentes-especialistas-gems`** no repositório oficial (`IFSC-DTIC/ia.ifsc.edu.br`).
- **Roadmap Futuro (`Skills`):** Os fluxos de conhecimento especializado que operavam sobre *Gems* encontram evolução arquitetural no paradigma moderno de **Skills** (pacotes estruturados de instruções, referências e automações reutilizáveis por agentes de IA). Caso a instituição homologue futuramente um catálogo oficial de **Skills Institucionais do IFSC**, a branch `archive/agentes-especialistas-gems` servirá como linha de base documental e funcional para a migração.

---

## 🔒 Auditoria de Segurança, Riscos e Melhores Práticas

| Critério | Status | Implementação |
| :--- | :---: | :--- |
| **Zero Secrets / API Keys** | ✅ Conforme | Nenhuma credencial ou token privado está versionado no repositório. Uso estrito de BYOK (*Bring Your Own Key*) quando aplicável. |
| **Zero PII em Repositório Público** | ✅ Conforme | Nenhum dado pessoal (nomes civis, CPFs, e-mails privados, telefones ou caminhos locais) consta nos códigos ou documentações públicas; referências técnicas utilizam exclusivamente a sigla institucional **`FLM`**. |
| **Proteção contra Spam** | ✅ Conforme | E-mails institucionais protegidos por codificação Base64 e hidratados via JavaScript no cliente (`js-safe-email`). |
| **Content Security Policy (CSP)** | ✅ Ativo | Meta tags restritivas (`object-src 'none'; base-uri 'self'`) em `index.html`, `404.html`, `form/index.html`, `ripd/index.html` e `termo/index.html`. |
| **Cabeçalhos de Segurança Client-Side** | ✅ Ativo | `Referrer-Policy: strict-origin-when-cross-origin` e `X-Content-Type-Options: nosniff` ativos em todas as páginas HTML. |
| **Sanitização contra XSS e URLs** | ✅ Conforme | Renderização dinâmica protegida com `escapeHtml()`, `textContent` e validação estrita de protocolo `sanitizeUrl()` em `ui.js`, `app.js` e `404.html`. |
| **Links Externos Seguros** | ✅ Conforme | Todas as âncoras para sistemas de terceiros utilizam `target="_blank"` e `rel="noopener noreferrer"`. |
| **Anonimização de Telemetria** | ✅ Conforme | Google Analytics 4 com `anonymize_ip: true` e flags de personalização desligadas; Microsoft Clarity com máscara para conformidade LGPD. |
| **Hospedagem Estática Segura** | ✅ Conforme | Publicação estática via GitHub Pages (branch `GitHubPage`, espelhada em `main`) com `.nojekyll`, eliminando superfície de ataque de servidor. |

---

## 📊 Observabilidade, Telemetria Ética & SEO

- **Google Analytics 4 (GA4):**
  - **ID de Medição:** `G-T49JX2YJMT` (`anonymize_ip: true`, `allow_google_signals: false`, `allow_ad_personalization_signals: false`).
  - **Eventos Homologados:** Cliques em ferramentas (`app_click`), CTA da Pesquisa de IA no topo (`survey_cta_click`), alternância de abas (`tab_view`), buscas realizadas (`search`), cliques na OT 04/2025 (`ot04_document_access`) e filtros de público (`filter_audience_change`).
- **Microsoft Clarity:** ID `wddq8jjbkx` com mascaramento nativo para conformidade LGPD.
- **SEO & Indexação:**
  - **`robots.txt` & `sitemap.xml`:** Atualizados para refletir as 4 abas ativas em produção e as rotas canônicas `/form`, `/ripd` e `/termo/`.
  - **Open Graph, Twitter Cards & Schema.org (JSON-LD):** Metadados estruturados de `WebSite` e `GovernmentService` vinculando formalmente o portal à DTIC/CGD e ao IFSC.

---

## 📁 Estrutura do Repositório (Produção: `GitHubPage` / `main`)

```text
├── index.html                   # Portal principal (4 abas ativas, filtros unificados, modais OT 04 e apps)
├── 404.html                     # Roteador SPA e deep-linking resiliente para GitHub Pages
├── apps.json                    # Catálogo JSON das Aplicações com IA e Diagnóstico Institucional (/form, /ripd)
├── partnerships.json            # Catálogo JSON das Parcerias Oficiais para Estudantes e Servidores
├── agents.json                  # Array vazio em produção (módulo Gems arquivado em archive/agentes-especialistas-gems)
├── form/
│   └── index.html               # Rota curta oficial https://ia.ifsc.edu.br/form (Questionário de Maturidade de IA)
├── ripd/
│   └── index.html               # Rota curta oficial https://ia.ifsc.edu.br/ripd (Form2RIPD - LGPD)
├── termo/
│   └── index.html               # Gerador client-side de Termos de Consentimento (LGPD / ECA Digital)
├── assets/
│   ├── css/
│   │   └── portal.css           # Estilos e customizações do design system do IFSC
│   └── js/
│       ├── app.js               # Ponto de entrada modular do frontend
│       ├── data/
│       │   └── catalog.js       # Fonte de dados local-first com fallback resiliente
│       └── modules/
│           ├── analytics.js     # Módulo de telemetria ética (GA4 e Clarity)
│           ├── router.js        # Gerenciamento de rotas, sinonímias e deep-linking
│           └── ui.js            # Renderização de componentes, modais de domínio, acessibilidade e temas
├── public/                      # Espelho estático de ativos e ícones institucionais do Manual da Marca IFSC
├── robots.txt                   # Regras de rastreamento e indexação otimizadas
├── sitemap.xml                  # Mapa XML canônico do portal
├── CNAME                        # Domínio canônico de produção (ia.ifsc.edu.br)
└── .nojekyll                    # Instrução para GitHub Pages servir arquivos estáticos diretamente
```

---

## 💻 Desenvolvimento Local e Deploy

1. Clone o repositório (branch de produção `GitHubPage`):
   ```bash
   git clone -b GitHubPage https://github.com/IFSC-DTIC/ia.ifsc.edu.br.git
   cd ia.ifsc.edu.br
   ```
2. Inicie um servidor HTTP estático:
   ```bash
   python3 -m http.server 8080
   ```
3. Acesse `http://localhost:8080/` (ou `http://localhost:8080/form` e `http://localhost:8080/ripd`).

> **Nota de Deploy:** O GitHub Pages deste repositório publica diretamente a partir da branch **`GitHubPage`**. Toda atualização validada deve ser aplicada em **`GitHubPage`** e mantida sincronizada em **`main`**.

---

## 🤝 Como Contribuir (Governança de Dados)

Conforme as diretrizes de governança da DTIC/CGD (**FLM**), **não altere a estrutura do HTML diretamente** para cadastrar ferramentas:

1. Faça um Fork deste repositório.
2. Edite os arquivos JSON correspondentes (mantendo paridade com `public/` e `catalog.js` quando aplicável):
   - Aplicações e formulários institucionais: [`apps.json`](apps.json)
   - Benefícios e parcerias educacionais: [`partnerships.json`](partnerships.json)
3. Garanta estrita conformidade com a Orientação Técnica nº 04/2025 e ausência absoluta de dados pessoais (PII) nos commits.
4. Abra um Pull Request para validação da equipe técnica da DTIC/CGD.

---

## 📄 Licença

Distribuído sob licença de software livre e aberto para a comunidade do Instituto Federal de Educação, Ciência e Tecnologia de Santa Catarina (IFSC).