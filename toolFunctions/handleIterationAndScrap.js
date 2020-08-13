const { scrap } = require('./scrap');


//handle asynchronous aspect of the iteration
const handleIterationAndScrap = async(url)=>
{
    for (let y = 0; y < url.length; y++)
    {
        console.log('y',y);
        let goUrl  = url[y]+'&pageNumber='
        await scrap(goUrl,0);
    }
}


module.exports.handleIterationAndScrap = handleIterationAndScrap;