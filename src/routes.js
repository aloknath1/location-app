import LoginForm from './components/Login/login';
import Dashboard from './components/dashboard';
import Users from './components/Users/users';
import Search from './components/Search/search';

const routes= [
    {
        path : '/',
        exact:true,
        component: LoginForm
    },
    {
        path : '/dashboard',
        exact:true,
        component: Dashboard
    },
    {
        path : '/users',
        exact:true,
        component: Users
    },
    {
        path : '/search',
        exact:true,
        component: Search
    }
];

export default routes;
