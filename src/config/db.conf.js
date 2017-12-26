import mongoose from 'mongoose';
import dbConst from '../constants/db.json';

class DBConfig {
    static init() {
      var URL;
      if(process.env.NODE_ENV === 'production'){
       // URL = process.env.MONGOHQ_URL
        URL = dbConst.prod;
      }else{
        URL = dbConst.localhost;
      }

      mongoose.connect(URL);
      mongoose.connection.on('error', console.error.bind(console, 'An error ocurred with the DB connection: '));
    }
}

export default DBConfig;