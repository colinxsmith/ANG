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
  BAR(cx: number, cy: number) {
    const tool = d3.select('body').append('div').attr('class', 'toolTip');

    const svg = d3
      .select('app-colin')
      .append('svg')
      .attr('viewBox', '0 0 500 500')
      .append('g');

    svg
      .append('circle')
      .attr('r', '50px')
      .attr('cx', cx + 'px')
      .attr('cy', cy + 'px')
      .attr('class', 'rim')
      .on('mousemove', function () {
        tool.style('left', d3.event.pageX + 'px').style('top', d3.event.pageY + 'px')
          .html((d3.event.pageX) + '<br>' + (d3.event.pageY))
          .style('display', 'inline-block');
      }).on('mouseout', function () {
        tool.style('display', 'none');
      })

      ;

    svg
      .append('rect')
      .attr('class', 'rim')
      .attr('x', cx + 'px')
      .attr('y', cy + 'px')
      .attr('height', '50px')
      .attr('width', '50px')
      .transition().duration(2000).attr('x', '150px').attr('y', '150px')
      ;

    const text1 = svg
      .append('text')
      .attr('class', 'text')
      .attr('x', cx + 'px')
      .attr('y', cy + 'px')
      .text('\uf00c')
      ;

    text1.attr('dy', +(text1.style('font-size').replace('px', '')) / 4);
  }

  constructor() { }

  ngOnInit() {
    this.BAR(+this.centX.replace('px', ''), +this.centY.replace('px', ''));
  }
}
