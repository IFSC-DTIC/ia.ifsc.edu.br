/**
 * Aplicacao Principal do Portal de IA e Aplicacoes - IFSC
 * Inicializacao e Orquestracao Modular
 */

import { loadCatalog } from './data/catalog.js?v=20261029v4';
import { UIController, initAntiSpamEmails } from './modules/ui.js?v=20261029v4';
import { AppRouter } from './modules/router.js?v=20261029v4';
import { Analytics } from './modules/analytics.js?v=20261029v4';

async function initApp() {
  try {
    // Inicializa protecao de e-mails contra spam (GitHub Pages)
    initAntiSpamEmails();
    // Ano dinamico no rodape
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Alternador de Tema Escuro / Claro
    if (typeof window.updateThemeUI === 'function') {
      window.updateThemeUI();
    }

    // Carrega catalogo unificado com cache-busting
    const catalog = await loadCatalog();

    // Inicializa Controller de UI
    const ui = new UIController(catalog);

    // Inicializa Roteador SPA
    const router = new AppRouter(catalog, ui);

    // Exporta metodos globais necessarios para eventos inline (onclick)
    window.ui = ui;
    window.router = router;
    window.Analytics = Analytics;
    window.openAppModal = (appId, event) => ui.openAppModal(appId, event);
    window.switchTab = (tab) => ui.switchTab(tab);
    window.toggleFavorite = (appId, event) => ui.toggleFavorite(appId, event);
    window.copyPortalAppLink = (appId, event) => ui.copyPortalAppLink(appId, event);
    window.trackOt04Access = () => Analytics.trackOt04Access();
    window.openSurveyModal = (event, source = 'header') => {
      Analytics.trackSurveyCtaClick(source);
      ui.openAppModal('form', event);
    };

    // Botao Institucional da Pesquisa sobre IA no IFSC (Progressive Enhancement)
    const bindSurveyCta = (el, source) => {
      if (!el) return;
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.openSurveyModal(e, source);
      });
    };
    bindSurveyCta(document.getElementById('header-survey-btn'), 'header');
    bindSurveyCta(document.getElementById('mobile-survey-btn'), 'mobile_drawer');

    // Inicializa escuta de eventos na UI
    ui.initEventListeners();

    // Renderiza a primeira aba
    ui.render();

    // Inicializa roteamento por URL (?tab=...&app=...)
    router.init();

    // Inicializa atalhos de teclado (Ctrl+K, Esc, '/')
    initKeyboardShortcuts(ui);

    // Oculta skeletons de carregamento inicial
    const skeleton = document.getElementById('loading-skeleton');
    if (skeleton) skeleton.classList.add('hidden');

    console.info('Portal de IA do IFSC inicializado com sucesso.');
  } catch (err) {
    console.error('Falha critica ao inicializar o Portal de IA:', err);
    showInitializationError(err);
  }
}

/**
 * Atalhos globais de teclado
 */
function initKeyboardShortcuts(ui) {
  document.addEventListener('keydown', (e) => {
    // Esc: fecha modal aberto
    if (e.key === 'Escape') {
      const modal = document.getElementById('app-modal');
      if (modal && !modal.classList.contains('hidden')) {
        ui.closeAppModal();
      }
    }

    // Ctrl+K ou Cmd+K ou '/': foca na barra de busca
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      focusSearchInput();
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      focusSearchInput();
    }
  });
}

function focusSearchInput() {
  const desktopSearch = document.getElementById('quicksearch-desktop');
  const mobileSearch = document.getElementById('quicksearch-mobile');
  if (window.innerWidth >= 768 && desktopSearch) {
    desktopSearch.focus();
    desktopSearch.select();
  } else if (mobileSearch) {
    mobileSearch.focus();
    mobileSearch.select();
  }
}

/**
 * Exibe tela de erro amigavel com opcao de recarregar
 */
function showInitializationError(err) {
  const grid = document.getElementById('apps-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="col-span-full p-8 text-center bg-white dark:bg-gray-800 rounded-2xl border border-red-200 dark:border-red-900 shadow-sm max-w-lg mx-auto">
        <i class="bi bi-exclamation-triangle-fill text-red-500 text-3xl mb-3 block"></i>
        <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2">Erro ao inicializar visualização</h3>
        <p class="text-xs text-gray-600 dark:text-gray-400 mb-4">${escapeHtml(err?.message || 'Falha ao carregar catálogo.')}</p>
        <button onclick="window.location.reload()" class="px-4 py-2 bg-[#32a041] hover:bg-[#247a30] text-white font-bold rounded-xl text-xs transition-colors shadow-xs">
          Recarregar Página
        </button>
      </div>
    `;
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
