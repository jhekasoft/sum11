import axios from 'axios';
import { parse, valid } from 'node-html-parser';
import { Article } from './interfaces/Article';
import { Config, ServiceType } from './interfaces/Config';
import { JhekasoftArticle } from './interfaces/Jhekasoft';

let config: Config = {}

export function setConfig(cfg: Config): boolean {
  config = cfg
  return true
}

export async function getExplanation(keyword: string): Promise<Article | null> {
  switch (config.type) {
    case ServiceType.SumJhekasoft:
      return getSumJhekasoftExplanation(keyword)
    default:
      return getSumInUaExplanation(keyword)
  }
}

async function getSumInUaExplanation(keyword: string): Promise<Article | null> {
  const baseUrl = config.baseUrl ?? "https://sum.in.ua/"

  const result = axios
  .post(`${baseUrl}search`, {
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

async function getSumJhekasoftExplanation(keyword: string): Promise<Article | null> {
  const baseUrl = config.baseUrl ?? "https://sum.jhekasoft.lol/"

  const result = axios
  .get(`${baseUrl}sum/articles/${keyword}`)
  .then((response) => {
    const article = response.data as (JhekasoftArticle | null)
    
    if (!article) {
      return null
    }

    if (article.Data) {
      return {
        title: article.Data.Word ?? "",
        text: article.Data.Desc ?? "",
        url: ""
      } as Article
    }

    return {
      alternatives: article.Alternatives,
      url: ""
    } as Article
  })
  .catch(function (error) {
    return Promise.reject(error);
  });

  return result
}

export { Article } from './interfaces/Article';
export { ServiceType, Config } from './interfaces/Config';
