import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() title: string;
  @Input() type: string;
  @Input() class: string;
  @Input() dismissible: boolean;
  @Input() messages: string[] | string;

  constructor() { }

  ngOnInit() {
  }

}
