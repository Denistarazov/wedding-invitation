# Wedding Invitation — Денис и Диляра

Статический сайт-приглашение. Три файла + папка assets.

## Ключевые файлы

| Файл | Роль |
|---|---|
| `index.html` | Вся разметка, секции сверху вниз |
| `styles.css` | Все стили, CSS-переменные в `:root` |
| `script.js` | Countdown до 26.06.2026, отправка RSVP-формы |

## Секции index.html (по порядку)

1. **`.hero`** — заголовок, love-script, фото пары (`photo-close.png`), конверт
2. **`.date-section`** — календарь, countdown (#cd-days/#cd-hours/#cd-mins), текст с адресами + ссылки на Яндекс.Карты
3. **`.photo-story`** — фото в танце (`photo-dance.png`)
4. **`.wishes`** — 4 wish-карточки с фигурными формами (без цифр, только текст)
5. **`.cheers-section`** — script «Cheers», фото бокалов (`photo-cheers.png`)
6. **`.rsvp-section`** — форма на FormSubmit → den484411@gmail.com
7. **`.finale`** — фото обнимающихся (`photo-embrace.png`), «WITH love»

## CSS-переменные (`:root`)

```css
--paper   #f7efe6   /* фон карточки */
--ink     #25211f   /* основной текст */
--red     #a70f16   /* акцент, цифры, кнопка */
--serif   Cormorant Garamond  /* тело текста, курсив в wish */
--display Oranienbaum         /* заголовки UPPERCASE */
--script  Caveat              /* рукописный — «Пожелание», «love» */
--mono    Anonymous Pro       /* адреса, форма, подписи */
```

## Assets

```
assets/
  photo-close.png     портрет пары (hero, поляроид)
  photo-dance.png     танец (photo-story, поляроид)
  photo-cheers.png    бокалы (cheers, поляроид)
  photo-embrace.png   объятия (finale, поляроид)
  calendar.png        таблица-календарь с кружком на 26
  envelope.png        красный конверт с письмом
  love-script.png     «I love» по диагонали (hero bg)
  cheers-script.png   «Cheers!» по диагонали (cheers bg)
  wish-shape-1..4.png фигурные формы для пожеланий
  reply-paper.png     фон бумаги для RSVP-формы
  line-wave-*.png     волнистые линии-разделители
```

## Wish-карточки — aspect-ratio

Каждая карточка имеет точный `aspect-ratio` по размеру картинки:
- wish-1: `1311/607`  wish-2: `1104/512`
- wish-3: `1308/656`  wish-4: `1385/741`

Контент (`.wish-content`) абсолютно позиционирован `inset: 12% 14% 12%`, текст центрирован, italic Cormorant Garamond 14-16px.

## Запуск локально

```bash
python -m http.server 8081
# http://localhost:8081
```

Preview-сервер: `.claude/launch.json` → порт 8081.

## GitHub

Репо: https://github.com/Denistarazov/wedding-invitation  
Branch: master
