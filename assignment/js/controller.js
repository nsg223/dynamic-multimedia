app.controller('contentCtrl', function($scope, $http) {
    
    $scope.albums = [];

    $(document).on('fblogin', function() {
    
        getPhotos(function(data) {
            $scope.albums = data;
            $scope.$apply(function() {
                $scope.albums = data;
            });
        });

    });


}).controller('albumCtrl', function($scope, $http) {
    
    $scope.album = [];

    $(document).on('fblogin', function() {

        console.log("Album Ctrl Triggered");

    });


});