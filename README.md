[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12905336&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.  

**NOTE**:  
Please note that I used the following code for reference in order to help me  
understand how to iterate over all the paths in the list of cities:  
https://github.com/COSC3020/tsp-held-karp-CadeMaynard/tree/main  
In addition to this, I also used the slides provided in class in order to see how  
memoization could best be done in this scenario.  
Inspiration on how to properly optimize my code came from this link:  
https://github.com/COSC3020/tsp-held-karp-rzafft1/tree/main  
  
**ANSWER**:  
The worst case time complexity of this problem will depend almost entirely  
on how well the caching works. This is because normally trying all permutations  
of a list would take $n!$ amount of time, but the cache that we've implemented  
allows us to bypass some of these values and lower the amount of combinations  
we'd have to try to $2^n$. This is due to the fact that from now on, we will  
only have to account for all *subsets* of the cities thanks to the implementation  
of memoization allowing us to automatically know what the shortest path is once given  
a specific subset of cities that it's already encountered. The code will need to go  
through and rememoize everything no more than n amount of times in order to account  
for all possible start cities, which brings our current runtime to $O(n * 2^n)$. However,  
the preparing of the new path will also take n amount of time and must be repeated for  
every unique subset/start city combo we come across. So therefore, in the  
end, the final runtime complexity will be $O(2^n * n^2)$.  
As for the memory complexity, it will be largely the same. This is because the cache will  
only have to hold any unique permuations that we encounter. However, due to the way we  
decided to cache our results, the start city must *also* be taken into account. Therefore,  
it will ultimately end up being $O(2^n * n)$ because we have to count not only the unique  
permutations, but the starting city that belongs to that permutation as well.

