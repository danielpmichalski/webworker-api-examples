function initWorkerPool() {
  const maxWorkers = self.navigator.hardwareConcurrency;
  const workers = [];
  for (let i = 0; i < maxWorkers; i++) {
    workers.push(new Worker("childWorker.js", {name: `ChildWorker${i + 1}`}))
  }
  return workers;
}

const workerPool = initWorkerPool();

onmessage = event => {
  console.log(`${self.name} received: ${event.data}`);
  workerPool.forEach(worker => worker.postMessage(`message from ${self.name}`));
};
