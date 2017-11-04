import dva from 'dva-no-router';
import Router from './Router';
import './style.scss';


const app = dva({});


app.router(Router);


app.start('.App');
