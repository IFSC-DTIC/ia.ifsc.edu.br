/**
 * Aplicacao Principal do Portal de IA e Aplicacoes - IFSC
 * Inicializacao e Orquestracao Modular
 */

import { loadCatalog } from './data/catalog.js';
import { UIController, initAntiSpamEmails } from './modules/ui.js';
import { AppRouter } from './modules/router.js';
import { Analytics } from './modules/analytics.js';

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

    // Modal Orientacao Tecnica n. 04/2025
    const ot04Modal = document.getElementById('ot04-modal');
    const ot04ModalContent = document.getElementById('ot04-modal-content');
    const closeOt04ModalBtn = document.getElementById('close-ot04-modal-btn');
    const ot04ModalBackdrop = document.getElementById('ot04-modal-backdrop');

    window.openOt04Modal = () => {
      if (!ot04Modal) return;
      ot04Modal.classList.remove('pointer-events-none');
      ot04Modal.classList.add('opacity-100');
      if (ot04ModalContent) {
        ot04ModalContent.classList.remove('scale-95');
        ot04ModalContent.classList.add('scale-100');
      }
      Analytics.trackOt04Access();
    };

    window.closeOt04Modal = () => {
      if (!ot04Modal) return;
      ot04Modal.classList.remove('opacity-100');
      if (ot04ModalContent) {
        ot04ModalContent.classList.remove('scale-100');
        ot04ModalContent.classList.add('scale-95');
      }
      setTimeout(() => {
        ot04Modal.classList.add('pointer-events-none');
      }, 200);
    };

    if (closeOt04ModalBtn) closeOt04ModalBtn.addEventListener('click', window.closeOt04Modal);
    if (ot04ModalBackdrop) ot04ModalBackdrop.addEventListener('click', window.closeOt04Modal);

    // Modal Office 365 Educacao
    const msInfoModal = document.getElementById('ms-info-modal');
    const msInfoModalContent = document.getElementById('ms-info-modal-content');
    const closeMsInfoModalBtn = document.getElementById('close-ms-info-modal-btn');
    const msInfoModalBackdrop = document.getElementById('ms-info-modal-backdrop');

    window.openMsInfoModal = () => {
      if (!msInfoModal) return;
      msInfoModal.classList.remove('pointer-events-none');
      msInfoModal.classList.add('opacity-100');
      if (msInfoModalContent) {
        msInfoModalContent.classList.remove('scale-95');
        msInfoModalContent.classList.add('scale-100');
      }
    };

    const closeMsInfoModal = () => {
      if (!msInfoModal) return;
      msInfoModal.classList.remove('opacity-100');
      if (msInfoModalContent) {
        msInfoModalContent.classList.remove('scale-100');
        msInfoModalContent.classList.add('scale-95');
      }
      setTimeout(() => {
        msInfoModal.classList.add('pointer-events-none');
      }, 200);
    };

    if (closeMsInfoModalBtn) closeMsInfoModalBtn.addEventListener('click', closeMsInfoModal);
    if (msInfoModalBackdrop) msInfoModalBackdrop.addEventListener('click', closeMsInfoModal);

    // Fechamento de modais
    if (ui.closeModalBtn) ui.closeModalBtn.addEventListener('click', () => ui.closeModal());
    if (ui.modalBackdrop) ui.modalBackdrop.addEventListener('click', () => ui.closeModal());

    // Tecla ESC para fechar modais
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ui.closeModal();
        closeMsInfoModal();
        window.closeOt04Modal();
      }
    });

    // Copiar link do modal
    if (ui.modalShareBtn) {
      ui.modalShareBtn.addEventListener('click', () => {
        if (!ui.currentModalApp) return;
        const shareUrl = ui.currentModalApp.shortRoute
          ? `${window.location.origin}${ui.currentModalApp.shortRoute}`
          : `${window.location.origin}/?app=${encodeURIComponent(ui.currentModalApp.id)}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          ui.shareBtnText.textContent = 'Copiado!';
          setTimeout(() => { ui.shareBtnText.textContent = 'Copiar Link'; }, 2000);
        });
      });
    }

    // Eventos de abas
    if (ui.tabToolsBtn) ui.tabToolsBtn.addEventListener('click', () => ui.switchTab('tools'));
    if (ui.tabGoogleBtn) ui.tabGoogleBtn.addEventListener('click', () => ui.switchTab('google'));
    if (ui.tabMicrosoftBtn) ui.tabMicrosoftBtn.addEventListener('click', () => ui.switchTab('microsoft'));
    if (ui.tabPartnershipsBtn) ui.tabPartnershipsBtn.addEventListener('click', () => ui.switchTab('partnerships'));

    // Manipulacao de busca
    const handleSearch = (val) => {
      ui.searchQuery = val;
      if (ui.searchDesktop) ui.searchDesktop.value = val;
      if (ui.searchMobile) ui.searchMobile.value = val;

      if (val) {
        if (ui.clearSearchDesktop) ui.clearSearchDesktop.classList.remove('hidden');
        if (ui.clearSearchMobile) ui.clearSearchMobile.classList.remove('hidden');
      } else {
        if (ui.clearSearchDesktop) ui.clearSearchDesktop.classList.add('hidden');
        if (ui.clearSearchMobile) ui.clearSearchMobile.classList.add('hidden');
      }

      ui.renderView();
    };

    if (ui.searchDesktop) ui.searchDesktop.addEventListener('input', (e) => handleSearch(e.target.value));
    if (ui.searchMobile) ui.searchMobile.addEventListener('input', (e) => handleSearch(e.target.value));

    if (ui.clearSearchDesktop) {
      ui.clearSearchDesktop.addEventListener('click', () => {
        handleSearch('');
        ui.searchDesktop.focus();
      });
    }
    if (ui.clearSearchMobile) {
      ui.clearSearchMobile.addEventListener('click', () => {
        handleSearch('');
        ui.searchMobile.focus();
      });
    }

    if (ui.clearFiltersBtn) {
      ui.clearFiltersBtn.addEventListener('click', () => {
        handleSearch('');
        ui.clearFilters();
      });
    }

    // Atualiza contadores e renderizacao inicial
    ui.updateCounters();
    ui.renderFilterButtons();
    ui.renderView();

    // Inicializa resolucao de rotas
    router.init();
  } catch (err) {
    console.error('Falha critica ao inicializar o Portal IFSC:', err);
    const grid = document.getElementById('apps-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="col-span-full p-8 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-red-200 dark:border-red-900/50">
          <p class="text-red-600 dark:text-red-400 font-semibold mb-2">Erro ao inicializar visualizacao</p>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">${err.message || err}</p>
          <button onclick="window.location.reload()" class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium">Recarregar Pagina</button>
        </div>
      `;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
