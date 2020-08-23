import Router from 'koa-router';

import { mainController } from '@interfaces/composers/MainComposer';
import { KoaControllerAdapter } from '../adapters/KoaControllerAdapter';
import v1Router from './v1';

export default (router: Router): void => {
  router.get(
    '/',
    KoaControllerAdapter.adapt(mainController)
  );

  v1Router(router);
}
