app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/splash.htm"
  })
  .when("/content", {
    templateUrl : "templates/content.htm",
    controller: 'contentCtrl'
  })
});

$("#login-button").click(function() {

    FB.login();

});

$(document).on('fbload', function() {

    FB.getLoginStatus(function(response) {
        console.log(response);

        if (authResponse.status == 'connected') {

            FB.api('/me', function(response) {
                console.log(response);
            });

        }
    });

});

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}