uniform vec3 spherePosition;

out vec3 interpolatedNormal;
out vec3 lightDirection;
out vec3 viewPosition;
out float fresnel; 
void main() {
    vec4 viewPos = viewMatrix * modelMatrix * vec4(position, 1.0);
    viewPosition = viewPos.xyz;

    vec4 viewLightPos = viewMatrix * vec4(spherePosition, 1.0);
    lightDirection = normalize(viewLightPos.xyz - viewPosition);

    interpolatedNormal = normalize(mat3(viewMatrix * modelMatrix) * normal);

    vec3 viewDir = normalize(-viewPosition);
    fresnel = abs(dot(interpolatedNormal, viewDir));

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
