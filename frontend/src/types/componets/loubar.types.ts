export interface ILoudBar {
  handleVolumeChange : React.ChangeEventHandler<HTMLInputElement>,
  toggleMute : React.MouseEventHandler<HTMLButtonElement>,
  volume : number,
  muted : boolean,
  prevVolume : number
}