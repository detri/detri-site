import styled from 'styled-components';
import React from 'react';
import anime from 'animejs';
import { request } from 'http';

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.size = 0;

    this.registerCanvas = this.registerCanvas.bind(this);
    this.draw = this.draw.bind(this);
  }

  calcScale(fftData) {
    let total = 0;
    let max = fftData.length * 255;
    for (let i = 0; i < fftData.length; i++) {
      total += fftData[i];
    }
    return total / max;
  }
  
  draw() {
    requestAnimationFrame(this.draw);
    if (!this.props.fftData || !this.ctx) return;

    let scale = this.calcScale(this.props.fftData);
    let size = 72;
    size /= 2;
    let scaledSize = scale * size;

    this.ctx.clearRect(0, 0, 72, 72);
    this.ctx.beginPath();
    this.ctx.arc(size, size, scaledSize - 1, 0, 2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
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
    return <canvas className={this.props.className} ref={this.registerCanvas} width={72} height={72} />;
  }
}

export default styled(Visualizer)`
  display: inline-block;
`;