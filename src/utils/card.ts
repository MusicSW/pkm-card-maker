import { ImagePathOptions, MoveType, ImportedCard, Card, CardOptions, ImportedMoveType, Type } from "interfaces";

export const cardToImportedCard = (card: Card): ImportedCard => ({
  name: card.name,
  subname: card.subname,
  backgroundImage: card.backgroundImage,
  imageLayer1: card.imageLayer1,
  imageLayer2: card.imageLayer2,
  typeImage: card.typeImage,
  customSetIcon: card.customSetIcon,
  cardNumber: card.cardNumber,
  totalInSet: card.totalInSet,
  hitpoints: card.hitpoints,
  illustrator: card.illustrator,
  weaknessAmount: card.weaknessAmount,
  resistanceAmount: card.resistanceAmount,
  retreatCost: card.retreatCost,
  prevolveName: card.prevolveName,
  prevolveImage: card.prevolveImage,
  pokedexEntry: card.pokedexEntry,
  description: card.description,
  raidLevel: card.raidLevel,
  supertypeId: card.supertype?.id,
  baseSetId: card.baseSet?.id,
  setId: card.set?.id,
  typeId: card.type?.id,
  weaknessTypeId: card.weaknessType?.id,
  resistanceTypeId: card.resistanceType?.id,
  subtypeId: card.subtype?.id,
  rarityId: card.rarity?.id,
  variationId: card.variation?.id,
  rotationId: card.rotation?.id,
  rarityIconId: card.rarityIcon?.id,
  ability: card.ability,
  move1: card.move1 ? {
    name: card.move1.name,
    damage: card.move1.damage,
    text: card.move1.text,
    energyCost: card.move1.energyCost.map((moveType: MoveType) => ({
      amount: moveType.amount,
      typeId: moveType.type.id,
    })),
  } : undefined,
  move2: card.move2 ? {
    name: card.move2.name,
    damage: card.move2.damage,
    text: card.move2.text,
    energyCost: card.move2.energyCost.map((moveType: MoveType) => ({
      amount: moveType.amount,
      typeId: moveType.type.id,
    })),
  } : undefined,
  move3: card.move3 ? {
    name: card.move3.name,
    damage: card.move3.damage,
    text: card.move3.text,
  } : undefined,
});

const cardOptionsToImage = (options: ImagePathOptions, folder?: string, supertype?: string) => {
  // Format the options according to the formatting defined in the README
  let filePath: string = `/assets/${options.supertype || supertype}/`;
  if(folder) {
    filePath += `${folder}/`;
  }
  Object.values(options).forEach((param: string, i: number) => {
    if(param !== undefined && param !== 'default') {
      if((param === 'Dynamax' && options.rarity === 'Rainbow') ||
        (param === 'Gigantamax' && options.rarity === 'Rainbow') ||
        (options.rarity === 'Promo' && param === 'Basic')) {
        return;
      }
      if(i !== 0) {
        filePath += '_';
      }
      filePath += param;
      if(param === 'Rainbow') {
        if(options.variation === 'Dynamax' || options.variation === 'Gigantamax') {
          filePath += `_${options.variation}`;
        }
      }
      if(param === 'V' && !options.rarity) {
        filePath += '_Basic';
      }
    }
  });
  return `${filePath}.png`;
}

export const getCardImage = (options: ImagePathOptions): string => {
  let imagePath: string;
  switch(options.supertype) {
    case 'Pokemon':
      imagePath = cardOptionsToImage({ baseSet: options.baseSet, subtype: options.subtype, variation: options.variation,
        rarity: options.rarity, type: options.type }, options.type, options.supertype);
      break;
    case 'Energy':
      imagePath = cardOptionsToImage({ baseSet: options.baseSet, supertype: options.supertype, type: options.type });
      break;
    case 'Trainer':
      imagePath = cardOptionsToImage({ baseSet: options.baseSet, supertype: options.supertype, type: options.type, subtype: options.subtype });
      break;
    case 'RaidBoss':
      return '/assets/RaidBoss/pikachu.png';
    default:
      imagePath = '';
  }
  return imagePath;
}

const importedMoveToMove = (moveType: ImportedMoveType[], options: CardOptions): MoveType[] =>
  moveType.reduce((result: MoveType[], moveType: ImportedMoveType) => {
    const newType: Type | undefined = options.types.find((a) => a.id === moveType.typeId);
    if(newType) {
      result.push({
        amount: moveType.amount,
        type: newType,
      });
    }
    return result;
  }, []);

export const importedCardToCard = (im: ImportedCard, options: CardOptions): Card => {
  const card: Card = {
    name: im.name,
    prevolveName: im.prevolveName,
    prevolveImage: im.prevolveImage,
    hitpoints: im.hitpoints,
    subname: im.subname,
    typeImage: im.typeImage,
    pokedexEntry: im.pokedexEntry,
    weaknessAmount: im.weaknessAmount,
    resistanceAmount: im.resistanceAmount,
    retreatCost: im.retreatCost,
    illustrator: im.illustrator,
    cardNumber: im.cardNumber,
    totalInSet: im.totalInSet,
    description: im.description,
    backgroundImage: im.backgroundImage,
    imageLayer1: im.imageLayer1,
    imageLayer2: im.imageLayer2,
    customSetIcon: im.customSetIcon,
    raidLevel: im.raidLevel,
    ability: im.ability ? {
      name: im.ability.name,
      text: im.ability.text,
    } : undefined,
    move3 : im.move3 ? {
      name: im.move3.name,
      damage: im.move3.damage,
      text: im.move3.text,
    } : undefined,
    baseSet: options.baseSets.find((a) => a.id === im.baseSetId),
    supertype: options.supertypes.find((a) => a.id === im.supertypeId),
    type: options.types.find((a) => a.id === im.typeId),
    subtype: options.subtypes.find((a) => a.id === im.subtypeId),
    set: options.sets.find((a) => a.id === im.setId),
    weaknessType: options.types.find((a) => a.id === im.weaknessTypeId),
    resistanceType: options.types.find((a) => a.id === im.resistanceTypeId),
    rotation: options.rotations.find((a) => a.id === im.rotationId),
    variation: options.variations.find((a) => a.id === im.variationId),
    rarity: options.rarities.find((a) => a.id === im.rarityId),
    rarityIcon: options.rarityIcons.find((a) => a.id === im.rarityIconId),
  };
  if(im.move1) {
    card.move1 = {
      name: im.move1.name,
      damage: im.move1.damage,
      text: im.move1.text,
      energyCost: importedMoveToMove(im.move1.energyCost, options),
    }
  }
  if(im.move2) {
    card.move2 = {
      name: im.move2.name,
      damage: im.move2.damage,
      text: im.move2.text,
      energyCost: importedMoveToMove(im.move2.energyCost, options),
    }
  }
  return card;
}
