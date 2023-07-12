import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
// import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Converter from '../views/Converter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/',
      name: 'converter',
      component: Converter,
      meta: {
        needsAuth: true
      }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.needsAuth) {
	async function isUserAllowed() {
		const token = localStorage.getItem('token');
		try {
			const response = await axios.get(
				'http://localhost:3000/validate-token',
				{
				headers: {
					Authorization: `bearer ${token}`
				}
				}
			)
			const data = await response.data;
			return data.isTokenValid;
		} catch (error) {
			return false;
		}
    }
    if ( await isUserAllowed()) {
      	next();
    } else {
      	next('/login')
    }

	} else {
		next();
	}
})

export default router
