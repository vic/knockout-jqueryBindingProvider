;(function($, underlyingProvider, undefined){

  var KO = 'ko-binding', DATA = 'data-bind';

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

  var bindChilds = function($this, bindings) {
    for (var selector in bindings) {
      if(bindings.hasOwnProperty(selector)) {
        var el, value = bindings[selector];
        el = $this.find(selector);
        if(el && el.length > 0) {
          if(typeof value === 'string') {
            el.attr(DATA, value);
          } else {
            $this.data(KO, value);
          }
        }
      }
    }
  };

  $.fn.ko = function(value) {
    var $this = $(this);
    if(arguments.length === 2) {
      var viewModel = arguments[0]
        , bindings = arguments[1];
      if (typeof bindings === 'string') {
        $this.attr(DATA, bindings);
      } else {
        bindChilds($this, bindings);
      }
      $this.each(function() {
        ko.applyBindings(viewModel, this);
      });
    } else {
      if(typeof value === 'string') {
        $this.attr(DATA, value);
      } else if(typeof value === 'object') {
        bindChilds($this, value);
      } else {
        $this.data(KO, value);
      }
    }
    return this;
  };

})(jQuery, ko.bindingProvider.instance)
