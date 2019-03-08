const frameModule = require("tns-core-modules/ui/frame");
const observableFromObject = require("tns-core-modules/data/observable").fromObject;
const viewModule = require("tns-core-modules/ui/core/view");

function pageLoaded(args) {
  const page = args.object;
  //View Module getViewById returns a reference to an view element by it's ID
  const home = new observableFromObject({
    header: "My Pets Scrap Book",
    footer: "Thiago Glauco Sanchez (c)"
  });
  console.log("gotta here!")
  page.bindingContext = home;

}

exports.pageLoaded = pageLoaded;
