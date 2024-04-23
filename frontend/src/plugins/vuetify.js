/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify';
import { DefaultTheme } from '@/theme/LightTheme';

export default createVuetify({
  theme: {
    defaultTheme: 'DefaultTheme',
    themes: {
      light: {
        colors: {
        }
      },
      DefaultTheme // DefaultTheme 추가
    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'lg'
    },
    VTooltip: {
      location: 'top'
    }
  }
});
