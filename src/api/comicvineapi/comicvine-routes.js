import CharactersController from './characters/marvel/characters-controller';
import CharactersDCController from './characters/dc/characters-dc-controller';
import CharactersTopCowController from './characters/top-cow/characters-top-cow-controller';
import CharacterDetailController from './character-detail/character-detail-controller';
import StoryArcController from './story-arc/story-arc-controller';

class ComicvineRoutes {
  static init(router) {
    //Marvel
    router.route('/api/comicvine/marvel/characters')
      .get(CharactersController.getCharacters);
    router.route('/api/comicvine/marvel/appearances')
      .get(CharactersController.getAppearances);
    //DC
    router.route('/api/comicvine/dc/characters')
      .get(CharactersDCController.getCharacters);
    router.route('/api/comicvine/dc/appearances')
      .get(CharactersDCController.getAppearances);
    //TopCow
    router.route('/api/comicvine/top-cow/characters')
      .get(CharactersTopCowController.getCharacters);
    router.route('/api/comicvine/top-cow/appearances')
      .get(CharactersTopCowController.getAppearances);
    //Details
    router
      .route('/api/comicvine/character/:characterId')
      .get(CharacterDetailController.getCharacterDetail);
    //story Arcs
    router
      .route('/api/comicvine/story_arcs/')
      .get(StoryArcController.getStoryArcs);
    router
    .route('/api/comicvine/story_arc')
    .get(StoryArcController.getStoryArc);
  }
}

export default ComicvineRoutes;
