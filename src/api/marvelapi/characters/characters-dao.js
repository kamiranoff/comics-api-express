import mongoose from 'mongoose';
import Promise from 'bluebird';
import characterSchema from './character-model';
import _ from 'lodash';

const fieldsToRetreive = 'character.id character.thumbnail character.name character.wiki.categories character.wiki.groups ';

characterSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = fieldsToRetreive;

    Characters
      .find(_query, fields)
      .sort({ "character.name": 1 })
      .limit(100)
      .exec((err, characters) => {
        if (err) {
          reject(err)
        } else {
          resolve(characters);
        }
      });
  });
};

characterSchema.statics.getMoreCharacters = (lastName, qty) => {
  const quantity = parseInt(qty);
  return new Promise((resolve, reject) => {
    if (!_.isNumber(quantity)) {
      return reject(new TypeError('is not a valid number.'));
    }
    let _query = { "character.name": { "$gt": lastName } };
    let fields = fieldsToRetreive;
    Characters
      .find(_query, fields)
      .sort({ "character.name": 1 })
      .limit(quantity)
      .exec((err, characters) => {
        if (err) {
          reject(err)
        } else {
          resolve(characters);
        }
      });
  });
};


characterSchema.statics.getCharactersByName = (input) => {
  return new Promise((resolve, reject) => {
    if (!_.isString(input)) {
      return reject(new TypeError('is not a valid string.'));
    }
    let _query = { "character.name": { "$regex": input, "$options": "i" } };
    let fields = fieldsToRetreive;
    Characters
      .find(_query, fields)
      .exec((err, characters) => {
        if (err) {
          reject(err)
        } else {
          resolve(characters);
        }
      });
  });
};

characterSchema.statics.getCharactersByCategory = (input) => {
  const inputArray = input.split(',');
  const inputArrayRegex = [];
  inputArray.forEach(function(opt) {
    inputArrayRegex.push(new RegExp(opt, "i"));
  });
  return new Promise((resolve, reject) => {
    if (!_.isArray(inputArrayRegex)) {
      return reject(new TypeError(' is not a valid array.'));
    }
    let _query = { "character.wiki.categories": { "$all": inputArrayRegex } };
    let fields = fieldsToRetreive;
    Characters
      .find(_query, fields)
      .exec((err, characters) => {
        if (err) {
          reject(err)
        } else {
          resolve(characters);
        }
      });
  });
};


characterSchema.statics.getRandomCharactersWithLimit = (qty) => {
  let quantity = parseInt(qty);
  if (!quantity || quantity > 50) {
    quantity = 20;
  }

  return new Promise((resolve, reject) => {
    if (!_.isNumber(quantity)) {
      return reject(new TypeError('is not a valid number.'));
    }

    Characters
      .aggregate([{ $sample: { size: qty } }])
      .exec((err, characters) => {
        if (err) {
          reject(err)
        } else {
          resolve(characters);
        }
      });
  });
};

const Characters = mongoose.model('Character', characterSchema, "characters");
export default Characters;
