import { Component, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Location, DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-weekly';
  appVersion: any = environment.appVersion;
  constructor(
    private router: Router,
    private _location: Location,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  async handleAdminMode() {
    Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      showCancelButton: true,
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        const password = v.value;
        if (password && password == 'password') {
          this.router.navigate(['admin']);
          // Swal.fire(`Entered password: ${password}`);
        } else {
          Swal.fire({
            title: 'Password not correct!!',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // this._location.back();
            this.router.navigate(['chart/calculate']);
          });
        }
      } else {
        this.router.navigate(['chart/calculate']);
      }
    });
  }

  scrollToTop() {
    // Scroll to the top of the page
    this.document.body.scrollTop = 0; // For Safari
    this.document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Here you can define when to show or hide the button to scroll to the top
    // Example: Show button after scrolling 100px down
    const yOffset =
      window.pageYOffset || this.document.documentElement.scrollTop;
    if (yOffset > 100) {
      // Display your button or implement logic to show the scroll to top option
    } else {
      // Hide your button or implement logic to hide the scroll to top option
    }
  }
}
