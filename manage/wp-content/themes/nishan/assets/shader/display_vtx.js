//VERTEX
varying vec2 vUv;

const float PI = 3.14159265359;

void main()
{
	vUv = uv;
	
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );	
	gl_Position = projectionMatrix * mvPosition;
}