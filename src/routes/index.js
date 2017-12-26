import MarvelRoutes from '../api/marvelapi/marvel-routes';
import ComicvineRoutes from '../api/comicvineapi/comicvine-routes';
import StaticDispatcher from '../commons/static/index';

class Routes {
  static init(app, router) {
    MarvelRoutes.init(router);
    ComicvineRoutes.init(router);

    router
      .route('*')
      .get(StaticDispatcher.sendIndex);

    app.use('/', router);
  }
}

export default  Routes;