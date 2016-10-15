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

userId = undefined; 

/**
 * Prompts a user to login 
 */
$("#login-button").click(function() {

    FB.login(function(response) {
        checkLoginState();
    }, { scope:'publish_actions' });

});

/**
 * Logs out a user
 */
$("#logout-button").click(function() {

    FB.logout(function(response) {
        checkLoginState();
        alert('Logged Out');
    });
    userId = undefined;

});

/**
 * Checks if the user is logged in and displays
 * links appropriately. 
 */
checkLoginState = function() {
        FB.getLoginStatus(function(response) {
            console.log(response);
            if (response.status == "connected") {
                
                $("#login-button").hide();
                $("#logout-button").show();

                getPageInfo();
                getUserInfo(function() {
                    $(document).trigger("fblogin");
                    window.location = "#/content";             
                });

            } else {
                $("#login-button").show();
                $("#logout-button").hide();
                $("#not-logged-in").show();
                $("#logged-in").hide();
                $("#name-menu").html('');
                $("#welcome-text").text('Login... ');
            }
        });
}

/**
 * Waits until the FB load trigger to check login state. 
 */
$(document).on('fbload', function() {
    checkLoginState();
});

/**
 * Gets the pages information
 * Display the name and description
 * usage: getPageInfo();
 */
getPageInfo = function(callback) {

    FB.api(
        "/815157038515764?fields=description,name",
        function (response) {
        if (response && !response.error) {
            // $("#page-title").text(response.name);
            // $("#page-description").text(response.description);
            callback(response);
        }
        }
    );

}

/**
 * Gets the users informations
 * Display their name in the menu and welcome text
 * usage: getUserInfo();
 */
getUserInfo = function(callback) {
    FB.api('/me', function(response) {
        console.log(response);
        $("#name-menu").html('Hi, ' + response.name);
        $("#welcome-text").text('Welcome, ' + response.name);
        $("#not-logged-in").hide();
        $("#logged-in").show();
        userId = response.id;
        callback();
    });
}

/**
 * Gets all of the albums from the page located in Australia
 * Sorted by highest number of likes
 * usage: getAlbums(function (data) { });
 */
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
                for (var n = 1; n <= i; n++) {
                    if(aust[n-1].likes.data.length < aust[n].likes.data.length){
                        var temp = aust[n-1];
                        aust[n-1] = aust[n];
                        aust[n] = temp;
                    }
                }
            }

            if (callback != undefined)
                callback(aust); 

        }
    );
    
}

/**
 * Gets all of the photos from the specified album
 * Sorted by highest number of likes
 * usage: getAlbums(function (data) { });
 */
getPhotos = function(albumID, callback) {

    FB.api(
        "/" + albumID + "/photos?fields=picture,name,id,likes,images,album",
        function (response) {

            if (callback != undefined)
                callback(response.data); 

        }
    );
    
}

/**
 * Gets all of the visitor feed items where admin has liked
 * usage: getFeed(function (data) { });
 */
getFeed = function(callback) {

    FB.api(
        "815157038515764/feed?fields=message,id,likes,story,created_time",
        function (response) {

            feeds = [];

            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].story == undefined && response.data[i].likes != undefined) {
                    for (var n = 0; n < response.data[i].likes.data.length; n++) {
                        if(response.data[i].likes.data[n].id == 815157038515764) {
                            feeds.push(response.data[i]);
                            break;
                        }
                    }
                    
                }
            }

            if (callback != undefined)
                callback(feeds); 

        }
    );
    

}

getAlbumInfo = function(albumID, callback) {

    FB.api(
        "/" + albumID + "/?fields=name,location",
        function (response) {

            if (callback != undefined)
                callback(response.data); 

        }
    );
    
}