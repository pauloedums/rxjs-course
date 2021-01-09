import { map, distinctUntilChanged } from 'rxjs/operators';
import { concat, noop, Observable, of, interval, merge } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  ngOnInit() {

    /** CONCAT OBSERVABLE */
    // const source1$ = of(1,2,3);
    // const source2$ = of(4,5,6);
    // const concat$ = concat(source1$, source2$);
    // concat$.subscribe(console.log);
    /** END CONCAT */

    /** MERGE OBSERVABLE */
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => 10 * val));
    // const results$ = merge(interval1$, interval2$);
    // results$.subscribe(console.log);
    /** END MERGE */

    
    /** CANCEL OBSERVABLE
     * USING UNSUBSCRIBE
     */
    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 5000);

     /** CANCEL OBSERVABLE
     * USING UNSUBSCRIBE IN HTTP REQUEST
     */
    const http$ = createHttpObservable('/api/courses');
    const sub = http$.subscribe(console.log);
    setTimeout(() => sub.unsubscribe(), 0);
    
  }

}
