"use strict";

import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';

import characterSchema from './character-detail-model';


characterSchema.statics.getCharacterDetail = (id) => {
  return new Promise((resolve, reject) => {
    id = Number(id);
    if (!_.isNumber(id)) {
      return reject(new TypeError('Id is not a valid number.'));
    }

    ComicvineCharacterDetail
      .find({'character.id':id})
      .exec((err, characterDetail) => {
        if(err){
          reject(err)
        }else{
          resolve(characterDetail);
        }
      });
  });
};

const ComicvineCharacterDetail  = mongoose.model('ComicvineCharacterDetail', characterSchema,"charactersdetails");
export default ComicvineCharacterDetail;
