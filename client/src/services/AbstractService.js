export default class AbstractService {
    constructor() {
      if (this.constructor === AbstractService) {
        throw new TypeError(
          'Abstract class "AbstractService" cannot be instantiated directly'
        );
      }
    }
  
    // Return a promise with response argument after a short time to simulate a request
    getRequest(response, success) {
      return new Promise(function(resolve, reject) {
        setTimeout(() => {
          if(success) {
            resolve(response);
          }
          else {
            reject(response);
          }
        }, (Math.floor(Math.random() * 1500 + 300)));
      });
    }
  
    // Handle the request and the promise
    doRequest(response, onSuccess, onFail, onDone=null) {
      this.getRequest(response)
        .then(response => onSuccess(response))
        .catch(error => onFail(error))
        .finally(() => {
          if(onDone != null && onDone !== undefined)
            onDone()
        });
    }
  }
  