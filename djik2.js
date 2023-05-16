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
  
    // Inisialisasi jarak ke semua node dengan nilai tak terhingga dan node awal dengan jarak nol
    for (let node in graph) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;
  
    // Masukkan node awal ke dalam queue
    queue.push(startNode);
  
    while (queue.length > 0) {
      // Ambil node dengan jarak terpendek dari queue
      let currentNode = queue.shift();
  
      // Tandai node saat ini sebagai sudah dikunjungi
      visited[currentNode] = true;
  
      // Periksa tetangga-tetangga dari node saat ini
      for (let neighbor in graph[currentNode]) {
        let distance = graph[currentNode][neighbor];
  
        // Hitung jarak baru dari node awal ke tetangga saat ini melalui node saat ini
        let newDistance = distances[currentNode] + distance;
  
        // Jika jarak baru lebih pendek dari jarak yang sebelumnya tercatat
        // untuk tetangga ini, perbarui jarak dan masukkan tetangga ke dalam queue
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previousNodes[neighbor] = currentNode;
        }
        if (!visited[neighbor]) {
          queue.push(neighbor);
        }
      }
    }
  
    // Buat array jalur dari titik awal ke titik akhir
    let path = [endNode];
    let lastNode = endNode;
    while (lastNode !== startNode) {
      let previousNode = previousNodes[lastNode];
      path.unshift(previousNode);
      lastNode = previousNode;
    }
  
    // Buat array bobot dari setiap edge di jalur
    let pathCosts = [];
    for (let i = 0; i < path.length - 1; i++) {
      let fromNode = path[i];
      let toNode = path[i + 1];
      let edgeCost = graph[fromNode][toNode];
      pathCosts.push(edgeCost);
    }
  
    // Kembalikan objek dengan jalur dan bobot dari setiap edge di jalur
    return {
      path: path,
      costs: pathCosts
    };
  }
  
  console.log(dijkstra(graph, 'Monas', 'Ancol'));