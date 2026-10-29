/**
 * Modulo de Rastreamento e Telemetria Institucional (GA4 & Microsoft Clarity)
 * IDs homologados em producao no portal ia.ifsc.edu.br
 */

export const Analytics = {
  /**
    * Dispara evento de clique na abertura da ferramenta
    * @param {Object} app Dados do aplicativo/agente
    */
  trackAppClick(app) {
    if (!app) return;

    // Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'app_click', {
        app_id: app.id,
        app_name: app.name,
        app_category: app.categoryName || app.category || 'Geral',
        app_url: app.url,
        access_scope: app.access_scope || 'publico_gmail',
        event_category: 'Aplicacoes IA IFSC',
        event_label: app.name,
        transport_type: 'beacon'
      });
    }

    // Microsoft Clarity
    if (typeof window.clarity === 'function') {
      window.clarity('event', 'app_opened');
      window.clarity('set', 'last_opened_app', app.id);
      window.clarity('set', 'app_name', app.name);
      window.clarity('set', 'app_category', app.categoryName || app.category || 'Geral');
      window.clarity('set', 'access_scope', app.access_scope || 'publico_gmail');
    }
  },

  /**
   * Rastreia a navegacao entre abas
   * @param {string} tabId Identificador da aba
   */
  trackTabSwitch(tabId) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'tab_view', {
        tab_name: tabId,
        event_category: 'Navegacao Abas',
        event_label: tabId
      });
    }
    if (typeof window.clarity === 'function') {
      window.clarity('set', 'active_tab', tabId);
    }
  },

  /**
   * Rastreia buscas realizadas
   * @param {string} query Texto buscado
   * @param {number} resultsCount Quantidade de resultados encontrados
   */
  trackSearch(query, resultsCount) {
    if (!query || query.length < 2) return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'search', {
        search_term: query,
        results_count: resultsCount
      });
    }
  },

  /**
   * Rastreia o clique direto para a Orientacao Tecnica n. 04/2025
   */
  trackOt04Access() {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ot04_document_access', {
        document_name: 'OT_04_2025_Oficial.pdf',
        event_category: 'Documentos Oficiais',
        transport_type: 'beacon'
      });
    }
    if (typeof window.clarity === 'function') {
      window.clarity('event', 'ot04_accessed');
    }
  },

  /**
   * Rastreia selecoes de filtros de publico (Todos, Servidores, Alunos, Comunidade)
   * @param {string} audience 
   */
  trackAudienceFilter(audience) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'filter_audience_change', {
        audience: audience,
        event_category: 'Filtros Catalogo'
      });
    }
    if (typeof window.clarity === 'function') {
      window.clarity('set', 'filter_audience', audience);
    }
  },

  /**
   * Rastreia cliques no botao institucional de participacao na Pesquisa de IA (/form)
   * @param {string} source Origem do clique (ex: header_desktop, header_mobile)
   */
  trackSurveyCtaClick(source = 'header') {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'survey_cta_click', {
        cta_source: source,
        target_route: '/form',
        event_category: 'Pesquisa Maturidade IA IFSC',
        transport_type: 'beacon'
      });
    }
    if (typeof window.clarity === 'function') {
      window.clarity('event', 'survey_cta_clicked');
      window.clarity('set', 'survey_cta_source', source);
    }
  }
};