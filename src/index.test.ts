import { getExplanation, setConfig, Config, ServiceType } from "."

test('sum.in.ua getExplanation vocabulary', async () => {
  const article = await getExplanation('кіт')
  expect(article.text).not.toBeUndefined()
  expect(article.title).not.toBeUndefined()
  expect(article.url).not.toBeUndefined()
})

test('sum.in.ua getExplanation alternatives', async () => {
  const article = await getExplanation('пси')
  expect(article.text).toBeUndefined()
  expect(article.title).toBeUndefined()
  expect(article.alternatives.length).toBeGreaterThan(0)
  expect(article.url).not.toBeUndefined()
})

test('jhekasoft getExplanation vocabulary', async () => {
  setConfig({
    type: ServiceType.SumJhekasoft,
    baseUrl: "http://localhost:1988/"
  })

  const article = await getExplanation('кіт')
  console.log(article)
  expect(article.text).not.toBeUndefined()
  expect(article.title).not.toBeUndefined()
  expect(article.url).not.toBeUndefined()
})

test('jhekasoft getExplanation alternatives', async () => {
  setConfig({
    type: ServiceType.SumJhekasoft,
    baseUrl: "http://localhost:1988/"
  })

  const article = await getExplanation('пси')
  console.log(article)
  expect(article.text).toBeUndefined()
  expect(article.title).toBeUndefined()
  expect(article.alternatives.length).toBeGreaterThan(0)
  expect(article.url).not.toBeUndefined()
})
