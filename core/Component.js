//TODO add validations

export class Component {
  init() {}

  async getNode(...args) {
    return await this.init(...args);
  }
}
