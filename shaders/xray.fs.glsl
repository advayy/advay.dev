
uniform float ticks;          
in vec3 vNormal;                
in vec3 vViewDirection;         


void main() {
    float angle = dot(normalize(vNormal), normalize(vViewDirection));
    
    float transparency = pow(1.0 - abs(angle), 2.0);

    if (transparency < 0.3) {
        discard;
    }
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1);
}