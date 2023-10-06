import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }

  ngOnDestroy(): void {
    //
  }

  closeDialog(): void {
    const modalElement: HTMLDialogElement = this.modalRef?.nativeElement;

    modalElement?.close();
  }
}
