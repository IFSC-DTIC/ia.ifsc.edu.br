/**
 * Módulo de Interface e Componentes Visuais (UI)
 * Padrões de Acessibilidade (WCAG 2.1 AA) e Manual da Marca IFSC
 */

import { Analytics } from './analytics.js?v=20261029v2';

export const tabsMeta = {
  tools: {
    title: "Aplicações com IA",
    desc: "Automação, diagnóstico de maturidade, conformidade e auditoria institucional no IFSC."
  },
  google: {
    title: "Google AI & Education",
    desc: "Gemini, NotebookLM, AI Studio, Colab e Antigravity homologados para o ecossistema IFSC."
  },
  microsoft: {
    title: "Microsoft 365 Copilot",
    desc: "Office Web e Copilot (Plano A1) via autocadastro com e-mail institucional."
  },
  partnerships: {
    title: "Parcerias Oficiais & Benefícios",
    desc: "Ferramentas premium de IA com gratuidade ou planos educacionais para estudantes e servidores."
  }
};

/**
 * Função global de proteção contra SPAM e scrapers estáticos (GitHub Pages)
 * Reconstrói os e-mails ofuscados em Base64 apenas na execução interativa do navegador.
 */
export function initAntiSpamEmails() {
  document.querySelectorAll('.js-safe-email').forEach(el => {
    try {
      const u = atob(el.dataset.u || '');
      const d = atob(el.dataset.d || '');
      const sub = el.dataset.sub ? `?subject=${encodeURIComponent(el.dataset.sub)}` : '';
      if (!u || !d) return;
      const email = `${u}@${d}`;
      el.textContent = email;
      el.setAttribute('role', 'link');
      el.setAttribute('tabindex', '0');
      const sendEmail = () => {
        window.location.href = `mailto:${email}${sub}`;
      };
      el.onclick = sendEmail;
      el.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sendEmail();
        }
      };
    } catch (e) {
      console.warn('Erro ao decodificar e-mail seguro:', e);
    }
  });
}

export class UIController {
  constructor(catalog) {
    this.catalog = catalog;
    this.currentTab = 'tools';
    this.currentAudience = 'all';  // 'all', 'servidores', 'alunos', 'comunidade'
    this.currentCategory = 'all';  // 'all' ou slug da categoria
    this.currentFilter = 'all';    // 'all' ou 'favs'
    this.searchQuery = '';
    try {
      const parsedFavs = JSON.parse(localStorage.getItem('ifsc_favorites') || '[]');
      this.favorites = Array.isArray(parsedFavs) ? parsedFavs : [];
    } catch (_) {
      this.favorites = [];
    }
    this.currentModalApp = null;

    this.cacheDOMElements();
  }

  cacheDOMElements() {
    this.tabToolsBtn = document.getElementById('tab-tools');
    this.tabGoogleBtn = document.getElementById('tab-google');
    this.tabMicrosoftBtn = document.getElementById('tab-microsoft');
    this.tabPartnershipsBtn = document.getElementById('tab-partnerships');
    this.msAlertBanner = document.getElementById('ms-alert-banner');

    this.filterContainer = document.getElementById('filter-container');
    this.appsGrid = document.getElementById('apps-grid');
    this.noResults = document.getElementById('no-results');
    this.clearFiltersBtn = document.getElementById('clear-filters-btn');
    this.activeCategoryIndicator = document.getElementById('active-category-indicator');

    this.searchDesktop = document.getElementById('quicksearch-desktop');
    this.clearSearchDesktop = document.getElementById('clear-search-desktop');
    this.searchMobile = document.getElementById('quicksearch-mobile');
    this.clearSearchMobile = document.getElementById('clear-search-mobile');

    this.crossTabBanner = document.getElementById('cross-tab-banner');
    this.crossTabPills = document.getElementById('cross-tab-pills');
    this.noResultsTitle = document.getElementById('no-results-title');
    this.noResultsSubtitle = document.getElementById('no-results-subtitle');
    this.noResultsOtherTabs = document.getElementById('no-results-other-tabs');

    // Elementos do Modal
    this.modal = document.getElementById('app-modal');
    this.modalContent = document.getElementById('app-modal-content');
    this.modalBackdrop = document.getElementById('modal-backdrop');
    this.closeModalBtn = document.getElementById('close-modal-btn');
    this.modalShareBtn = document.getElementById('modal-share-btn');
    this.modalOpenAppBtn = document.getElementById('modal-open-app-btn');
    this.shareBtnText = document.getElementById('share-btn-text');
    this.modalMsAlert = document.getElementById('modal-ms-alert');
    this.modalAccessNotice = document.getElementById('modal-access-notice');
  }

  /**
   * Renderiza ícone institucional IFSC exclusivamente para aplicações internas do instituto
   */
  getIfscIconMarkup(iconKey) {
    const icons = {
      pesquisa: `<div class="category-icon bg-gradient-to-br from-[#32a041] to-emerald-700"><i class="bi bi-clipboard2-data-fill text-lg mb-0.5"></i><span>IA IFSC</span></div>`,
      lgpd: `<div class="category-icon bg-gradient-to-br from-emerald-500 to-emerald-700"><i class="bi bi-shield-lock-fill text-lg mb-0.5"></i><span>LGPD</span></div>`,
      bpmn: `<div class="category-icon bg-gradient-to-br from-blue-500 to-indigo-700"><i class="bi bi-diagram-3-fill text-lg mb-0.5"></i><span>PROC</span></div>`,
      siads: `<div class="category-icon bg-gradient-to-br from-amber-500 to-orange-600"><i class="bi bi-box-seam-fill text-lg mb-0.5"></i><span>ADM</span></div>`,
      rsctae: `<div class="category-icon bg-gradient-to-br from-purple-500 to-purple-700"><i class="bi bi-person-badge-fill text-lg mb-0.5"></i><span>GP</span></div>`,
      taes: `<div class="category-icon bg-gradient-to-br from-teal-500 to-teal-700"><i class="bi bi-person-workspace text-lg mb-0.5"></i><span>SERV</span></div>`,
      professores: `<div class="category-icon bg-gradient-to-br from-indigo-500 to-blue-700"><i class="bi bi-mortarboard-fill text-lg mb-0.5"></i><span>PROF</span></div>`,
      alunos: `<div class="category-icon bg-gradient-to-br from-rose-500 to-pink-600"><i class="bi bi-backpack-fill text-lg mb-0.5"></i><span>ALU</span></div>`
    };
    return icons[iconKey] || `<div class="category-icon bg-[#32a041]"><i class="bi bi-grid-fill text-lg mb-0.5"></i><span>IFSC</span></div>`;
  }

  /**
   * Evita a colocação indevida de logotipos ou ícones do IFSC em ferramentas de terceiros
   */
  getBrandOrGenericIconMarkup(app) {
    const isGoogle = app.platform === 'google' || (app.id && app.id.startsWith('g-')) || (app.tags && app.tags.includes('google'));
    const isMicrosoft = app.platform === 'microsoft' || (app.id && app.id.startsWith('ms-')) || (app.tags && app.tags.includes('microsoft'));
    const isPartner = (app.id && (app.id.startsWith('partner-') || app.id.startsWith('p-'))) || app.categorySlug === 'dev-pesquisa' || app.categorySlug === 'design-criatividade' || app.categorySlug === 'escrita-organizacao' || app.categorySlug === 'ia-produtividade';

    if (isGoogle) {
      return `<div class="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google.png" alt="Google" class="w-7 h-7 object-contain" /></div>`;
    }
    if (isMicrosoft) {
      return `<div class="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"><img src="https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/microsoft-office.png" alt="Microsoft" class="w-7 h-7 object-contain" /></div>`;
    }
    if (isPartner) {
      return `<div class="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"><img src="./public/img/partner-fallback.svg" alt="Parceria" class="w-7 h-7 object-contain" /></div>`;
    }

    // Apenas ferramentas institucionais homologadas do próprio IFSC recebem o ícone IFSC
    if (app.iconKey && ['pesquisa', 'lgpd', 'bpmn', 'siads', 'rsctae', 'taes', 'professores', 'alunos'].includes(app.iconKey) && !isPartner) {
      return this.getIfscIconMarkup(app.iconKey);
    }

    return `<div class="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"><i class="bi bi-cpu text-xl text-emerald-600 dark:text-emerald-400"></i></div>`;
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, s => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[s]));
  }

  toggleFavorite(appId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const idx = this.favorites.indexOf(appId);
    if (idx > -1) {
      this.favorites.splice(idx, 1);
    } else {
      this.favorites.push(appId);
    }
    localStorage.setItem('ifsc_favorites', JSON.stringify(this.favorites));
    this.renderFilterButtons();
    this.renderView();
  }

  createCardHTML(app) {
    const isFav = this.favorites.includes(app.id);

    const isGoogle = app.platform === 'google' || (app.id && app.id.startsWith('g-')) || (app.tags && app.tags.includes('google'));
    const isMicrosoft = app.platform === 'microsoft' || (app.id && app.id.startsWith('ms-')) || (app.tags && app.tags.includes('microsoft'));
    const isPartner = (app.id && (app.id.startsWith('partner-') || app.id.startsWith('p-'))) || app.categorySlug === 'dev-pesquisa' || app.categorySlug === 'design-criatividade' || app.categorySlug === 'escrita-organizacao' || app.categorySlug === 'ia-produtividade';
    const fallbackSrc = isGoogle
      ? 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google.png'
      : (isMicrosoft
          ? 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/microsoft-office.png'
          : (isPartner ? './public/img/partner-fallback.svg' : './favicon.svg'));

    const iconMarkup = app.iconUrl
      ? `<div class="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 bg-white dark:bg-gray-800/90 border border-gray-200/90 dark:border-gray-700 shadow-2xs shrink-0 group-hover:scale-105 transition-transform"><img src="${app.iconUrl}" alt="${app.name}" class="w-8 h-8 object-contain" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='${fallbackSrc}';" /></div>`
      : this.getBrandOrGenericIconMarkup(app);

    const badgeText = app.badge || app.categoryName || 'Apoio';

    return `
      <article onclick="window.openAppModal('${app.id}', event)" class="app-card cursor-pointer relative flex flex-col justify-between p-4 bg-white dark:bg-[#121824] border border-gray-200/90 dark:border-gray-800 rounded-2xl shadow-xs hover:shadow-md hover:border-[#32a041] dark:hover:border-[#32a041] transition-all group">
        <div>
          <!-- Linha Superior: Ícone à esquerda com breve descrição (badge) à sua direita, e botão de favorito -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2.5 min-w-0">
              ${iconMarkup}
              <span class="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#247a30] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/70 dark:border-emerald-800/60 truncate">
                ${badgeText}
              </span>
            </div>
            <button type="button" aria-label="Favoritar" onclick="event.stopPropagation(); window.toggleFavorite('${app.id}', event)"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0 ${isFav ? '!text-amber-500' : ''}">
              <i class="bi ${isFav ? 'bi-star-fill' : 'bi-star'} text-sm"></i>
            </button>
          </div>

          <!-- Título Oficial da Aplicação -->
          <h3 class="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-[#32a041] transition-colors">
            ${app.name}
          </h3>

          <!-- Excerto Breve -->
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed font-normal">
            ${app.description}
          </p>

          ${app.opportunity_plan ? `
          <div class="mt-2.5 p-2 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-[11px] text-amber-900 dark:text-amber-200 font-semibold flex items-start gap-1.5 leading-snug">
            <i class="bi bi-gift-fill text-amber-600 dark:text-amber-400 shrink-0 mt-0.5"></i>
            <span class="line-clamp-2">${app.opportunity_plan}</span>
          </div>
          ` : (app.access_scope === 'exclusivo_ifsc_form' ? `
          <div class="mt-2.5 p-2 rounded-xl bg-purple-50/90 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 text-[11px] text-purple-900 dark:text-purple-200 font-semibold flex items-start gap-1.5 leading-snug">
            <i class="bi bi-lock-fill text-purple-600 dark:text-purple-400 shrink-0 mt-0.5"></i>
            <span class="line-clamp-2">Exclusivo: conta @ifsc.edu.br ou @aluno.ifsc.edu.br</span>
          </div>
          ` : '')}
        </div>

        <!-- Rodapé do Card: Ação discreta -->
        <div class="mt-3.5 pt-2.5 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
          <span class="inline-flex items-center gap-1 font-semibold text-[#32a041] dark:text-emerald-400 group-hover:underline">
            <span>Acessar</span>
            <i class="bi bi-arrow-right text-[11px]"></i>
          </span>
          <span class="text-[11px] text-gray-400 dark:text-gray-500 truncate max-w-[130px] font-normal">${app.categoryName || ''}</span>
        </div>
      </article>
    `;
  }

  renderFilterButtons() {
    let categories = [];
    let currentList = [];

    if (this.currentTab === 'tools') {
      categories = this.catalog.toolsCategories || [];
      currentList = this.catalog.allTools || [];
    } else if (this.currentTab === 'google') {
      categories = this.catalog.googleEduCategories || [];
      currentList = this.catalog.allGoogle || [];
    } else if (this.currentTab === 'microsoft') {
      categories = this.catalog.microsoftCategories || [];
      currentList = this.catalog.allMicrosoft || [];
    } else {
      categories = this.catalog.partnershipsCategories || [];
      currentList = this.catalog.allPartnerships || [];
    }

    // Contagem dinâmica por público na aba ativa
    const countAll = currentList.length;
    const countServ = currentList.filter(a => (a.audiences || []).includes('servidores')).length;
    const countAlun = currentList.filter(a => (a.audiences || []).includes('alunos')).length;
    const countComu = currentList.filter(a => (a.audiences || []).includes('comunidade')).length;
    const countFavs = currentList.filter(a => this.favorites.includes(a.id)).length;

    const isFavActive = this.currentFilter === 'favs';

    const activeAudClasses = 'bg-[#32a041] text-white border-[#32a041] shadow-xs font-bold ring-1 ring-[#32a041]';
    const inactiveAudClasses = 'bg-white dark:bg-[#121824] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold shadow-2xs';

    // Linha única unificada e aglutinada (Público + Área)
    let html = `
      <div class="w-full flex items-center flex-wrap gap-1.5 sm:gap-2">
        <!-- Filtros de Público -->
        <div class="flex items-center flex-wrap gap-1 sm:gap-1.5">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-0.5 flex items-center gap-1 shrink-0">
            <i class="bi bi-people-fill text-xs text-[#32a041]"></i>
            <span>Público:</span>
          </span>

          <button type="button" data-audience="all" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${(!isFavActive && this.currentAudience === 'all') ? activeAudClasses : inactiveAudClasses}">
            Todos <span class="opacity-80 text-[10px]">(${countAll})</span>
          </button>

          <button type="button" data-audience="servidores" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${(!isFavActive && this.currentAudience === 'servidores') ? activeAudClasses : inactiveAudClasses}" title="Servidores do IFSC (TAEs e Docentes)">
            <i class="bi bi-person-badge text-[11px]"></i>
            <span>Servidores</span>
            <span class="opacity-80 text-[10px]">(${countServ})</span>
          </button>

          <button type="button" data-audience="alunos" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${(!isFavActive && this.currentAudience === 'alunos') ? activeAudClasses : inactiveAudClasses}" title="Estudantes do IFSC">
            <i class="bi bi-backpack text-[11px]"></i>
            <span>Alunos</span>
            <span class="opacity-80 text-[10px]">(${countAlun})</span>
          </button>

          <button type="button" data-audience="comunidade" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${(!isFavActive && this.currentAudience === 'comunidade') ? activeAudClasses : inactiveAudClasses}" title="Comunidade externa">
            <i class="bi bi-globe2 text-[11px]"></i>
            <span>Comunidade</span>
            <span class="opacity-80 text-[10px]">(${countComu})</span>
          </button>

          <button type="button" data-filter="favs" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${isFavActive ? activeAudClasses : inactiveAudClasses}">
            <i class="bi bi-star-fill text-[10px] ${isFavActive ? 'text-amber-200' : 'text-amber-500'}"></i>
            <span>Favoritos</span>
            <span class="opacity-80 text-[10px]">(${countFavs})</span>
          </button>
        </div>
    `;

    // Divisor sutil e Filtros de Área na mesma linha
    if (categories.length > 1) {
      const activeCatClasses = 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 border-gray-800 dark:border-gray-200 font-bold shadow-2xs';
      const inactiveCatClasses = 'bg-gray-100/90 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-xs font-medium';

      html += `
        <div class="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block shrink-0 mx-0.5"></div>

        <div class="flex items-center flex-wrap gap-1 sm:gap-1.5">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 mr-0.5 flex items-center gap-1 shrink-0">
            <i class="bi bi-tag-fill text-[10px] text-emerald-600 dark:text-emerald-400"></i>
            <span>Área:</span>
          </span>

          <button type="button" data-category="all" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${this.currentCategory === 'all' ? activeCatClasses : inactiveCatClasses}">
            Todas
          </button>
      `;

      categories.forEach(cat => {
        if (!cat) return;
        const isCatActive = this.currentCategory === cat.slug;
        const catCount = Array.isArray(cat.apps) ? cat.apps.length : 0;
        html += `
          <button type="button" data-category="${cat.slug}" class="text-xs py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${isCatActive ? activeCatClasses : inactiveCatClasses}">
            ${cat.name} <span class="opacity-70 text-[10px]">(${catCount})</span>
          </button>
        `;
      });

      html += `</div>`;
    }

    html += `</div>`;

    this.filterContainer.innerHTML = html;
    this.bindFilterEvents();
  }

  bindFilterEvents() {
    // Event listeners para Filtro de Público
    this.filterContainer.querySelectorAll('[data-audience]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const aud = e.currentTarget.getAttribute('data-audience');
        this.currentAudience = aud;
        this.currentFilter = 'all';
        Analytics.trackAudienceFilter(aud);
        this.renderFilterButtons();
        this.renderView();
      });
    });

    // Event listener para Favoritos
    const favBtn = this.filterContainer.querySelector('[data-filter="favs"]');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        this.currentFilter = (this.currentFilter === 'favs') ? 'all' : 'favs';
        this.renderFilterButtons();
        this.renderView();
      });
    }

    // Event listeners para Filtro de Categoria / Área
    this.filterContainer.querySelectorAll('[data-category]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        this.currentCategory = cat;
        this.renderFilterButtons();
        this.renderView();
      });
    });
  }

  checkOtherTabs(query) {
    if (!query) return [];
    const tabs = [
      { key: 'tools', name: 'Ferramentas (Apps)', list: this.catalog.allTools || [] },
      { key: 'google', name: 'Google Education', list: this.catalog.allGoogle || [] },
      { key: 'microsoft', name: 'Microsoft 365 Copilot', list: this.catalog.allMicrosoft || [] },
      { key: 'partnerships', name: 'Parcerias Oficiais (Estudantes)', list: this.catalog.allPartnerships || [] },
    ];
    const found = [];
    tabs.forEach(t => {
      if (t.key === this.currentTab) return;
      const matches = (t.list || []).filter(app => {
        if (!app) return false;
        return (
          (app.name && app.name.toLowerCase().includes(query)) ||
          (app.description && app.description.toLowerCase().includes(query)) ||
          (app.badge && app.badge.toLowerCase().includes(query)) ||
          (app.categoryName && app.categoryName.toLowerCase().includes(query)) ||
          (app.ot04_status && app.ot04_status.toLowerCase().includes(query)) ||
          (Array.isArray(app.tags) && app.tags.some(tag => String(tag).toLowerCase().includes(query)))
        );
      });
      if (matches.length > 0) {
        found.push({ key: t.key, name: t.name, count: matches.length });
      }
    });
    return found;
  }

  renderView() {
    let list = [];
    if (this.currentTab === 'tools') list = this.catalog.allTools || [];
    else if (this.currentTab === 'google') list = this.catalog.allGoogle || [];
    else if (this.currentTab === 'microsoft') list = this.catalog.allMicrosoft || [];
    else list = this.catalog.allPartnerships || [];

    if (this.msAlertBanner) {
      if (this.currentTab === 'microsoft') {
        this.msAlertBanner.classList.remove('hidden');
      } else {
        this.msAlertBanner.classList.add('hidden');
      }
    }

    const q = (this.searchQuery || '').toLowerCase().trim();

    const filtered = list.filter(app => {
      if (!app) return false;
      // 1. Filtro de Favoritos
      if (this.currentFilter === 'favs') {
        if (!this.favorites.includes(app.id)) return false;
      }

      // 2. Filtro por Público (Servidores, Alunos, Comunidade)
      if (this.currentAudience && this.currentAudience !== 'all') {
        if (!(app.audiences || []).includes(this.currentAudience)) return false;
      }

      // 3. Filtro por Categoria / Área
      if (this.currentCategory && this.currentCategory !== 'all') {
        if (app.categorySlug !== this.currentCategory && app.category !== this.currentCategory) return false;
      }

      // 4. Filtro por Busca de Texto
      if (q) {
        const matchesSearch =
          (app.name && app.name.toLowerCase().includes(q)) ||
          (app.description && app.description.toLowerCase().includes(q)) ||
          (app.badge && app.badge.toLowerCase().includes(q)) ||
          (app.categoryName && app.categoryName.toLowerCase().includes(q)) ||
          (app.ot04_status && app.ot04_status.toLowerCase().includes(q)) ||
          (Array.isArray(app.tags) && app.tags.some(t => String(t).toLowerCase().includes(q))) ||
          (q.includes('ot') && (app.ot04_status || (Array.isArray(app.tags) && app.tags.includes('ot04'))));
        if (!matchesSearch) return false;
      }

      return true;
    });

    if (this.activeCategoryIndicator) {
      let parts = [];
      if (this.currentFilter === 'favs') {
        parts.push('Favoritos');
      } else {
        if (this.currentAudience && this.currentAudience !== 'all') {
          const audLabels = { servidores: 'Servidores', alunos: 'Alunos', comunidade: 'Comunidade' };
          parts.push(`Público: ${audLabels[this.currentAudience] || this.currentAudience}`);
        }
        if (this.currentCategory && this.currentCategory !== 'all') {
          parts.push(`Área: ${this.currentCategory}`);
        }
      }
      if (parts.length > 0) {
        this.activeCategoryIndicator.textContent = `Filtros: ${parts.join(' • ')} (${filtered.length})`;
      } else {
        this.activeCategoryIndicator.textContent = `Mostrando todas as ${filtered.length} ferramentas`;
      }
    }

    const otherMatches = q ? this.checkOtherTabs(q) : [];

    if (filtered.length === 0) {
      this.appsGrid.innerHTML = '';
      this.noResults.classList.remove('hidden');
      if (this.crossTabBanner) this.crossTabBanner.classList.add('hidden');

      if (otherMatches.length > 0) {
        if (this.noResultsTitle) this.noResultsTitle.textContent = 'Nenhuma ferramenta encontrada nesta aba';
        if (this.noResultsSubtitle) this.noResultsSubtitle.innerHTML = `Porém, encontramos resultados para "<strong>${this.escapeHtml(q)}</strong>" em outras seções do portal:`;
        if (this.noResultsOtherTabs) {
          this.noResultsOtherTabs.classList.remove('hidden');
          this.noResultsOtherTabs.innerHTML = otherMatches.map(m => `
            <button type="button" onclick="window.switchTab('${m.key}')" class="px-3.5 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 hover:border-[#32a041] dark:hover:border-emerald-400 text-xs font-bold transition-all shadow-xs flex items-center gap-2 hover:scale-102">
              <span>${m.name}</span>
              <span class="bg-[#32a041] text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">${m.count}</span>
            </button>
          `).join('');
        }
      } else {
        if (this.noResultsTitle) this.noResultsTitle.textContent = 'Nenhuma ferramenta encontrada';
        if (this.noResultsSubtitle) this.noResultsSubtitle.textContent = 'Verifique a ortografia ou desmarque os filtros aplicados.';
        if (this.noResultsOtherTabs) this.noResultsOtherTabs.classList.add('hidden');
      }
    } else {
      this.noResults.classList.add('hidden');
      this.appsGrid.innerHTML = filtered.map(app => this.createCardHTML(app)).join('');

      if (otherMatches.length > 0 && this.crossTabBanner && this.crossTabPills) {
        this.crossTabBanner.classList.remove('hidden');
        this.crossTabPills.innerHTML = otherMatches.map(m => `
          <button type="button" onclick="window.switchTab('${m.key}')" class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-100 font-bold transition-all flex items-center gap-1.5">
            <span>${m.name}</span>
            <span class="bg-[#32a041] text-white text-[9px] px-1.5 py-0.2 rounded-full">${m.count}</span>
          </button>
        `).join('');
      } else if (this.crossTabBanner) {
        this.crossTabBanner.classList.add('hidden');
      }
    }

    if (q) {
      Analytics.trackSearch(q, filtered.length);
    }
  }

  switchTab(tab) {
    const validTab = tabsMeta[tab] ? tab : 'tools';
    this.currentTab = validTab;
    this.currentAudience = 'all';
    this.currentCategory = 'all';
    this.currentFilter = 'all';

    const tabs = ['tools', 'google', 'microsoft', 'partnerships'];

    tabs.forEach(key => {
      const btn = document.getElementById(`tab-${key}`);
      const countSpan = document.getElementById(`tab-${key}-count`);
      if (!btn) return;
      const isActive = (key === validTab);

      if (isActive) {
        btn.setAttribute('aria-selected', 'true');
        btn.classList.add('active');
        if (countSpan) {
          countSpan.className = "text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#247a30] dark:text-emerald-300 font-extrabold";
        }
      } else {
        btn.setAttribute('aria-selected', 'false');
        btn.classList.remove('active');
        if (countSpan) {
          countSpan.className = "text-[10px] px-1.5 py-0.2 rounded-full bg-gray-200/80 dark:bg-gray-700/60 text-gray-600 dark:text-gray-400 font-bold";
        }
      }
    });

    const secTitle = document.getElementById('section-title');
    const secDesc = document.getElementById('section-desc');
    if (secTitle && tabsMeta[validTab]) secTitle.textContent = tabsMeta[validTab].title;
    if (secDesc && tabsMeta[validTab]) secDesc.textContent = tabsMeta[validTab].desc;

    Analytics.trackTabSwitch(validTab);
    this.renderFilterButtons();
    this.renderView();
  }

  clearFilters() {
    this.currentAudience = 'all';
    this.currentCategory = 'all';
    this.currentFilter = 'all';
    this.searchQuery = '';
    if (this.searchDesktop) this.searchDesktop.value = '';
    if (this.searchMobile) this.searchMobile.value = '';
    if (this.clearSearchDesktop) this.clearSearchDesktop.classList.add('hidden');
    if (this.clearSearchMobile) this.clearSearchMobile.classList.add('hidden');
    this.renderFilterButtons();
    this.renderView();
  }

  openAppModal(appId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const app = this.catalog.appMap[appId];
    if (!app) return;

    this.currentModalApp = app;

    document.getElementById('modal-app-name').textContent = app.name;
    const modalDescEl = document.getElementById('modal-app-description');
    if (Array.isArray(app.modalSummaryPoints) && app.modalSummaryPoints.length > 0) {
      modalDescEl.innerHTML = `
        <p class="font-medium text-gray-800 dark:text-gray-100 mb-2">${this.escapeHtml(app.description)}</p>
        <ul class="space-y-1.5 text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 list-disc pl-4">
          ${app.modalSummaryPoints.map(pt => `<li>${this.escapeHtml(pt)}</li>`).join('')}
        </ul>
      `;
    } else {
      modalDescEl.textContent = app.description;
    }
    this.modalOpenAppBtn.href = app.url;
    const ctaText = this.escapeHtml(app.ctaLabel || 'Abrir Ferramenta');
    this.modalOpenAppBtn.innerHTML = `<span>${ctaText}</span><i class="bi bi-box-arrow-up-right text-xs"></i>`;

    this.modalOpenAppBtn.onclick = () => {
      Analytics.trackAppClick(app);
    };

    if (app.platform === 'microsoft') {
      this.modalMsAlert.classList.remove('hidden');
    } else {
      this.modalMsAlert.classList.add('hidden');
    }

    // Alerta Dinâmico de Instruções de Domínio & Acesso
    const isInstitutionalForm = app.access_scope === 'exclusivo_ifsc_form' || app.access_scope === 'exclusivo_ifsc';
    const isTool = !isInstitutionalForm && ((this.catalog.allTools || []).some(t => t.id === app.id) || app.access_scope === 'publico_gmail');
    const isGoogle = (this.catalog.allGoogle || []).some(g => g.id === app.id);
    const isMicrosoft = app.platform === 'microsoft' || (this.catalog.allMicrosoft || []).some(m => m.id === app.id);

    if (app.opportunity_plan) {
      this.modalAccessNotice.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 text-left text-xs text-amber-950 dark:text-amber-200 w-full flex items-start gap-3 shadow-2xs">
          <span class="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
            <i class="bi bi-mortarboard-fill"></i>
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <strong class="font-extrabold text-amber-950 dark:text-amber-100 text-xs">Oportunidade para Estudantes</strong>
              <span class="px-2 py-0.2 rounded text-[9px] font-black bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 uppercase tracking-wider">${app.badge || 'Benefício'}</span>
            </div>
            <p class="text-[11px] leading-relaxed text-amber-900 dark:text-amber-200 font-bold">
              ${app.opportunity_plan}
            </p>
            <p class="text-[10px] text-amber-800 dark:text-amber-300 flex items-center gap-1 pt-0.5 font-medium">
              <i class="bi bi-check-circle-fill shrink-0 text-amber-600 dark:text-amber-400"></i>
              <span>${app.domain_requirement || 'Acesso verificado com e-mail escolar institucional'}</span>
            </p>
          </div>
        </div>
      `;
    } else if (isInstitutionalForm) {
      this.modalAccessNotice.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-purple-50/95 dark:bg-purple-950/45 border border-purple-300 dark:border-purple-800/80 text-left text-xs text-purple-950 dark:text-purple-200 w-full flex items-start gap-3 shadow-2xs">
          <span class="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
            <i class="bi bi-shield-lock-fill"></i>
          </span>
          <div class="space-y-1.5">
            <div class="flex items-center gap-1.5 flex-wrap">
              <strong class="font-extrabold text-purple-950 dark:text-purple-100 text-xs">Login Institucional Obrigatório (IFSC)</strong>
              <span class="px-2 py-0.2 rounded text-[9px] font-black bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-100 uppercase tracking-wider">Servidor • Estudante</span>
            </div>
            <p class="text-[11px] leading-relaxed text-purple-900 dark:text-purple-300">
              Para responder ao <strong>Questionário de Maturidade de IA no IFSC</strong> no Google Forms, é necessário estar autenticado no navegador com sua conta institucional oficial:
            </p>
            <ul class="space-y-1 text-[11px] list-disc pl-4 text-purple-950 dark:text-purple-200 font-semibold">
              <li><strong>Servidores (Docentes e TAEs):</strong> <code class="font-mono bg-purple-200/80 dark:bg-purple-900/80 px-1.5 py-0.2 rounded text-purple-950 dark:text-purple-100">@ifsc.edu.br</code></li>
              <li><strong>Estudantes / Alunos:</strong> <code class="font-mono bg-purple-200/80 dark:bg-purple-900/80 px-1.5 py-0.2 rounded text-purple-950 dark:text-purple-100">@aluno.ifsc.edu.br</code></li>
            </ul>
            <p class="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-start gap-1.5 pt-0.5 leading-snug">
              <i class="bi bi-exclamation-triangle-fill shrink-0 mt-0.5"></i>
              <span>Contas pessoais (@gmail.com) não possuem permissão de acesso. Se aparecer aviso de restrição, alterne a conta conectada no Google para o seu e-mail do IFSC.</span>
            </p>
          </div>
        </div>
      `;
    } else if (isTool) {
      this.modalAccessNotice.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 text-left text-xs text-emerald-950 dark:text-emerald-200 w-full flex items-start gap-3 shadow-2xs">
          <span class="w-7 h-7 rounded-xl bg-[#32a041] text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
            <i class="bi bi-globe2"></i>
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <strong class="font-extrabold text-emerald-950 dark:text-emerald-100 text-xs">Aplicação Pública Aberta</strong>
              <span class="px-2 py-0.2 rounded text-[9px] font-black bg-emerald-200 dark:bg-emerald-900 text-[#247a30] dark:text-emerald-200 uppercase tracking-wider">Qualquer Conta</span>
            </div>
            <p class="text-[11px] leading-relaxed text-emerald-900 dark:text-emerald-300">
              Esta ferramenta é <strong>pública</strong> e funciona com <strong>qualquer conta Google (@gmail.com pessoal)</strong>, bem como com contas institucionais do IFSC (<code class="font-mono bg-emerald-200/80 dark:bg-emerald-900/80 px-1 py-0.2 rounded text-emerald-950 dark:text-emerald-100">@ifsc.edu.br</code> ou <code class="font-mono bg-emerald-200/80 dark:bg-emerald-900/80 px-1 py-0.2 rounded text-emerald-950 dark:text-emerald-100">@aluno.ifsc.edu.br</code>).
            </p>
            <p class="text-[10px] font-medium text-emerald-800 dark:text-emerald-400 flex items-center gap-1 pt-0.5">
              <i class="bi bi-shield-check shrink-0"></i>
              <span>Diretriz OT 04/2025: Proibida inserção de dados sensíveis; respostas exigem validação humana.</span>
            </p>
          </div>
        </div>
      `;
    } else if (isGoogle) {
      this.modalAccessNotice.innerHTML = `
        <div class="p-3.5 rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/70 text-left text-xs text-blue-950 dark:text-blue-200 w-full flex items-start gap-3 shadow-2xs">
          <span class="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
            <i class="bi bi-google"></i>
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <strong class="font-extrabold text-blue-950 dark:text-blue-100 text-xs">Google for Education / Labs</strong>
              <span class="px-2 py-0.2 rounded text-[9px] font-black bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 uppercase tracking-wider">Acesso Amplo</span>
            </div>
            <p class="text-[11px] leading-relaxed text-blue-900 dark:text-blue-300">
              Disponível tanto para contas pessoais (<code class="font-mono bg-blue-200/80 dark:bg-blue-900/80 px-1 py-0.2 rounded text-blue-950 dark:text-blue-100">@gmail.com</code>) quanto institucionais (<code class="font-mono bg-blue-200/80 dark:bg-blue-900/80 px-1 py-0.2 rounded text-blue-950 dark:text-blue-100">@ifsc.edu.br</code>). O uso do e-mail do IFSC garante proteção contratual contra o treinamento de modelos externos.
            </p>
          </div>
        </div>
      `;
    } else {
      this.modalAccessNotice.innerHTML = '';
    }

    const isPartner = (app.id && (app.id.startsWith('partner-') || app.id.startsWith('p-'))) || app.categorySlug === 'dev-pesquisa' || app.categorySlug === 'design-criatividade' || app.categorySlug === 'escrita-organizacao' || app.categorySlug === 'ia-produtividade';
    const modalFallbackSrc = isGoogle
      ? 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google.png'
      : (isMicrosoft
          ? 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/microsoft-office.png'
          : (isPartner ? './public/img/partner-fallback.svg' : './favicon.svg'));

    const iconContainer = document.getElementById('modal-icon-container');
    if (app.iconUrl) {
      iconContainer.innerHTML = `
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <img src="${app.iconUrl}" alt="${app.name}" class="w-10 h-10 object-contain" onerror="this.onerror=null; this.src='${modalFallbackSrc}';" />
        </div>
      `;
    } else {
      iconContainer.innerHTML = this.getBrandOrGenericIconMarkup(app);
    }

    let modalDomainBadge = '';
    if (isInstitutionalForm) {
      modalDomainBadge = `<span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-800"><i class="bi bi-lock-fill text-[10px] mr-1"></i>Exclusivo @ifsc / @aluno</span>`;
    } else if (isTool) {
      modalDomainBadge = `<span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800"><i class="bi bi-globe2 text-[10px] mr-1"></i>Público (@gmail.com)</span>`;
    } else if (isGoogle) {
      modalDomainBadge = `<span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800"><i class="bi bi-google text-[10px] mr-1"></i>@gmail / @ifsc</span>`;
    } else if (isMicrosoft) {
      modalDomainBadge = `<span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800"><i class="bi bi-key-fill text-[10px] mr-1"></i>Plano A1 IFSC</span>`;
    }

    document.getElementById('modal-badge-container').innerHTML = `
      <span class="inline-block px-2.5 py-0.5 text-xs font-bold rounded-full text-[#247a30] dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
        ${app.badge || app.categoryName}
      </span>
      ${modalDomainBadge}
    `;

    this.shareBtnText.textContent = 'Copiar Link';

    this.modal.classList.remove('pointer-events-none');
    this.modal.classList.add('opacity-100');
    this.modalContent.classList.remove('scale-95');
    this.modalContent.classList.add('scale-100');
  }

  closeModal() {
    this.modal.classList.remove('opacity-100');
    this.modalContent.classList.remove('scale-100');
    this.modalContent.classList.add('scale-95');
    setTimeout(() => {
      this.modal.classList.add('pointer-events-none');
    }, 200);
  }

  copyPortalAppLink(appId, event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const appObj = this.catalog.appMap && this.catalog.appMap[appId];
    const shareUrl = (appObj && appObj.shortRoute)
      ? `${window.location.origin}${appObj.shortRoute}`
      : `${window.location.origin}/?app=${encodeURIComponent(appId)}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      const btn = event?.currentTarget;
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = `<i class="bi bi-check text-green-500 text-sm"></i><span class="text-green-500 font-bold">Copiado!</span>`;
        setTimeout(() => { btn.innerHTML = original; }, 1500);
      }
    });
  }

  updateCounters() {
    const tCount = document.getElementById('tab-tools-count');
    const gCount = document.getElementById('tab-google-count');
    const mCount = document.getElementById('tab-microsoft-count');
    const pCount = document.getElementById('tab-partnerships-count');
    if (tCount) tCount.textContent = (this.catalog.allTools || []).length;
    if (gCount) gCount.textContent = (this.catalog.allGoogle || []).length;
    if (mCount) mCount.textContent = (this.catalog.allMicrosoft || []).length;
    if (pCount) pCount.textContent = (this.catalog.allPartnerships || []).length;
  }
}