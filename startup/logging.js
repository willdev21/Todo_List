module.exports = function () {
  process.on("uncaughtException", (ex) => {
    console.log("Something failed: ", ex.message);
    process.exit(1);
  });

  // For handling async exceptions outside express
  process.on("unhandledRejection", (ex) => {
    console.log("Something failed:", ex.message);
    process.exit(1);
  });
};
