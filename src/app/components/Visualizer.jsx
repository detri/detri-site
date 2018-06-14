import styled from 'styled-components';
import React from 'react';
import chunk from 'lodash/chunk';

const calcDataSet = (fftData) => {
  let fftChunks = chunk(fftData, 8);
  // we don't want the last quarter of frequencies, they
  // tend not to do much
  // convert 0-255 values into scalar values
  fftChunks = fftChunks.map(v => v.reduce((a, b) => a + b) / v.length / 255);
  fftChunks = fftChunks.slice(0, fftChunks.length / 4 * 3);
  return fftChunks;
};

const drawCircle = (ctx, x, y, radius) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();
};

const drawCircles = (ctx, fftData, width, height) => {
  const circleHeights = calcDataSet(fftData);
  let numCircles = circleHeights.length;
  const radius = width / numCircles / 2;
  const maxHeight = height - radius;
  const minHeight = radius;
  let curX = radius;
  for (let i = 0; i < numCircles; i++) {
    let curY = Math.max(minHeight, circleHeights[i] * maxHeight);
    drawCircle(ctx, curX, -curY + height, radius);
    curX += radius * 2;
  }
};

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.circleSize = 5;
    this.numCircles = 16;


    this.registerCanvas = this.registerCanvas.bind(this);
    this.draw = this.draw.bind(this);
  }
  
  draw() {
    requestAnimationFrame(this.draw);
    if (!this.props.fftData || !this.ctx) return;

    this.ctx.clearRect(0, 0, 125, 72);
    drawCircles(this.ctx, this.props.fftData, 125, 72);
  }

  arraysEqual(a, b) {
    if (a === null || b === null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  registerCanvas(e) {
    this.ctx = e.getContext('2d');
    this.ctx.fillStyle = '#44a9ff';
    this.ctx.strokeStyle = '#44a9ff';
    this.draw();
  }

  render() {
    return <canvas className={this.props.className} ref={this.registerCanvas} width={125} height={72} />;
  }
}

export default styled(Visualizer)`
  display: inline-block;
  margin-left: 1.5em;
`;