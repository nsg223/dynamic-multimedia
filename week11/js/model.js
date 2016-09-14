app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "templates/splash.htm"
  })
  .when("/photos", {
    templateUrl : "templates/photos.htm",
    controller: 'photoCtrl'
  })
});

flickrSecret = "da96de7fe7e37c50";
// flickrkey = "ad0f8252e335a8f7f447419704298aeb";

/**
 * Signs a Flickr URL.
 */
flickrSign = function(url) {
    var urlSplit = url.split('?');
    var params = urlSplit[1].split("&");
    params = params.sort();
    for (var i = 0; i < params.length; i++) {
        params[i] = params[i].replace("=", "");
    }
    var stringToSign = params.join("");
    stringToSign = flickrSecret + stringToSign;
    var digest = CryptoJS.MD5(stringToSign);
    var signedURL = url + "&api_sig=" + digest;
    return signedURL;
}

/**
 * Logs in the user
 */
flickrLog = function() {
    var getFrobStr = 'https://api.flickr.com/services/rest/?method=flickr.auth.getFrob&api_key=ad0f8252e335a8f7f447419704298aeb&format=json&nojsoncallback=1';
    getFrobStr = flickrSign(getFrobStr);

    $.get(getFrobStr, function(data) {
        frob = data.frob._content;
        var authLink = "http://flickr.com/services/auth/?api_key=ad0f8252e335a8f7f447419704298aeb&perms=write&frob=" + frob;
        authLink = flickrSign(authLink);
        window.open(authLink);
        alert("Click ok after you have signed in to Flickr.");
        authtokenURL = 'https://api.flickr.com/services/rest/?method=flickr.auth.getToken&api_key=ad0f8252e335a8f7f447419704298aeb&format=json&nojsoncallback=1&frob=' + frob;
        authtokenURL = flickrSign(authtokenURL);
          $.get(authtokenURL, function(data) {
              console.log(data);
              $("#login-button").text(data.auth.user.fullname);
        });
    });

}

$("#login-button").click(function (){
    flickrLog();
});