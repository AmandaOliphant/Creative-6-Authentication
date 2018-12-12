var photo = angular.module('photo', ['firebase']);
photo.controller('MainCtrl', ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        var ref = firebase.database().ref();
        $scope.photos = $firebaseArray(ref);
        $scope.addPhoto = function(photo) {
            var username = document.getElementById("welcome-status").textContent;
            if (!username) {
                username = "Anonymous";
            }
            var newurl = photo.photoURL;
            if (!newurl) {
                newurl = "https://i.ytimg.com/vi/UWfZ9SnreEo/hqdefault.jpg";
            }
            var newTitle = photo.title;
            if (!newTitle) {
                newTitle = "Untitled";
            }
            $scope.photos.$add({
                url: newurl,
                title: newTitle,
                user: username
            });
            photo.photoURL = '';
            photo.title = '';
        }
    }
]);
