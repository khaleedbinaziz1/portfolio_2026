/**
 * Retro 8-bit style sounds using Web Audio API.
 * No audio files required; works in all modern browsers.
 */

const STORAGE_KEY = 'retroSound';

let audioContext: AudioContext | null = null;
let soundMuted = false;
let storageInited = false;

function initFromStorage(): void {
  if (storageInited || typeof window === 'undefined') return;
  storageInited = true;
  try {
    soundMuted = localStorage.getItem(STORAGE_KEY) === 'off';
  } catch {
    soundMuted = false;
  }
}

export function setSoundMuted(muted: boolean): void {
  soundMuted = muted;
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, muted ? 'off' : 'on');
    }
  } catch {}
}

export function isSoundMuted(): boolean {
  initFromStorage();
  return soundMuted;
}

function getContext(): AudioContext {
  if (typeof window === 'undefined') throw new Error('retroSound: window undefined');
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

async function ensureResumed(): Promise<AudioContext> {
  const ctx = getContext();
  if (ctx.state === 'suspended') {
    await ctx.resume();
  }
  return ctx;
}

/** Call on first user interaction so typing (and other) sounds can play. */
export function resumeAudioForTyping(): void {
  if (typeof window === 'undefined') return;
  ensureResumed().catch(() => {});
}

/**
 * Play a short retro "hover" blip (high pitch).
 */
export function playHover(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.03);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  }).catch(() => {});
}

/**
 * Play a retro "click" / select sound (medium pitch, slight drop).
 */
export function playClick(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  }).catch(() => {});
}

/**
 * Play a short typing / key tap sound (synced with typing animations).
 * Soft sine "tick" — subtle and pleasant, not harsh.
 */
export function playTyping(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.018);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.02);
  }).catch(() => {});
}

/** Retro game: start / level start (ascending beep). */
export function playGameStart(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(330, ctx.currentTime);
    osc.frequency.setValueAtTime(440, ctx.currentTime + 0.06);
    osc.frequency.setValueAtTime(554, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    gain.gain.setValueAtTime(0.12, ctx.currentTime + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }).catch(() => {});
}

/** Retro game: eat / pickup / score (happy blip). */
export function playGameEat(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }).catch(() => {});
}

/** Retro game: bounce / hit paddle. */
export function playGameBounce(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }).catch(() => {});
}

/** Retro game: brick break / power-up. */
export function playGameBreak(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(620, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.11, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  }).catch(() => {});
}

/** Retro game: game over (descending sad beep). */
export function playGameOver(): void {
  if (typeof window === 'undefined') return;
  initFromStorage();
  if (soundMuted) return;
  ensureResumed().then((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.14, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }).catch(() => {});
}
