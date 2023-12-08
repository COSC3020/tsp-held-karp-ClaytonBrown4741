function tsp_hk(distance_matrix) {
	var cache={}
	//cache.splice(0,cache.length)
	var nodesLeft = [];
	var minimumValue = Infinity
	var bufferVar=-1
 	if(distance_matrix.length < 2) {
        	return 0;
    	}
	cities=Object.keys(distance_matrix)
        for(var i = 0; i < distance_matrix.length; i++){
            	//bufferVar = tsp_HeldKarp(distance_matrix, i, cities)
		bufferVar=tsp_HeldKarp(distance_matrix, i, cities, cache)
		if (bufferVar < minimumValue)
                	minimumValue = bufferVar
    	}
    	return minimumValue
}

function tsp_HeldKarp(distances, start, cities, cache)
{
	var key = JSON.stringify(cities) + start
	if (cache[key] === undefined){
		cache[key] = {};
	}
        else{ 
		return cache[key];
	}

    	if (cities.length <= 1)
    	{
        	cache[key] = distances[start][cities[0]]
        	return distances[start][cities[0]];
    	}
    	else
    	{
        	var minimumDistance = Infinity;

        	for (var i = 0; i < cities.length; i++)
        	{
            		var newCities = cities.filter(city => city != start)
            		var sumDist = distances[start][cities[i]] + tsp_HeldKarp(distances, cities[i], newCities, cache);
			if (sumDist < minimumDistance){
				minimumDistance=sumDist
			}
        	}

        	cache[key] = minimumDistance;
        	return minimumDistance;
    	}
}
