/**
 * Control main content view (Album previews/list)
 */
app.controller('contentCtrl', function($scope, $http) {
    
    if (userId == undefined)
        window.location = "#/";

    $scope.albums = [];

        getPageInfo(function(data) {
            $scope.$apply(function() {
                $scope.page = data;
            });
        });
    
        getAlbums(function(data) {

            $scope.$apply(function() {
                $scope.albums = data;
            });
            
            
        });

        getFeed(function(data) {
            console.log(data);
            $scope.$apply(function() {
                    $scope.feeds = data;
            });
        });

})

/**
 * Controller for  Album Individual view
 */
.controller('albumCtrl', function($scope, $routeParams, $http) {
    
    if (userId == undefined)
        window.location = "#/";

        getPhotos($routeParams.id, function(data) {

            for (var i = 0; i < data.length; i++) {

                data[i].hasLiked = false;
                data[i].likeCount = data[i].likes.data.length;

                for (var j = 0; j < data[i].likes.data.length; j++) {
                    if(userId == data[i].likes.data[j].id)
                        data[i].hasLiked = true;
                }

                for (var n = 0; n < data[i].images.length; n++) {
                    if (data[i].images[n].height == 320) {
                        data[i].thumb = data[i].images[n].source; 
                    }
                }
            }

            $scope.$apply(function() {
                $scope.photos = data;

                getAlbumInfo($routeParams.id, function(albumData) {
                $scope.album = albumData;
                $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ albumData.location +'%2C%20au%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
                    .then(function(response){
                        $scope.album.weather = response.data.query.results.channel;
                    });
                });

            });

        });


    $scope.likeImage = function(imageId) {

        FB.api(
            "/" + imageId + "/likes",
            "POST",
            function (response) {
                console.log(response);
            }
        );

    }

    $scope.unLikeImage = function(imageId) {

        FB.api(
            "/" + imageId + "/likes",
            "DELETE",
            function (response) {
                console.log(response);
            }
        );

    }

});