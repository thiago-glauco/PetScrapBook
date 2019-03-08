const observableFromObject = require("tns-core-modules/data/observable").fromObject;
const view = require("tns-core-modules/ui/core/view");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const frame = require("tns-core-modules/ui/frame");

function scrapBookPageModel(args) {
    const model = new observableFromObject({
        title: "",
        description: "",
        genders: ["male", "female", "other"],
        gender: 0,
        calcAge: function (birthDate) {
            let now = Date.now();
            let diff = Math.abs(now - birthDate) / 1000 / 31536000;
            console.dir(diff.toFixed(1));
            return Math.floor(diff.toFixed(1));
        },
        date: Date.now(),
    });
    return model;
}

function pageLoaded(args) {
    const page = args.object;
    let scrapBook = null;
    if (page.navigationContext != null) {
        scrapBook = page.navigationContext.model;
    } else {
        scrapBook = new observableFromObject({
            pages: new ObservableArray( new scrapBookPageModel( ) ),
        });
    }
    page.bindingContext = scrapBook;
    console.dir(scrapBook.pages);
}


function onItemTap(args) {
    const page = args.object;
    const scrapBook = page.bindingContext;
    frame.getFrameById("root").navigate({
        moduleName: "./scrap-book/scrap-book-update",
        context: { model: scrapBook, index: args.index }
    });
}

function onAddTap(args) {
    const page = args.object;
    const scrapBook = page.bindingContext;
    scrapBook.pages.push(new scrapBookPageModel());
    frame.getFrameById("root").navigate({
        moduleName: "./scrap-book/scrap-book-update",
        context: {
            model: scrapBook,
            index: scrapBook.pages.length - 1
        }
    });
}

exports.onItemTap = onItemTap;
exports.pageLoaded = pageLoaded;
exports.onAddTap = onAddTap;