import { AfterViewInit, Component, OnDestroy, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orientation } from '@progress/kendo-angular-inputs';
import { HorizontalAlign, VerticalAlign } from '@progress/kendo-angular-layout';
import { BreadCrumbItem } from "@progress/kendo-angular-navigation";
import { homeIcon, SVGIcon } from "@progress/kendo-svg-icons";
import { Subscription } from "rxjs";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-home-pf2023',
  templateUrl: './home-pf2023.component.html',
  styleUrls: ['./home-pf2023.component.css']
})
export class HomePf2023Component implements OnInit{

  dangerousUrl: string;
  trustedUrl: SafeUrl;
  
 
  public recursos = "https://drive.google.com/file/d/1VIjHsrTDR6ls8cKurAjF7uK-gDe_PoMH/view";
  constructor(private sanitizer: DomSanitizer){
    this.dangerousUrl = 'https://drive.google.com/file/d/1VIjHsrTDR6ls8cKurAjF7uK-gDe_PoMH/view';
    this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

  }

  public openedPlaneacion = false

  public closePlaneacion(): void {
    this.openedPlaneacion = false;
  }

  public openPlaneacion(): void {
    this.openedPlaneacion = true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public openedProgramacion = false;

  public closeProgramacion(): void {
    this.openedProgramacion = false;
  }

  public openProgramacion(): void {
    this.openedProgramacion = true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public openedPresupuestacion = false;

  public closePresupuestacion(): void {
    this.openedPresupuestacion = false;
  }

  public openPresupuestacion(): void {
    this.openedPresupuestacion = true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public openedEjercicio = false;

  public closeEjercicio(): void {
    this.openedEjercicio = false;
  }

  public openEjercicio(): void {
    this.openedEjercicio = true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public openedSeguimiento = false;

  public closeSeguimiento(): void {
    this.openedSeguimiento = false;
  }

  public openSeguimiento(): void {
    this.openedSeguimiento = true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public openedRendicion = false;

  public closeRendicion(): void {
    this.openedRendicion = false;
  }

  public openRendicion(): void {
    this.openedRendicion = true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public orientation: Orientation = "vertical";
  public hAlign: HorizontalAlign = "center";
  public vAlign: VerticalAlign = "middle";
  public orientationOptions = ["horizontal", "vertical"];
  public hAlignOptions = ["start", "center", "end", "stretch"];
  public vAlignOptions = ["top", "middle", "bottom", "stretch"];

  public gap = 0;

  scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
  
  ngOnInit(): void {
    this.scrollToTop()
  }
 
  
}
