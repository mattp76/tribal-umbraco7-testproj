angular.module('umbraco')
    .directive('contentPicker',
    [
        'dialogService', 'entityResource', function (dialogService, entityResource) {
            return {
                restrict: 'E',
                scope: {
                    label: '@',
                    model: '=ngModel'
                },
                require: 'ngModel',
                templateUrl: '/App_Plugins/DDBGridEditors/directives/contentPicker.template.html',
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

                            entityResource.getById(val, "Document").then(function (item) {
                                scope.document = item.name;
                            });
                        }
                    };

                    scope.setContent = function () {
                        dialogService.treePicker({
                            section: 'content',
                            multiPicker: false,                            
                            callback: function (document) {
                                scope.document = document.name;
                                ctrl.$setViewValue(document.id);
                            }
                        });
                    }

                    scope.removeContent = function () {
                        ctrl.$setViewValue(undefined);
                        scope.document = undefined;
                    }
                }
            }
        }
    ]);