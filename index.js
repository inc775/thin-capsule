var request = require('request');
var url = require('url');

var Capsule = function(token) {
  var self = this;

  self.get = function(options, cb) {
    var opt = {
      url: url.format({
        protocol: 'https',
        host: 'api.capsulecrm.com',
        pathname: '/api/v2' + options.path
      }),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      method: 'GET',
      jar: false
    };
    console.log('Sending GET request to Capsule CRM: ' + opt.url);
    get(opt, function(err, res, body) {
      if (err)
        return cb(err);
      if (res.statusCode !== 200 && res.statusCode !== 201)
        return cb(new Error('Request returned an invalid status code of: ' + res.statusCode + ', body: ' + body));
      return cb(null, body ? JSON.parse(body) : null, res)
    });
  }

  self.post = function(options, cb) {
    var opt = {
      url: url.format({
        protocol: 'https',
        host: 'api.capsulecrm.com',
        pathname: '/api/v2' + options.path
      }),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token
      },
      method: 'POST',
      jar: false
    };
    if (options.data) {
      opt.headers['Content-Type'] = 'application/json';
      opt.body = options.data;
    }
    console.log('Sending POST request to Capsule CRM: ' + opt.url + ' with ' + opt.body);
    post(opt, function(err, res, body) {
      if (err)
        return cb(err);
      if (res.statusCode !== 200 && res.statusCode !== 201)
        return cb(new Error('Request returned an invalid status code of: ' + res.statusCode + ', body: ' + body));
      return cb(null, body ? JSON.parse(body) : null, res)
    });
  }
}

exports.init = function(token) {
  return new Capsule(token);
}
