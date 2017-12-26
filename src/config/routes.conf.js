import morgan from 'morgan';
import bodyParser from 'body-parser';
import contentLength from 'express-content-length-validator';
import helmet from 'helmet';

class RouteConfig {
  static init(application) {
    application.use(bodyParser.json());
    application.use(morgan('dev'));
    application.use(contentLength.validateMax({ max: 999 }));
    application.use(helmet());
  }
}

export default RouteConfig