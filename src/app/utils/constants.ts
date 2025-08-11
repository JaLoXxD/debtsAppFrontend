export const constants = {
  DEFAULT_LANG: "es",
  LANG_OPTIONS: [
    {
      LANG: "es",
      ICON: "assets/img/lang/es.png",
      LABEL: "lang.es",
      PREFIX: "es-ES"
    },
    {
      LANG: "en",
      ICON: "assets/img/lang/en.png",
      LABEL: "lang.en",
      PREFIX: "en-US"
    }
  ],
  ALERTS: {
    TYPES: {
      SUCCESS: {
        label: "alert.success",
        icon: "fa-circle-check",
        color: "#28a745"
      },
      DANGER: {
        label: "alert.danger",
        icon: "fa-circle-exclamation",
        color: "#dc3545"
      },
      WARNING: {
        label: "alert.warning",
        icon: "fa-triangle-exclamation",
        color: "#ffc107"
      },
      INFO: {
        label: "alert.info",
        icon: "fa-info-circle",
        color: "#17a2b8"
      }
    },
  },
  MODAL: {
    ICONS: {
      SUCCESS: {
        src: 'assets/img/modal/success.png',
        alt: 'success icon',
      },
      ERROR: {
        src: 'assets/img/modal/error.png',
        alt: 'error icon'
      },
      WARNING: {
        src: 'assets/img/modal/warning.png',
        alt: 'warning icon'
      },
    }
  },
};