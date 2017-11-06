angular.module('umbraco')
    .service('ddbService',
        function ($http) {
            var service = {};
            service.getServiceById = function (id, component) {
                return $http.get('backoffice/Api/Entity/GetServiceEntity',
                    {
                        params: {
                            serviceId: id,
                            component: component
                        }
                    });
            }

            console.log('service', service);

            return service;
        });