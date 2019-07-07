#ifdef GL_ES
precision highp float;
#endif

const float LOG2 = 1.442695;

uniform vec3 cameraPosition;

uniform vec4 waterColor;
uniform float colorBlendFactor;

uniform sampler2D bumpSampler;
uniform sampler2D refractionSampler;
uniform sampler2D reflectionSampler;

varying vec2 vBumpMapTexCoord;
varying vec3 vRefractionMapTexCoord;
varying vec3 vReflectionMapTexCoord;
varying vec3 vPosition;
varying vec2 vUV;
varying float vWaveHeight;
	
void main()
{
	vec4 bumpColor = texture2D(bumpSampler, vBumpMapTexCoord);
	vec2 perturbation = vWaveHeight * (bumpColor.rg - 0.5);
	
	vec2 projectedRefractionTexCoords = clamp(vRefractionMapTexCoord.xy / vRefractionMapTexCoord.z + perturbation, 0.0, 1.0);
	vec4 refractiveColor = texture2D(refractionSampler, projectedRefractionTexCoords);
	
	vec2 projectedReflectionTexCoords = clamp(vReflectionMapTexCoord.xy / vReflectionMapTexCoord.z + perturbation, 0.0, 1.0);
	vec4 reflectiveColor = texture2D(reflectionSampler, projectedReflectionTexCoords);
	
	vec3 eyeVector = normalize(cameraPosition - vPosition);
	vec3 upVector = vec3(0.0, 1.0, 0.0);
	
	float fresnelTerm = max(dot(eyeVector, upVector), 0.0);
	
	vec4 combinedColor = refractiveColor * fresnelTerm + reflectiveColor * (1.0 - fresnelTerm);
	
	vec4 finalColor = colorBlendFactor * waterColor + (1.0 - colorBlendFactor) * combinedColor;
	
	gl_FragColor = finalColor;
	
	//gl_FragColor = texture2D(reflectionSampler, projectedReflectionTexCoords);
}

