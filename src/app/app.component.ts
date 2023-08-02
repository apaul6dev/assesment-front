import {MediaMatcher} from '@angular/cdk/layout';
import { Component,ChangeDetectorRef,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy  {

  title = 'ecommerce-front';
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  /**
   * Configuration for responsive designe
   * @param changeDetectorRef 
   * @param media 
   */
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
  // /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}
