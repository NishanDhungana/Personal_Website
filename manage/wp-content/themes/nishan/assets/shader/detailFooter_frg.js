//FRAGMENT

uniform sampler2D texture;
uniform sampler2D mask;
uniform sampler2D noise;
uniform float alpha;
uniform float mixNum;
uniform float dark;

varying vec2 vUv;

const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

void main()
{
	vec4 col = texture2D( texture, vUv );
	vec4 maskCol = texture2D( mask, vUv );
	vec4 noiseCol = texture2D( noise, vUv * 0.5 );
	
	float gCol = dot(col.rgb, monochromeScale);
	
	vec3 mixCol = mix( col.rgb, vec3(gCol * dark), mixNum );
	
	vec3 darkCol = max(mixCol - noiseCol.r * 0.10, 0.0);
	
	//gl_FragColor = vec4( col.rgb, maskCol.a * alpha );
	gl_FragColor = vec4( darkCol, maskCol.a * alpha );
}



