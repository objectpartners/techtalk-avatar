"use strict";

var avatar = require("org/glassfish/avatar");

var LatestPerson = {
  name: '',

  setName: function(name) {
    avatar.log("Setting name to " + name);
    this.name = name;
  }
};

avatar.registerRestService({ url: 'rest/person'}, function () {
  this.$onGet = function (request, response) {
    return response.$send({name: LatestPerson.name});
  };
});

avatar.registerSocketService({ url: 'websockets/hello'}, function () {
  this.superOnMessage = this.$onMessage;

  this.$onMessage = function(ctx, msg) {
    LatestPerson.setName(msg);
    this.superOnMessage.call(this, ctx, msg);
  };
});





