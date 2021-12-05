import React, { useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/Globals/GlobalProvider";

import "../../styles/StarCanvas.css";

export default function StarCanvas() {
  const [state] = React.useContext(GlobalContext);

  const STAR_COUNT = (window.innerWidth + window.innerHeight) / 10,
    STAR_SIZE = 3,
    STAR_MIN_SCALE = 0.2,
    OVERFLOW_THRESHOLD = 50;

  const starCanvasRef = useRef(null);
  let scale = 1, // device pixel ratio
    width,
    height;
  let stars = [];
  let pointerX, pointerY;
  let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
  let touchInput = false;

  // Event Handlers
  function movePointer(x, y) {
    if (typeof pointerX === "number" && typeof pointerY === "number") {
      let ox = x - pointerX,
        oy = y - pointerY;

      velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
      velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }

    pointerX = x;
    pointerY = y;
  }

  function onMouseMove(ev) {
    touchInput = false;

    movePointer(ev.clientX, ev.clientY);
  }

  function onMouseLeave() {
    pointerX = null;
    pointerY = null;
  }

  // Star Movement Utilities
  const placeStar = (star) => {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  };

  const recycleStar = (star) => {
    let direction = "z";

    let vx = Math.abs(velocity.x),
      vy = Math.abs(velocity.y);

    if (vx > 1 || vy > 1) {
      let axis;

      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? "h" : "v";
      } else {
        axis = Math.random() < vy / (vx + vy) ? "v" : "h";
      }

      if (axis === "h") {
        direction = velocity.x > 0 ? "l" : "r";
      } else {
        direction = velocity.y > 0 ? "t" : "b";
      }
    }

    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

    if (direction === "z") {
      star.z = 0.1;
      star.x = Math.random() * width;
      star.y = Math.random() * height;
    } else if (direction === "l") {
      star.x = -OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "r") {
      star.x = width + OVERFLOW_THRESHOLD;
      star.y = height * Math.random();
    } else if (direction === "t") {
      star.x = width * Math.random();
      star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === "b") {
      star.x = width * Math.random();
      star.y = height + OVERFLOW_THRESHOLD;
    }
  };

  const update = () => {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;

    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;

    stars.forEach((star) => {
      star.x += velocity.x * star.z;
      star.y += velocity.y * star.z;

      star.x += (star.x - width / 2) * velocity.z * star.z;
      star.y += (star.y - height / 2) * velocity.z * star.z;
      star.z += velocity.z;

      // recycle when out of bounds
      if (
        star.x < -OVERFLOW_THRESHOLD ||
        star.x > width + OVERFLOW_THRESHOLD ||
        star.y < -OVERFLOW_THRESHOLD ||
        star.y > height + OVERFLOW_THRESHOLD
      ) {
        recycleStar(star);
      }
    });
  };

  const render = (context) => {
    stars.forEach((star) => {
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = STAR_SIZE * star.z * scale;
      if (state.themeDark) {
        context.strokeStyle =
          "rgba(255,255,255," + (0.5 + 0.5 * Math.random()) + ")";
      } else {
        context.strokeStyle = "rgba(0,0,0," + (0.5 + 0.5 * Math.random()) + ")";
      }

      context.beginPath();
      context.moveTo(star.x, star.y);

      var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

      // stroke() wont work on an invisible line
      if (Math.abs(tailX) < 0.1) tailX = 0.5;
      if (Math.abs(tailY) < 0.1) tailY = 0.5;

      context.lineTo(star.x + tailX, star.y + tailY);

      context.stroke();
    });
  };

  // Initiate Sequence
  const generate = () => {
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: 0,
        y: 0,
        z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
      });
    }
  };

  const resize = (canvas) => {
    scale = window.devicePixelRatio || 1;

    width = window.innerWidth * scale;
    height = window.innerHeight * scale;

    canvas.width = width;
    canvas.height = height;

    stars.forEach(placeStar);
  };

  useEffect(() => {
    const canvas = starCanvasRef.current;
    const context = canvas.getContext("2d");

    const step = () => {
      context.clearRect(0, 0, width, height);

      update();
      render(context);

      requestAnimationFrame(step);
    };

    window.onresize = (_) => resize(canvas);
    canvas.onmousemove = onMouseMove;
    document.onmouseleave = onMouseLeave;

    generate();
    resize(canvas);
    step();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.themeDark]);

  return <canvas className="star-canvas" ref={starCanvasRef}></canvas>;
}
