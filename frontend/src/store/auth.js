import { reactive } from 'vue';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

const authStore = {
  state: reactive({
    user: JSON.parse(localStorage.getItem('user')) || null,
    returnUrl: null
  }),
  login: async function(username, password) {
    try {
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

      // update state
      this.state.user = user;
      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));
      // redirect to previous url or default to home page
      router.push(this.state.returnUrl || '/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  },
  logout: function() {
    this.state.user = null;
    localStorage.removeItem('user');
    router.push('/auth/login');
  }
};

export default authStore;
