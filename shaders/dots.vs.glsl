uniform vec3 spherePosition;

out vec3 interpolatedNormal;
out vec3 lightDirection;
out vec3 vertexPosition;

void main() {
    vertexPosition = position;

    vec4 viewLightPos = viewMatrix * vec4(spherePosition, 1.0);
    vec4 viewVertexPos = viewMatrix * modelMatrix * vec4(position, 1.0);
    lightDirection = normalize(viewLightPos.xyz - viewVertexPos.xyz);

    interpolatedNormal = normalize(mat3(viewMatrix * modelMatrix) * normal);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
