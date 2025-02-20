
uniform vec3 toonColor;
uniform vec3 toonColor2;
uniform vec3 outlineColor;

in vec3 interpolatedNormal;
in vec3 lightDirection;
in vec3 viewPosition;
in float fresnel;

void main() {

    float lightIntensity = max(dot(normalize(interpolatedNormal), normalize(lightDirection)), 0.0);

    float quantizedIntensity = ceil(lightIntensity * 3.0) / 3.0;

    vec3 color = mix(toonColor2, toonColor, quantizedIntensity);

    float outlineThreshold = 0.35;
    if (fresnel < outlineThreshold) {
        color = outlineColor;  
    }

    gl_FragColor = vec4(color, 1.0);
}
