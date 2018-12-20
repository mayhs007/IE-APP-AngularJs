import { Component, OnInit } from '@angular/core';
import { RegistrationService } from 'src/app/services/registration/registration.service';
import { FormGroup, FormControl, Validators , FormBuilder , FormArray } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import {NgbCalendar, NgbDateStruct , NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { TouchSequence } from 'selenium-webdriver';
import { retry } from 'rxjs/operators';
declare var M: any;
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UsersRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
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
  submitted = false;


////////////////////////////////////////////////////////

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
   this.submitted = false;
   this.blockPastDates = new Date();
   this.Button = 'Register';
    this.registrationForm = this.formBuilder.group({
      user_id: [this.authService.getCurrentUserId(), Validators.required],
      college_name:  ['', Validators.required],
      event_name: ['', Validators.required],
      workshops: this.formBuilder.array([]),
      events: this.formBuilder.array([]),
      paper_presentations: this.formBuilder.array([]),
      from_date: [this.ngbDateParserFormatter.format(this.fromDate), Validators.required] ,
      to_date: [this.ngbDateParserFormatter.format(this.toDate), Validators.required],
      status: ['Not Viewed', Validators.required],
      message: [''],
      file_name: ['']
    });
  }
  get f() { return this.registrationForm.controls; }
  onSubmit(values: any) {
    console.log(values);
    this.submitted = true;
    if ( this.registrationForm.invalid) {
      console.log(values);
      M.toast({ html: 'Please Check the Form', classes: 'rounded' });
    } else {
      values.from_date = this.fromDate.day + ' ' + this.getMonth(this.fromDate.month) + ' ' + this.fromDate.year;
      values.to_date = this.toDate.day + ' ' + this.getMonth(this.toDate.month) + ' ' + this.toDate.year;
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
  }

/* Dyanmic Workshop Box */
  addWorkShopTextBox(): void {
    this.workshops = this.registrationForm.get('workshops') as FormArray;
    this.workshops.push(this.createWorkShopTextBox());
  }
  createWorkShopTextBox(): FormGroup {
    return this.formBuilder.group({
      workshop_title: ['', Validators.required]
    });
  }
  removeWorkShopTextBox(i: number): void {
    this.workshops.removeAt(i);
  }
/* Dyanmic Event Box */
 addEventTextBox(): void {
    this.events = this.registrationForm.get('events') as FormArray;
    this.events.push(this.createEventTextBox());
  }
  createEventTextBox(): FormGroup {
    return this.formBuilder.group({
      event_title: ['', Validators.required]
    });
  }
  removeEventTextBox(i: number): void {
    this.events.removeAt(i);
  }

/* Dyanmic Paper Presentation  Box */
  addPaperPresentationTextBox(): void {
    this.paper_presentations = this.registrationForm.get('paper_presentations') as FormArray;
    this.paper_presentations.push(this.createPaperPresentationTextBox());
  }
  createPaperPresentationTextBox(): FormGroup {
    return this.formBuilder.group({
      paper_presentation_title: ['', Validators.required]
    });
  }
  removePaperPresentationTextBox(i: number): void {
    this.paper_presentations.removeAt(i);
  }


/* Date Picker Starts */
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

/* Date Picker Ends */
  getNotApprovedRegistration() {
     const user_id = this.authService.getCurrentUserId();
     this.register.getNotApprovedCurrentUserRegistration(user_id).subscribe((response: any) => {
      this.notApprovedRegistrations = response;
     });
  }
/*Delete Registration */
  deleteRegistration(id: string) {
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
/* Month to String */
getMonth(month) {
  switch (month) {
    case 1: return 'Jan';
    case 2: return 'Feb';
    case 3: return 'Mar';
    case 4: return 'Apr';
    case 5: return 'May';
    case 6: return 'Jun';
    case 7: return 'Jul';
    case 8: return 'Aug';
    case 9: return 'Sep';
    case 10: return 'Oct';
    case 11: return 'Nov';
    case 12: return 'Dec';
  }
}
}
