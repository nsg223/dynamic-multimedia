app.controller('contentCtrl', function($scope, $http) {
    
$(document).on('fblogin', function() {

    $scope.albums = [];
 
    getPhotos(function(data) {
        $scope.albums = data;
        console.log("Photos Set in Scope!");
        console.log($scope);
    });

});


});