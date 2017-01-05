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
  "postinstall": "hof-frontend-assets"
}
```

When you next run `npm install`, `npm` will install `hof-frontend-assets@v0.1.0` and build the assets into `/public`.

## Typeahead Aria

The Typeahead Aria code is a key feature of `hof-frontend-assets` that allows one to add a dropdown, typeahead countries list with aria to a select field.

### Usage
To use Typeahead Aria, add `class='typeahead' to the HTML `select` element you wish to decorate.
