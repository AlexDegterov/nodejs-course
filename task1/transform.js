const stream = require('stream');
const caesarCipher = require('./caesarCipher');

class CaesarCipherStream extends stream.Transform {
  constructor(options = {}) {
    super(options);
    this.options = options;
  }

  _transform(chunk, encoding, callback) {
    let convText = caesarCipher.transform(chunk.toString(), this.options);
    if (this.options.output) {
      process.stdout.write(
        `${this.options.action}d text written to file ${this.options.output}\n`
      );
    } else convText = `${this.options.action}d text: ${convText}`;

    this.push(
      this.options.input && this.options.output ? `${convText}\n` : convText
    );
    if (!this.options.input) {
      process.stdout.write(`Write text for ${this.options.action}: `);
    }
    callback();
  }
}

module.exports = CaesarCipherStream;
