/**
 * Aplicacao Principal do Portal de IA e Aplicacoes - IFSC
 * Inicializacao e Orquestracao Modular
 */

import { loadCatalog } from './data/catalog.js?v=20261030v1';
import { UIController, initAntiSpamEmails, FocusTrap } from './modules/ui.js?v=20261030v1';
import { AppRouter } from './modules/router.js?v=20261030v1';
import { Analytics } from './modules/analytics.js?v=20261030v1';

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
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          Analytics.trackSurveyCtaClick(source);
          ui.openAppModal('form', e);
        } else {
          Analytics.trackSurveyCtaClick(source);
        }
      });
    };
    bindSurveyCta(document.getElementById('header-survey-btn'), 'header_desktop');
    bindSurveyCta(document.getElementById('header-survey-btn-mobile'), 'header_mobile');

    // Modal Orientacao Tecnica n. 04/2025
    const ot04Modal = document.getElementById('ot04-modal');
    const ot04ModalContent = document.getElementById('ot04-modal-content');
    const closeOt04ModalBtn = document.getElementById('close-ot04-modal-btn');
    const ot04ModalBackdrop = document.getElementById('ot04-modal-backdrop');
    const ot04Trap = new FocusTrap(ot04Modal, () => window.closeOt04Modal());

    window.openOt04Modal = () => {
      if (!ot04Modal) return;
      ot04Modal.classList.remove('pointer-events-none');
      ot04Modal.classList.add('opacity-100');
      if (ot04ModalContent) {
        ot04ModalContent.classList.remove('scale-95');
        ot04ModalContent.classList.add('scale-100');
      }
      ot04Trap.activate();
      Analytics.trackOt04Access();
    };

    window.closeOt04Modal = () => {
      if (!ot04Modal) return;
      ot04Trap.deactivate();
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
    const msInfoTrap = new FocusTrap(msInfoModal, () => closeMsInfoModal());

    window.openMsInfoModal = () => {
      if (!msInfoModal) return;
      msInfoModal.classList.remove('pointer-events-none');
      msInfoModal.classList.add('opacity-100');
      if (msInfoModalContent) {
        msInfoModalContent.classList.remove('scale-95');
        msInfoModalContent.classList.add('scale-100');
      }
      msInfoTrap.activate();
    };

    const closeMsInfoModal = () => {
      if (!msInfoModal) return;
      msInfoTrap.deactivate();
      msInfoModal.classList.remove('opacity-100');
      if (msInfoModalContent) {
        msInfoModalContent.classList.remove('scale-100');
        msInfoModalContent.classList.add('scale-95');
      }
      setTimeout(() => {
        msInfoModal.classList.add('pointer-events-none');
      }, 200);
    };
    window.closeMsInfoModal = closeMsInfoModal;

    if (closeMsInfoModalBtn) closeMsInfoModalBtn.addEventListener('click', closeMsInfoModal);
    if (msInfoModalBackdrop) msInfoModalBackdrop.addEventListener('click', closeMsInfoModal);

    // Modal de Termos de Uso, Privacidade e Isenção (LGPD)
    const termsModal = document.getElementById('terms-modal');
    const termsModalContent = document.getElementById('terms-modal-content');
    const closeTermsModalBtn = document.getElementById('close-terms-modal-btn');
    const termsModalBackdrop = document.getElementById('terms-modal-backdrop');
    const termsTrap = new FocusTrap(termsModal, () => window.closeTermsModal());

    window.openTermsModal = () => {
      if (!termsModal) return;
      termsModal.classList.remove('pointer-events-none');
      termsModal.classList.add('opacity-100');
      if (termsModalContent) {
        termsModalContent.classList.remove('scale-95');
        termsModalContent.classList.add('scale-100');
      }
      termsTrap.activate();
    };

    window.closeTermsModal = () => {
      if (!termsModal) return;
      termsTrap.deactivate();
      termsModal.classList.remove('opacity-100');
      if (termsModalContent) {
        termsModalContent.classList.remove('scale-100');
        termsModalContent.classList.add('scale-95');
      }
      setTimeout(() => {
        termsModal.classList.add('pointer-events-none');
      }, 200);
    };

    if (closeTermsModalBtn) closeTermsModalBtn.addEventListener('click', window.closeTermsModal);
    if (termsModalBackdrop) termsModalBackdrop.addEventListener('click', window.closeTermsModal);

    // Fechamento de modais
    if (ui.closeModalBtn) ui.closeModalBtn.addEventListener('click', () => ui.closeModal());
    if (ui.modalBackdrop) ui.modalBackdrop.addEventListener('click', () => ui.closeModal());

    // Tecla ESC para fechar modais
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ui.closeModal();
        closeMsInfoModal();
        window.closeOt04Modal();
        window.closeTermsModal();
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
      grid.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'col-span-full p-8 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-red-200 dark:border-red-900/50';

      const title = document.createElement('p');
      title.className = 'text-red-600 dark:text-red-400 font-semibold mb-2';
      title.textContent = 'Erro ao inicializar visualização';

      const detail = document.createElement('p');
      detail.className = 'text-sm text-slate-500 dark:text-slate-400 mb-4';
      detail.textContent = (err && err.message) ? String(err.message) : 'Tente atualizar a página.';

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'px-4 py-2 bg-[#32a041] hover:bg-[#247a30] text-white rounded-lg text-sm font-medium transition-colors';
      btn.textContent = 'Recarregar Página';
      btn.addEventListener('click', () => window.location.reload());

      wrapper.appendChild(title);
      wrapper.appendChild(detail);
      wrapper.appendChild(btn);
      grid.appendChild(wrapper);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
