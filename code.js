function tsp_hk(distance_matrix) {
	cache=[]
	var nodesLeft = [];
	var minimumValue = Infinity
	var bufferVar=-1
 	if(distance_matrix.length < 2) {
        	return 0;
    	} 
	cities=Object.keys(distance_matrix)
        for(var i = 0; i < distance_matrix.length; i++){
            	bufferVar = tsp_HeldKarp(distance_matrix, i, cities) 
		if (bufferVar < minimumValue)
                	minimumValue = bufferVar 
    	}
    	return minimumValue
}

function tsp_HeldKarp(distance_matrix, start, cities) {
	if(cities.length < 1) {
		return 0;
        }
	var key = JSON.stringify(start+cities)
    	if(cache[key] !== undefined) {
		//console.log("cache being accessed")
		return cache[key]
	}
	if(cities.length == 1) {
          	cache[key] = distance_matrix[start][cities[0]];
            	return cache[key];
        }
	var minimumVal = Infinity
	var desiredIndex = -1
	var originalValue=0
        for(var i = 0; i < cities.length; i++) {
                originalValue = cities.splice(i,1)
		//console.log(tempStart)
                buffer = tsp_HeldKarp(distance_matrix, originalValue, cities)
		//console.log(temp)
                if(buffer < minimumVal) {
                    	minimumVal = buffer;
			desiredIndex = originalValue;
                }
                cities.splice(i,0,originalValue);
        }                                                                          
        cache[key] = minimumVal + distance_matrix[start][desiredIndex];
	//console.log(cache[key])
	//console.log("cache not being used")
        return cache[key];                  
}

cache=[]
