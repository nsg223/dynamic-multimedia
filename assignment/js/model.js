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

$("#logout-button").click(function() {

    FB.logout(function(response) {
        alert('Logged Out');
    });

});

$(document).on('fbload', function() {

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            console.log(response);
            // if (response.authResponse.status === "connected") {
            //     $("#login-button").hide();
            //     $("#logout-button").show();
            // } else {
            //     $("#login-button").show();
            //     $("#logout-button").hide();
            // }
        });
    }

    checkLoginState();

    // FB.api('/me', function(response) {
    //     console.log(response);
    // });
    
});

