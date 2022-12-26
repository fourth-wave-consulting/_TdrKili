define('order_wizard_promocodeform.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <div class=\"order-wizard-promocodeform\"><div class=\"order-wizard-promocodeform-expander-head\"><a class=\"order-wizard-promocodeform-expander-head-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#order-wizard-promocode\" aria-expanded=\"false\" aria-controls=\"order-wizard-promocode\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Have a Promo Code?",{"name":"translate","hash":{},"data":data}))
    + " <i class=\"order-wizard-promocodeform-tooltip\" data-toggle=\"tooltip\" title=\""
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"<b>Promo Code</b><br>To redeem a promo code, simply enter your information and we will apply the offer to your purchase during checkout.",{"name":"translate","hash":{},"data":data}))
    + "\"></i><i class=\"order-wizard-promocodeform-expander-toggle-icon\"></i></a></div><div class=\"order-wizard-promocodeform-expander-body collapse\" id=\"order-wizard-promocode\"  data-type=\"promo-code-container\" data-action=\"show-promo-code-container\" aria-expanded=\"false\" data-target=\"#order-wizard-promocode\"><div class=\"order-wizard-promocodeform-expander-container\"><div data-view=\"Cart.PromocodeForm\"></div></div></div></div> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"showPromocodeForm") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'order_wizard_promocodeform'; return template;});