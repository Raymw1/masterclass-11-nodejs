const os = require("os");
const log = require("./logger");
const { freemem, totalmem } = os;

setInterval(() => {
  const freeMemory = freemem() / 1024 ** 2;
  const totalMemory = totalmem() / 1024 ** 2;
  const memoryUsage = (freeMemory / totalMemory) * 100;
  // console.log(`Free memory: ${freeMemory} MB`);
  // console.log(`Total memory: ${totalMemory} MB`);
  // console.log(`Memory usage: ${memoryUsage}%`);
  // console.log(os.platform());

  const stats = {
    free: `${freeMemory} MB`,
    total: `${totalMemory} MB`,
    usage: `${memoryUsage}%`,
  };

  console.clear();
  console.log("\n======= PC STATS =======");
  console.table(stats);
  log(`${JSON.stringify(stats)}\n`);
}, 1000);
