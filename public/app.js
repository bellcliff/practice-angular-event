(function() {

    'use strict';

    angular.module('mytime', [])
        .run(function($rootScope, $log) {
            $rootScope.$on('from c1', function(e, data) {
                $log.log('in root', 'from c1', data.date)
                $rootScope.$broadcast('from root', data)
            });
        })
        .controller('C1', function($scope, $http, $interval, $log) {
            var self = this;
            // TODO: change to setInterval, and try fix it!
            $interval(function(){
                $http.get('/api').then(function(data){
                    self.date = data.data.date;
                    $scope.$emit('from c1', {date: self.date})
                });
            }, 1000);
            $scope.$on('from root', function(e, data){
                $log.log('in c1', 'from root', data);
            })
        })
        .controller('C2', function($scope, $log) {
            var self = this;
            $scope.$on('from root', function(e, data){
                $log.log('in c2', 'from root', data);
                self.date = data.date;
            })
        });

})();
