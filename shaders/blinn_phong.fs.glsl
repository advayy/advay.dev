
uniform vec3 ambientColor;
uniform float kAmbient;

uniform vec3 diffuseColor;
uniform float kDiffuse;

uniform vec3 specularColor;
uniform float kSpecular;
uniform float shininess;

uniform mat4 modelMatrix;

uniform vec3 spherePosition;

in vec3 interpolatedNormal;
in vec3 viewPosition;
in vec3 worldPosition;


void main() {
    
    vec3 lightDirection = normalize(spherePosition - worldPosition);    
    vec3 viewDir = normalize(-viewPosition);

    vec3 ambient = kAmbient * ambientColor;

    float lambertian = max(dot(interpolatedNormal, lightDirection), 0.0);
    vec3 diffuse = kDiffuse * lambertian * diffuseColor;

    float specAngle = max(dot(interpolatedNormal, normalize(lightDirection + viewDir)), 0.0);
    float specularFactor = pow(specAngle, shininess);
    vec3 specular = kSpecular * specularFactor * specularColor;

    vec3 finalColor = ambient + diffuse + specular;
    gl_FragColor = vec4(finalColor, 1.0);
}
