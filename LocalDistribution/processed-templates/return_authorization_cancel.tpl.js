define('return_authorization_cancel.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"return-authorization-cancel-modal\"><h4>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Are you sure you want to cancel this return request?",{"name":"translate","hash":{},"data":data}))
    + "</h4><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"The status of the request will change to \"Cancelled\" but it won't be removed.",{"name":"translate","hash":{},"data":data}))
    + "</p><div class=\"return-authorization-cancel-modal-actions\"><button class=\"return-authorization-cancel-modal-cancel-button\" data-action=\"delete\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Cancel Return",{"name":"translate","hash":{},"data":data}))
    + " </button><button class=\"return-authorization-cancel-modal-close-button\" data-dismiss=\"modal\" data-action=\"cancel\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Close",{"name":"translate","hash":{},"data":data}))
    + " </button></div></div>  ";
},"useData":true}); template.Name = 'return_authorization_cancel'; return template;});