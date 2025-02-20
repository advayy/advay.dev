uniform vec3 spherePosition;

out vec3 viewPosition;
out vec3 worldPosition;
out vec3 interpolatedNormal;

void main() {
    
    worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    viewPosition = (viewMatrix * modelMatrix * vec4(position, 1.0)).xyz;
    interpolatedNormal = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
