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


}).controller('albumCtrl', function($scope, $http, $routeParams) {
    
    $scope.album = [];
    console.log($routeParams.id);

    $(document).on('fblogin', function() {

        console.log("Album Ctrl Triggered");

        getPhotos(function(data) {
            $scope.$apply(function() {
                $scope.photos = data;
            });
        });

    });


});