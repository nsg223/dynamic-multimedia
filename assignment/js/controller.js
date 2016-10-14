/**
 * Control main content view (Album previews/list)
 */
app.controller('contentCtrl', function($scope) {
    
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

})

/**
 * Controller for  Album Individual view
 */
.controller('albumCtrl', function($scope, $routeParams) {
    
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