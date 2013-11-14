"use strict";

var avatar = require("org/glassfish/avatar");

var personProvider = new avatar.JPADataProvider(
  { persistenceUnit: "mem", createTables: "true", entityType: "rest.Person" });

avatar.registerRestService({ url: 'api/person'}, function () {
  this.$onGet = function (request, response) {
    var promise = personProvider.$getCollection().then(function(results) {
      response.$send({ people: results.data });
    }, function(error) {
      avatar.log("error");
      avatar.log(error);
    });
  };
});

avatar.registerRestService({ url: 'api/person/{id}'}, function () {
  this.$onGet = function(request, response) {
    personProvider.$get(this.id, function(error, person) {
      if (!person) {
        person = {};
      }
      response.$send(person);
    });
  };

  this.$onPut = function(request, response) {
    personProvider.$put(this.id, request.data, function(result) {
      response.$send(result);
    });
  };

  this.$onDelete = function(request, response) {
    personProvider.$delete(this.id, function(result) {
      response.$send(result);
    });
  };
});
