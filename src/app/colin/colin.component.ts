import { Component, OnInit, ViewEncapsulation, OnChanges} from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-colin',
  templateUrl: './colin.component.html',
  styleUrls: ['./colin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ColinComponent implements OnInit, OnChanges {
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
      .on('mousemove' && 'mousedown', function(d, i, hh: d3.BaseType[]) {
       function distAB(x: number[], y: number[]) {
          return Math.sqrt((x[0] - y[0]) * (x[0] - y[0]) + (x[1] - y[1]) * (x[1] - y[1]));
        }
        const c1: number[] = [];
        const mouseh = d3.mouse(d3.event.currentTarget);
        console.log(mouseh[0] + ' ' + mouseh[1]);
        const circle = d3.select(hh[i]);
        c1[0] = +circle.attr('cx').replace('px', '');
        c1[1] = +circle.attr('cy').replace('px', '');
        if ( distAB(c1, mouseh) <= 10) {
          console.log('here');
        circle.attr('cx', mouseh[0]);
        circle.attr('cy', mouseh[1]);
        }
      })
      ;

    svg
      .append('rect')
      // .attr('class', 'rim')
      .style('stroke', 'green')
      .style('stroke-width', '10px')
      .style('fill', 'brown')
      .attr('transform', 'translate(200,100)')
      .attr('height', '50px')
      .attr('width', '50px');
  }

  constructor() {}

  ngOnInit() {
    this.BAR();
  }

  ngOnChanges() {
    console.log('Onchanges');
  }
}
