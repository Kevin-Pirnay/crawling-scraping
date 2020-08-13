const puppeteer = require('puppeteer');
const useragent = require('random-useragent');
const Writer = require('./writer')
const Product = require('../db/model/product')


//recursive function to scrap information from the selected url and iterate through all pages of the categories
const scrap = async(url,pg)=>
{
    try{
        //launch browser
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage();
        
        await page.setUserAgent(useragent.getRandom());

        let go = url+pg
        const goto = await page.goto(go);


        //select data to scrap
        const result =await page.evaluate(()=>
            Array
                .from(document.querySelectorAll('.ProductList>li'))
                .map(el=>
                    {
                        return{
                            'pageNumber': el.getAttribute('data-page-number'),
                            'dataId' : el.children[0].getAttribute('data-item-id'),
                            'name' : el.querySelector('.description:nth-child(1)').textContent.trim().split(" ").filter(element=>element.match(/^[a-zA-Z]+$/)).join(" "),
                            'prix' : el.querySelector('.quantity-price').textContent.trim(),
                            'promotion' : el.children[0].getAttribute('data-smart-has-promotion'),
                            'url' : el.baseURI
                        }
                    }
                )
        );

        console.log(result);
        result.forEach(async products=>
            {
                const product = new Product(
                    {
                        pageNumber : products.pageNumber,
                        dataId : products.dataId,
                        name : products.name,
                        prix : products.prix,
                        promotion : products.promotion,
                        url : products.url
                    }
                );
                try{
                    await product.save();
                }catch(err){
                    console.log(err);
                }
            }
        );

        //write data in json file
        let data = {};
        data[go] = result
        const writer = new Writer('log.json')
        writer.writing(data)

        //close browser and remove cookies
        await page.evaluate(()=>
            {
                let allCookies = document.cookie
                let allCookiesSplit= allCookies.split(';').map(element=>element.split('='))
                allCookiesSplit.forEach(element => document.cookie = element[0]+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT")
            }
        );

        await browser.close();

        //condition to stop the recursion
        console.log(goto.status());
        if(goto.status()!=200)
        {
            console.log('finish');
            return;
        }

        //to iterate through all pages using the recursion
        pg++
        console.log('pg',pg);
        await scrap(url,pg)
        
    }catch(err){
        console.log(err);
    }
}

module.exports.scrap = scrap