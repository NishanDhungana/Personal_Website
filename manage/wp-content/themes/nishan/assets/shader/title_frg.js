//FRAGMENT

uniform sampler2D texture;

uniform float time;
uniform float alpha;
uniform float strength;
uniform float size;

varying vec2 vUv;

void main()
{
	//float size = 6.0;
	float speed = 1.0;
	vec2 p = -1.0 + 2.0 * vUv;
	vec2 newUV = vUv + strength * vec2(cos(time * speed + length( p * size )), sin(time * speed + length(p * size)));
	
	
	//vec4 col1 = texture2D( texture, vUv );
	vec4 col1 = texture2D( texture, newUV );
	

	gl_FragColor = vec4( col1.rgb, col1.a * alpha );
	//gl_FragColor = mfColor;
}



