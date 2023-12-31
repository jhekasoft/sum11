import axios from 'axios';
import { parse, valid } from 'node-html-parser';
import { Article } from './interfaces/Article';

export async function getExplanation(keyword: string): Promise<Article | null> {
  const result = axios
  .post(`https://sum.in.ua/search`, {
    query: keyword
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    const redirectUrl = (response?.request?.responseURL ?? '') as string;

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
    const alternativesEl = root.querySelector('#search-res ul')
    if (alternativesEl && alternativesEl.childNodes.length > 0) {
      const alternatives = alternativesEl.childNodes.map(n => n.text)
      return {
        alternatives,
        url: redirectUrl
      } as Article
    }

    return null
  })
  .catch(function (error) {
    return Promise.reject(error);
  });

  return result;
}

export { Article } from './interfaces/Article';
