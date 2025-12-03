export const paperVertexShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform vec2 uMouse;

void main() {
  vUv = uv;
  
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Gentle wave effect
  float elevation = sin(modelPosition.x * 2.0 + uTime * 0.5) * 0.1;
  elevation += sin(modelPosition.y * 1.5 + uTime * 0.3) * 0.1;
  
  // Mouse interaction (distortion)
  float dist = distance(uMouse, modelPosition.xy);
  float interaction = smoothstep(2.0, 0.0, dist);
  elevation += interaction * 0.2 * sin(uTime * 2.0);

  modelPosition.z += elevation;
  vElevation = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

export const paperFragmentShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform vec3 uColorBg;
uniform vec3 uColorAccent;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  // Paper grain noise
  float noise = snoise(vUv * 100.0);
  
  // Base color mixing with shadows/highlights from elevation
  vec3 color = mix(uColorBg, uColorBg * 0.9, smoothstep(0.0, 0.2, -vElevation));
  color = mix(color, uColorBg * 1.1, smoothstep(0.0, 0.2, vElevation));
  
  // Add noise texture
  color += noise * 0.03;

  // Green UV projection pattern (Scanning lines)
  float scanline = smoothstep(0.4, 0.5, sin(vUv.y * 20.0 - uTime * 2.0));
  float beam = smoothstep(0.95, 1.0, sin(vUv.x * 2.0 + uTime));
  
  // Combine patterns
  float pattern = scanline * beam * 0.1; // subtle
  
  // Accent color mix
  color = mix(color, uColorAccent, pattern);

  gl_FragColor = vec4(color, 1.0);
}
`;
