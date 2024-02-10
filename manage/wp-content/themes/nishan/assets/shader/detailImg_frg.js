//FRAGMENT

uniform sampler2D texture;
uniform sampler2D noise;
uniform float alpha;
uniform float shiftX;
uniform float shiftY;

varying vec2 vUv;

void main()
{
	vec4 col = texture2D( texture, vec2( vUv.x * 3.0, vUv.y * 6.0 ) );
	vec4 nCol = texture2D( noise, vec2( vUv.x * 0.12 + shiftX, vUv.y * 0.5 + shiftY ) );
	
	float yy = ( 1.0 - vUv.y ) * 0.5;
	
	gl_FragColor = vec4( col.rgb + (nCol.r * 0.45) - yy, col.a * alpha );
	//gl_FragColor = vec4( nCol.rgb, col.a * alpha );
}



