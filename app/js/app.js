angular.module('app', [])
    .directive('smartImage', function(){
        var directiveDefinitionObject = {
            scope: {
                'src':'@src'
            },
            link: function(scope, element, attrs) {

                console.log('smart-image!');
                console.log('src', scope);


                //0) start loading image
                var image = new Image;
                image.onload = onLoadImage;
                function onLoadImage(){
                    //2) wait image has loaded
                    console.log('onloadimage', this)
                }

                var requestedUrl = null;
                var haveRequestImage = false;

                function requestImage(url) {
                    requestedUrl = url;
                    if(haveRequestImage){
                        return;
                    }
                    haveRequestImage = true;
                    setTimeout(applyRequest, 1000);
                }

                function applyRequest(){
                    image.src = requestedUrl;
                    haveRequestImage = false;
                }

                scope.$watch('src', function(newValue, oldValue){
                    requestImage(newValue);
                })


                //TODO:
                //1) show preloader

                //3) hide preloader and show image
            }
        }
        return directiveDefinitionObject;
    });

function ImagesCtrl($scope){
    $scope.imageUrl = 'http://distilleryimage9.s3.amazonaws.com/b9ebba5271de11e2871d22000a1f92db_7.jpg';
}