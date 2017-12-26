import CharactersCategoriesDao from './characters-categories-dao';

class CharactersCategoriesController {
  static getCategories(req, res) {
    CharactersCategoriesDao.getAll()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json(error));
  }
}

export default CharactersCategoriesController;
