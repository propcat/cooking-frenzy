import { GameActions } from '@logic/types/GameActions';
import { GameState } from '@logic/types/GameState';
import { OnChange } from 'rune-games-sdk';

export type Client = Parameters<OnChange<GameState, GameActions>>[0];