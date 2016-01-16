## hapi-async-routes [![Build Status](https://travis-ci.org/raymondsze/hapi-async-routes.svg)](https://travis-ci.org/raymondsze/hapi-async-routes.svg?branch=master)
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
      async: Promise.coroutine(function (request, reply) { // If you are using native Promise, you may use co.wrap instead
			   reply('Hello World!');
      }
    }
  }
};
```

<p>With this plugin, we don't have to wrap our function to support <b>await</b> or <b>yield</b> to prevent callback hell.</p>
## Options

<b>routes</b> (Optional): This is the array of dir path you want to scan the routes, it is much convenient if you don't want to server.route manually.</p>
<p>The file inside the directory should be like that</p>
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
  reply(err).code(500);
}
```

## Example
<p>Please visit the test case for example reference. </p>
<a href= "https://github.com/raymondsze/hapi-async-routes/tree/master/test">Example usage</a>