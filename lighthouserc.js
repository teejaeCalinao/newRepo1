module.exports = {
  ci: {
    collect: {
      staticDistDir: './',
    },
    upload: {
      target: 'filesystem',
      outputDir: "./lhci"
    },
  },
};