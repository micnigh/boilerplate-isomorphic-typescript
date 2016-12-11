var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!doctype html>\n<html class=\"no-js\" lang=\"\">\n    <head>\n        <meta charset=\"utf-8\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <title>Boilerplate Isomorphic Typescript</title>\n        <meta name=\"description\" content=\"\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n\n        <link rel=\"apple-touch-icon\" href=\""
    + alias4(((helper = (helper = helpers.relPathToBaseUrl || (depth0 != null ? depth0.relPathToBaseUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relPathToBaseUrl","hash":{},"data":data}) : helper)))
    + "favicon.png\">\n        <link rel=\"icon\"\n              type=\"image/png\"\n              href=\""
    + alias4(((helper = (helper = helpers.relPathToBaseUrl || (depth0 != null ? depth0.relPathToBaseUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relPathToBaseUrl","hash":{},"data":data}) : helper)))
    + "favicon.png\">\n        <link rel=\"stylesheet\" href=\""
    + alias4(((helper = (helper = helpers.relPathToBaseUrl || (depth0 != null ? depth0.relPathToBaseUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relPathToBaseUrl","hash":{},"data":data}) : helper)))
    + "css/app.css\">\n    </head>\n    <body>\n        <div id=\"content\">"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n        <script type=\"text/javascript\">\n        //<![CDATA[\n          "
    + ((stack1 = ((helper = (helper = helpers.inlineJS || (depth0 != null ? depth0.inlineJS : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inlineJS","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n        //]]>\n        </script>\n        <script src=\""
    + alias4(((helper = (helper = helpers.relPathToBaseUrl || (depth0 != null ? depth0.relPathToBaseUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relPathToBaseUrl","hash":{},"data":data}) : helper)))
    + "js/lib.js\"></script>\n        <script src=\""
    + alias4(((helper = (helper = helpers.relPathToBaseUrl || (depth0 != null ? depth0.relPathToBaseUrl : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"relPathToBaseUrl","hash":{},"data":data}) : helper)))
    + "js/app.js\"></script>\n    </body>\n</html>\n";
},"useData":true});