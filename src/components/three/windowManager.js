// 窗口管理对象

class WindowManager {
  id = null;
  win = null;
  wins = [];

  constructor() {
    this.wins = this.getItem("wins") || [];
    this.count = this.getItem("count") || 0;
    this.id = this.count;
    this.win = this.add();
    // this.id = params.get('win');
  }

  getItem(key) {
    const item = window.localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return null;
  }

  setItem(id, value) {
    this.wins = value;
    return window.localStorage.setItem(id, JSON.stringify(value));
  }

  add(winInfo = {}) {
    Object.assign(winInfo, {
      id: this.id,
      x: window.screenLeft,
      y: window.screenTop,
      w: window.innerWidth,
      h: window.innerHeight,
    });

    this.wins.push(winInfo);
    this.count++;
    window.localStorage.setItem("count", this.count);
    window.localStorage.setItem("wins", JSON.stringify(this.wins));

    return winInfo;
  }
}

export default WindowManager;
