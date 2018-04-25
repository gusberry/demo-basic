'use strict';

import { Router } from './core/Router';
import { ROUTER_SELECTOR_ID } from './core/constants';

import { InitRoute } from './components/InitRoute/InitRoute';
import { PostRoute } from './components/PostRoute/PostRoute';

const routes = [
  { component: new InitRoute(), url: '/' },
  { component: new PostRoute(), url: '/posts' }
];

const router = new Router($(`#${ROUTER_SELECTOR_ID}`), routes);

router.init();

console.log('init');
