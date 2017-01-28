angular
    .module('BlogApp',[])
    .controller('BlogController',BlogController);

function BlogController($scope,$http)
{
    $scope.todos=[];

    $scope.CreateTodo = CreateTodo;

    function CreateTodo(todo){
         $scope.BlogPosts.push(todo);
    }

    $http.get('/hello')
        .success(function(res){
         console.log(res)
         $scope.todos=res;
        })
}