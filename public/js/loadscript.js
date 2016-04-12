/*angular.module('ngLoadScript', [])

  .directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });*/

    /*  .directive('script', function($parse, $rootScope, $compile) {
    return {
        restrict: 'E',
        terminal: true,
        link: function(scope, element, attr) {
            if (attr.ngSrc) {
                 var domElem = '<script src="'+attr.ngSrc+'" async defer></script>';
                 $(element).append($compile(domElem)(scope));


            }
        }
    };
});*/