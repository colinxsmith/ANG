import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-colin',
  templateUrl: './colin.component.html',
  styleUrls: ['./colin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColinComponent implements OnInit {
  centX = '100px';
  centY = '100px';
  BAR() {
    const svg = d3
      .select('app-colin')
      .append('svg')
      .attr('viewBox', '0 0 500 500')
      .append('g');

    svg
      .append('circle')
      .attr('r', '50px')
      .attr('cx', this.centX)
      .attr('cy', this.centY)
      .attr('class', 'rim')
      ;

    svg
      .append('rect')
      .attr('class', 'rim')
      //  .style('stroke', 'green')
      //  .style('stroke-width', '10px')
      //  .style('fill', 'brown')
      .attr('transform', 'translate(200,100)')
      .attr('height', '50px')
      .attr('width', '50px');
  }

  constructor() { }

  ngOnInit() {
    this.BAR();
  }
}
