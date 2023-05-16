const graph = {
    'Monas': {
      'Taman Mini': 20,
      'Ancol': 10,
    },
    'Taman Mini': {
      'Monas': 20,
      'Ancol': 15,
      'Ragunan': 30,
    },
    'Ancol': {
      'Monas': 10,
      'Taman Mini': 15,
      'Kebun Binatang': 5,
    },
    'Ragunan': {
      'Taman Mini': 30,
      'Kebun Binatang': 10,
    },
    'Kebun Binatang': {
      'Ancol': 5,
      'Ragunan': 10,
    }
  };
  
  function dijkstra(graph, startNode, endNode) {
    const distances = {};
    const visited = {};
    const previousNodes = {};
    const queue = [];
  
    for (let node in graph) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;
  
    queue.push(startNode);
  
    while (queue.length > 0) {
      let currentNode = queue.shift();
  
      visited[currentNode] = true;
  
      for (let neighbor in graph[currentNode]) {
        let distance = graph[currentNode][neighbor];
  
        let newDistance = distances[currentNode] + distance;
  
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previousNodes[neighbor] = currentNode;
        }
        if (!visited[neighbor]) {
          queue.push(neighbor);
        }
      }
    }
  
    let jalur = [endNode];
    let lastNode = endNode;
    while (lastNode !== startNode) {
      let previousNode = previousNodes[lastNode];
      jalur.unshift(previousNode);
      lastNode = previousNode;
    }
  
    let bobotGraph = [];
    for (let i = 0; i < jalur.length - 1; i++) {
      let fromNode = jalur[i];
      let toNode = jalur[i + 1];
      let edgeCost = graph[fromNode][toNode];
      bobotGraph.push(edgeCost);
    }
  
    return {
      "Jalur Terdekat": jalur,
      "Bobot Jalur": bobotGraph
    };
  }
  
  console.log(dijkstra(graph, 'Monas', 'Taman Mini'));