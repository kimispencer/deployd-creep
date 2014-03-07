/*
    * angularjs app for CREEP.com
    * by Kimi Spencer
    * kimispencer.com
    * Jan. 09, 2014
*/

var creep = angular.module('creep', ['angularSmoothscroll', 'ngRoute']);

// run our app
creep.run(['$rootScope', '$window', '$location', function($rootScope, $window, $location) {
  // dimensions
  $rootScope.iphone_width = 320;
    $rootScope.widePhone_width = 480;
  $rootScope.tablet_width = 768;
    $rootScope.window_width = document.documentElement.clientWidth;

  // similar to $scope.$apply(), but checks to see if a digest is in progress
    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    // close nav initially on mobile devices
    $rootScope.navClosed = $rootScope.window_width < $rootScope.tablet_width;

    // watch window_width on resize
    angular.element($window).bind('resize', function() {
        if($rootScope.window_width === document.documentElement.clientWidth) return false;
        $rootScope.window_width = document.documentElement.clientWidth;
        // close nav initially on mobile devices
      $rootScope.navClosed = $rootScope.window_width < $rootScope.tablet_width;
        // apply resize
        $rootScope.safeApply();
    });

    // toggle flyout nav
    $rootScope.toggleNav = function() {
        $rootScope.navClosed = !$rootScope.navClosed;
    }

    // go to page
    $rootScope.go = function (url) {
        // close flyout nav on page change
        if($rootScope.window_width < $rootScope.tablet_width) {
            $rootScope.navClosed = true;
        }
        // go to page
        $location.path(url);
    };

}]);

// configure our app
creep.config(function($routeProvider, $locationProvider) {
    // page routing
    $routeProvider
        // route for the home / images page
        .when('/', {
            templateUrl : 'pages/images.html',
            controller  : 'ImagesCtrl'
        })

        .when('/images', {
            templateUrl : 'pages/images.html',
            controller  : 'ImagesCtrl'
        })

        // route for the news page
        .when('/news', {
            templateUrl : 'pages/news.html',
            controller  : 'NewsCtrl'
        })

        // route for the audio page
        .when('/audio', {
            templateUrl : 'pages/audio.html',
            controller  : 'AudioCtrl'
        })

        // route for the video page
        .when('/video', {
            templateUrl : 'pages/video.html',
            controller  : 'VideoCtrl'
        })

        // route for the tour page
        .when('/tour', {
            templateUrl : 'pages/tour.html',
            controller  : 'TourCtrl'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'ContactCtrl'
        });

        // gets ride of hashtag in urls (but requires HTML5 browsers)
        // $locationProvider.html5Mode(true);
});

// controllers
creep.controller('MainCtrl', function($scope, $rootScope){
});

creep.controller('ImagesCtrl', function($scope, $rootScope, $http){  

    var set_id = '72157640063878584',
        api_key = '10787874afc03da8009bba6493f415c8',
        param = 'url_o',
        url = 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + api_key +'&photoset_id=' + set_id + '&extras=' + param + '&format=json&nojsoncallback=1';

    $scope.imageData = [];
    $http.get(url)
        .success(function(data) {
            for (var i=0; i < data.photoset.photo.length; i++) {
                $scope.imageData.push(data.photoset.photo[i].url_o);
            }
        })
        .error(function(err) {
            alert(err);
        });
    console.log( $scope.imageData = []);
});

creep.controller('AudioCtrl', function($scope, $rootScope, $http, $sce){
    // tell angular that the url is a trusted value
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.audioData = [];
    // Get all audio data
    var url = 'http://api.soundcloud.com/users/officialcreep/tracks?client_id=4276dd7923dc4004ac59e56836194189';
    $http.get(url)
        .success(function(data) {
            $scope.loaded = true;
            for (var i=0; i < data.length; i++) {
                $scope.audioData.push("https://w.soundcloud.com/player/?url=" + data[i].uri + "&amp;color=ff6600&amp;auto_play=false&amp;show_artwork=true");
                // console.log($scope.audioData)
            }
        })
        .error(function(err) {
            alert(err);
        });

    // load fewer tracks on mobile devices
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $scope.trackLimit = 3;
    } else {
        $scope.trackLimit = 5;
    }
});

creep.controller('VideoCtrl', function($scope, $rootScope, $sce, $http){
    // tell angular that the url is a trusted value
    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    var url = 'http://gdata.youtube.com/feeds/api/videos?author=officialcreep&max-results=3&v=2&alt=json';

    $scope.urls = [];

    $http.get(url)
        .success(function(data){
            $scope.raw = data.feed.entry;
            // get ids
            for (i=0; i < $scope.raw.length; i++) {
                $scope.id = $scope.raw[i].media$group.yt$videoid.$t;
                $scope.urls.push("//www.youtube.com/embed/" + $scope.id + "?rel=0");
                console.log($scope.urls);
            }
        });
});

creep.controller('TourCtrl', function($scope, $rootScope, $http){
    $scope.tourDates = [];
    // Get all tour dates
    var url = '/tour';
    $http.get(url)
        .success(function(data) {
            $scope.loaded = true;
            $scope.tourDates = data;
        })
        .error(function(err) {
            alert(err);
        });
});

creep.controller('NewsCtrl', function($scope, $rootScope, $http, $window){
    $scope.news = [];
    // Get all news data
    var url = '/news';
    $http.get(url)
        .success(function(data) {
            $scope.loaded = true;
            $scope.news = data;
        })
        .error(function(err) {
            alert(err);
        });

    $scope.goTo = function(src) {
        $window.open(src);
    }
});

creep.controller('ContactCtrl', function($scope, $rootScope, $http){
    $scope.contactInfo = [];
    // Get all contact info
    var url = '/contact';
    $http.get(url)
        .success(function(data) {
            $scope.loaded = true;
            $scope.contactInfo = data;
        })
        .error(function(err) {
            alert(err);
        });
});