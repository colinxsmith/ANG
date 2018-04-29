import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    const formatA = d3.format('0.0f');
    const colour = [
      'red',
      'orange',
      'blue',
      'green',
      'brown',
      'lightgreen',
      'yellow'
    ];

    const arcfunc = d3.arc();
    const tool = d3
      .select('body')
      .append('div')
      .attr('class', 'toolTip');

    const svg = d3
      .select('app-colin')
      .append('svg')
      .attr('viewBox', '0 0 500 500')
      .append('g');

    const circles = svg
      .append('circle')
      .attr('r', '50px')
      .attr('cx', cx + 'px')
      .attr('cy', cy + 'px')
      .attr('class', 'rim')
      .on('mousemove', function() {
        const mouseCoord = d3.mouse(d3.event.currentTarget);
        tool
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 30 + 'px')
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
      });

    const data1 = [3, 0.5, 2, 3, 1, 4, 1];

    const text1 = svg
      .append('text')
      .attr('class', 'text')
      .attr('x', cx + 'px')
      .attr('y', cy + 'px')
      .text('\uf2bd');

    text1.attr('dy', +text1.style('font-size').replace('px', '') / 4);
    const innerRadius = 45,
      outerRadius = 50;
    const radian = Math.PI / 180,
      startAngle = 45 * radian,
      endAngle = (360 - 45) * radian;

    const squareData = this.squarePie(
      data1,
      outerRadius,
      innerRadius,
      startAngle,
      endAngle
    );
    const oldFig = svg
      .selectAll('quadr')
      .data(squareData)
      .enter()
      .append('path')
      .attr('transform', `translate(${250},${100}),rotate(0)`)
      .attr('d', function(d) {
        return arcfunc({
          startAngle: d.angle1 + Math.PI / 2,
          endAngle: d.angle2 + Math.PI / 2,
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          padAngle: 0
        });
      })
      .on('mousemove', function(
        d,
        i
      ) {
        const mouseCoord = d3.mouse(d3.event.currentTarget);
        tool
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 30 + 'px')
          .html(
            i +
              ' ' +
              data1[i] +
              ' ' +
              d.data +
              ' ' +
              formatA((d.angle1 / Math.PI * 180) % 360) +
              ' ' +
              formatA((d.angle2 / Math.PI * 180) % 360)
          )
          .style('display', 'inline-block');
      })
      .on('mouseout', function() {
        tool.style('display', 'none');
      })
      .style('fill', function(d, i) {
        console.log(colour[i]);
        return colour[i];
      });
    const arcSquare = this.squareArc;
    const newFig = svg
      .selectAll('quadr')
      .data(squareData)
      .enter()
      .append('path')
      .attr('transform', `translate(${250},${100}),rotate(0)`)
      .attr('d', function(d) {
        return arcSquare(d.angle1, d.angle2, innerRadius, outerRadius);
      })
      .on('mousemove', function(
        d,
        i
      ) {
        const mouseCoord = d3.mouse(d3.event.currentTarget);
        tool
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 30 + 'px')
          .html(
            i +
              ' ' +
              data1[i] +
              ' ' +
              d.data +
              ' ' +
              formatA((d.angle1 / Math.PI * 180) % 360) +
              ' ' +
              formatA((d.angle2 / Math.PI * 180) % 360)
          )
          .style('display', 'inline-block');
      })
      .on('mouseout', function() {
        tool.style('display', 'none');
      })
      .style('fill', function(d, i) {
        console.log(colour[i]);
        return colour[i];
      })
      .transition()
      .delay(1000)
      .attr('transform', `translate(${375},${100}),rotate(0)`);
    const debHere = false;
    if (debHere) {
      svg
        .append('circle')
        .attr('transform', 'translate(250,100)')
        .style('fill', 'none')
        .style('stroke', 'black')
        .attr('r', outerRadius);
      svg
        .append('circle')
        .attr('transform', 'translate(250,100)')
        .style('fill', 'none')
        .style('stroke', 'black')
        .attr('r', innerRadius);
      svg
        .append('circle')
        .attr('transform', 'translate(375,100)')
        .style('fill', 'none')
        .style('stroke', 'black')
        .attr('r', outerRadius);
      svg
        .append('circle')
        .attr('transform', 'translate(375,100)')
        .style('fill', 'none')
        .style('stroke', 'black')
        .attr('r', innerRadius);
    }
  }
  squareArc(ang1: number, ang2: number, rad1: number, rad2: number) {
    const seg1 = { xx1: 0, xx2: 0, yy1: 0, yy2: 0 };
    const seg2 = { xx1: 0, xx2: 0, yy1: 0, yy2: 0, face: 0 };
    if (rad1 == 0) {
      rad1 = 1e-7;
    }
    if (rad2 == 0) {
      rad2 = 1e-7;
    }
    seg1.xx1 = rad1 * Math.cos(ang1);
    seg1.yy1 = rad1 * Math.sin(ang1);
    if (rad1 > 0) {
      if (Math.abs(seg1.xx1) > Math.abs(seg1.yy1)) {
        seg1.yy1 *= Math.abs(rad1 / seg1.xx1);
        seg1.xx1 = seg1.xx1 < 0 ? -rad1 : rad1;
      } else {
        seg1.xx1 *= Math.abs(rad1 / seg1.yy1);
        seg1.yy1 = seg1.yy1 < 0 ? -rad1 : rad1;
      }
    }
    seg1.xx2 = rad2 * Math.cos(ang1);
    seg1.yy2 = rad2 * Math.sin(ang1);
    if (Math.abs(seg1.xx2) > Math.abs(seg1.yy2)) {
      seg1.yy2 *= Math.abs(rad2 / seg1.xx2);
      seg1.xx2 = seg1.xx2 < 0 ? -rad2 : rad2;
    } else {
      seg1.xx2 *= Math.abs(rad2 / seg1.yy2);
      seg1.yy2 = seg1.yy2 < 0 ? -rad2 : rad2;
    }

    seg2.xx1 = rad1 * Math.cos(ang2);
    seg2.yy1 = rad1 * Math.sin(ang2);
    if (Math.abs(seg2.xx1) > Math.abs(seg2.yy1)) {
      seg2.yy1 *= Math.abs(rad1 / seg2.xx1);
      seg2.xx1 = seg2.xx1 < 0 ? -rad1 : rad1;
    } else {
      seg2.xx1 *= Math.abs(rad1 / seg2.yy1);
      seg2.yy1 = seg2.yy1 < 0 ? -rad1 : rad1;
    }
    seg2.xx2 = rad2 * Math.cos(ang2);
    seg2.yy2 = rad2 * Math.sin(ang2);
    if (rad2 > 0) {
      if (Math.abs(seg2.xx2) > Math.abs(seg2.yy2)) {
        seg2.yy2 *= Math.abs(rad2 / seg2.xx2);
        seg2.xx2 = seg2.xx2 < 0 ? -rad2 : rad2;
      } else {
        seg2.xx2 *= Math.abs(rad2 / seg2.yy2);
        seg2.yy2 = seg2.yy2 < 0 ? -rad2 : rad2;
      }
    }
    if (seg1.xx1 === -rad1 && seg2.xx1 === -rad1) {
      // both left side
      if (seg2.yy1 <= seg1.yy1) {
        seg2.face = 0;
      } else {
        seg2.face = 4;
      }
    } else if (seg1.yy1 === -rad1 && seg2.yy1 === -rad1) {
      // both top side
      if (seg2.xx1 >= seg1.xx1) {
        seg2.face = 0;
      } else {
        seg2.face = 4;
      }
    } else if (seg1.xx1 === rad1 && seg2.xx1 === rad1) {
      // both right side
      if (seg2.yy1 >= seg1.yy1) {
        seg2.face = 0;
      } else {
        seg2.face = 4;
      }
    } else if (seg1.yy1 === rad1 && seg2.yy1 === rad1) {
      // both bottom side
      if (seg2.xx1 <= seg1.xx1) {
        seg2.face = 0;
      } else {
        seg2.face = 4;
      }
    } else if (seg1.xx1 === -rad1 && seg2.yy1 === -rad1) {
      // left to top
      seg2.face = 1;
    } else if (seg1.xx1 === -rad1 && seg2.xx1 === rad1) {
      // left to right
      seg2.face = 2;
    } else if (seg1.xx1 === -rad1 && seg2.yy1 === rad1) {
      // left to bottom
      seg2.face = 3;
    } else if (seg1.yy1 === -rad1 && seg2.xx1 === rad1) {
      // top to right
      seg2.face = 1;
    } else if (seg1.yy1 === -rad1 && seg2.yy1 === rad1) {
      // top to bottom
      seg2.face = 2;
    } else if (seg1.yy1 === -rad1 && seg2.xx1 === -rad1) {
      // top to left
      seg2.face = 3;
    } else if (seg1.xx1 === rad1 && seg2.yy1 === rad1) {
      // right to bottom
      seg2.face = 1;
    } else if (seg1.xx1 === rad1 && seg2.xx1 === -rad1) {
      // right to left
      seg2.face = 2;
    } else if (seg1.xx1 === rad1 && seg2.yy1 === -rad1) {
      // right to top
      seg2.face = 3;
    } else if (seg1.yy1 === rad1 && seg2.xx1 === -rad1) {
      // bottom to left
      seg2.face = 1;
    } else if (seg1.yy1 === rad1 && seg2.yy1 === -rad1) {
      // bottom to top
      seg2.face = 2;
    } else if (seg1.yy1 === rad1 && seg2.xx1 === rad1) {
      // bottom to right
      seg2.face = 3;
    }
    let quadR = `M ${seg1.xx2} ${seg1.yy2} L ${seg1.xx1} ${seg1.yy1}`;
    if (seg2.face === 0) {
      if (seg1.xx1 === -rad1) {
        quadR += `L ${-rad1} ${seg2.yy1}`;
        quadR += `L ${-rad2} ${seg2.yy2}`;
      } else if (seg1.xx1 === rad1) {
        quadR += `L ${rad1} ${seg2.yy1}`;
        quadR += `L ${rad2} ${seg2.yy2}`;
      } else if (seg1.yy1 === -rad1) {
        quadR += `L ${seg2.xx1} ${-rad1}`;
        quadR += `L ${seg2.xx2} ${-rad2}`;
      } else if (seg1.yy1 === rad1) {
        quadR += `L ${seg2.xx1} ${rad1}`;
        quadR += `L ${seg2.xx2} ${rad2}`;
      }
    } else if (seg2.face === 1) {
      if (seg1.xx1 === -rad1) {
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${seg2.xx1} ${-rad1}`;
        quadR += `L ${seg2.xx2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
      } else if (seg1.xx1 === rad1) {
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${seg2.xx1} ${rad1}`;
        quadR += `L ${seg2.xx2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
      } else if (seg1.yy1 === -rad1) {
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${seg2.yy1}`;
        quadR += `L ${rad2} ${seg2.yy2}`;
        quadR += `L ${rad2} ${-rad2}`;
      } else if (seg1.yy1 === rad1) {
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${seg2.yy1}`;
        quadR += `L ${-rad2} ${seg2.yy2}`;
        quadR += `L ${-rad2} ${rad2}`;
      }
    } else if (seg2.face === 2) {
      if (seg1.xx1 === -rad1) {
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${seg2.yy1}`;
        quadR += `L ${rad2} ${seg2.yy2}`;
        quadR += `L ${rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
      } else if (seg1.xx1 === rad1) {
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${seg2.yy1}`;
        quadR += `L ${-rad2} ${seg2.yy2}`;
        quadR += `L ${-rad2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
      } else if (seg1.yy1 === -rad1) {
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${seg2.xx1} ${rad1}`;
        quadR += `L ${seg2.xx2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
        quadR += `L ${rad2} ${-rad2}`;
      } else if (seg1.yy1 === rad1) {
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${seg2.xx1} ${-rad1}`;
        quadR += `L ${seg2.xx2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${rad2}`;
      }
    } else if (seg2.face === 3) {
      if (seg1.xx1 === -rad1) {
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${seg2.xx1} ${rad1}`;
        quadR += `L ${seg2.xx2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
        quadR += `L ${rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
      } else if (seg1.xx1 === rad1) {
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${seg2.xx1} ${-rad1}`;
        quadR += `L ${seg2.xx2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
      } else if (seg1.yy1 === -rad1) {
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${seg2.yy1}`;
        quadR += `L ${-rad2} ${seg2.yy2}`;
        quadR += `L ${-rad2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
        quadR += `L ${rad2} ${-rad2}`;
      } else if (seg1.yy1 === rad1) {
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${seg2.yy1}`;
        quadR += `L ${rad2} ${seg2.yy2}`;
        quadR += `L ${rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${rad2}`;
      }
    } else if (seg2.face === 4) {
      if (seg1.xx1 === -rad1) {
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${seg2.yy1}`;
        quadR += `L ${-rad2} ${seg2.yy2}`;
        quadR += `L ${-rad2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
        quadR += `L ${rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
      } else if (seg1.xx1 === rad1) {
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${seg2.yy1}`;
        quadR += `L ${rad2} ${seg2.yy2}`;
        quadR += `L ${rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
      } else if (seg1.yy1 === -rad1) {
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${seg2.xx1} ${-rad1}`;
        quadR += `L ${seg2.xx2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
        quadR += `L ${rad2} ${-rad2}`;
      } else if (seg1.yy1 === rad1) {
        quadR += `L ${-rad1} ${rad1}`;
        quadR += `L ${-rad1} ${-rad1}`;
        quadR += `L ${rad1} ${-rad1}`;
        quadR += `L ${rad1} ${rad1}`;
        quadR += `L ${seg2.xx1} ${rad1}`;
        quadR += `L ${seg2.xx2} ${rad2}`;
        quadR += `L ${rad2} ${rad2}`;
        quadR += `L ${rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${-rad2}`;
        quadR += `L ${-rad2} ${rad2}`;
      }
    }
    quadR += `Z`; // Closed curve
    return quadR;
  }
  squarePie(
    data: number[],
    rad1: number,
    rad2: number,
    startAngle: number,
    endAngle: number
  ) {
    startAngle += Math.PI / 2;
    endAngle += Math.PI / 2;

    const cumData = <number[]>[];
    const linesD = <{
      path: string;
      data: number;
      angle1: number;
      angle2: number;
    }[]>[];
    let totD = 0;
    const botD = 0;
    data.forEach(function(d, i) {
      totD += d;
      cumData[i] = totD;
    });
    const angle = d3
      .scaleLinear()
      .domain([botD, totD])
      .range([startAngle, endAngle]);
    let startPosition = botD;
    const arcHere = this.squareArc;
    cumData.forEach(function(d) {
      const ang1 = angle(startPosition);
      const ang2 = angle(d);
      linesD.push({
        path: arcHere(ang1, ang2, rad1, rad2),
        data: d,
        angle2: ang2,
        angle1: ang1
      });
      startPosition = d;
    });
    return linesD;
  }
}
