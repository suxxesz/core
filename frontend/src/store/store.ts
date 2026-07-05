import { atom } from "jotai";

export const isDarkThemeAtom = atom<boolean>(
  typeof window !== 'undefined' 
    ? localStorage.getItem('theme') === 'dark-theme' 
    : false
)
export const songAtom = atom<HTMLAudioElement | null>(null)