'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
//import post from './post';
import manage from './manage';
import navbar from '../components/navbar/navbar.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import admin from './admin';

import './app.scss';

angular.module('projectApp', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, _Auth,
  account, admin, manage, navbar, main, constants, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['projectApp'], {
      strictDi: true
    });
  });
