import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-colin',
  templateUrl: './colin.component.html',
  styleUrls: ['./colin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ColinComponent implements OnInit {
  constructor() {}
  centX = '100px';
  centY = '100px';
  ngOnInit() {
    this.BAR(+this.centX.replace('px', ''), +this.centY.replace('px', ''));
  }
  BAR(cx: number, cy: number) {
    const formatH = d3.format('0.2f');
    const tool = d3
      .select('body')
      .append('div')
      .attr('class', 'toolTip');

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
      .on('mousemove', function() {
        const mouseCoord = d3.mouse(d3.event.currentTarget);
        tool
          .style('left', d3.event.pageX + 'px')
          .style('top', (d3.event.pageY - 300 ) + 'px')
          .html(formatH(mouseCoord[0]) + '<br>' + formatH(mouseCoord[1]))
          .style('display', 'inline-block');
      })
      .on('mouseout', function() {
        tool.style('display', 'none');
      })
      .on('click', function(dd, ii, pp) {
        const here = d3.select(pp[ii]);
        const mouseCoord = d3.mouse(d3.event.currentTarget);
        here.attr('cx', mouseCoord[0] + 'px');
        here.attr('cy', mouseCoord[1] + 'px');
      })
      ;

    svg.selectAll('shape').data([80, 60]).enter()
      .append('rect')
      .attr('class', function(d, i) {
        return i === 0 ? 'shape0' : 'shape1';
      })
      .attr('x', cx + 'px')
      .attr('y', cy + 'px')
      .attr('height', function(d) {
        return d + 'px';
      })
      .attr('width', function(d) {
        return d + 'px';
      })
      .transition()
      .duration(2000)
      .attr('x', function(d) {
        return (200 - (d - 50) / 2 ) + 'px';
      })
      .attr('y', function(d) {
        return (200 - (d - 50) / 2 ) + 'px';
      })
      ;
      const data1 = [1,2,1,3];
      let sData = 0 , pData = 0;
      data1.forEach(function(d) {
        sData += d;
      });

      svg.selectAll('lines').data(data1).enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', function(d) {
        pData += d;
        const ang = 2 * Math.PI  * pData / sData - Math.PI;
        console.log(ang);
        let xx1 = 80 * Math.cos(ang);
        let yy1 = 80 * Math.sin(ang);
        xx1 = Math.max(Math.min(xx1, 40), -40);
        yy1 = Math.max(Math.min(yy1, 40), -40);
        let xx2 = 60 * Math.cos(ang);
        let yy2 = 60 * Math.sin(ang);
        xx2 = Math.max(Math.min(xx2, 30), -30);
        yy2 = Math.max(Math.min(yy2, 30), -30);
        return `M ${225 + xx2} ${225 + yy2} L ${225 + xx1} ${225 + yy1} `;
      });
    const text1 = svg
      .append('text')
      .attr('class', 'text')
      .attr('x', cx + 'px')
      .attr('y', cy + 'px')
      .text('\uf2bc');

    text1.attr('dy', +text1.style('font-size').replace('px', '') / 4);
  }

}
