const activeRequests = {};

class DataStore {
  constructor(url = '', store = [], searchField = '') {
    this.url = url;
    this.searchField = searchField;
    this.store = store;

    this.getData();
  }

  async getData() {
    if (this.store.length) {
      return this.store;
    }

    let dataRequest = activeRequests[this.url];

    if (!dataRequest) {
      activeRequests[this.url] = $.get(this.url);
    }

    this.store = await activeRequests[this.url];
    return this.store;
  }

  async getFilteredData(filterParams = {}) {
    await this.getData();

    return this.store.filter(item =>
      Object.keys(filterParams).every(key => item[key] === filterParams[key])
    );
  }

  async addItem(item) {
    const ids = this.store.map(item => item.id);
    const nextId = Math.max.apply(null, ids) + 1;

    const newItemIdx = this.store.push({ ...item, id: nextId }) - 1;

    return this.store[newItemIdx];
  }

  async deleteItem(id) {
    const [item] = await this.getFilteredData({ id: parseInt(id) });
    const idx = this.store.indexOf(item);
    this.store = [...this.store.slice(0, idx), ...this.store.slice(idx + 1)];

    return this.store;
  }

  async updateItem(id, updates) {
    const [item] = await this.getFilteredData({ id: parseInt(id) });
    const idx = this.store.indexOf(item);
    const updatedItem = { ...item, ...updates };

    this.store = [
      ...this.store.slice(0, idx),
      updatedItem,
      ...this.store.slice(idx + 1)
    ];

    return updatedItem;
  }
}

export const globalStore = {
  activeStores: {},

  createStore(source) {
    this.activeStores[source] = new DataStore(source);
  },

  getStore(source) {
    if (!this.activeStores[source]) {
      this.activeStores[source] = new DataStore(source);
    }

    return this.activeStores[source];
  }
};
