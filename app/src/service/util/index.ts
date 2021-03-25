const util = {
  addPrefix(baseURL:string, urls:Record<string, string> | Record<string, {(...args:any[]):string}>) {
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
