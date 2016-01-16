# hapi-async-routes

<h3>Install</h3>
Hapi, Bluebird and Boom is required for this plugin
<b>npm install --save bluebird hapi boom</b>
<b>npm install --save hapi-async-routes</b>

<h3>Introduction</h3>
The traditional way of route config used by Hapi<br>
The route config<br>
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
With this plugin, you can write like this (with babel-register and preset es2015 or es2015-node5).<br>
```javascript
{
  method: 'GET', 
  path: '/hello', 
  config: {
    handler: async function (request, reply) {
			reply('Hello World!');
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
    handler: Promise.coroutine(function (request, reply) {
			reply('Hello World!');
    })
  }
};
```

With this plugin, we don't have to wrap our function to support <b>await</b> or <b>yield</b> to prevent callback hell.<br>
<b>Options</b><br>
<b>routes</b> (Optional): This is an array of routes that you want to enable async handler. You could make use of require-directory and convert to an array.<br>
If not specified, you need to do the following to route your async handler<br>
```javascript
server.route({
  method: 'GET', 
  path: '/hello', 
  config: {
    handler: {
      asyncHandler: {
        handler: async function (request, reply) {
  			  reply('Hello World!');
        }
      }
    }
  }
});
```

<b>defaultErrorHandler</b> (Optional): This is the default error handler which is a function accepts<br>
@param err: the error thrown from the async handler<br>
@param request: the request object<br>
@param reply: the reply object<br>
If not specified, The default error handler is like that<br>
```javascript
function (err, request, reply) {
  reply(Boom.wrap(err, 500));
}
```
<h3>Example</h3>
Please visit the test case for example reference. <br>
<a href= "https://github.com/raymondsze/hapi-async-routes/tree/master/test">Example usage</a><br>