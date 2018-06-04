# RxJS WebSocket Example
An example showing how to hook up messages from a WebSocket connection - what is essentially a stream - to RxJS Observables. It uses a Subject to observe changes (WS messages), then proxies those to new Observables. [This Stack Overflow question](http://stackoverflow.com/q/33324227/6860676) explains the issue

## Run
```
npm i
npm start
```
Client is running at localhost:3000, server is running at localhost:8000, accepting WS connections at `/`.
