# bourbon-sass-loader
Webpack loader for Bourbon sass

## Usage

You should specify this as an entry point:

```
module.exports = {
  entry: [
    'bourbon-sass!./path/to/config.js'
  ]
```

Or a dependency within a file, like you'd specify other webpack dependencies:

```javascript
require('bourbon-sass!./path/to/config.js');
```


## Based on
bootstrap-sass-loader
https://github.com/justin808/bootstrap-sass-loader