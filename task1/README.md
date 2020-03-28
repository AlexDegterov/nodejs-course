## Task 1. Caesar cipher CLI tool

**Запуск приложения:**

Приложение запускается из консоли командой:
```bash
node app.js "параметры запуска приложения"
```

**Параметры запуска приложения:**

Работа с приложением выполняется через указание 4-х параметров (короткая запись или полная):

1.  **-s, --shift**: цифра, задающая смещение (обязательный параметр)
2.  **-i, --input**: путь или название входного файла с текстом для преобразования. При отсутствии параметра идет считывание данных, вводимых в консоль после запуска приложения
3.  **-o, --output**: путь или название выходного файла для сохранения преобразованного текста.  При отсутствии параметра результаты преобразования выводятся в консоль
4.  **-a, --action**: действие "encode" или "decode" (обязательный параметр)

**Примеры использования:**

```bash
$ node app.js -s 7 -a encode -i ./files/input.txt -o ./files/output.txt
```

```bash
$ node app.js --shift 7 --action encode --input ./files/input.txt --output ./files/output.txt
```

```bash
$ node app.js --shift 7 --action decode --input ./files/input_decode.txt --output ./files/output.txt
```

```bash
$ node app.js --shift 7 --action encode
```

```bash
$ node app.js --shift 7 --action encode --output ./files/output.txt
```

```bash
$ node app.js --shift 7 --action encode --input ./files/input.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node app.js --action encode --shift 7
```