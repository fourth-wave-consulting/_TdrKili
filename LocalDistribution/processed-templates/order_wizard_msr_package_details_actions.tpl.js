define('order_wizard_msr_package_details_actions.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <button class=\"order-wizard-msr-package-details-actions-remove-button\" data-action=\"remove-item\" data-item-id=\""
    + alias3(((helper = (helper = compilerNameLookup(helpers,"lineId") || (depth0 != null ? compilerNameLookup(depth0,"lineId") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"lineId","hash":{},"data":data}) : helper)))
    + "\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Remove from Shipment",{"name":"translate","hash":{},"data":data}))
    + " </button><button class=\"order-wizard-msr-package-details-actions-move-button\" data-action=\"move-item\" style=\"display: none;\"> "
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"Move",{"name":"translate","hash":{},"data":data}))
    + " </button>  ";
},"useData":true}); template.Name = 'order_wizard_msr_package_details_actions'; return template;});