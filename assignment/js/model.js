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

checkLoginState = function() {
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status == "connected") {
                $("#login-button").hide();
                $("#logout-button").show();

                FB.api('/me', function(response) {
                    console.log(response);
                    $("#name-menu").html('Hi, ' + response.name);
                });

            } else {
                $("#login-button").show();
                $("#logout-button").hide();
            }
        });
}

$(document).on('fbload', function() {
    checkLoginState();
});