//http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json

import request from 'request';
import CharacterDetailDao from './character-detail-dao';

const options = {
  url: 'http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&filter=name%3APsylocke&format=json',
  headers: {
    'User-Agent': 'my-encyclopedia marvel'
  }
};

let name ='';
let count = 0;

function saveCharacter(error, response, body) {
  if (!error && response.statusCode == 200) {
    const result = JSON.parse(body);
    const listOfHerosDetail = [];
    let characterObject = {};
    for (let i = 0; i < result.results.length; i++) {
      characterObject.character = result.results[i];
      console.log(characterObject.character.id);
      listOfHerosDetail.push(characterObject);
      characterObject = {};
    }

    CharacterDetailDao.saveCharacterDetail(listOfHerosDetail);
    console.log('listOfHerosDetail',listOfHerosDetail.length);

    if (listOfHerosDetail.length >= 100) {

      count = count + 100;
      console.log(count);
      request({
        url: 'http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&format=json&offset=' + count + '&filter=name%3A' + name,
        headers: {
          'User-Agent': 'my-encyclopedia marvel'
        }
      }, saveCharacter);
    }
  }
}

class CharacterDetailController {
  static getCharFromComivine(req,res){
    count = 0;
    let _name = req.params.name;
    if(_name){
      console.log('name',_name);
      name = _name;
      request(  {
        url: 'http://comicvine.gamespot.com/api/characters/?api_key=5de7765cd42651ccb9bf0d1a16c8c42d88693d13&format=json&filter=name%3A'+ _name,
        headers: {
          'User-Agent': 'my-encyclopedia marvel'
        }
      }, saveCharacter);

      res.status(200).json({status:_name});
    }
  }
}

export default CharacterDetailController;
