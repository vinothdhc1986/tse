import { set } from 'immer/dist/internal';
import React, { useState, useEffect, FC } from 'react';

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: '0 0 38 38',
  x: '19',
  y: '19',
  radio: '15.91549430918954'
};

interface CircleProgressBarBaseProps {
  className: string,
  strokeColor: string,
  strokeWidth: number,
  innerText: string,
  legendText: string,
  percentage: number,
  trailStrokeWidth: number,
  trailStrokeColor: string,
  trailSpaced: boolean,
  speed: number
};


let timer: any;

const CircleProgressBarBase: FC<CircleProgressBarBaseProps> = ({
  className,
  strokeColor,
  strokeWidth,
  innerText,
  legendText,
  percentage,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  speed
}) => {

  const [progressBar, setProgressBar] = useState<number>(0);
  const pace = percentage / speed;

  // useEffect(() => {
  //   if(progressBar === 0)
  //  clearTimeout(timer);
  // }, []);
  
 
  useEffect(() => {
    if (progressBar < percentage) {
      setTimeout(() => {
        setProgressBar(progressBar + 1);
      }, pace);
    }
    return () => {
    }
  }, [progressBar]);

  return (
    <figure className={className}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="donut-ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
          strokeWidth={trailStrokeWidth}
          strokeDasharray={trailSpaced ? 1 : 0}
        />

        <circle
          className="donut-segment"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressBar} ${100 - progressBar}`}
          strokeDashoffset={INITIAL_OFFSET}
        />

        <g className="chart-text">
          <text x="50%" y="50%" className="chart-number">
            {progressBar}%
          </text>
          <text x="50%" y="50%" className="chart-label">
            {innerText}
          </text>
        </g>
      </svg>
      {legendText && (
        <figcaption className="figure-key">
          <ul
            className="figure-key-list"
            aria-hidden="true"
            role="presentation"
          >
            <li>
              <span className="shape-circle" />
              <span>{legendText}</span>
            </li>
          </ul>
        </figcaption>
      )}
    </figure>
  );
};

CircleProgressBarBase.defaultProps = {
  strokeColor: '#a5a5a5',
  strokeWidth: 3,
  innerText: 'Completed',
  legendText: '',
  percentage: 0,
  trailStrokeWidth: 3,
  trailStrokeColor: '#e6e6e6',
  trailSpaced: false,
  speed: 8
};

export default CircleProgressBarBase;
