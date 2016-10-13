/**
 * Control main content view (Album previews/list)
 */
app.controller('contentCtrl', function($scope, $http) {
    
    $scope.albums = [];

    $(document).on('fblogin', function() {
    
        getAlbums(function(data) {
            // $scope.albums = data;
            $scope.$apply(function() {
                $scope.albums = data;
            });
        });

    });


})

/**
 * Control Album Individual view
 */
.controller('albumCtrl', function($scope, $http, $routeParams) {
    
    $scope.album = [];

    $(document).on('fblogin', function() {

        console.log("Album Ctrl Triggered");

        getPhotos($routeParams.id, function(data) {

        for (var i = 0; i < data.length; i++) {

            data[i].hasLiked = false;

            console.log(userId);

            for (var j = 0; j < data[i].likes.data.length; j++) {
                if(1121314194570618 == data[i].likes.data[j].id)
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
            });
        });

    });

    $scope.likeImage = function(imageId) {

        FB.api(
            "/" + imageId + "/likes",
            "POST",
            function (response) {
                // if (callback != undefined)
                //     callback(response.data); 
                console.log(response);
            }
        );

    }

});