import { GameStates, Settings } from "../constants";
import type { GameStateValue } from "../types";

type SettingsType = typeof Settings;

export class Game {
  _state = GameStates.INIT;
  _settings: SettingsType = { ...Settings };

  set state(gameState: GameStateValue) {
    this._state = gameState;
  }

  get state() {
    return this._state;
  }

  set settings(patch: Partial<SettingsType>) {
    this._settings = {
      ...this._settings,
      ...patch
    } as SettingsType;
  }

  get settings(): SettingsType {
    return this._settings;
  }
}