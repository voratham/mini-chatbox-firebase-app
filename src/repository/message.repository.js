class MessageRepository {
  constructor(db) {
    this.db = db;
  }
  async all() {
    const snapshot = await this.db.once("value");
    const data = snapshot.val();
    if (!data) return [];
    return this.objToArray(data);
  }

  objToArray(objList) {
    return Object.entries(objList).map(([key, val]) => ({
      _id: key,
      ...val
    }));
  }

  onSubscribe(callback) {
    this.db.on("value", snapshot => {
      const resp = this.objToArray(snapshot.val() || []);
      callback(resp);
    });
  }

  save(message) {
    this.db.push({
      ...message,
      createdAt: Date.now()
    });
  }
}

export default MessageRepository;
