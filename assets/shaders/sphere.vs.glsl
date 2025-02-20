uniform vec3 spherePosition;
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position + spherePosition, 1.0);
}
