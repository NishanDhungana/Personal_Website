//VERTEX
attribute vec3 displacement;

varying vec2 vUv;

void main()
{
	vUv = uv;
		
	vec4 mvPosition = modelViewMatrix * vec4( vec3(position.x, position.y + displacement.y, position.z), 1.0 );
	gl_Position = projectionMatrix * mvPosition;
}