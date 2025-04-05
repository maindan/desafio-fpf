import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsMobileServiceService {

  private _isMobileView:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isMobileView():BehaviorSubject<boolean> {
    return this._isMobileView;
  }

  public setIsMobileView(value:boolean) {
    this._isMobileView.next(value);
  }

  public verifyIsMobile():boolean {
    const width:number = window.innerWidth;
    return width < 800;
  }
}
