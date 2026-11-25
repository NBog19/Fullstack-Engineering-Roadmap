# 03. Синтаксис и обработка данных

## Переменные и типы

```js
const region = "Москва";
let amount = 120000;
amount += 10000;
const active = true;
```

const запрещает повторное присваивание переменной, но не делает объект неизменяемым. let разрешает присваивание. Основные примитивы: string, number, bigint, boolean, undefined, null, symbol. Массивы относятся к объектам.

```js
console.log(typeof 42); // number
console.log(5 === "5"); // false
console.log(Number("42")); // 42
```

Используйте строгое сравнение ===, когда не требуется неявное преобразование типов. Для денежных расчётов важно учитывать погрешность чисел с плавающей точкой; в учебных примерах суммы целые.

## Сравнение с Python

| Python | JavaScript |
| --- | --- |
| None | null (явное отсутствие значения) |
| True / False | true / false |
| def f(x): | function f(x) |
| len(items) | items.length |
| [x for x in items if x > 0] | items.filter(x => x > 0) |
| sum(items) | items.reduce((s, x) => s + x, 0) |
| dict | объект или Map, в зависимости от задачи |

## Функции и коллекции

```js
const rows = [
  { region: "Москва", amount: 120000 },
  { region: "Казань", amount: 80000 },
  { region: "Сочи", amount: 60000 }
];

const filtered = rows.filter(row => row.amount >= 80000);
const names = filtered.map(row => row.region);
const sum = filtered.reduce((total, row) => total + row.amount, 0);
console.log(names, sum); // Москва, Казань; 200000
```

filter выбирает элементы, map преобразует их, reduce объединяет в одно значение. Начальное значение 0 обеспечивает корректный результат на пустом массиве.

## Объекты, копирование и модули

```js
const original = { region: "Москва", amount: 120000 };
const changed = { ...original, amount: 130000 };
console.log(original.amount); // 120000
```

Spread создаёт поверхностную копию объекта. Вложенные объекты остаются общими, если их отдельно не копировать.

Модуль может экспортировать функцию через export, а другой файл импортирует её через import. Это позволяет отделить расчёт от интерфейса и тестировать его независимо.

## Проверка входных данных

```js
function validateAmount(value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new TypeError("Некорректная сумма");
  }
  return value;
}
```

В данном учебном отчёте отрицательные суммы запрещены условием задачи; в реальных системах возвраты могут потребовать другой модели данных.

Посмотрите [модуль расчётов](examples/sales.mjs) и [тесты](examples/sales.test.mjs).
