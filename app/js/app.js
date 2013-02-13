angular.module('app', [])
    .directive('smartImage', function($timeout){
        var directiveDefinitionObject = {
            templateUrl: 'partials/smartImage.html',
            scope: {
                'src':'@src',
                'width':'@width',
                'height':'@height'
            },
            replace: true,
            link: function(scope, element, attrs) {

                console.log('smart-image!');

                scope.imageLoaded = false;

                //0) start loading image
                var image = new Image;
                image.onload = onLoadImage;

                var requestedUrl = null;
                var haveRequestImage = false;

                function requestImage(url) {
                    requestedUrl = url;
                    if(haveRequestImage){
                        return;
                    }
                    haveRequestImage = true;
                    $timeout(applyRequest, 1000);
                }

                function applyRequest(){
                    scope.imageLoaded = false;
                    image.src = requestedUrl;
                    haveRequestImage = false;
                }

                function onLoadImage(){
                    //2) wait image has loaded
                    console.log('onloadimage', this);
                    //scope.loaderIsVisible = false;
                    scope.$apply(function(){
                        scope.imageLoaded = true;
                        scope.imageSrc = scope.src;
                        if(scope.width <= 0){
                            scope.width = image.width;
                        }
                        if(scope.height <= 0){
                            scope.height = image.height;
                        }
                    });
                }

                scope.$watch('src', function(newValue, oldValue){
                    requestImage(newValue);
                })

                scope.$watch('width', function(newValue){
                    if(!newValue){
                        newValue = 0;
                    }

                    scope.imageWidth = newValue + 'px';
                })

                scope.$watch('height', function(newValue){
                    if(!newValue){
                        newValue = 0;
                    }

                    scope.imageHeight = newValue + 'px';
                })

                scope.imageIsVisible = function(){
                    return scope.imageLoaded;
                }

                scope.preloaderIsVisible = function(){
                    return !scope.imageLoaded;
                }

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