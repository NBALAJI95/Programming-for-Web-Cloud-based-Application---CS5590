/**
 * Created by karthik on 7/14/17.
 */
var myapp = angular.module('app',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('addController',function($scope,$http){
    $scope.addbook = function(){
        console.log($scope.firstName);

        var dataParams = {
            'firstName' : $scope.firstName,
            'lastName' : $scope.lastName,
            'emailID' : $scope.emailID,
            'edition' : $scope.edition,
            'grades':$scope.grades,
            'address':$scope.address
        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };
        var req = $http.post('http://127.0.0.1:8081/create',dataParams);
        req.success(function(data, status, headers, config) {
            $scope.message = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});


myapp.controller('homeController',function($scope,$http){

    $scope.getData=function(){
        var req = $http.get('http://127.0.0.1:8081/get');
        req.success(function(data, status, headers, config) {
            $scope.bookList = data;
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });

    };

    $scope.delete = function(id,callback){
        console.log(id);
        $http.get('http://127.0.0.1:8081/delete/'+id)
            .success(function(data){
                console.log("Successfully deleted");
                $scope.getData();
            });
    };


    $scope.update = function(book,callback){
        console.log(book);
        console.log('********');
        $http.get('http://127.0.0.1:8081/update/'+book._id,{params:book})
            .success(function(data){
                console.log("Successfully updated");
                $scope.getData();
            });
    }

});

