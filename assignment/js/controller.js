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
    console.log($routeParams.id);

    $(document).on('fblogin', function() {

        console.log("Album Ctrl Triggered");

        getPhotos($routeParams.id, function(data) {
            $scope.$apply(function() {
                $scope.photos = data;
            });
        });

    });

});