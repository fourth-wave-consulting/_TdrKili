define('creditcard_edit_form_securitycode_tooltip.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isVisaMasterOrDiscoverAvailable") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"isAmexAvailable") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " ";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"VISA/Mastercard/Discover",{"name":"translate","hash":{},"data":data}))
    + "</p><p><img src=\""
    + alias3((compilerNameLookup(helpers,"getThemeAssetsPathWithDefault") || (depth0 && compilerNameLookup(depth0,"getThemeAssetsPathWithDefault")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"imageCvvAllCardsURL") : depth0),"img/cvv_all_cards.jpg",{"name":"getThemeAssetsPathWithDefault","hash":{},"data":data}))
    + "\" alt=\"\"></p> ";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"American Express",{"name":"translate","hash":{},"data":data}))
    + "</p><p><img src=\""
    + alias3((compilerNameLookup(helpers,"getThemeAssetsPathWithDefault") || (depth0 && compilerNameLookup(depth0,"getThemeAssetsPathWithDefault")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"imageCvvAmericanCardURL") : depth0),"img/cvv_american_card.jpg",{"name":"getThemeAssetsPathWithDefault","hash":{},"data":data}))
    + "\" alt=\"\"></p> ";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return " <p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"VISA/Mastercard/Discover",{"name":"translate","hash":{},"data":data}))
    + "</p><p><img src=\""
    + alias3((compilerNameLookup(helpers,"getThemeAssetsPathWithDefault") || (depth0 && compilerNameLookup(depth0,"getThemeAssetsPathWithDefault")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"imageCvvAllCardsURL") : depth0),"img/cvv_all_cards.jpg",{"name":"getThemeAssetsPathWithDefault","hash":{},"data":data}))
    + "\" alt=\"\"></p><p>"
    + alias3((compilerNameLookup(helpers,"translate") || (depth0 && compilerNameLookup(depth0,"translate")) || alias2).call(alias1,"American Express",{"name":"translate","hash":{},"data":data}))
    + "</p><p><img src=\""
    + alias3((compilerNameLookup(helpers,"getThemeAssetsPathWithDefault") || (depth0 && compilerNameLookup(depth0,"getThemeAssetsPathWithDefault")) || alias2).call(alias1,(depth0 != null ? compilerNameLookup(depth0,"imageCvvAmericanCardURL") : depth0),"img/cvv_american_card.jpg",{"name":"getThemeAssetsPathWithDefault","hash":{},"data":data}))
    + "\" alt=\"\"></p> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = compilerNameLookup(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? compilerNameLookup(depth0,"isCreditCards") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "  ";
},"useData":true}); template.Name = 'creditcard_edit_form_securitycode_tooltip'; return template;});