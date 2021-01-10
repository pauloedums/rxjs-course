import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { map, share, shareReplay, tap, catchError, finalize, retryWhen, take, delayWhen } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Course } from "../model/course";


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    ngOnInit() {

        const http$ =
        createHttpObservable('/api/courses');

        const courses$: Observable<Course[]> = http$
            .pipe(
                /**
                 * CATCH ERROR
                 * show a alternative way to show
                 * an empty message of error using 
                 * an observable
                 */
                // catchError(err => of([]))
                // catchError(err => {
                //     console.log('Error occurred', err);
                //     return throwError(err);
                // }),
                
                tap(() => console.log('http request')),
                map(res => Object.values(res['payload'])),
                /**
                 * SHARE REPLAY
                 * resolve the problems to make
                 * a lot of requisitions from the server
                 */
                shareReplay(),
                retryWhen(errors => errors
                    .pipe(
                        delayWhen(() => timer(2000))
                    )
                ),
                finalize(() => {
                    console.log('Finalized executed...')  ;
                }),
            );

        this.beginnerCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === 'BEGINNER'))
            );

        this.advancedCourses$ = courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === 'ADVANCED'))
            );

    }

}
