
# dropdown

a minimal dropdown with UX details

## Installing

```sh
$ component-install stagas/dropdown
```

## Usage

All the events & methods of [Menu](https://github.com/stagas/menu).

## Events

- `select` when an item is selected

## Example

```js
var input = document.getElementById('input')

var dropdown = Dropdown(input)

dropdown
.add('One')
.add('Two')
.add('Three')

dropdown.on('select', function (item) {
  // do something with item
})
```

## License

MIT
