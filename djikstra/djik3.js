function dijkstra(graph, startNode) {
    const distances = {};
    const visited = {};
    const previous = {};
  
    for (let node in graph) {
      distances[node] = Infinity;
      visited[node] = false;
      previous[node] = null;
    }
  
    distances[startNode] = 0;
  
    while (true) {
      let closestNode = null;
      let shortestDistance = Infinity;
  
      for (let node in graph) {
        if (!visited[node] && distances[node] < shortestDistance) {
          closestNode = node;
          shortestDistance = distances[node];
        }
      }
  
      if (closestNode === null) {
        break;
      }
  
      visited[closestNode] = true;
  
      for (let neighbor in graph[closestNode]) {
        let distance = graph[closestNode][neighbor];
        let totalDistance = distance + shortestDistance;
  
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = closestNode;
        }
      }
    }
  
    return { distances, previous };
  }
  
  const graph = {
    a: { b: 5, c: 1 },
    b: { a: 5, c: 2, d: 1 },
    c: { a: 1, b: 2, d: 4 },
    d: { b: 1, c: 4 }
  };
  
  const startNode = 'a';
  
  const { distances, previous } = dijkstra(graph, startNode);
  
  console.log(distances);
  console.log(previous);
  