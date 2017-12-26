import CharactersController from './characters/characters-controller';
import CharacterDetailController from './characters/character-detail-controller';
import CharactersCategoriesController from './characters/characters-categories-controller';
import CharactersDetailsController from './character-details/character-detail-controller';
import ComicsController from './comics/comics-controller';
import ComicsSeriesController from './comics/comics-series-controller';

class MarvelRoutes {
  static init(router) {
    router.route('/api/marvelapi/characters')
      .get(CharactersController.getCharacters);

    router
      .route('/api/marvelapi/character/:characterId')
      .get(CharacterDetailController.getCharacterDetail);

    router
      .route('/api/marvelapi/categories')
      .get(CharactersCategoriesController.getCategories);

    router
      .route('/api/marvelapi/comics')
      .get(ComicsController.getComics);

    router
      .route('/api/marvelapi/comics/series')
      .get(ComicsSeriesController.getSeries);

    router
    .route('/api/marvelapi/characters-details/:name')
    .get(CharactersDetailsController.getCharFromComivine);

  }
}

export default MarvelRoutes;
