---
title: "CLDR, the source of truth for you locale"
excerpt: "And why Angular doesn't have a bug with your currency format"
coverImage: "src/content/posts/2023-09-18-cldr-angular/kyle-glenn-nXt5HtLmlgE-unsplash.jpg"
date: "2023-09-18T00:00:00.000Z"
---

For those who have had to create apps that support internationalization (i18n), you know this is not a trivial issue. Or at least it used to be hard and things have gotten better.

Angular eases the work a lot for us by providing the necessary code to setup and handle locales.

You import the locale and setup the locale provider.

#### **`main.ts`**

```ts
import '@angular/common/locales/global/fr';
bootstrapApplication(App, {providers: [{provide: LOCALE_ID, useValue: 'fr'}]});
```

And the pipes will use that locale for you

#### **`my.component.html`**

```html
  {{ date | date: 'dd MMMM yyyy'}} // 16 septembre 2023 (at the time of writing)
  {{ 35.50 | currency }} // 35,50 $US
  {{ 300_000_000 | number }} // 300 000 000

```

Et voilà.

## The CLDR

But have you ever wondered where this info is comming from ? Enters the CLDR : Common Locale Data Repository.

The CLDR ([wiki](https://en.wikipedia.org/wiki/Common_Locale_Data_Repository)) is a project of the Unicode Consortium that provides locale data for OSs and other software.

Although XML is the official format for all the CLDR data, they also provide [the same data as JSON](https://github.com/unicode-org/cldr-json). This is what Angular uses to generated the locale data in the common module.

## Large variety of data

As of the v44 of the CLDR, you can see that the repo has support for over 600 locales. You can have multiple countries support for a single language (i.e fr-CA for canadian french, fr-CG for french in Congo-Brazzavile etc.).

### Numbers

[Here](https://github.com/unicode-org/cldr-json/tree/f93780d69dbd62550cd0a3eb64aa3c73b2c45e91/cldr-json/cldr-numbers-full/main) an example with the numbers data. Let's check the `fr` locale with the format definition of number in french.

#### **`fr/numbers.json`**

```json
    "symbols-numberSystem-latn": {
        "decimal": ",",
        "group": " ",
        "timeSeparator": ":"
        ...
    },
    ...
    "currencyFormats-numberSystem-latn": {
        "standard": "#,##0.00 ¤",
        ...
    }

```

We can see that the decimal separator is the a comma, the currency (`¤`) is after the number etc.
If you want the meaning of the format, please have a look at the [online doc of the CLDR](https://cldr.unicode.org/translation/number-currency-formats/number-and-currency-patterns).

### Dates

Dates are famous data that needs to be formatted correctly for a great i18n. The CLDR defines has a large set of data related to it.

A short example with the [korean dates](https://github.com/unicode-org/cldr-json/blob/f93780d69dbd62550cd0a3eb64aa3c73b2c45e91/cldr-json/cldr-dates-full/main/ko/ca-gregorian.json)

<table>
<tr><th>Korean </th><th>English</th></tr>
<tr>
<td>

#### **`ko/ca-gregorian.json`**

```json
"months": {
    "format": {
        "wide": {
            "1": "1월",
            "2": "2월",
            "3": "3월",
            "4": "4월",
            "5": "5월",
            "6": "6월",
            "7": "7월",
            "8": "8월",
            "9": "9월",
            "10": "10월",
            "11": "11월",
            "12": "12월"
        },
    }
},
"days": {
    "format": {
        "abbreviated": {
            "sun": "일",
            "mon": "월",
            "tue": "화",
            "wed": "수",
            "thu": "목",
            "fri": "금",
            "sat": "토"
        },
    }
},
...
"dateFormats": {
    "full": "y년 MMMM d일 EEEE",
    "long": "y년 MMMM d일",
    "medium": "y. M. d.",
    "short": "yy. M. d."
},
```

</td>
<td>

#### **`en/ca-gregorian.json`**

```json
"months": {
    "format": {
        "wide": {
            "1": "January",
            "2": "February",
            "3": "March",
            "4": "April",
            "5": "May",
            "6": "June",
            "7": "July",
            "8": "August",
            "9": "September",
            "10": "October",
            "11": "November",
            "12": "December"
        },
    }
},
"days": {
    "format": {
        "abbreviated": {
            "sun": "Sun",
            "mon": "Mon",
            "tue": "Tue",
            "wed": "Wed",
            "thu": "Thu",
            "fri": "Fri",
            "sat": "Sat"
        },
    }
},
...
"dateFormats": {
    "full": "EEEE, MMMM d, y",
    "long": "MMMM d, y",
    "medium": "MMM d, y",
    "short": "M/d/yy"
},
```

</td></tr></table>

### Even more

It doesn't stop just with format data, there so much more.

Let's continue with currency data, [here is](https://github.com/unicode-org/cldr-json/blob/f93780d69dbd62550cd0a3eb64aa3c73b2c45e91/cldr-json/cldr-core/supplemental/currencyData.json#L1093-L1104)
the currency history for each country. If we take the example of Cuba, the US Dollars was a valid currency up until 1959. We have the start of a history lesson here, with 1959 being the start of embargo against Cuba.

#### **`supplemental/currencyData.json`**

```json
    "CU": [
        {
        "CUP": {
            "_from": "1859-01-01"
        }
        },
        {
        "USD": {
            "_from": "1899-01-01",
            "_to": "1959-01-01"
        }
        },
    ]

```

## Do I have a bug ?

So how can I investigate if my display issue is actually a bug or a feature?
I'll illustrate this with issues opened on the Angular repo.

### What's the spanish value for the USD currency ?

Issue [#51671](https://github.com/angular/angular/issues/51671), a user was expecting `$` as the currency symbol when using the italian locale.

Now that we know the existance of the CLDR, we can check ourselves the info at [the source](https://github.com/unicode-org/cldr-json/blob/f93780d69dbd62550cd0a3eb64aa3c73b2c45e91/cldr-json/cldr-numbers-full/main/it/currencies.json#L1112C18-L1112C18).

#### **`it/currencies.json`**

```json
    "USD": {
    "displayName": "dollaro statunitense",
    "displayName-count-one": "dollaro statunitense",
    "displayName-count-other": "dollari statunitensi",
    "symbol": "USD",
    "symbol-alt-narrow": "$"
    },
```

As you can see, the italian symbol for USD is actually `USD` and not `$`

➡️ Result: **✅ Not a bug**

### Is the spanish short name for a month missing a dot ?

Now, let's have a look at the date formating with issue [#51317](https://github.com/angular/angular/issues/51317). The user was reporting a missing dot for month name with the medium `MMM` format.

This information is located in the [gregorian calendar data](https://github.com/unicode-org/cldr-json/blob/f93780d69dbd62550cd0a3eb64aa3c73b2c45e91/cldr-json/cldr-dates-full/main/es/ca-gregorian.json#L23).

<table>
<tr><th>Spanish</th><th>French</th></tr>
<tr>
<td>

#### **`es/ca-gregorian.json`**

```json
"abbreviated": {
    "1": "ene",
    "2": "feb",
    "3": "mar",
    "4": "abr",
    "5": "may",
    "6": "jun",
    "7": "jul",
    "8": "ago",
    "9": "sept",
    "10": "oct",
    "11": "nov",
    "12": "dic"
},
```

</td>
<td>

#### **`fr/ca-gregorian.json`**

```json
"abbreviated": {
    "1": "janv.",
    "2": "févr.",
    "3": "mars",
    "4": "avr.",
    "5": "mai",
    "6": "juin",
    "7": "juil.",
    "8": "août",
    "9": "sept.",
    "10": "oct.",
    "11": "nov.",
    "12": "déc."
},
```

</td>
</tr>

</table>

As we can see, the CLDR uses a point for shorted name in french but not a spanish.

➡️ Result: **✅ Not a bug**

### Missing a whitespace on negative currency amount

On the last case that will have our interest today, a user reported, on issue [#46038](https://github.com/angular/angular/issues/46038), a missing space between the currency and a negative amount with the `de-CH` locale. He expected `CHF-135.00` to be displayed as `CHF -135.00`.

Again, let's check the [CLDR number data](https://github.com/unicode-org/cldr-json/blob/f93780d69dbd62550cd0a3eb64aa3c73b2c45e91/cldr-json/cldr-numbers-full/main/de-CH/numbers.json#L97-L110) :

```json
"currencyFormats-numberSystem-latn": {
    "standard": "¤ #,##0.00;¤-#,##0.00",
}
```

The CLDR defines 2 different patterns for currencies in swiss german. As we can see in the negative amount pattern `¤-#,##0.00`, there is no space between the currency symbol (represented by `¤`) and the minus.

➡️ Result: **✅ Not a bug**

## Final note

Now that you are CLDR experts, you can look for yourself and check the the CLDR repo. Is what you are seeing expected or not ?

If you see any differences between the CLDR and Angular, you can [open an issue](https://github.com/angular/angular/issues/new/choose), the locale data of Angular might need to be updated with the latest CLDR. Or if you are 100% sure to have found a bug in the CLDR, the CLDR accepts change requests, more on that [here](https://github.com/unicode-org/cldr/blob/main/docs/requesting_changes.md).
