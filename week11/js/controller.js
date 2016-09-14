app.controller('photoCtrl', function($scope, $http) {
    $scope.items = [];

    flickrSecret = "da96de7fe7e37c50";
    // flickrkey = "ad0f8252e335a8f7f447419704298aeb";

    /**
     * Signs a Flickr URL.
     */
    flickrSign = function(url) {
        var urlSplit = url.split('?');
        var params = urlSplit[1].split("&");
        params = params.sort();
        for (var i = 0; i < params.length; i++) {
            params[i] = params[i].replace("=", "");
        }
        var stringToSign = params.join("");
        stringToSign = flickrSecret + stringToSign;
        var digest = CryptoJS.MD5(stringToSign);
        var signedURL = url + "&api_sig=" + digest;
        return signedURL;
    }

    /**
     * Gets the items from the Flickr API and Sets them in the scope.
     */
    function get_items(request_url) {
        $http.get(flickrSign(request_url)).then(function(response) {
            data = response.data.photos.photo;
            $scope.items = [];

            for (var i = 0; i < data.length; i++) {
                url = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server +'/' + data[i].id + '_'+ data[i].secret +'_b.jpg';
                thumb = 'https://farm' + data[i].farm + '.staticflickr.com/' + data[i].server +'/' + data[i].id + '_'+ data[i].secret +'_m.jpg';
                temp = {
                    "image": url,
                    "thumb": thumb,
                    "caption": data[i].title
                }
                $scope.items.push(temp);
            }

    });

    }

    get_items('https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=ad0f8252e335a8f7f447419704298aeb&per_page=20&format=json&nojsoncallback=1');

    /**
     * Perform the Flickr Search
     */
    $("#form-submit").submit(function (e){
        e.preventDefault();
        var query = $("#search-form").val();
        query = query.toLowerCase();
        query = query.trim();

        olditems = $scope.items;
        
        get_items('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ad0f8252e335a8f7f447419704298aeb&text=' + query + '&per_page=20&format=json&nojsoncallback=1');

    });

});