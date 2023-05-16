# Shopback Homework

This JavaScript code appears to define a set of functions for handling HTTP requests, particularly for a domain named 'www.shopback.com'. Here's a summary of what each function does:

1. `modifyPath(data)`: If the request method is GET, this function changes the request URL by replacing '/shopback/resource' with '/shopback/static/assets'. It then returns the modified request data.

2. `checkSbcookie(data)`: This function checks the request for the presence of a specific cookie ('sbcookie') if the request method is GET and the URL includes '/shopback/me'. If the cookie is not present or has an invalid value, it throws an error.

3. `checkRefererHeader(data)`: This function ensures that the 'referer' header of a GET request is from 'www.shopback.com'. If not, it throws an error.

4. `addFrom(data)`: If the request is a GET and the URL includes '/shopback/api/', this function adds a 'from' header with the value set as 'hello@shopback.com'.

5. `removeQuery(data)`: For POST or PUT requests, this function removes any query parameters from the request URL.

6. `checkAgent(data)`: For POST or PUT requests, this function checks if the 'x-shopback-agent' header exists. If not, it throws an error.

7. `checkContentType(data)`: For POST or PUT requests, this function ensures that the 'content-type' header is 'application/json'. If not, it throws an error.

8. `deletePermission(data)`: If the request method is DELETE, this function checks if the 'x-shopback-agent' header is present in a predefined list of agents allowed to perform DELETE operations. If the agent is not in the list, it throws an error.

9. `addTimestamp(data)`: This function adds a 'X-SHOPBACK-TIMESTAMP' header to the request with the current date and time.

10. `checkDomain(data)`: This function ensures that the request URL includes 'www.shopback.com'. If not, it throws an error.

The code also exports an object containing these functions, a configuration object which toggles the use of these functions, and the 'hello@shopback.com' email address.

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

