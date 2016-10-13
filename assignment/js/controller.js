app.controller('contentCtrl', function($scope, $http) {
    
$(document).on('fblogin', function() {
 
    getPhotos(function(aust) {

        $scope.photos = aust;
        console.log("Photos Set in Scope!");

    });

});


});