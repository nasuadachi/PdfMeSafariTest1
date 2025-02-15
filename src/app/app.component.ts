import {Component, OnInit} from '@angular/core';
import {Page1Component} from './page1/page1.component';
import {Page2Component} from './page2/page2.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ Page1Component, Page2Component, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  protected TogglePage = true;
  protected Run = false;
  protected Counter = 0;

  ngOnInit() {
    this.init();
  }

  private init() {
    setTimeout(() => {
      if ( this.Run ) {
        this.Counter++;
        this.TogglePage = !this.TogglePage;
      }
      this.init();
    }, 500); // If you run it on macOS, you can do a quick test with about 500.
  }

}
