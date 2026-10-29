# 🏛️ Arquitetura, Branches e Governança Multi-Agentes (`ia.ifsc.edu.br`)

Este documento define a arquitetura estática do Portal de IA do IFSC, a governança de branches em produção, o roteamento institucional e as **Regras de Engajamento para Agentes Autônomos e Mantenedores** (coordenação técnica: **FLM** — DTIC/CGD).

---

## 1. Arquitetura do Sistema (Local-First e Zero-Backend)

O portal opera sob a filosofia **Zero-Backend (Vanilla ES6 Modules)**. Hospedado no *GitHub Pages*, não possui servidor de aplicação intermediário nem banco de dados centralizado, atuando como um **hub institucional de diretrizes, diagnóstico e redirecionamento qualificado** com avisos explícitos de conformidade (OT nº 04/2025, LGPD e ECA Digital).

- **Linguagens Core:** HTML5, CSS3 e JavaScript ES6+ modular (`assets/js/`).
- **Estilização:** Tailwind CSS (via CDN) + tokens oficiais do Manual da Marca IFSC e Barra Institucional `gov.br/ds`.
- **Domínio de Produção:** `https://ia.ifsc.edu.br` (com redirecionamento permanente a partir do domínio legado `apps.ifsc.edu.br`).
- **Armazenamento de Estado:** Exclusivamente `localStorage` no navegador do usuário (tema claro/escuro e favoritos).
- **Fontes de Dados Ativas em Produção:**
  - `apps.json` (e espelho `public/apps.json`): Aplicações institucionais com IA e formulários oficiais do IFSC.
  - `partnerships.json` (e espelho `public/partnerships.json`): Parcerias educacionais e gratuidades verificadas.
  - Fallback resiliente *offline-first* embutido em `assets/js/data/catalog.js`.

---

## 2. Governança de Branches e Ciclo de Vida de Módulos

| Branch | Papel Institucional | Status |
| :--- | :--- | :---: |
| **`GitHubPage`** | **Branch oficial de publicação (Deploy Live no GitHub Pages)** que responde por `https://ia.ifsc.edu.br`. | 🟢 Produção |
| **`main`** | Branch padrão do repositório Git, mantida sincronizada com `GitHubPage`. | 🟢 Sincronizada |
| **`archive/agentes-especialistas-gems`** | **Snapshot histórico integral** contendo o menu *Agentes Especialistas (Gems)* (`#tab-experts`, `agents.json` e fluxos Gemini Gems) antes de sua remoção da produção devido à descontinuação das Gems pela Google. Preservada como referência para eventual migração futura para **Skills**. | 📦 Arquivada |

> **Regra Crítica de Deploy:** Qualquer alteração destinada ao ar em `https://ia.ifsc.edu.br` **deve obrigatoriamente ser publicada na branch `GitHubPage`** (e espelhada em `main`). Commits realizados apenas localmente ou apenas em outras branches não disparam atualização do GitHub Pages.

---

## 3. Roteamento Institucional e Caixas Suspensas (`Modal Deep Linking`)

Em hospedagem estática no GitHub Pages, o portal combina **entrypoints estáticos dedicados (HTTP 200 + SEO/OpenGraph)** com o roteador SPA (`assets/js/modules/router.js` e fallback `404.html`):

1. **`/form` (`form/index.html` ➔ `/?app=form&tab=tools`) e CTA de Topo (`#header-survey-btn`):**
   - Acionável diretamente pelo botão **Participe da Pesquisa sobre IA no IFSC** no cabeçalho (ao lado de *Diretrizes conforme OT 04/2025*, com layout responsivo mobile/desktop e *progressive enhancement*) ou pela rota curta `/form`.
   - Abre a caixa suspensa (*modal*) concisa do **Questionário de Maturidade de IA no IFSC** (`id: "form"` em `apps.json`, `access_scope: "exclusivo_ifsc_form"`), padronizada na identidade visual verde institucional (`#32a041` / `emerald`) como as demais aplicações homologadas, destacando a exigência de conta **`@ifsc.edu.br`** ou **`@aluno.ifsc.edu.br`**.
2. **`/ripd` (`ripd/index.html` ➔ `/?app=ripd&tab=tools`):**
   - Abre a caixa suspensa da aplicação **IFSC-DTIC-CGD: Form2RIPD** (`id: "ripd"` em `apps.json`), dedicada à elaboração de Relatórios de Impacto à Proteção de Dados (LGPD).
3. **`/termo/` (`termo/index.html`):**
   - Aplicação estática autônoma para geração local (PDF) de Termos de Consentimento LGPD / ECA Digital.

---

## 4. Governança Multi-Agentes e Privacidade em Repositório Público

Para garantir estabilidade arquitetural e conformidade jurídica quando agentes de IA (Antigravity, Jules, etc.) ou colaboradores atuarem neste repositório público, as seguintes regras são **invioláveis**:

### A. Anonimização Estrita de Mantenedores (`FLM`) e Zero PII
- Este repositório e o repositório irmão `apps.ifsc.edu.br` são **públicos**.
- **É terminantemente proibido** expor nomes civis pessoais, e-mails particulares, matrículas, telefones ou caminhos locais de diretórios de estação de trabalho em código-fonte, comentários, mensagens de commit ou documentações (`README.md`, `ARQUITETURA.md`, `SEGURANCA.md`).
- Toda referência técnica à coordenação/análise responsável deve utilizar estritamente a sigla **`FLM`** (ou as unidades institucionais **DTIC / CGD — IFSC**).

### B. Sincronização Obrigatória com `GitHubPage`
- Antes de editar qualquer arquivo, verifique o estado mais recente da branch **`GitHubPage`** no GitHub.
- Ao adicionar ou alterar itens de catálogo em `apps.json` ou `partnerships.json`, mantenha sincronizados `public/apps.json` e o fallback em `assets/js/data/catalog.js`.

### C. Categorias Oficiais Homologadas (`apps.json`)
- Categorias da aba **Aplicações com IA**: `LGPD`, `Processos`, `Administrativo`, `Gestão de Pessoas`.
- O módulo legado de *Agentes Especialistas (Gems)* permanece desativado em produção e isolado em `archive/agentes-especialistas-gems` até eventual homologação do modelo de **Skills**.

### D. Padrões de Codificação, Cache-Busting e Segurança Client-Side
- **Versionamento de Módulos ES6 (`?v=...`):** Sempre que módulos em `assets/js/` ou `assets/css/` sofrerem alterações estruturais, incrementar o sufixo de *cache-busting* nas importações ES6 (`index.html`, `app.js` e `ui.js`) para evitar *version skew* na CDN do GitHub Pages.
- **Sanitização e Acessibilidade (WCAG 2.1 AA):** Utilizar obrigatoriamente `escapeHtml()`, `textContent` e `sanitizeUrl()` em qualquer dado oriundo de JSON/URL, mantendo suporte a teclado (`tabindex="0"`, `Enter`/`Space`, `Escape`) e atributos `aria-*` em cards e modais.
- **Privacy-by-Design:** Proibido inserir *trackers* não homologados, coletar prompts de usuários, disparar logs de cliente em produção ou versionar chaves de API / arquivos `.env`.
