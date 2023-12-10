import { getExplanation } from "."

test('getExplanation old vocabulary', async () => {
  const article = await getExplanation('кіт')
  expect(article.text).not.toBeUndefined()
  expect(article.title).not.toBeUndefined()
  expect(article.url).not.toBeUndefined()
})

test('getExplanation modern vocabulary', async () => {
  const article = await getExplanation('зазвичай')
  expect(article.text).not.toBeUndefined()
  expect(article.url).not.toBeUndefined()
})

test('getExplanation alternatives', async () => {
  const article = await getExplanation('пси')
  expect(article.text).toBeUndefined()
  expect(article.title).toBeUndefined()
  expect(article.alternatives.length).toBeGreaterThan(0)
  expect(article.url).not.toBeUndefined()
})
