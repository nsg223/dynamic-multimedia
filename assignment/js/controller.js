app.controller('contentCtrl', function($scope, $http) {
    
FB.api(
    "/815157038515764",
    function (response) {
      if (response && !response.error) {
        /* handle the result */
        console.log(response);
      }
    }
);


});