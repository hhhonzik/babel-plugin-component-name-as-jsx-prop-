# babel-plugin-component-name-as-jsx-prop

Add a description for the plugin here

## Example

**In**

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <div someOtherAttribute/>;
  }
}


function Example() {
  return (
    <div>
      <p />
    </div>
  );
}

const Example = () => {
  return <div />;
};
```

**Out**

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  render() {
    return <div data-name="MyComponent" someOtherAttribute />;
  }
}

function Example() {
  return <div data-name="Example">
      <p />
    </div>;
}

const Example = () => {
  return <div data-name="Example" />;
};
```

## Installation

```sh
$ npm install babel-plugin-component-name-as-jsx-prop
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["component-name-as-jsx-prop"]
}
```

### Via CLI

```sh
$ babel --plugins component-name-as-jsx-prop script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["component-name-as-jsx-prop"]
});
```



## Credits

Boilerplate and some code is from those 2 plugins:

- https://github.com/layershifter/babel-plugin-transform-react-handled-props
- https://github.com/alanbsmith/babel-plugin-react-add-property

## License

**MIT**
