import type { PokemonDetailsDto } from "../model/PokemonDetailsDto";
import type { PokemonSpeciesDto } from "../model/PokemonSpeciesDto";
import type { PokemonDetails } from "../../domain/model/PokemonModel";

export const mapPokemonDetailsToDomain = (
  d: PokemonDetailsDto,
  s: PokemonSpeciesDto,
): PokemonDetails => {
  const getStat = (n: string) =>
    d.stats.find((it) => it.stat.name === n)?.base_stat || 0;
  const desc =
    s.flavor_text_entries
      .find((it) => it.language.name === "en")
      ?.flavor_text.replace(/[\n\f]/g, " ") || "Описание отсутствует";

  return {
    id: d.id,
    name: d.name.charAt(0).toUpperCase() + d.name.slice(1),
    imageUrl:
      d.sprites.other["official-artwork"].front_default ||
      d.sprites.front_default,
    types: d.types.map((it) => it.type.name),
    height: d.height,
    weight: d.weight,
    baseExperience: d.base_experience,
    abilities: d.abilities.map((it) => ({
      name: it.ability.name,
      isHidden: it.is_hidden,
    })),
    stats: {
      hp: getStat("hp"),
      attack: getStat("attack"),
      defense: getStat("defense"),
      specialAttack: getStat("special-attack"),
      specialDefense: getStat("special-defense"),
      speed: getStat("speed"),
    },
    soundUrl: d.cries?.latest || "",
    moves: d.moves.map((it) => it.move.name),
    description: desc,
    isLegendary: s.is_legendary || s.is_mythical,
    captureRate: s.capture_rate,
  };
};
