import { Component, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-colin',
  templateUrl: './colin.component.html',
  styleUrls: ['./colin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ColinComponent implements OnInit, OnChanges {
  private centX = '100px';
  private centY = '100px';
  constructor() { }
  ngOnInit() {
    this.BAR(+this.centX.replace('px', ''), +this.centY.replace('px', ''));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.BAR(+this.centX.replace('px', ''), +this.centY.replace('px', ''));
  }
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
    const kData = [1, 2, 3, 4, 5, 6];
    let ix = 0, iy = 0 , kS = 0;
    kData.forEach(function(dd) {
      kS += dd;
    });
    svg.selectAll('.shape').data(kData).enter().append('g')
    .attr('class', 'shaper')
    .append('path')
      .attr('d', function (d, i) {
        const ccx = 175, ccy = 175;
        if (i === 0) {
          ix = 150; iy = 150;
          return '';
        } else {
          const ang1 = Math.atan((iy - ccy) / (ix - ccx));
          const rad = Math.sqrt((ix - ccx) ** 2 + (iy - ccy) ** 2);
          const ang2 = ang1 + d / kS * Math.PI * 2;
          let ix1 = Math.max(ccx - rad * Math.cos(ang2) , 150);
          let iy1 = Math.max(ccy - rad * Math.sin(ang2) , 150);
          ix1 = Math.min(ix1 , 200);
          iy1 = Math.min(iy1 , 200);
          let ix2 = Math.max(ccx - (rad - 10) * Math.cos(ang2) , 140);
          let iy2 = Math.max(ccy - (rad - 10) * Math.sin(ang2) , 140);
          ix2 = Math.min(ix2 , 190);
          iy2 = Math.min(iy2 , 190);
          let ix3 = Math.max(ccx - (rad - 10) * Math.cos(ang1) , 140);
          let iy3 = Math.max(ccy - (rad - 10) * Math.sin(ang1) , 140);
          ix3 = Math.min(ix3 , 190);
          iy3 = Math.min(iy3 , 190);
          const back = `M ${ix} ${iy}` +
          `L ${ix1} ${iy}` +
          `L ${ix2} ${iy2}` +
          `L ${ix3} ${iy2}` +
          `L ${ix} ${iy}`;
        ix = ix1;
        iy = iy1;
        return back;
        }
      });
  }

}
