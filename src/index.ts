import axios from 'axios';
import { parse, valid } from 'node-html-parser';
import { Article } from './interfaces/Article';

export async function getExplanation(keyword: string): Promise<Article | null> {
  const result = await axios
  .get(encodeURI(`http://sum.in.ua/?swrd=${keyword}`))
  .then((response) => {
    // TODO: improve type definition
    const content: string = response.data
    const root = parse(content, { parseNoneClosedTags: true })

    // Parse article
    const articleEl = root.querySelector('[itemprop=articleBody]')
    if (articleEl) {
      const titleEl = articleEl.querySelector('[itemprop=headline]')

      return {
        title: titleEl?.innerText,
        text: articleEl.structuredText
      } as Article
    }

    // Parse alternatives
    const alternativesEL = root.querySelector('#search-res ul')
    if (alternativesEL && alternativesEL.childNodes.length > 0) {
      const alternatives = alternativesEL.childNodes.map(n => n.text)
      return {
        alternatives
      } as Article
    }

    return null
  })
  .catch(function (error) {
    console.log(error);

    return null;
  });

  return result;
}

export { Article } from './interfaces/Article';
