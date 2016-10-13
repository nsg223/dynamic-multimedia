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
  .when("/album/:id", {
      templateUrl : "templates/album.htm",
      controller: "albumCtrl"
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

getAlbums = function(callback) {

    FB.api(
        "/815157038515764/albums?fields=location,name,id,count,likes,picture",
        function (response) {

            aust = [];        
            for (var i = 0; i < response.data.length; i++)
                if(response.data[i].location != undefined && response.data[i].location.indexOf("Australia") > 0)
                    aust.push(response.data[i]);
            
            //Bubble sort off likes
            for (var i = aust.length-1; i >=0; i--) {
                for (var n = 0; n <= i; n++) {
                    if(aust.likes.data.length[n-1]>aust.likes.data.length[n]){
                        var temp = aust.likes.data.length[n-1];
                        aust.likes.data.length[n-1] = aust.likes.data.length[n];
                        aust.likes.data.length[n] = temp;
                    }
                }
            }

            if (callback != undefined)
                callback(aust); 

        }
    );
    
}

getPhotos = function(callback) {

    FB.api(
        "/816504545047680/photos?fields=picture,name,id,likes",
        function (response) {

            if (callback != undefined)
                callback(response.data); 

        }
    );
    
}