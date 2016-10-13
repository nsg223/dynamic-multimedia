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
  .when("/about", {
    templateUrl : "templates/about.htm"
  })
  .when("/docs", {
    templateUrl : "templates/docs.htm"
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
                $(document).trigger("fblogin");
                $("#login-button").hide();
                $("#logout-button").show();

                getPageInfo();
                getUserInfo();

            } else {
                $("#login-button").show();
                $("#logout-button").hide();
                $("#not-logged-in").show();
                $("#logged-in").hide();
            }
        });
}

$(document).on('fbload', function() {
    checkLoginState();
});

getPageInfo = function() {

    FB.api(
        "/815157038515764?fields=description,name",
        function (response) {
        if (response && !response.error) {
            $("#page-title").text(response.name);
            $("#page-description").text(response.description);
        }
        }
    );

}

getUserInfo = function() {
    FB.api('/me', function(response) {
        console.log(response);
        $("#name-menu").html('Hi, ' + response.name);
        $("#welcome-text").text('Welcome, ' + response.name);
        $("#not-logged-in").hide();
        $("#logged-in").show();
    });
}

getPhotos = function() {

    FB.api(
        "/815157038515764/albums?fields=location,name,id,count",
        function (response) {

            console.log(response);
        
            for (var i = 0; i < response.data.length; i++) {
                if(response.data[i].location != undefined && response.data[i].location.indexOf("Australia") == -1) {
                    response.data.splice(response.data[i], 1);
                } else {
                    console.log(response.data[i].name);
                }
            }

            console.log(response.data);

        }
    );
    
}