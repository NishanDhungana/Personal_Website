//FRAGMENT

uniform sampler2D texture_n;
uniform sampler2D texture_b;
uniform sampler2D noise;

uniform float time;
uniform float alpha;
uniform float strength;

varying vec2 vUv;

const float size = 6.0;

void main()
{
	//float size = 6.0;
	float speed = 1.0;
	vec2 p = -1.0 + 2.0 * vUv;
	vec2 newUV = vUv + strength * vec2(cos(time * speed + length( p * size )), sin(time * speed + length(p * size)));
	
	
	
	vec4 noiseCol = texture2D( noise, vec2(newUV.x, newUV.y * 0.8) );
	//vec4 noiseCol = texture2D( noise, newUV );
	

	
	//float mfSin = sin(noiseCol.r * 3.0);
	//vec4 col1 = texture2D( texture, newUV + strength * vec2(mfSin, mfSin) );
	
	//vec4 col1_n = texture2D( texture_n, newUV );
	//vec4 col1_b = texture2D( texture_b, newUV + noiseCol.r * 0.008 );
	vec4 col1_n = texture2D( texture_n, vec2(newUV.x + noiseCol.r * 0.002, newUV.y + noiseCol.r * 0.01) );
	vec4 col1_b = texture2D( texture_b, vec2(newUV.x + noiseCol.r * 0.008, newUV.y + noiseCol.r * 0.01) );
	
	
	
	
	float nr = min(noiseCol.r * 2.0, 1.0);
	
	//vec4 mixCol = mix( col1, col1_n, (1.0 - noiseCol.r) );
	vec4 mixCol = mix( col1_n, col1_b * 0.9, nr );
	
	
	//gl_FragColor = vec4( mixCol, col1.a * col1_n.a * max(noiseCol.r + 0.3, 0.2) * alpha );
	//gl_FragColor = vec4( mixCol.rgb, mixCol.a * max(1.0 - noiseCol.r, 0.9) * alpha );
	//gl_FragColor = vec4( mixCol.rgb, mixCol.a * max(1.0 - noiseCol.r, 0.5) * alpha );
	gl_FragColor = vec4( mixCol.rgb, mixCol.a * alpha );
	//gl_FragColor = mfColor;
}



