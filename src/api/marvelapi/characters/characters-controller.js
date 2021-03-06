"use strict";

import CharactersDao from './characters-dao';

class CharactersController {
  static getCharacters(req, res) {
    if(req.query.lastName && req.query.qty){
      CharactersDao.getMoreCharacters(req.query.lastName,req.query.qty)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }else if(req.query.qty){
      CharactersDao.getRandomCharactersWithLimit(req.query.qty)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }else if(req.query.categories){
      CharactersDao.getCharactersByCategory(req.query.categories)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }else if(req.query.name){
      CharactersDao.getCharactersByName(req.query.name)
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }else{
      CharactersDao.getAll()
        .then(characters => res.status(200).json(characters))
        .catch(error => res.status(400).json(error));

    }
  }
}

export default CharactersController;
