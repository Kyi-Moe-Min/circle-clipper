const AREA = 200;
const HALF_AREA = AREA / 2;

const getRadian = degree => (Math.PI * degree) / 180;

const getCoordinate = degree => [
  Math.cos(getRadian(degree))*100,
  Math.sin(getRadian(degree))*100
];

const getXYPercent = degree => {
  const [x,y] = getCoordinate(degree);
  // console.log(x,y)
  return [(HALF_AREA + x) / 2, (HALF_AREA - y) / 2];
};


const clip = (seconds = 36) => {
  const degree = 360 / seconds;
  const percent = 100 / seconds;
  let clipper = "@keyframes clipper{";
  let frame = [];
  for (let i = 0; i <= seconds; i++) {
    let clipPoints = ["50% 50%"];
    if (frame.length) clipPoints = [...frame[frame.length - 1].slice(0, i + 1)];
    const [x, y] = getXYPercent(degree * i);
    for (let j = i; j <= seconds; j++)
      clipPoints[j + 1] = x.toFixed(2) + "% " + y.toFixed(2) + "%";

    frame.push(clipPoints);
    let str = (i * percent).toFixed(2) + "% { clip-path: polygon(";
    str += clipPoints.join(",");
    str += ");} ";
    clipper += str;
  }
  clipper += "}";
  // console.log(frame)
  console.log(clipper);
};

/**
  set AREA and call the clip function with time second;
  
*/

clip(6);
