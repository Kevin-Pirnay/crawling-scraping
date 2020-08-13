const { crawler } = require('./toolFunctions/crawler');
const { handleIterationAndScrap } = require('./toolFunctions/handleIterationAndScrap')

require('./db/connect')()


const queue  = 
{
    urlOrigin: 'https://www.delhaize.be/fr-be/shop',
}


const { urlOrigin } = queue


crawler(urlOrigin)
    .then(urlSelected =>
        {
            handleIterationAndScrap(urlSelected)
        }
   );


