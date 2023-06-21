# SUM11

Sum.in.ua site parser. Ukrainian dictionary.

## Usage

```bash
npm install --save sum11
```

JavaScript:

```js
import { Article, getExplanation } from 'sum11';

const article = await getExplanation(keyword);

console.log(article.title);
// Output: КІТ
console.log(article.text);
// Output: КІТ, кота, чол. Свійська тварина родини котячих...
console.log(article.alternatives);
// Output: ["кіт", "кит"]
```

TypeScript:

```ts
import { getExplanation } from 'sum11';

const article = await getExplanation(keyword);

console.log(article?.title);
// Output: КІТ
console.log(article?.text);
// Output: КІТ, кота, чол. Свійська тварина родини котячих...
console.log(article?.alternatives);
// Output: ["кіт", "кит"]
```
