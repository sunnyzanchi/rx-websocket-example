import Rx from 'rx';
import initWs from './ws';
import {a, b, update} from './doc';

/*
 * We use a Subject because it's both an Observer and an Observable.
 * Originally, it didn't make a lot of sense to me why I couldn't just
 *  hook the WebSocket messages to an Observable.
 * It has to be a Subject, because in order to push updates from the
 *  WebSocket connection, it has to *observe* the changes (the new WS messages).
 * Ergo, it is both an Observer, and an Observable, so our Observers can see it
 */
const stream = new Rx.Subject();

/* stream is a Subject, which inherits Rx.Observable and Rx.Observer.
 * Because of that, it has access to where, filter, concat,
 *  and the rest of the Observable instance methods.
 * where() returns an Observable like the rest of the aggregation methods
 *
 * This application can be though of as 4 streams:
 * Websocket:        --a--b---a--b---b--->
 * stream (Subject): --a--b---a--b---b--->
 * as (Observable):  --a------a---------->
 * bs (Observable):  -----b------b---b--->
 */
const as = stream.where(x => x.name === 'a');
const bs = stream.where(x => x.name === 'b');

const ws = initWs();

ws.onmessage = function({data}){
  const update = JSON.parse(data);

  /* onNext is like a manual update.
   * Every time a WS message comes in, it adds it to the stream
   * This works because stream is a Subject and Subjects observe changes,
   *  then send those changes to its Observers
   */
  stream.onNext(update);
}

/* as and bs are Observables, here we subscribe and provide a function
 *  to be called every time a change occurs.
 */
as.subscribe(x => update(a, x.data));
bs.subscribe(x => update(b, x.data));
