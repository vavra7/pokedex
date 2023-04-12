export type ListenerFce<State> = (state: State) => void;
export type NewStateFce<State> = (prevState: State) => State;

export interface Store<State> {
  state: State;
  listeners: Set<ListenerFce<State>>;
  getState: () => State;
  setState: (newStateOrFce: State | NewStateFce<State>) => void;
  subscribe: (listener: ListenerFce<State>) => () => void;
}
