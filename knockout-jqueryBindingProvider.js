;(function($, underlyingProvider, undefined){

  var KO = 'ko-binding';

  var jqBindingProvider = function() {

    this.nodeHasBindings = function(node, bindingContext) {
      return !!$(node).data(KO) ||
        underlyingProvider.nodeHasBindings(node, bindingContext);
    };

    this.getBindings = function(node, bindingContext) {
      var bnd = $(node).data(KO);
      if('function' === typeof bnd) {
        return bnd.apply(node, [ bindingContext['$data'] ]);
      }
      return bnd || underlyingProvider.getBindings(node, bindingContext);
    }

    return this;
  };


  jqBindingProvider.prototype = underlyingProvider;
  ko.bindingProvider.instance = new jqBindingProvider;

  $.fn.ko = function(value) {
    var $this = $(this);
    if(arguments.length == 2) {
      var viewModel = arguments[0]
        , bindings = arguments[1];
      for (var selector in bindings) {
        if(bindings.hasOwnProperty(selector)) {
          $this.find(selector).data(KO, bindings[selector]);
        }
      }
      ko.applyBindings(viewModel, $this.get(0));
    } else {
      $this.data(KO, value);
    }
    return this;
  };
  
})(jQuery, ko.bindingProvider.instance)
