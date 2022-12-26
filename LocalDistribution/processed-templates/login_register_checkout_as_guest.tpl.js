define('login_register_checkout_as_guest.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "in";
},"3":function(container,depth0,helpers,partials,data) {
    return " <button href=\"#\" class=\"login-register-checkout-as-guest-button-show\" data-toggle=\"collapse\" data-target=\"#guest-show-view,#guest-view\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Checkout as a Guest",{"name":"translate","hash":{},"data":data}))
    + " </button> ";
},"5":function(container,depth0,helpers,partials,data) {
    return " <form class=\"login-register-checkout-as-guest-form\" method=\"POST\" novalidate><div class=\"login-register-checkout-as-guest-control-group\"><button type=\"submit\" class=\"login-register-checkout-as-guest-submit\"> "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Checkout as a Guest",{"name":"translate","hash":{},"data":data}))
    + " </button></div></form> ";
},"7":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Checkout as a Guest",{"name":"translate","hash":{},"data":data}))
    + " ";
},"9":function(container,depth0,helpers,partials,data) {
    return " "
    + container.escapeExpression((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"Checkout as a guest and you will have an opportunity to create an account when you are finished.",{"name":"translate","hash":{},"data":data}))
    + " ";
},"11":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"login-register-checkout-as-guest-control-group\" data-validation=\"control-group\"><label class=\"login-register-checkout-as-guest-control-label\" for=\"register-firstname\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"First Name <small class=\"login-register-checkout-as-guest-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-checkout-as-guest-controls\" data-validation=\"control\"><input type=\"text\" name=\"firstname\" id=\"guest-firstname\" class=\"login-register-checkout-as-guest-input\"></div></div><div class=\"login-register-checkout-as-guest-control-group\" data-validation=\"control-group\"><label class=\"login-register-checkout-as-guest-control-label\" for=\"guest-lastname\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Last Name <small class=\"login-register-checkout-as-guest-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-checkout-as-guest-controls\" data-validation=\"control\"><input type=\"text\" name=\"lastname\" id=\"guest-lastname\" class=\"login-register-checkout-as-guest-input\"></div></div> ";
},"13":function(container,depth0,helpers,partials,data) {
    return " <div class=\"login-register-checkout-as-guest-form-controls-group\" data-validation=\"control-group\"><div class=\"login-register-checkout-as-guest-register-form-controls\" data-validation=\"control\"><input value=\"true\" type=\"hidden\" name=\"redirect\" id=\"redirect\" ></div></div> ";
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"login-register-checkout-as-guest-control-group\" data-validation=\"control-group\"><label class=\"login-register-checkout-as-guest-control-label\" for=\"register-email\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Email Address <small class=\"login-register-checkout-as-guest-required\">*</small>",{"name":"translate","hash":{},"data":data}))
    + " </label><div class=\"login-register-checkout-as-guest-controls\" data-validation=\"control\"><input type=\"email\" name=\"email\" id=\"guest-email\" class=\"login-register-checkout-as-guest-input\" placeholder=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"your@email.com",{"name":"translate","hash":{},"data":data}))
    + "\" value=\"\"><p class=\"login-register-checkout-as-guest-help-block\"><small>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"We need your email address to contact you about your order.",{"name":"translate","hash":{},"data":data}))
    + "</small></p></div></div> ";
},"17":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <hr><div class=\"login-register-checkout-as-guest-register-header collapse in\" id=\"register-show-view\"><p class=\"login-register-checkout-as-guest-description\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Create an account and take advantage of faster checkouts and other great benefits.",{"name":"translate","hash":{},"data":data}))
    + " </p><button class=\"login-register-checkout-as-guest-button-show\" data-toggle=\"collapse\" data-target=\"#register-show-view,#register-view\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Create Account",{"name":"translate","hash":{},"data":data}))
    + " </button></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"login-register-checkout-as-guest-header collapse "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hideRegister") : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"guest-show-view\"><p class=\"login-register-checkout-as-guest-description\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Checkout as a guest and you will have an opportunity to create an account when you are finished.",{"name":"translate","hash":{},"data":data}))
    + " </p> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"expandGuestUserEnabled") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + " </div><div class=\"login-register-checkout-as-guest-body collapse "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hideRegister") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" id=\"guest-view\"><p class=\"login-register-checkout-as-guest-description\"> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hideRegister") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + " </p><form class=\"login-register-checkout-as-guest-form\" method=\"POST\" novalidate> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showGuestFirstandLastname") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isRedirect") : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showGuestEmail") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " <div class=\"login-register-checkout-as-guest-form-messages\" data-type=\"alert-placeholder\"></div><div class=\"login-register-checkout-as-guest-control-group\"><button type=\"submit\" class=\"login-register-checkout-as-guest-submit\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Proceed to Checkout",{"name":"translate","hash":{},"data":data}))
    + " </button></div></form></div> "
    + ((stack1 = compilerNameLookup(helpers,"unless").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"hideRegister") : depth0),{"name":"unless","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'login_register_checkout_as_guest'; return template;});