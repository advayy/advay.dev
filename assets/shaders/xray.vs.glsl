uniform float ticks;

out vec3 vNormal;            
out vec3 vViewDirection;

void main() {
    vNormal = normalize(normalMatrix * normal); 
    
    vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDirection = normalize(-viewPosition.xyz);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}