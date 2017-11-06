angular.module('umbraco')
    .controller('ddb.pageCard.controller',
        function ($scope, contentResource, ddbService, assetsService) {
            assetsService.loadCss('~/assets/css/backoffice.css', $scope)
                .then(function () {
                    if ($scope.control.value != undefined) {
                        ddbService.getServiceById($scope.control.value, 'pagecard')
                            .then(function (response) {

                                console.log('response.data', response.data);

                                $scope.documentDetail = response.data;
                            });
                    }

                    $scope.$watch('control.value',
                        function (val) {
                            if (val == undefined) return;
                            ddbService.getServiceById(val, 'pagecard')
                           .then(function (response) {
                               $scope.documentDetail = response.data;
                           });
                        });
                });
        });