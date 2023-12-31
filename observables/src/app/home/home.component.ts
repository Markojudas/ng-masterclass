import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {
    /* TODO document why this constructor is empty */
  }

  ngOnInit() {
    // creating our own observables
    //interval is a function of rxjs that returns an observable which we can subscribed to
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    //
    //custom observable (using deprecated create function)
    // const customIntervalObs = Observable.create((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //   }, 1000);
    // });
    // this.firstObsSubscription = customIntervalObs.subscribe((data) => {
    //   console.log(data);
    // });
    //
    // Custom Observable (current)
    // const customObs = new Observable((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     count++;
    //   }, 1000);
    // });
    // this.firstObsSubscription = customObs.subscribe((data) => {
    //   console.log(data);
    // });
    //
    //Errors
    // const customObs = new Observable((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     if (count > 3) {
    //       observer.error(new Error('Count is greater than 3!!'));
    //     }
    //     count++;
    //   }, 1000);
    // });
    // this.firstObsSubscription = customObs.subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert(error.message);
    //   }
    // );
    //
    // Completion:
    // const customObs = new Observable((observer) => {
    //   let count = 0;
    //   setInterval(() => {
    //     observer.next(count);
    //     if (count === 5) {
    //       observer.complete(); //hold; the stream ends!
    //     }
    //     if (count > 3) {
    //       observer.error(new Error('Count is greater than 3!!'));
    //     }
    //     count++;
    //   }, 1000);
    // });
    // this.firstObsSubscription = customObs.subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error);
    //     alert(error.message);
    //   },
    //   () => {
    //     console.log('Completed'); // errors and/or completion end the streams!
    //   }
    // );
    //
    // Operators
    const customObs = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete(); //hold; the stream ends!
        }
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!!'));
        }
        count++;
      }, 1000);
    });

    //pipe()
    this.firstObsSubscription = customObs
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Round: ' + data;
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('Completed'); // errors and/or completion end the streams!
        }
      );
    //This alone could cause memory leaks. Just because we navigate out of the homeComponent doesn't stop the observable from emitting.
    // We need to unsubscribe. The subscribe() function returns a Subscription. So by creating a Subscription variable and setting it to the Subscription returned
    // by the observable... wwe can use it to unsubscribe on ngOnDestroy; navigate away from component.
  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }
}
