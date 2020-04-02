# Redux Pokémon Card Maker
## Installation
Requirements:
- Node >= 8.10

Setup:
- `npm i`

Run:
- `npm start`

Build:
- `npm run build`

Serve build:
- `npm i -g serve`
- `serve -s build`

## Cardname formatting
This formatting is based on the Sword & Shield naming system

_*Required_
### Pokemon
| Set code* | Variation | Rarity | Stage | Type* | Outcome |
|-----------|-----------|--------|-------|-------|---------|
| SS | V | FA | | Psychic | SS_V_FA_Psychic |
| SS | VMax | Rainbow | Gigantamax | Psychic |SS_VMax_Rainbow_Gigantamax_Psychic |
| SS | | | Stage1 | Dark | SS_Stage1_Dark |

### Trainers
| Set code* | Trainer* | Type* | Variation | Outcome |
|-----------|----------|-------|-----------|---------|
| SS | Trainer | Item | Tool | SS_Trainer_Item_Tool |
| SS | Trainer | Supporter | | SS_Trainer_Supporter |

### Energy
| Set code* | Energy* | Type* | Outcome |
|-----------|---------|-------|---------|
| SS | Energy | Base | SS_Energy_Base |
| SS | Energy | Special | SS_Energy_Special |
