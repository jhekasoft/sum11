import axios from 'axios';
import { parse, valid } from 'node-html-parser';
import { Article } from './interfaces/Article';

export async function getExplanation(keyword: string): Promise<Article | null> {
  const result = await axios
  .post(`https://sum.in.ua/search`, {
    query: keyword
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    const redirectUrl = (response?.request?.res?.responseUrl ?? '') as string;

    // TODO: improve type definition
    const content: string = response.data
    const root = parse(content, { parseNoneClosedTags: true })

    // Parse article
    const articleEl = root.querySelector('[itemprop=articleBody]')
    if (articleEl) {
      const titleEl = articleEl.querySelector('[itemprop=headline]')

      return {
        title: titleEl?.innerText,
        text: articleEl.structuredText,
        url: redirectUrl
      } as Article
    }

    // Parse alternatives
    const alternativesEL = root.querySelector('#search-res ul')
    if (alternativesEL && alternativesEL.childNodes.length > 0) {
      const alternatives = alternativesEL.childNodes.map(n => n.text)
      return {
        alternatives,
        url: redirectUrl
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
