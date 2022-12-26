define('order_wizard_register_guest_module.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"order-wizard-register-guest-module-form-container collapse\" id=\"register-guest-show-view\"><form><div data-view=\"RegisterGuestForm\"></div><p><button type=\"submit\" class=\"order-wizard-register-guest-module-create-account-button\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Create Account",{"name":"translate","hash":{},"data":data}))
    + " </button></p></form></div><p><button class=\"order-wizard-register-guest-module-button-toggle-create-account\" data-action=\"remove-button\" data-toggle=\"collapse\" data-target=\"#register-guest-show-view\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Create Account",{"name":"translate","hash":{},"data":data}))
    + " </button></p>  ";
},"useData":true}); template.Name = 'order_wizard_register_guest_module'; return template;});