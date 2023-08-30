export interface HistoryEvent {
  action: "push" | "replace" | "pop";
  pathname: string;
  state?: any;
}

interface Listener {
  (e: HistoryEvent): void;
}

class BrowserHistory {
  private listeners: Listener[] = [];

  constructor() {
    window.addEventListener("popstate", () => {
      this.emit({ action: "pop", pathname: this.pathname, state: this.state });
    });
  }

  public get state() {
    return window.history.state;
  }

  public get pathname() {
    return window.location.pathname;
  }

  public push(pathname: string, state?: any) {
    window.history.pushState(state, "", pathname);
    this.emit({ action: "push", pathname, state });
  }

  public replace(pathname: string, state?: any) {
    window.history.replaceState(state, "", pathname);
    this.emit({ action: "replace", pathname, state });
  }

  public back() {
    window.history.back();
  }

  public forward() {
    window.history.forward();
  }

  public listen(listener: Listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private emit(e: HistoryEvent) {
    this.listeners.forEach((listener) => listener(e));
  }
}

export const history = new BrowserHistory();
