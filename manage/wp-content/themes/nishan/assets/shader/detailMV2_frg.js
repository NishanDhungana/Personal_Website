//FRAGMENT

uniform sampler2D texture;
//uniform sampler2D noise;
uniform sampler2D grade;
uniform sampler2D mask;
uniform float alpha;
uniform float shiftX;

varying vec2 vUv;

void main()
{
	vec4 col = texture2D( texture, vUv );
	vec4 gCol = texture2D( grade, vUv );
	//vec4 noiseCol = texture2D( noise, vUv * 0.5 );
	vec4 maskCol = texture2D( mask, vec2(vUv.x * 0.2 + shiftX, vUv.y) );
	
	vec3 baseCol = col.rgb - max( (1.0 - gCol.r) * 0.7, 0.0 );
	//vec3 darkCol = max(baseCol - noiseCol.r * 0.35, 0.0);
	
	//gl_FragColor = vec4( 1.0 - darkCol.rgb, col.a * alpha * maskCol.r );
	//gl_FragColor = vec4( vec3(1.0 - (baseCol.r * baseCol.r)), col.a * alpha * maskCol.r );
	gl_FragColor = vec4(vec3( baseCol.r * baseCol.r ), col.a * alpha * maskCol.r );
}



