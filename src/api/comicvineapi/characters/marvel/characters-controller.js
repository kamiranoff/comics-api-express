import CharactersDao from './characters-dao';

class CharactersController {
  static getAppearances(req, res) {
    CharactersDao.getAllNamesAndAppearancesFromMarvel()
      .then(characters => res.status(200).json(characters))
      .catch(error => res.status(400).json(error));
  }

  static getCharacters(req, res) {
    if (req.query.name) {
      CharactersDao.getCharactersByName(req.query.name)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    } else if (req.query.lastName && req.query.qty) {
      CharactersDao.getMoreCharacters(req.query.lastName, req.query.qty)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));
    } else {
      CharactersDao.getAllFromMarvel()
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));
    }
  }
}

export default CharactersController;
