var sessionService = angular.module('sessionService', ['ngResource']);

sessionService.service('Session', ['$resource',
    function($resource) {
      this.sessionData = $resource('api/session');
      this.user = null;
      this.team = null;

      this.login = function(email, password, successCallback, errorCallback) {
        this.sessionData.save({email: email, password: password},
          angular.bind(this, function(data) {
            this.user = data.user;
            this.team = data.team;
            if (successCallback)
              successCallback();
          }), errorCallback || function() {});
      };

      this.logout = this.sessionData.remove;

      // Attempt to load
      this.sessionData.get(angular.bind(this, function(data) {
        this.user = data.user;
        this.team = data.team;
      }));
    }]);

function getss(){
  return angular.element(document).injector().get('Session');
}
