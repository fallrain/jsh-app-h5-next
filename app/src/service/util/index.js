const util = {
  addPrefix(baseURL, urls) {
    Object.entries(urls).forEach(([key, value]) => {
      if (toString.call(value) === '[object Function]') {
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
