import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewEditModeService {

  private isEdit = new BehaviorSubject(false);
  currentApprovalStageMessage = this.isEdit.asObservable();

  constructor() { }

  updateEditMode(isEdit: boolean) {
    this.isEdit.next(isEdit);
}
}
