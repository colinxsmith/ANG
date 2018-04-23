import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-colin',
  templateUrl: './colin.component.html',
  styleUrls: ['./colin.component.css'],
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
      .attr('x', this.centX)
      .attr('y', this.centY)
      .attr('height', '50px')
      .attr('width', '50px')
      .transition().duration(2000).attr('x', '150px').attr('y', '150px')
      ;

    const text1 = svg
      .append('text')
      .attr('class', 'text')
      .attr('x', this.centX)
      .attr('y', this.centY)
      .text('\uf00c')
      ;

    text1.attr('dy', +(text1.style('font-size').replace('px', '')) / 4);
  }

  constructor() { }

  ngOnInit() {
    this.BAR();
  }
}
