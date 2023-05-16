import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {

  private data = [
    {"Eje": "Seguridad y paz social", "Presupuesto": "7434849194", "Released": "2014"},
    {"Eje": "Desarrollo humano y social", "Presupuesto": "18755329481", "Released": "2013"},
    {"Eje": "Educacion de calidad", "Presupuesto": "30643448968", "Released": "2016"},
    {"Eje": "Economia para todos", "Presupuesto": "2056140224", "Released": "2010"},
    {"Eje": "Desarrollo ordenado y sostenible", "Presupuesto": "5763700292", "Released": "2011"},
    {"Eje": "Gobierno humano y eficaz", "Presupuesto": "1932065518", "Released": "2011"},
    {"Eje": "Poderes y Autonomos", "Presupuesto": "8985931641", "Released": "2011"},
  ];

  private svg: any;
  private margin = 85;
  private width = 650 - (this.margin * 2);
  private height = 300 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}
private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map(d => d.Eje))
  .padding(0.7);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-25)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([1000000000, 31000000000])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d: any) => x(d.Eje))
  .attr("y", (d: any) => y(d.Presupuesto))
  .attr("width", x.bandwidth())
  .attr("height", (d: any) => this.height - y(d.Presupuesto))
  .attr("fill", "#cdf0ed");
}

  constructor(private cookieService:CookieService,private route:ActivatedRoute, private loginServices: LoginService, private router: Router) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap=>{
      console.log(paramMap);
    }
    )
    this.createSvg();
    this.drawBars(this.data);

  }
  logout(): void
  {
    this.loginServices.removeLocalStorage();
    this.cookieService.delete('token_access');
    this.router.navigate(['/login2']);
  }


}
