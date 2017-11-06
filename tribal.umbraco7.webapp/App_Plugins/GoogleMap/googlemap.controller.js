angular.module("umbraco")
    .controller("My.GoogleMapController",
    function ($scope, assetsService) {
        $scope.setMap = function () {

            setTimeout(function () { googleMap($scope.model.value) }, 1000);
        }

        assetsService.load(['/App_Plugins/GoogleMap/googlemap.js']).then(function () {

           $scope.loaded = true;
            //if ($scope.model.value) {

            //    googleMap($scope.model.value);

            //}
        });

        assetsService.loadCss("~/App_Plugins/GoogleMap/googlemap.css");

    });