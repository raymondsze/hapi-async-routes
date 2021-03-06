## hapi-async-routes [![Build Status](https://travis-ci.org/raymondsze/hapi-async-routes.svg)](https://travis-ci.org/raymondsze/hapi-async-routes.svg?branch=master)
## Not Maintained
:exclamation: I haven't use Hapi framework for a long time. This repository is no longer maintained.

## Introduction
<p>This plugin is used to solve 2 problems.</p>
<p>1. Use async function as handler instead of thunk. Therefore, you can use await/ yield inside your handler without any wrapper.</p>
<p>2. server.route by scanning directory.</p>

## Install
<b>npm install --save hapi-async-routes</b>

<p>The traditional way of route config used by Hapi</p>
<p>The route config</p>
```javascript
{
  method: 'GET', 
  path: '/hello', 
  config: {
    handler: function (request, reply) {
			reply('Hello World!');
    }
  }
};
```
<p>With this plugin, you can write like this (with babel-register and preset es2015 or es2015-node5).</p>
```javascript
{
  method: 'GET', 
  path: '/hello', 
  config: {
    handler: {
      async: async function (request, reply) {
			   reply('Hello World!');
      }
    }
  }
};
```
or
```javascript
{
  method: 'GET', 
  path: '/hello', 
  config: {
    handler: {
      async: Promise.coroutine(function *(request, reply) { // If you are using native Promise, you may use co.wrap instead
			   reply('Hello World!');
      }
    }
  }
};
```

<p>With this plugin, we don't have to wrap our function to support <b>await</b> or <b>yield</b> to prevent callback hell.</p>
## Options

<b>routes</b> (Optional): This is the array of dir path you want to scan the routes, it is much convenient if you don't want to server.route manually.</p>
<p>The file inside the directory should <b>module.exports</b> or <b>export default</b> the following</p>
<p>1. A route config instance </p>
<p>2. An array of route config instance </p>
<p>Example:</p>
```javascript
module.exports = [
  {
    method: 'GET', path: '/hello', config: {
      handler: {
        async: async function (request, reply) {
          const asyncHello = async function() {
            return 'Hello World!';
          };
          reply(await asyncHello());
        }
      }
    }
  },
  {
    method: 'GET', path: '/bye', config: {
      handler: {
        async: async function (request, reply) {
          const asyncBye = async function() {
            return 'Good Bye!';
          };
          reply(await asyncBye());
        }
      }
    }
  },
  {
    method: 'GET', path: '/error', config: {
      handler: {
        async: async function () {
          throw Error('error');
        }
      }
    }
  }
];
```

<p><b>handlerName</b> (Optional): This is the custom handler name, default is async</p>
For example, if changed to "promise", your handler would be like
```javascript
{
  method: 'GET', 
  path: '/hello', 
  config: {
    handler: {
      promise: async function (request, reply) {
         reply('Hello World!');
      }
    }
  }
};
```

<p><b>defaultErrorHandler</b> (Optional): This is the default error handler which is a function accepts</p>
err: the error thrown from the async handler<br>
request: the request object<br>
reply: the reply object<br>
If not specified, The default error handler is like that<br>
```javascript
function (err, request, reply) {
  reply(err);
}
```

## Example
<p>Please visit the test case for example reference. </p>
<a href= "https://github.com/raymondsze/hapi-async-routes/tree/master/test">Example usage</a>

## LICENSE
The MIT License (MIT)

Copyright (c) 2016 Sze Ka Wai Raymond

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
