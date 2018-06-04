import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import initWs from './ws';
import {a, b, update} from './doc';

/*
 * RxJS 6.x.x moves away from the class/OOP approach used in 5.x.x (Observable#filter)
 * and provides a more functional approach with higher-order functions
 * (filter(predicate) => (Observable) => Observable)
 */
const getAs = filter(x => x.name === 'a');
const getBs = filter(x => x.name === 'b');

/*
 * We use a Subject because it's both an Observer and an Observable.
 * Originally, it didn't make a lot of sense to me why I couldn't just
 * hook the WebSocket messages to an Observable.
 * It has to be a Subject, because in order to push updates from the
 * WebSocket connection, it has to *observe* the changes (the new WS messages).
 * Ergo, it is both an Observer, and an Observable, so our Observers can see it
 */
const stream = new Subject();
/* stream is a Subject, which inherits Observable and Observer.
 * filter() returns an Observable like the rest of the aggregation methods
 *
 * This application can be though of as 4 streams:
 * Websocket:        --a--b---a--b---b--->
 * stream (Subject): --a--b---a--b---b--->
 * as (Observable):  --a------a---------->
 * bs (Observable):  -----b------b---b--->
 */
const as = getAs(stream);
const bs = getBs(stream);

const ws = initWs();

ws.onmessage = ({ data }) => {
  const update = JSON.parse(data);

  /* onNext is like a manual update.
   * Every time a WS message comes in, it adds it to the stream
   * This works because stream is a Subject and Subjects observe changes,
   * then send those changes to its Observers
   */
  stream.next(update);
};

/* as and bs are Observables, here we subscribe and provide a function
 * to be called every time a change occurs.
 */
as.subscribe(x => update(a, x.data));
bs.subscribe(x => update(b, x.data));
