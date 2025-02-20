
uniform float ticks;

in vec3 interpolatedNormal;
in vec3 lightDirection;
in vec3 vertexPosition;

void main() {
    vec3 color1 = vec3(1.0, 0.0, 1.0); // magenta
    vec3 color2 = vec3(0.0, 1.0, 1.0); // cyan

    float lightIntensity = max(dot(normalize(interpolatedNormal), normalize(lightDirection)), 0.0);

    float gridSize = 0.5;
    vec3 gridPosition = vertexPosition + vec3(0.0, 0.0, -ticks * 0.6); // Dots roll down the Z-axis

    float dotDistance = length(vec3(
        mod(gridPosition.x, gridSize) - gridSize / 2.0,
        mod(gridPosition.y, gridSize) - gridSize / 2.0,
        mod(gridPosition.z, gridSize) - gridSize / 2.0
    ));


    float dotThreshold = 0.2; // dot size
    if (dotDistance > dotThreshold) {
        discard; 
    }

    float colorOscillation = 0.5 + 0.5 * sin(ticks * 0.9 + lightIntensity);
    vec3 dynamicColor = mix(color1, color2, colorOscillation);
    gl_FragColor = vec4(dynamicColor, 1.0);
}
