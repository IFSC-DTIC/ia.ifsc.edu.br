/**
 * Módulo de Dados e Catálogo de Ferramentas Institucionais do IFSC
 * Suporte a carregamento dinâmico de apps.json e partnerships.json com dados embutidos de alta disponibilidade
 */

const CDN_ICONS = 'https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png';

// Coleção base de ferramentas institucionais IFSC (Fallback resiliente offline-first)
export const defaultToolsCategories = [
  {
    "name": "LGPD",
    "slug": "lgpd",
    "iconKey": "lgpd",
    "apps": [
      {
        "id": "guardiao",
        "name": "Guardião LGPD - IFSC",
        "url": "https://ai.studio/apps/drive/1M1hyJa3d3JFzhXOpZVoVRFsWJZLiUXwv?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Conformidade",
        "iconKey": "lgpd",
        "description": "Ferramenta de Anonimização de Dados para o Contexto do IFSC.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "LGPD OK",
        "tags": [
          "lgpd",
          "anonimização",
          "privacidade",
          "dados sensíveis",
          "conformidade",
          "ot04",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "chatbot",
        "name": "Chatbot LGPD para Relatórios",
        "url": "https://ai.studio/apps/drive/1Dgn-dkUoaGxiGLFwFXDBrEGPuu1kzUPR?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Relatórios",
        "iconKey": "lgpd",
        "description": "Assistente Conversacional para Conformidade e Geração de Relatórios no IFSC.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "LGPD OK",
        "tags": [
          "lgpd",
          "chatbot",
          "relatórios",
          "conformidade",
          "cgd",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "ripd",
        "shortRoute": "/ripd",
        "name": "IFSC-DTIC-CGD: Form2RIPD",
        "url": "https://ai.studio/apps/drive/1fv20kTnlkPYefuOFIXP2bEo3ld8p8th7?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Gerador RIPD",
        "iconKey": "lgpd",
        "description": "Gerador de Relatórios de Impacto à Proteção de Dados (RIPD) para LGPD no IFSC.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "LGPD OK",
        "tags": [
          "ripd",
          "form2ripd",
          "lgpd",
          "relatório de impacto",
          "cgd",
          "dtic",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "mapeamento",
        "name": "Automação de Mapeamento de Dados LGPD",
        "url": "https://ai.studio/apps/drive/1EvvVk2lZ0-4HHPokSV-ZBQHkwbHELDxA?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Mapeamento",
        "iconKey": "lgpd",
        "description": "Plataforma do Instituto Federal de Santa Catarina para inventário e mapeamento de dados.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "LGPD OK",
        "tags": [
          "mapeamento",
          "inventário",
          "lgpd",
          "dados institucionais",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      }
    ]
  },
  {
    "name": "Processos",
    "slug": "processos",
    "iconKey": "bpmn",
    "apps": [
      {
        "id": "sezio",
        "name": "sez.iO - Agente IA",
        "url": "https://ai.studio/apps/drive/1z-e1wW2LvCStdG9ElsIeNt3x4-Q5tqOZ?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Modelagem",
        "iconKey": "bpmn",
        "description": "Assistente de Modelagem de Processos e Relatórios LGPD.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Apoio Técnico",
        "tags": [
          "bpmn",
          "processos",
          "modelagem",
          "sezio",
          "fluxos",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "lardic",
        "name": "LaRDiC - Laboratório de Roteirização e Documentação",
        "url": "https://ai.studio/apps/drive/1UDGQ0KWeFrb47zM5koH2NJooFXos7Q46?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "CProc DocX",
        "iconKey": "bpmn",
        "description": "Sistema CProc: Conversão BPMN/DMN para ProcessoIFSC em formato DocX.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Apoio Técnico",
        "tags": [
          "lardic",
          "bpmn",
          "dmn",
          "docx",
          "cproc",
          "processos",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "pedemeia",
        "name": "Pé-de-Meia",
        "url": "https://ai.studio/apps/c3f584f3-25d8-48b5-b8af-dd0ac9e001d9?fullscreenApplet=true",
        "badge": "SGP IFSC",
        "iconKey": "bpmn",
        "description": "Assistente de formatação SGP - Programa Pé-de-Meia.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Seguro para Estudantes",
        "tags": [
          "pé-de-meia",
          "sgp",
          "estudantes",
          "formatação",
          "apoio financeiro",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "pedemeia-api",
        "name": "ApPé-de-MeIA-API",
        "url": "https://ai.studio/apps/73333497-5550-41ad-a464-f63f8e87b0f7?fullscreenApplet=true",
        "badge": "API REST",
        "iconKey": "bpmn",
        "description": "API de integração do assistente de formatação SGP - Pé-de-Meia.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Apoio Técnico",
        "tags": [
          "api",
          "pé-de-meia",
          "integração",
          "rest",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "processo",
        "name": "Texto ➔ Processo ➔ Especificação",
        "url": "https://ai.studio/apps/drive/1GvqPgG2sjuoaw2XM89jj7Hfk3z4V9GO9?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "BPMN Automágico",
        "iconKey": "bpmn",
        "description": "Texto -> Processo -> Especificação de Sistema automatizada com IA.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Apoio Técnico",
        "tags": [
          "bpmn",
          "especificação",
          "processos",
          "automação",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      }
    ]
  },
  {
    "name": "Administrativo",
    "slug": "administrativo",
    "iconKey": "siads",
    "apps": [
      {
        "id": "form",
        "shortRoute": "/form",
        "ctaLabel": "Responder Questionário",
        "name": "Questionário de Maturidade de IA no IFSC",
        "url": "https://s.ifsc.edu.br/azN7Tw",
        "badge": "Diagnóstico IA • IFSC",
        "iconKey": "pesquisa",
        "description": "Diagnóstico institucional sobre o uso, capacitação e demandas de Inteligência Artificial no IFSC (~5 min).",
        "ot04_status": "Pesquisa Oficial IFSC",
        "safety_rating": "LGPD OK",
        "tags": [
          "form",
          "formulário",
          "questionário",
          "maturidade",
          "pesquisa",
          "diagnóstico",
          "governança",
          "ia",
          "ot04",
          "dtic",
          "cgd",
          "servidores",
          "alunos",
          "estudantes",
          "ifsc"
        ],
        "access_scope": "exclusivo_ifsc_form",
        "domain_requirement": "Exclusivo IFSC: requer conta institucional @ifsc.edu.br (servidores) ou @aluno.ifsc.edu.br (estudantes)",
        "audiences": [
          "servidores",
          "alunos"
        ]
      },
      {
        "id": "padronizacao",
        "name": "Ferramenta de Padronização de Inventário",
        "url": "https://ai.studio/apps/drive/12kTlPi2J1wxLKOskn_xAeb-CwJsBMv09?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Inventário SIADS",
        "iconKey": "siads",
        "description": "SIADS - Unifique e higienize dados de inventário de múltiplos campi do IFSC de forma inteligente.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Apoio Técnico",
        "tags": [
          "siads",
          "inventário",
          "patrimônio",
          "padronização",
          "bens",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      },
      {
        "id": "siads",
        "name": "SIADS - Agregador de Inventário com IA",
        "url": "https://ai.studio/apps/drive/1yZm3Z3PbrXS0316yJVm12ScHfSqxFFJ0?showAssistant=true&showPreview=true&fullscreenApplet=true",
        "badge": "Agregador SIADS",
        "iconKey": "siads",
        "description": "Agregador e consolidador de inventário de bens com suporte de IA para o IFSC.",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Apoio Técnico",
        "tags": [
          "siads",
          "inventário",
          "consolidação",
          "patrimônio",
          "bens",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      }
    ]
  },
  {
    "name": "Gestão de Pessoas",
    "slug": "gestao-de-pessoas",
    "iconKey": "rsctae",
    "apps": [
      {
        "id": "rsctae",
        "name": "RSC-TAE - Assistente AI",
        "url": "https://ai.studio/apps/da771d45-41e2-413d-b159-67aed31b50c4?fullscreenApplet=true",
        "badge": "RSC-TAE Referência",
        "iconKey": "rsctae",
        "description": "Assistente de extração e organização preliminar de dados para RSC-TAE (caráter de referência técnica).",
        "ot04_status": "Apoio de Referência",
        "safety_rating": "Sem Caráter Normativo",
        "tags": [
          "rsc-tae",
          "gestão de pessoas",
          "carreira",
          "servidores",
          "taes",
          "publico",
          "gmail"
        ],
        "access_scope": "publico_gmail",
        "domain_requirement": "Público: funciona com qualquer @gmail.com ou conta institucional"
      }
    ]
  }
];

export const googleEduCategories = [
  {
    name: "Assistentes & Criação",
    slug: "assistentes-criacao",
    apps: [
      {
        id: "g-gemini",
        name: "Google Gemini",
        url: "https://gemini.google.com/",
        badge: "IA Geral Multimodal",
        iconUrl: "https://www.gstatic.com/images/branding/productlogos/gemini/v1/web-96dp/logo_gemini_color_1x_web_96dp.png",
        description: "Assistente multimodal inteligente para análise de documentos, elaboração pedagógica e tutoria personalizada."
      },
      {
        id: "g-notebook",
        name: "Google Notebook",
        url: "https://notebook.google.com/",
        badge: "Caderno & RAG",
        iconUrl: "https://www.gstatic.com/images/branding/productlogos/notebooklm/v1/web-96dp/logo_notebooklm_color_1x_web_96dp.png",
        description: "Caderno inteligente baseado em IA que sintetiza fontes, PDFs e documentos em notas e podcasts didáticos."
      },
      {
        id: "g-ai-studio",
        name: "Google AI Studio",
        url: "https://aistudio.google.com/",
        badge: "Vibe Coding & IA",
        iconUrl: "https://www.gstatic.com/images/branding/productlogos/ai_studio/v1/web-96dp/logo_ai_studio_color_1x_web_96dp.png",
        description: "Plataforma de prototipagem rápida e desenvolvimento com modelos Gemini 3 e deploy no Cloud Run."
      },
      {
        id: "g-stitch",
        name: "Google Stitch (Google Labs)",
        url: "https://stitch.withgoogle.com/",
        badge: "Vibe Design & UI",
        iconUrl: "https://www.gstatic.com/labs-code/stitch/favicon-192x192.png",
        description: "Tela de Vibe Design que transforma comandos em linguagem natural em interfaces web/mobile prontas."
      },
      {
        id: "g-flowmusic",
        name: "Flow Music (MusicFX)",
        url: "https://www.flowmusic.app/",
        badge: "Música & Áudio IA",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-gemini.png",
        description: "Criação e exploração musical generativa com IA do Google Labs e DeepMind a partir de prompts em linguagem natural."
      },
      {
        id: "g-vids",
        name: "Google Vids",
        url: "https://workspace.google.com/products/vids/",
        badge: "Vídeos com IA",
        iconUrl: "https://www.gstatic.com/images/branding/productlogos/vids/v1/web-96dp/logo_vids_color_1x_web_96dp.png",
        description: "Criação colaborativa de videoaulas, roteiros didáticos e apresentações animadas assistidas por IA."
      }
    ]
  },
  {
    name: "Produtividade Acadêmica",
    slug: "produtividade-workspace",
    apps: [
      {
        id: "g-docs-voice",
        name: "Ditado e Digitação por Voz (Docs)",
        url: "https://docs.google.com/",
        badge: "Acessibilidade & Fala",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-docs.png",
        ot04_status: "Homologado OT 04",
        safety_rating: "LGPD OK",
        description: "Transcrição avançada de fala para texto no Google Docs com a conta institucional IFSC. Ideal para ditar relatórios e projetos de inclusão.",
        tags: ["fala", "ditado", "acessibilidade", "docs", "transcrição", "ot04"]
      },
      {
        id: "g-docs-summary",
        name: "Resumos Automáticos por IA (Docs/Chat)",
        url: "https://docs.google.com/",
        badge: "Síntese de Texto",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-docs.png",
        ot04_status: "Homologado OT 04",
        safety_rating: "LGPD OK",
        description: "Geração de resumos executivos automáticos no topo de documentos longos e recapitulações didáticas em canais do Google Chat.",
        tags: ["resumo", "síntese", "docs", "chat", "texto", "ot04"]
      },
      {
        id: "g-meet-captions",
        name: "Legendas e Transcrição em Tempo Real (Meet)",
        url: "https://meet.google.com/",
        badge: "Legendas & Inclusão",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-meet.png",
        ot04_status: "Homologado OT 04",
        safety_rating: "LGPD OK",
        description: "Legendas instantâneas com IA e tradução simultânea durante aulas, bancas de TCC e reuniões pedagógicas virtuais.",
        tags: ["legendas", "meet", "acessibilidade", "aulas", "tradução", "ot04"]
      },
      {
        id: "g-gmail-smart",
        name: "Smart Compose e Respostas Inteligentes (Gmail)",
        url: "https://mail.google.com/",
        badge: "Comunicação Formal",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/gmail.png",
        ot04_status: "Homologado OT 04",
        safety_rating: "LGPD OK",
        description: "Preenchimento preditivo de texto no e-mail institucional IFSC para agilizar respostas pedagógicas e comunicação formal.",
        tags: ["gmail", "smart compose", "e-mail", "comunicação", "ot04"]
      },
      {
        id: "g-lens",
        name: "Google Lens (OCR, Matemática & Tradução)",
        url: "https://lens.google/",
        badge: "OCR & Matemática",
        iconUrl: "https://www.gstatic.com/images/branding/productlogos/lens/v1/web-96dp/logo_lens_color_1x_web_96dp.png",
        ot04_status: "Uso Educacional",
        safety_rating: "Apoio a Estudos",
        description: "Digitalização de equações matemáticas manuscritas com passo a passo algébrico, OCR de livros e tradução visual instantânea.",
        tags: ["lens", "ocr", "matemática", "equações", "câmera", "tradução", "estudo", "ot04"]
      }
    ]
  },
  {
    name: "Engenharia & Código",
    slug: "engenharia-codigo",
    apps: [
      {
        id: "g-antigravity-2",
        name: "Antigravity 2.0",
        url: "https://antigravity.google/download#antigravity-2",
        badge: "Hub & Orquestração",
        iconUrl: "https://antigravity.google/apple-touch-icon.png",
        description: "Central de comando para gerenciar projetos, automações e orquestrar múltiplos agentes de IA locais em paralelo."
      },
      {
        id: "g-antigravity-ide",
        name: "Antigravity IDE (Standalone)",
        url: "https://antigravity.google/download#antigravity-ide",
        badge: "IDE Autônoma",
        iconUrl: "https://antigravity.google/assets/image/antigravity-logo.png",
        description: "Ambiente de desenvolvimento integrado (IDE) autônomo com motor nativo de agentes, autocompletamento e artefatos."
      },
      {
        id: "g-antigravity-cli",
        name: "Google Antigravity CLI",
        url: "https://antigravity.google/product/antigravity-cli",
        badge: "Terminal & Agentes",
        iconUrl: "https://antigravity.google/apple-touch-icon.png",
        description: "Interface de linha de comando (TUI) leve e veloz para invocar, monitorar e interagir com agentes no terminal."
      },
      {
        id: "g-jules",
        name: "Jules (Google Labs)",
        url: "https://jules.google.com/",
        badge: "Agente de Código",
        iconUrl: "https://www.gstatic.com/labs-code/code-app/favicon-48x48.png",
        description: "Agente autônomo integrado ao GitHub que clona repositórios e programa backend, testes unitários e correções."
      },
      {
        id: "g-colab",
        name: "Google Colab",
        url: "https://colab.research.google.com/",
        badge: "Python & IA",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-colab.png",
        description: "Ambiente Jupyter interativo na nuvem com assistência de código IA e aceleração por GPU/TPU."
      }
    ]
  },
  {
    name: "Google Labs",
    slug: "google-labs",
    apps: [
      {
        id: "g-labs-hub",
        name: "Google Labs (Hub Experimental)",
        url: "https://labs.google/",
        badge: "Hub Experimental",
        iconUrl: "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google.png",
        description: "Hub de experimentos de IA (ImageFX, VideoFX, MusicFX, Pomelli, Opal). Nota: Nem todas as ferramentas estão disponíveis na licença IFSC ou podem exigir lista de espera."
      },
      {
        id: "g-opal",
        name: "Google Opal (Google Labs)",
        url: "https://opal.google",
        badge: "No-Code & Mini-Apps",
        iconUrl: "https://opal.google/images/favicon.png",
        description: "Criação de miniaplicativos de IA descrevendo fluxos em linguagem natural com link compartilhável sem código."
      },
      {
        id: "g-pomelli",
        name: "Google Pomelli (Google Labs)",
        url: "https://labs.google/pomelli",
        badge: "Marketing & Branding",
        iconUrl: "https://www.gstatic.com/_/bettany/MjAyNjA5MjMuMDJfcDA/foundry_about%2Fassets/favicon-48x48.png",
        description: "Assistente de marketing que analisa a identidade visual e tom de voz de um site para gerar postagens e criativos."
      },
      {
        id: "g-workspace-studio",
        name: "Google Workspace Studio",
        url: "https://studio.workspace.google.com/",
        badge: "Workspace & IA",
        iconUrl: "https://www.gstatic.com/images/branding/productlogos/workspace_studio/v1/web-96dp/logo_workspace_studio_color_1x_web_96dp.png",
        description: "Plataforma de criação, automação e desenvolvimento de soluções inteligentes e fluxos no Workspace."
      }
    ]
  }
];

// Coleção oficial de soluções Microsoft 365 Copilot (Plano A1 IFSC)
export const microsoftCategories = [
  {
    name: "Assistentes & Chat",
    slug: "assistentes-chat",
    apps: [
      {
        id: "ms-copilot",
        name: "Microsoft Copilot",
        url: "https://copilot.microsoft.com/",
        badge: "IA Geral & Web",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-copilot.png`,
        description: "Assistente inteligente da Microsoft para pesquisa web, geração de textos e resolução de problemas acadêmicos."
      },
      {
        id: "ms-bing",
        name: "Copilot no Bing",
        url: "https://www.bing.com/chat",
        badge: "Busca & DALL-E",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-bing.png`,
        description: "Mecanismo de busca fundamentado com IA generativa, síntese de páginas da web e geração de imagens."
      },
      {
        id: "ms-github-copilot",
        name: "GitHub Copilot",
        url: "https://github.com/features/copilot",
        badge: "Código & Programação",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/github-copilot.png`,
        description: "Parceiro de programação por IA para professores, técnicos de TI e estudantes de cursos de computação do IFSC."
      },
      {
        id: "ms-edge",
        name: "Microsoft Edge (com Copilot)",
        url: "https://www.microsoft.com/edge",
        badge: "Navegador com IA",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-edge.png`,
        description: "Navegador com barra lateral inteligente para resumir artigos, comparar documentos e redigir e-mails."
      }
    ]
  },
  {
    name: "Produtividade & Office Web",
    slug: "produtividade-escrita",
    apps: [
      {
        id: "ms-office-web",
        name: "Office Web (Portal Central)",
        url: "https://www.office.com/",
        badge: "Office Web (sem Desktop)",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-office.png`,
        description: "Portal central do Office Web online com Word, Excel, PowerPoint e OneNote (sem instalador desktop)."
      },
      {
        id: "ms-word",
        name: "Microsoft Word (Office Web)",
        url: "https://word.office.com/",
        badge: "Word Web (sem Desktop)",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-word.png`,
        description: "Criação, reescrita e resumo de artigos científicos, relatórios e projetos no navegador com IA."
      },
      {
        id: "ms-excel",
        name: "Microsoft Excel (Office Web)",
        url: "https://excel.office.com/",
        badge: "Excel Web (sem Desktop)",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-excel.png`,
        description: "Exploração de planilhas de dados, fórmulas automatizadas, gráficos preditivos e análises estatísticas."
      },
      {
        id: "ms-powerpoint",
        name: "Microsoft PowerPoint (Office Web)",
        url: "https://powerpoint.office.com/",
        badge: "PowerPoint Web (sem Desktop)",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-powerpoint.png`,
        description: "Geração de apresentações e slides conceituais rápidos diretamente no navegador."
      },
      {
        id: "ms-onenote",
        name: "Microsoft OneNote (Office Web)",
        url: "https://www.onenote.com/",
        badge: "OneNote Web (sem Desktop)",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-onenote.png`,
        description: "Caderno digital para anotações de aulas e reuniões com planos de estudo organizados."
      }
    ]
  },
  {
    name: "Colaboração & Nuvem",
    slug: "colaboracao-nuvem",
    apps: [
      {
        id: "ms-teams",
        name: "Microsoft Teams",
        url: "https://teams.microsoft.com/",
        badge: "Reuniões & Aulas",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-teams.png`,
        description: "Videoconferências e chats com transcrição ao vivo, geração de atas automáticas e ativação da licença A1."
      },
      {
        id: "ms-onedrive",
        name: "Microsoft OneDrive (100 GB)",
        url: "https://onedrive.live.com/",
        badge: "Nuvem 100 GB",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-onedrive.png`,
        description: "100 GB de armazenamento online gratuito para arquivos acadêmicos (limite oficial do plano gratuito A1 desde 2024)."
      },
      {
        id: "ms-powerbi",
        name: "Power BI (com IA)",
        url: "https://app.powerbi.com/",
        badge: "Incluso no A1",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/powerbi.png`,
        description: "Dashboards analíticos inteligentes e relatórios com IA inclusos no licenciamento A1 do IFSC."
      },
      {
        id: "ms-powerautomate",
        name: "Power Automate (Copilot)",
        url: "https://make.powerautomate.com/",
        badge: "Automação de Fluxos",
        platform: "microsoft",
        iconUrl: `${CDN_ICONS}/microsoft-power-automate.png`,
        description: "Criação de fluxos de trabalho e automações de processos em linguagem natural assistida por IA."
      }
    ]
  }
];


// Coleção de Parcerias Oficiais & Oportunidades Estudantis
export const defaultPartnershipsCategories = [
  {
    "name": "IA & Produtividade",
    "slug": "ia-produtividade",
    "iconKey": "workspace",
    "apps": [
      {
        "id": "partner-gemini-advanced",
        "name": "Google AI Pro (Gemini Advanced)",
        "url": "https://gemini.google/students/",
        "iconUrl": "https://www.gstatic.com/images/branding/productlogos/gemini/v1/web-96dp/logo_gemini_color_1x_web_96dp.png",
        "badge": "Gratuito @edu.br",
        "category": "IA & Produtividade",
        "description": "Gemini 2.5 Pro: Modelo de IA mais avançado do Google com Deep Research. Geração de Vídeo: Acesso ao Veo 3 Fast, Flow e Whisk (1.000 créditos/mês). NotebookLM: 5x mais resumos em áudio e mais cadernos de estudo. Gemini Integrado no Gmail, Docs e Vids. Inclui 2 TB de armazenamento em nuvem.",
        "opportunity_plan": "GRATUITO para estudantes verificados através de e-mail institucional @edu.br / @aluno.ifsc.edu.br",
        "ot04_status": "Parceria Oficial Estudantes",
        "safety_rating": "Google Education",
        "tags": [
          "google",
          "gemini",
          "gemini advanced",
          "ia pro",
          "veo",
          "notebooklm",
          "2tb",
          "estudantes",
          "gratuito",
          "deep research"
        ],
        "access_scope": "estudante_edubr",
        "domain_requirement": "Gratuito para estudantes com e-mail institucional (@aluno.ifsc.edu.br ou @edu.br)"
      },
      {
        "id": "partner-ms-copilot",
        "name": "Microsoft Copilot para Estudantes",
        "url": "https://www.microsoft.com/pt-br/education/students",
        "iconUrl": "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/microsoft-copilot.png",
        "badge": "Licença A1 / Gratuito",
        "category": "IA & Produtividade",
        "description": "Assistente de IA Copilot vinculado ao Microsoft 365: Apoio na pesquisa acadêmica, redação e estruturação de trabalhos, criação de conteúdo e resumos. Totalmente integrado ao ecossistema Microsoft (Word, Excel, PowerPoint e Teams).",
        "opportunity_plan": "Versão gratuita e acesso ampliado para instituições de ensino via licença Microsoft 365 Education A1",
        "ot04_status": "Homologado IFSC",
        "safety_rating": "Microsoft A1",
        "tags": [
          "microsoft",
          "copilot",
          "office 365",
          "a1",
          "word",
          "excel",
          "estudantes",
          "gratuito"
        ],
        "access_scope": "comunidade_ifsc",
        "domain_requirement": "Disponível para servidores (@ifsc.edu.br) e estudantes (@aluno.ifsc.edu.br)"
      }
    ]
  },
  {
    "name": "Desenvolvimento & Pesquisa",
    "slug": "dev-pesquisa",
    "iconKey": "parcerias",
    "apps": [
      {
        "id": "partner-github-copilot",
        "name": "GitHub Copilot",
        "url": "https://education.github.com/pack",
        "iconUrl": "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/github-copilot.png",
        "badge": "GitHub Pack Gratuito",
        "category": "Desenvolvimento & Pesquisa",
        "description": "Assistente de programação com inteligência artificial pioneiro mundial. Sugere código em tempo real no editor (VS Code, JetBrains), autocompletar inteligente de blocos inteiros, depuração e aceleração máxima de desenvolvimento de software.",
        "opportunity_plan": "GRATUITO para estudantes via GitHub Student Developer Pack",
        "ot04_status": "Parceria Oficial Estudantes",
        "safety_rating": "GitHub Education",
        "tags": [
          "github",
          "copilot",
          "programação",
          "código",
          "desenvolvimento",
          "vs code",
          "gratuito",
          "student pack"
        ],
        "access_scope": "estudante_verificado",
        "domain_requirement": "Exige verificação como estudante no GitHub Education com comprovante ou e-mail escolar"
      },
      {
        "id": "partner-perplexity-pro",
        "name": "Perplexity Pro (Parceria RNP)",
        "url": "https://rnpmais.rnp.br/perplexity-pro",
        "iconUrl": "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/perplexity.png",
        "badge": "1 Ano Pro Grátis (RNP)",
        "category": "Desenvolvimento & Pesquisa",
        "description": "Motor de busca conversacional com IA de última geração. Respostas diretas e sintetizadas com fontes e citações acadêmicas explícitas, modo de pesquisa focado Pro (Pro Search), upload de múltiplos arquivos e PDFs para análise científica profunda.",
        "opportunity_plan": "Assinatura de 1 ano do plano Perplexity Pro para estudantes e comunidade acadêmica via RNP+",
        "ot04_status": "Parceria RNP / Rede Federal",
        "safety_rating": "RNP Verificado",
        "tags": [
          "perplexity",
          "pesquisa",
          "busca",
          "rnp",
          "artigos",
          "pdf",
          "1 ano pro",
          "gratuito",
          "pro search"
        ],
        "access_scope": "estudante_rnp",
        "domain_requirement": "Ativação no portal RNP+ com credenciais da Comunidade Acadêmica Federada (CAFe / IFSC)"
      }
    ]
  },
  {
    "name": "Design & Criatividade",
    "slug": "design-criatividade",
    "iconKey": "parcerias",
    "apps": [
      {
        "id": "partner-canva-edu",
        "name": "Canva para Educação",
        "url": "https://www.canva.com/education/",
        "iconUrl": "./public/img/canva.svg",
        "badge": "Canva Pro Gratuito",
        "category": "Design & Criatividade",
        "description": "Acesso total gratuito a todos os recursos premium do Canva Pro para alunos e professores: ferramentas de IA generativa como Magic Write (geração e reescrita de texto), Magic Media (geração de imagem e vídeo), Magic Switch e removedor de fundo instantâneo.",
        "opportunity_plan": "GRATUITO (todos os recursos do Canva Pro) para estudantes e professores",
        "ot04_status": "Parceria Oficial Estudantes",
        "safety_rating": "Canva Education",
        "tags": [
          "canva",
          "design",
          "apresentações",
          "imagens",
          "magic write",
          "magic media",
          "gratuito",
          "professores",
          "alunos"
        ],
        "access_scope": "estudante_professor",
        "domain_requirement": "Validação rápida com e-mail institucional de ensino"
      },
      {
        "id": "partner-adobe-cc",
        "name": "Adobe Creative Cloud + Firefly",
        "url": "https://www.adobe.com/br/creativecloud/buy/students.html",
        "iconUrl": "./public/img/adobe-creative-cloud.svg",
        "badge": "60%+ Desconto",
        "category": "Design & Criatividade",
        "description": "IA Generativa Adobe Firefly integrada a toda a suíte criativa (Photoshop, Illustrator, Premiere Pro, InDesign, After Effects). Geração e edição generativa de imagens, efeitos de texto vetoriais e ferramentas de nível industrial para estudantes.",
        "opportunity_plan": "Desconto especial de mais de 60% para estudantes e professores em todo o pacote Creative Cloud",
        "ot04_status": "Desconto Educacional",
        "safety_rating": "Adobe Education",
        "tags": [
          "adobe",
          "firefly",
          "photoshop",
          "illustrator",
          "premiere",
          "design",
          "criatividade",
          "desconto 60%"
        ],
        "access_scope": "estudante_professor",
        "domain_requirement": "Comprovação de matrícula estudantil na assinatura"
      }
    ]
  },
  {
    "name": "Escrita & Organização",
    "slug": "escrita-organizacao",
    "iconKey": "parcerias",
    "apps": [
      {
        "id": "partner-notion-ai",
        "name": "Notion AI para Estudantes",
        "url": "https://www.notion.so/students",
        "iconUrl": "https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/notion.png",
        "badge": "Notion Plus Gratuito",
        "category": "Escrita & Organização",
        "description": "Plataforma de anotações e organização com assistente de escrita com IA nativo: sintetiza e resume aulas, gera estruturas de trabalhos e artigos, traduz conteúdos, responde a dúvidas sobre as suas anotações e automatiza cronogramas de estudo.",
        "opportunity_plan": "Plano GRATUITO (Notion Plus) para estudantes e educadores",
        "ot04_status": "Parceria Oficial Estudantes",
        "safety_rating": "Notion Education",
        "tags": [
          "notion",
          "anotações",
          "produtividade",
          "organização",
          "resumos",
          "notion plus",
          "gratuito"
        ],
        "access_scope": "estudante_verificado",
        "domain_requirement": "Cadastro com endereço de e-mail institucional acadêmico"
      },
      {
        "id": "partner-grammarly-edu",
        "name": "Grammarly Education",
        "url": "https://www.grammarly.com/edu",
        "iconUrl": "./public/img/grammarly.svg",
        "badge": "Desconto / Parceria",
        "category": "Escrita & Organização",
        "description": "Revisor de escrita assistido por IA de alta precisão: correção profunda de gramática, ortografia, pontuação, concisão, clareza e ajustes de tom formal para artigos científicos e comunicações internacionais.",
        "opportunity_plan": "Descontos especiais para estudantes e acesso educacional para instituições de ensino",
        "ot04_status": "Parceria Educacional",
        "safety_rating": "Grammarly Education",
        "tags": [
          "grammarly",
          "inglês",
          "redação",
          "gramática",
          "artigos",
          "revisão",
          "educacional",
          "escrita"
        ],
        "access_scope": "estudante_docente",
        "domain_requirement": "Verificação de elegibilidade institucional para estudantes e docentes"
      }
    ]
  }
];


/**
 * Dedução resiliente de públicos (servidores, alunos, comunidade)
 */
export function inferAudiences(app, cat = {}) {
  if (app.audiences && Array.isArray(app.audiences) && app.audiences.length > 0) {
    return app.audiences;
  }
  const id = (app.id || '').toLowerCase();
  const tags = (app.tags || []).map(t => String(t).toLowerCase());
  const slug = (cat.slug || '').toLowerCase();

  const auds = new Set();

  if (slug === 'alunos' || tags.includes('alunos') || tags.includes('estudantes') || id.includes('aluno') || id.includes('pedemeia') || id.includes('sibi') || id.startsWith('partner-') || id.startsWith('p-') || id.startsWith('g-') || id.startsWith('ms-')) {
    auds.add('alunos');
  }

  if (slug === 'servidores' || slug === 'professores' || tags.includes('servidores') || tags.includes('professores') || id.includes('serv') || id.includes('siads') || id.includes('ripd') || id.includes('rsctae') || id.includes('dgp') || id.includes('cgd') || id.includes('srp') || id.startsWith('g-') || id.startsWith('ms-') || id.startsWith('partner-') || id.startsWith('p-')) {
    auds.add('servidores');
  }

  const publicTools = [
    'guardiao', 'chatbot', 'sezio', 'lardic', 'processo', 'bpmn-svg', 'manual',
    'g-gemini', 'g-notebook', 'g-ai-studio', 'g-stitch', 'g-flowmusic', 'g-vids',
    'g-colab', 'g-antigravity-2', 'g-antigravity-ide', 'g-antigravity-cli', 'g-jules',
    'g-labs-hub', 'g-opal', 'g-pomelli', 'g-workspace-studio', 'ms-bing', 'ms-edge'
  ];
  if (app.access_scope === 'publico_gmail' || tags.includes('publico') || slug === 'lgpd' || publicTools.includes(id)) {
    auds.add('comunidade');
  }

  if (auds.size === 0) {
    auds.add('servidores');
  }

  return Array.from(auds);
}

// Utilitário para achatar coleções
export function flattenCategories(categories) {
  const list = [];
  if (!Array.isArray(categories)) return list;
  categories.forEach(cat => {
    (cat.apps || []).forEach(app => {
      const isPartner = (app.id && (app.id.startsWith('partner-') || app.id.startsWith('p-'))) || cat.slug === 'dev-pesquisa' || cat.slug === 'design-criatividade' || cat.slug === 'escrita-organizacao' || cat.slug === 'ia-produtividade';
      list.push({
        ...app,
        categoryName: cat.name,
        categorySlug: cat.slug,
        iconKey: isPartner ? null : (app.iconKey || cat.iconKey),
        audiences: inferAudiences(app, cat)
      });
    });
  });
  return list;
}

/**
 * Carrega bases de dados com cache-busting e fallback resiliente
 */
export async function loadCatalog() {
  const ts = Date.now();
  let toolsCategories = defaultToolsCategories;
  let partnershipsCategories = defaultPartnershipsCategories;

  try {
    const [appsRes, partsRes] = await Promise.allSettled([
      fetch('./apps.json?v=' + ts).then(r => r.ok ? r.json() : null),
      fetch('./partnerships.json?v=' + ts).then(r => r.ok ? r.json() : null)
    ]);

    if (appsRes.status === 'fulfilled' && Array.isArray(appsRes.value) && appsRes.value.length > 0) {
      toolsCategories = appsRes.value;
    }
    if (partsRes.status === 'fulfilled' && Array.isArray(partsRes.value) && partsRes.value.length > 0) {
      partnershipsCategories = partsRes.value;
    }
  } catch (_) {
    // Fallback garantido
  }

  const allTools = flattenCategories(toolsCategories);
  const allGoogle = flattenCategories(googleEduCategories);
  const allMicrosoft = flattenCategories(microsoftCategories);
  const allPartnerships = flattenCategories(partnershipsCategories);

  const appMap = {};
  [...allTools, ...allGoogle, ...allMicrosoft, ...allPartnerships].forEach(app => {
    appMap[app.id] = app;
  });

  return {
    toolsCategories,
    gemsCategories: [],
    googleEduCategories,
    microsoftCategories,
    partnershipsCategories,
    allTools,
    allExperts: [],
    allGoogle,
    allMicrosoft,
    allPartnerships,
    appMap
  };
}