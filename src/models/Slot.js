export default function Slot(params) {
  this.name = params.name || '';
  this.isOccupied = !!params.isOccupied;
  this.occupant = params.occupant;
}
