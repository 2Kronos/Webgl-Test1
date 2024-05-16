import { vsSource } from "./shaders.js";
import { fsSource } from "./shaders.js";


const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');


if (!gl) {
    throw new Error("WebGL not supported");
}

// Vertices
const vertexData = [

    0.0, -0.9, 0, //0
    -0.4, -0.5, 0, //1
    -0.3, 0.1, 0, //2

    -0.3, 0.1, 0, //3
    0.0, -0.9, 0, //4
    0.1, 0.2, 0, //5

    0.1, 0.2, 0, //6
    0.0, -0.9, 0, //7
    0.5, 0, 0,    //8 

    0.5, 0, 0,    //9
    0.5, -0.6, 0,    //10
    0.0, -0.9, 0,   //11
    



    
    
];

// Buffer
const buffer = gl.createBuffer();
if (!buffer) {
    console.error("Failed to create buffer");
} else {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
}

// Vertex shader
const vertexShaderSourceCode = vsSource;
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vsSource);
gl.compileShader(vertexShader);

// Error checking for vertex shader
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error(`Vertex shader compilation error:
     ${gl.getShaderInfoLog(vertexShader)}
     `);
}

// Fragment shader
const fragmentShaderSourceCode = fsSource;
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fsSource);
gl.compileShader(fragmentShader);

// Error checking for fragment shader
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error(`Fragment shader compilation error:
     ${gl.getShaderInfoLog(fragmentShader)}
     `);
}

// Program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Linking error
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`Shader program linking error:
     ${gl.getProgramInfoLog(program)}
     `);
}

const positionLocation = gl.getAttribLocation(program, "pos");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

// angle attribute
const uniformLocation = gl.getUniformLocation(program, `angle`);

let angle = 0;
draw();
function draw(){

angle += 0.005;
   gl.uniform1f(uniformLocation, angle);
gl.clearColor(0, 0, 0, 0); // Set clear color
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

 gl.drawArrays(gl.LINE_LOOP, 0, 3);
 gl.drawArrays(gl.LINE_LOOP, 3, 3);
 gl.drawArrays(gl.LINE_LOOP, 6, 3);
 gl.drawArrays(gl.LINE_LOOP, 9, 3);
 gl.drawArrays(gl.POINTS, 0, 12);



window.requestAnimationFrame(draw);
}