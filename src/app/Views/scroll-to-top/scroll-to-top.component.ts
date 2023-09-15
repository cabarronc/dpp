import { Component, OnInit, HostListener, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent implements OnInit {

  windowScrolled?: boolean;

  constructor(@Inject(DOCUMENT)  private document: Document) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
      if (window.scrollY || document.documentElement.scrollTop || document.body.scrollTop > 100) {
          this.windowScrolled = true;
      }
     else if (this.windowScrolled && window.scrollY || document.documentElement.scrollTop || document.body.scrollTop < 10) {
          this.windowScrolled = false;
      }
  }
  scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }


  ngOnInit(): void {
    this.scrollToTop()
  }

}
