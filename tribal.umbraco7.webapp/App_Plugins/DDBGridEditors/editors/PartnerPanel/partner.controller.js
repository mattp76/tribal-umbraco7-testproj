angular.module("umbraco")
    .controller("ddb.partner.controller",
        function ($scope, dialogService, entityResource, mediaHelper, contentResource) {
            $scope.selectPartner = function ($event) {
                $event.preventDefault();

                dialogService.treePicker({
                    section: 'content',
                    startNodeId: 1117,
                    multiPicker: true,
                    callback: function (items) {
                        if ($scope.control.value == null) $scope.control.value = {};
                        $scope.control.value.partners = items;
                    }
                });
            }

            $scope.remove = function (node) {
                $scope.control.value.partners = _.without($scope.control.value.partners, _.findWhere($scope.control.value.partners, {
                    id: node.id
                }));
            }
        });