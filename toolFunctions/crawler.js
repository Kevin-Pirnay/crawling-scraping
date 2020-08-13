const puppeteer = require('puppeteer');
const useragent = require('random-useragent');


//start from urlOrigin and return more url selected
const crawler = async(url)=>
{
    try{
        //launch browser
        const browser = await puppeteer.launch({headless:true})
    
        const page = await browser.newPage();
    
        await page.setUserAgent(useragent.getRandom())
    
        await page.goto(url);


        //select link  : basic selection
        const link = await page.evaluate(()=>
            Array
                .from(document.querySelectorAll("a"))
                .map(el=>el.getAttribute("href"))
                .filter(item=>item!=null)
                .filter(item=>
                    item.match(new RegExp('https://www.delhaize.be/fr-be/shop/','gi')))
        );

        return link;

    }catch(err){
        console.log(err);
    }
}


module.exports.crawler = crawler