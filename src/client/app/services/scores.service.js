(function(){
    'use strict'

    angular
        .module('gStudyApp')
        .factory('scoresService', scoresService);

    scoresService.$inject = ['$http', '$log'];

    function scoresService($http, $log) {
        return {
            createScore: createScore,
            updateScore: updateScore
        };

        function createScore(score) {
            return $http.post('/api/scores/create', score)
                .then(scoreComplete)
                .catch(scoreComplete);

            function scoreComplete(response) {
                console.log(response.data);
                return response.data;
            }

            function scoreFailed(error) {
                $log.error('XHR Failed for score.' + error.data);
            }
        }

        function updateScore(score) {
            console.log(score);
            return $http.put('/api/scores/update', score)
                .then(scoreComplete)
                .catch(scoreComplete);

            function scoreComplete(response) {
                console.log(response.data);
                return response.data;
            }

            function scoreFailed(error) {
                $log.error('XHR Failed for score.' + error.data);
            }
        }
    }
})();