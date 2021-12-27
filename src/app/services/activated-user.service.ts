import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivatedUserService {

  activatedUser = new EventEmitter();

  constructor() { }

  setUser(user: string) {
    this.activatedUser.emit({"user": user});
  }
}
