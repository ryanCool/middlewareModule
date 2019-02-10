# General
This is a module which can analysis and transform HTTP/1.1 request.
Support json/yaml format.

User can easily customize and add their own rules.
User is free to choose rules to run.


## Demo
> npm install && npm start

----------

### Output File path
```js
 /result/reuslt.json
 /result/reuslt.yaml
```

### Function usage
```js
middleware(yamlfilePath, jsonfilePath, { 3: false, 6: false });
The third argument is optional. 
User can choose which rules need to check or not.

```

### Defaults rules config
./rules/rules.js
```js
Default config is all check.

user can custom their own config in rules.js, and also pass switch dictionary in function.

middleware(filePath, filePath, { 3: false, 6: false });

```


# UnitTest

## Run test ##

**install mocha globally**

	npm install mocha -g


## Run all test suite ##
  
	npm test

----------
*Author: Ryan*

