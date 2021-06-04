import {
  IUrls
} from './util.module';

const util = {
  addPrefix(baseURL: string, urls: IUrls) {
    Object.entries(urls).forEach(([key, value]) => {
      if (typeof value === 'function') {
        urls[key] = function (...args) {
          return baseURL + value(...args);
        };
      } else {
        urls[key] = baseURL + value;
      }
    });
  }
};

export default util;
