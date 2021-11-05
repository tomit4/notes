<div align="center">
<img src="https://raw.githubusercontent.com/paulZzhang/fastify-snippets/master/images/full-logo.png" width="650" height="auto"/>
</div>

## VS Code Fastify code snippets

|                       Trigger | Content                                                                                               |
| ----------------------------: | ----------------------------------------------------------------------------------------------------- |
|             `f.module→` | Create fastify module                                                                                 |
|                `f.get→` | a get router                                                                                          |
|               `f.post→` | a post router                                                                                         |
|       `f.request.body→` | the request body                                                                                      |
|      `f.request.query→` | the parsed querystring                                                                                |
|     `f.request.params→` | the params matching the URL                                                                           |
|    `f.request.headers→` | the headers                                                                                           |
|        `f.request.raw→` | the incoming HTTP request from Node core (you can use the alias req)                                  |
|         `f.request.id→` | the request id                                                                                        |
|         `f.reply.code→` | the request id                                                                                        |
|    `f.reply.getHeader→` | Retrieve value of already set header                                                                  |
| `f.reply.removeHeader→` | Removed the value of a previously set header                                                          |
|    `f.reply.hasHeader→` | Determine if a header has been set                                                                    |
|         `f.reply.type→` | Sets the header Content-Type                                                                          |
|     `f.reply.redirect→` | Redirect to the specified url, the status code is optional (default to 302)                           |
|    `f.reply.serialize→` | Serializes the specified payload using the default json serializer and returns the serialized payload |
|   `f.reply.serializer→` | Sets a custom serializer for the payload                                                              |
|         `f.reply.send→` | Sends the payload to the user, could be a plain text, a buffer, JSON, stream, or an Error object      |
|         `f.reply.sent→` | A boolean value that you can use if you need to know if send has already been called                  |
|          `f.reply.res→` | The http.ServerResponse from Node core                                                                |
