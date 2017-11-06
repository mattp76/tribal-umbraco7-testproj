angular.module("umbraco")
    .directive('uploadImage', ['dialogService', 'mediaResource', 'mediaHelper'
        , function (dialogService, mediaResource, mediaHelper) {
            return {
                restrict: 'E',
                scope: {
                    label: '@',
                    model: '=ngModel'
                },
                require: 'ngModel',
                templateUrl: '/App_Plugins/DDBGridEditors/directives/uploadImage.template.html',
                link: function (scope, element, attrs, ctrl) {
                    scope.$watch('model', function () {
                        scope.$eval(attrs.ngModel + ' = model');
                    });

                    scope.$watch(attrs.ngModel, function (val) {
                        scope.model = val;
                    });

                    ctrl.$render = function () {
                        var val = parseInt(ctrl.$viewValue);
                        if (!isNaN(val) && angular.isNumber(val) && val > 0) {

                            mediaResource.getById(val, "Media").then(function (item) {
                                scope.imageUrl = item.contentAliasType === 'File' ? item.image : mediaHelper.resolveFile(item, true);
                            });
                        }
                    };
                    scope.setImage = function () {
                        dialogService.mediaPicker({
                            callback: function (media) {
                                ctrl.$setViewValue(media.id);
                                scope.imageUrl = media.contentTypeAlias === 'File' ? media.image : mediaHelper.resolveFile(media, true);                                
                            }
                        });
                    }

                    scope.removeImage = function () {
                        ctrl.$setViewValue(undefined);
                        scope.imageUrl = '';
                    }
                }
            }
        }]);