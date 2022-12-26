define('cart_summary_gift_certificate_cell.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return " <p class=\"cart-summary-gift-certificate-cell\"><span class=\"cart-summary-gift-certificate-cell-value\">-"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"giftcertificate") : stack1)) != null ? compilerNameLookup(stack1,"amountapplied_formatted") : stack1), depth0))
    + "</span><span title=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? compilerNameLookup(depth0,"model") : depth0)) != null ? compilerNameLookup(stack1,"giftcertificate") : stack1)) != null ? compilerNameLookup(stack1,"code") : stack1), depth0))
    + "\"><span data-type=\"backbone.collection.view.cell\"></span></span></p>  ";
},"useData":true}); template.Name = 'cart_summary_gift_certificate_cell'; return template;});