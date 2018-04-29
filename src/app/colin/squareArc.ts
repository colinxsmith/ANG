  function squareArc(ang1: number, ang2: number, rad1: number, rad2: number) {
    ang1 -= Math.PI * 0.5;
    ang2 -= Math.PI * 0.5;
    const seg1 = { xx1: 0, xx2: 0, yy1: 0, yy2: 0 };
    const seg2 = { xx1: 0, xx2: 0, yy1: 0, yy2: 0, face: 0 };
    if (rad1 === 0) {
      rad1 = 1e-7;
    }
    if (rad2 === 0) {
      rad2 = 1e-7;
    }
    seg1.xx1 = rad1 * Math.cos(ang1);
    seg1.yy1 = rad1 * Math.sin(ang1);
    if (Math.abs(seg1.xx1) > Math.abs(seg1.yy1)) {
      seg1.yy1 *= Math.abs(rad1 / seg1.xx1);
      seg1.xx1 = seg1.xx1 < 0 ? -rad1 : rad1;
    } else {
      seg1.xx1 *= Math.abs(rad1 / seg1.yy1);
      seg1.yy1 = seg1.yy1 < 0 ? -rad1 : rad1;
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
    if (Math.abs(seg2.xx2) > Math.abs(seg2.yy2)) {
      seg2.yy2 *= Math.abs(rad2 / seg2.xx2);
      seg2.xx2 = seg2.xx2 < 0 ? -rad2 : rad2;
    } else {
      seg2.xx2 *= Math.abs(rad2 / seg2.yy2);
      seg2.yy2 = seg2.yy2 < 0 ? -rad2 : rad2;
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
