"use strict";

import mongoose from 'mongoose';
import Promise from 'bluebird';
import characterSchema from './character-model';
import StaticDispatcher from '../../../commons/static/index';

characterSchema.statics.getAll = () => {
  return new Promise((resolve, reject) => {
    let _query = {};
    let fields = 'character.wiki.categories';

    CharactersCategories
      .find(_query,fields)
      .exec((err, categories) => {
        if(err){
          reject(err)
        }else{
          var arraysOfCategories =  categories.map(function(a) {return a.character.wiki.categories;});
          var result = [].concat.apply([], arraysOfCategories);

          result = StaticDispatcher.uniq(result);
          result = result.filter(function(e){return e});//remove falsy values

          var tmpResult = [];
          for(var i = 0; i < result.length;i++){
            result[i] = result[i].replace(/_/g,' ').replace(/%27/g,'\'');
            result[i] = result[i].toLowerCase();
            result[i] = result[i].trim();
            result[i] = StaticDispatcher.capitalizeFirstLetter(result[i]);
            tmpResult.push(result[i]);
          }

          result = StaticDispatcher.uniq(tmpResult);
          result.sort();
          var arrayOfObjects = [];
          for(var i = 0; i < result.length;i++){
            arrayOfObjects.push({'name':result[i]});
          }
          result = arrayOfObjects;
          resolve(result);

        }
      });
  });
};



const CharactersCategories  = mongoose.model('CharactersCategories', characterSchema,"characters");
export default CharactersCategories;
