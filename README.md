# SUM11

Sum.in.ua site parser. Ukrainian dictionary.

## Usage

```bash
npm install --save sum11
```

### JavaScript

```js
import { Article, getExplanation } from 'sum11';

const article = await getExplanation(keyword);

console.log(article.title);
// Output: КІТ
console.log(article.text);
// Output: КІТ, кота, чол. Свійська тварина родини котячих...
console.log(article.alternatives);
// Output: ["кіт", "кит"]
console.log(article.url);
// Output: https://sum.in.ua/s/kit
```

### TypeScript

```ts
import { getExplanation } from 'sum11';

const article = await getExplanation(keyword);

console.log(article?.title);
// Output: КІТ
console.log(article?.text);
// Output: КІТ, кота, чол. Свійська тварина родини котячих...
console.log(article?.alternatives);
// Output: ["кіт", "кит"]
console.log(article.url);
// Output: https://sum.in.ua/s/kit
```

Set another dictionary API:

```ts
import { Article, getExplanation, setConfig, ServiceType } from "sum11"

setConfig({
  type: ServiceType.SumInUa
})

const article = await getExplanation(keyword);
```

There are two API now in `ServiceType`:
- `SumJhekasoft` (`"sum_jhekasoft"`);
- `SumInUa` (`"sum_in_ua"`).


### Tests
Run tests:

```bash
npm test
```