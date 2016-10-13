app.controller('contentCtrl', function($scope, $http) {
    
$(document).on('fblogin', function() {
 
    getPhotos(function() {

        $scope.photos = aust;

    });

});


});