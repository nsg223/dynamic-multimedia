app.controller('contentCtrl', function($scope, $http) {
    
$scope.albums = [];

$(document).on('fblogin', function() {
 
    getPhotos(function(data) {
        $scope.albums = data;
        $scope.apply();
        console.log("Photos Set in Scope!");
        console.log($scope.albums);
    });

});


});