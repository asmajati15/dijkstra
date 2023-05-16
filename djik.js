function dijkstraAlgorithm(graph, start, end) {
    const shortestDistances = {};
    const previousVertices = {};
    const unvisitedVertices = new Set(Object.keys(graph));

    for (const vertex of unvisitedVertices) {
        shortestDistances[vertex] = Infinity;
    }
    shortestDistances[start] = 0;

    while (unvisitedVertices.size) {
        const currentVertex = [...unvisitedVertices].reduce((a, b) => {
            return shortestDistances[a] < shortestDistances[b] ? a : b;
        });

        if (currentVertex === end) {
            break;
        }

        for (const [neighbor, distance] of Object.entries(graph[currentVertex])) {
            const tentativeDistance = shortestDistances[currentVertex] + distance;

            if (tentativeDistance < shortestDistances[neighbor]) {
                shortestDistances[neighbor] = tentativeDistance;
                previousVertices[neighbor] = currentVertex;
            }
        }

        unvisitedVertices.delete(currentVertex);
    }

    const path = [];
    let currentPathVertex = end;

    // Add this line to include the starting point in the path
    path.unshift(start);

    while (currentPathVertex !== start) {
        path.unshift(currentPathVertex);
        currentPathVertex = previousVertices[currentPathVertex];
    }

    return path;
}


// const graph = {
//     A: { B: 2000, C: 4000 },
//     B: { A: 2000, C: 2500, D: 3500 },
//     C: { A: 4000, B: 2500, D: 1500 },
//     D: { B: 3500, C: 1500 }
// };


// const start = "A";
// const end = "D";
// const shortestPath = dijkstraAlgorithm(graph, start, end);
// console.log(`Shortest path from ${start} to ${end}:`, shortestPath);


const graph = {
    "toko_a": {
        "toko_b": 200,
        "toko_c": 400,
        // "toko_d": 150
    },
    "toko_b": {
        "toko_a": 200,
        "toko_c": 250,
        "toko_d": 350
    },
    "toko_c": {
        "toko_a": 400,
        "toko_b": 250,
        "toko_d": 150
    },
    "toko_d": {
        // "toko_a": 350,
        "toko_b": 150,
        "toko_c": 400
    }
};

const start = "toko_a";
const end = "toko_d";
const shortestPath = dijkstraAlgorithm(graph, start, end);
console.log(`Shortest path from ${start} to ${end}:`, shortestPath);