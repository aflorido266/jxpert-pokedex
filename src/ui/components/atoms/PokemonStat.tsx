
interface  PokemonStatProps {
  label: string;
  shortLabel:string;
  value:number;
}

export function PokemonStat({ label, shortLabel, value }: PokemonStatProps) {
  return (
    <li className="card__stat" aria-label={label}>
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {shortLabel}
        </p>
        <p>{value}</p>
      </div>
      <progress value={value} max="255"></progress>
    </li>
  );
}