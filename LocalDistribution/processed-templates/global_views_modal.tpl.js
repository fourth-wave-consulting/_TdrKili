define('global_views_modal.tpl', ['Handlebars','Handlebars.CompilerNameLookup'], function (Handlebars, compilerNameLookup){ var template = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <h2 class=\"global-views-modal-content-header-title\"> "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"pageHeader") || (depth0 != null ? compilerNameLookup(depth0,"pageHeader") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pageHeader","hash":{},"data":data}) : helper)))
    + " </h2> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return " <div class=\"modal-dialog global-views-modal "
    + container.escapeExpression(((helper = (helper = compilerNameLookup(helpers,"modalDialogClass") || (depth0 != null ? compilerNameLookup(depth0,"modalDialogClass") : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"modalDialogClass","hash":{},"data":data}) : helper)))
    + "\"><div class=\"global-views-modal-content\"><div id=\"modal-header\" class=\"global-views-modal-content-header\"><button type=\"button\" class=\"global-views-modal-content-header-close\" data-dismiss=\"modal\" aria-hidden=\"true\"> &times; </button> "
    + ((stack1 = compilerNameLookup(helpers,"if").call(alias1,(depth0 != null ? compilerNameLookup(depth0,"showPageHeader") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " </div><div id=\"modal-body\" data-type=\"modal-body\" class=\" global-views-modal-content-body\" data-view=\"Child.View\"></div></div></div>  ";
},"useData":true}); template.Name = 'global_views_modal'; return template;});