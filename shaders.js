// shaders.js

const vsSource = `
    precision mediump float;
    attribute vec3 pos;
    uniform float angle;
    float x;
   float y;
   float z;
    
    void main() {

    

      //spin on z axis
     x = pos.x*cos(angle)-pos.y*sin(angle);
      y = pos.x*sin(angle)+pos.y*cos(angle);
       z = pos.z;
 
       gl_Position = vec4(x, y, z, 1)+ vec4(0, 0.2, 0, 0);
      

        gl_PointSize = 20.0;
    }
`;

const fsSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.5, 0.1, 0.7, 1);
    }
`;

export { vsSource, fsSource }
