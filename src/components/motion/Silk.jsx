import { useEffect, useLayoutEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

// Rendered with ogl rather than three.js + @react-three/fiber: this is a
// single full-screen shader, and three/r3f added ~850 kB to the chunk for it.

const hexToNormalizedRGB = hex => {
  hex = hex.replace('#', '');
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255
  ];
};

// Full-screen triangle: within the visible area uv spans 0..1, matching the
// viewport-sized plane the three.js version used.
const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

const Silk = ({ className = '', speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {
  const containerRef = useRef(null);

  // Keep the latest props in a ref so updating them mutates the live shader
  // uniforms instead of tearing down and rebuilding the whole WebGL context.
  const propsRef = useRef({ speed, scale, color, noiseIntensity, rotation });
  useLayoutEffect(() => {
    propsRef.current = { speed, scale, color, noiseIntensity, rotation };
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.canvas.style.display = 'block';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToNormalizedRGB(propsRef.current.color) },
        uSpeed: { value: propsRef.current.speed },
        uScale: { value: propsRef.current.scale },
        uRotation: { value: propsRef.current.rotation },
        uNoiseIntensity: { value: propsRef.current.noiseIntensity }
      }
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => renderer.setSize(container.clientWidth, container.clientHeight);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Only animate while the canvas is on screen and the tab is visible.
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(entries => {
      isVisible = entries[0].isIntersecting;
    });
    intersectionObserver.observe(container);

    let frameId = 0;
    let last = performance.now();
    const update = now => {
      frameId = requestAnimationFrame(update);
      const delta = (now - last) / 1000;
      last = now;
      if (!isVisible || document.hidden) return;

      const { speed, scale, color, noiseIntensity, rotation } = propsRef.current;
      const u = program.uniforms;
      // Same clock as the three.js version: 0.1 shader-seconds per second.
      u.uTime.value += 0.1 * delta;
      u.uSpeed.value = speed;
      u.uScale.value = scale;
      u.uColor.value = hexToNormalizedRGB(color);
      u.uRotation.value = rotation;
      u.uNoiseIntensity.value = noiseIntensity;

      renderer.render({ scene: mesh });
    };
    frameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`silk-container ${className}`}
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
};

export default Silk;
