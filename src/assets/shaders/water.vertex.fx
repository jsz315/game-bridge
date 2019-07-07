#ifdef GL_ES
precision highp float;
#endif

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;
uniform mat4 worldReflectionViewProjection;

uniform vec2 windDirection;

uniform float waveLength;
uniform float time;
uniform float windForce;
uniform float waveHeight;

varying vec2 vBumpMapTexCoord;
varying vec3 vRefractionMapTexCoord;
varying vec3 vReflectionMapTexCoord;
varying vec3 vPosition;
varying vec2 vUV;
varying float vWaveHeight;

void main()
{
	vec3 p = position;
	p.y += (sin(((p.x / 0.05) + time)) * waveHeight * 5.0) + (cos(((p.z / 0.05) +  time)) * waveHeight * 5.0);
	vWaveHeight = waveHeight;
	
	gl_Position = worldViewProjection * vec4(p, 1.0);
	
	vBumpMapTexCoord = (uv * 1.0) / waveLength + time * windForce * windDirection;
	vUV = uv;
	
	vec4 pos = worldViewProjection * vec4(position, 1.0);
	vRefractionMapTexCoord.x = 0.5 * (pos.w + pos.x);
	vRefractionMapTexCoord.y = 0.5 * (pos.w + pos.y);
	vRefractionMapTexCoord.z = pos.w;
	
	pos = worldReflectionViewProjection * vec4(position, 1.0);
	vReflectionMapTexCoord.x = 0.5 * (pos.w + pos.x);
	vReflectionMapTexCoord.y = 0.5 * (pos.w + pos.y);
	vReflectionMapTexCoord.z = pos.w;
	
	vPosition = position;
}