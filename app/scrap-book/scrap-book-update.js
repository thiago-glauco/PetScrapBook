const frame = require('tns-core-modules/ui/frame');
const observableFromObject = require('tns-core-modules/data/observable').fromObject;
var scrapBook;

function onPageLoaded(args) {
    const page = args.object;
    let index = page.navigationContext.index;
    scrapBook = page.navigationContext.model;
    page.bindingContext = scrapBook.pages.getItem(index);
}

function onDoneTap(args) {
    const page = args.object;
    frame.getFrameById("root").navigate({
        moduleName: "./scrap-book/scrap-book",
        context: { model: scrapBook }
    });
}

exports.onPageLoaded = onPageLoaded;
exports.onDoneTap = onDoneTap;

