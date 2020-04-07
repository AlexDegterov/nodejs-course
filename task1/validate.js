class checkParams {
  checkRequiredParams(options) {
    const checkAction =
      options.action === 'decode' || options.action === 'encode';
    if (options.shift && options.action && checkAction) return;
    if (!options.action || !checkAction) {
      process.stderr.write(
        "Required option '-a, --action' not specified or does not match 'encode' or 'decode'. "
      );
    }
    if (!options.shift) {
      process.stderr.write("Required option '-s, --shift' not specified.");
    }
    process.exit(1);
  }
}

module.exports = new checkParams();
