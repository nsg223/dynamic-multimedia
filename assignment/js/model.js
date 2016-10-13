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

    FB.login(function(response) {
        checkLoginState();
    });

});

$("#logout-button").click(function() {

    FB.logout(function(response) {
        alert('Logged Out');
        checkLoginState();
    });

});

$(document).on('fbload', function() {

    checkLoginState();

});

function checkLoginState() {
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status == "connected") {
                $("#login-button").hide();
                $("#logout-button").show();

                FB.api('/me', function(response) {
                    console.log(response);
                });

            } else {
                $("#login-button").show();
                $("#logout-button").hide();
            }
        });
}