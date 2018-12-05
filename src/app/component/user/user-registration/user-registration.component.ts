import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FormGroup, FormControl, Validators , FormBuilder , FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import {NgbCalendar, NgbDateStruct , NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
declare var M: any;
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UsersRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  workshop_marked = false;
  event_marked = false;
  showWorkShopOnlyForm = false;
  showEventOnlyForm = false;
  showBothForms = false;
  workshops: FormArray;
  events: FormArray;
  paper_presentations: FormArray;
  workshop: any;
  event: any;
  paper_presentation: any;
  from_date: NgbDateStruct;
  Button: any;
  minDate: any;
  blockPastDates: any;
  fromDate: NgbDate;
  toDate: NgbDate;
  todate: any;
  hoveredDate: NgbDate;
  showCalendar = false;
  notApprovedRegistrations: any;
  constructor(private register: RegistrationService, private formBuilder: FormBuilder, private authService: AuthService,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }
  ngOnInit() {
    this.Button = 'Register';
    this.createForm();
    this.getNotApprovedRegistration();
  }
  createForm() {
   this.blockPastDates = new Date();
    this.registrationForm = this.formBuilder.group({
      user_id: this.authService.getCurrentUserId(),
      college_name: '',
      event_name: '',
      workshops: this.formBuilder.array([ this.createWorkShopTextBox() ]),
      events: this.formBuilder.array([this.createEventTextBox ()]),
      paper_presentations: this.formBuilder.array([this.createPaperPresentationTextBox ()]),
      from_date: this.ngbDateParserFormatter.format(this.fromDate) ,
      to_date: this.ngbDateParserFormatter.format(this.toDate),
      status: 'Not approved',
      message: '',
      file_name: ''
    });
  }
  onSubmit(values: any) {
  // values.from_date = date.format(values.from_date, 'dd MMM YYYY', true);
  // values.to_date = date.format(values.to_date, 'D MMM YYY', true);
    // const ngbDate = this.registrationForm.controls['from_date'].value;
    // console.log(myDate);
    // const to_date = this.ngbDateParserFormatter.format(this.toDate);
  //  const from_date = this.ngbDateParserFormatter.format(this.fromDate);
  //  console.log(values);
  //  console.log(values);
    values.from_date = this.ngbDateParserFormatter.format(this.fromDate);
    values.to_date = this.ngbDateParserFormatter.format(this.toDate);
      this.register.newRegister(values).subscribe((response: any) => {
      if (response.success) {
        M.toast({ html: response.msg, classes: 'rounded' });
        this.getNotApprovedRegistration();
        this.createForm();
      } else {
       M.toast({ html: response.msg, classes: 'rounded' });
       this.getNotApprovedRegistration();
       this.createForm();
      }
    });
  }
  toggleVisibility(e) {
    switch ( e.target.name) {
      case  'workshop_only': this.workshop_marked = e.target.checked;
                             this.event_marked = e.target.unchecked;
                             this.showEventOnlyForm = false;
                             this.showBothForms = false;
                             break;
      case  'event_only': this.event_marked = e.target.checked;
                          this.workshop_marked = e.target.unchecked;
                          this.showWorkShopOnlyForm = false;
                          this.showBothForms = false;
                          break;
      case  'both_workshop_and_event': this.event_marked = e.target.checked;
                                        this.workshop_marked = e.target.checked;
                                        this.showEventOnlyForm = false;
                                        this.showWorkShopOnlyForm = false;
                                        break;
    }
  }
  createWorkShopTextBox(): FormGroup {
    return this.formBuilder.group({
      workshop_title: ''
    });
  }
  addWorkShopTextBox(): void {
    this.workshops = this.registrationForm.get('workshops') as FormArray;
    this.workshops.push(this.createWorkShopTextBox());
  }
  removeWorkShopTextBox(i: number): void {
    this.workshops.removeAt(i);
  }

  createEventTextBox(): FormGroup {
    return this.formBuilder.group({
      event_title: ''
    });
  }
  addEventTextBox(): void {
    this.events = this.registrationForm.get('events') as FormArray;
    this.events.push(this.createEventTextBox());
  }
  removeEventTextBox(i: number): void {
    this.events.removeAt(i);
  }
  createPaperPresentationTextBox(): FormGroup {
    return this.formBuilder.group({
      paper_presentation_title: ''
    });
  }
  addPaperPresentationTextBox(): void {
    this.paper_presentations = this.registrationForm.get('paper_presentations') as FormArray;
    this.paper_presentations.push(this.createPaperPresentationTextBox());
  }
  removePaperPresentationTextBox(i: number): void {
    this.paper_presentations.removeAt(i);
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {

    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
  openCalendar() {
    this.showCalendar = true;
  }
  closeCalendar() {
    this.showCalendar = false;
  }
  getNotApprovedRegistration() {
     const user_id = this.authService.getCurrentUserId();
     this.register.getNotApprovedCurrentUserRegistration(user_id).subscribe((response: any) => {
      this.notApprovedRegistrations = response;
     });
     /*
     this.register.getAllRegistration().subscribe((response: any) => {
      this.notApprovedRegistrations = response.docs;
     });*/
  }
  deleteRegistration(id: string) {
   console.log('delete');
    this.register.deleteRegistration(id).subscribe((response: any) => {
      if ( response.error ) {
        M.toast({ html: response.msg , classes: 'roundeds'});
        this.getNotApprovedRegistration();
        this.createForm();
      } else {
        M.toast({ html: response.msg , classes: 'roundeds'});
        this.getNotApprovedRegistration();
        this.createForm();
      }
    });
    }
}
