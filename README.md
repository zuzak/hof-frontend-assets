# HOF Frontend Assets

Frontend assets for building a form service with [HOF Bootstrap](https://github.com/UKHomeOfficeForms/hof-bootstrap).

Includes CSS, JS - including [Typeahead Aria](https://github.com/UKHomeOffice/typeahead-aria) - and Images to create a web page with styled form elements and frontend JS, as documented in [hof-frontend-toolkit](https://github.com/UKHomeOfficeForms/hof-frontend-toolkit).


## Example usage

`cd` into the root of your project and edit `package.json` with the following;

```
"dependencies": {
  "hof-frontend-assets": "^0.1.0"
},
"scripts": {
  "postinstall": "npm hof-frontend-assets"
}
```

When you next run `npm install`, npm will install `hof-frontend-assets@v0.1.0 and build the assets into the root of your project.

## Typeahead Aria

### Usage
To use Typeahead Aria, add `class='typeahead' to the HTML `select` element you wish to decorate.

### Country List
Add [Typeahead Countries](https://github.com/UKHomeOffice/typeahead-countries) to the field in your HOF service that requires the list.

Example field in a HOF form service using the Typeahead:
```
'country-select'-step: {
  mixin: 'select',
  className: ['typeahead', 'js-hidden'],
  options: [''].concat(require('typeahead-countries').allCountries),
  legend: {
    className: 'visuallyhidden'
  },
  validate: ['required']
},
```
