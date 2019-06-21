## Pet Skill Replacer & User

Replaces your pet's active skill with the strongest version (40 power/5min) 

Replaces certain item uses with pet abilities (configured in config.json - left side is the item, see https://teralore.com/en/item/6561/?sl=1 for the IDs, right side is the pet ability, see below for the list) 

## Commands

!`petr` - to toggle module (defaunt: ON)  


## Pet Abilities (3 minute shared cooldown)

Id | Name | Effect
--- | --- | ---
1138 | Bracing Force			| Your partner is sharing its strength with you. Increases Power by 40  
5003 | Urgent Recovery III		| Recovers HP by 30000 per second for 5s.  
5006 | Emergency Service III	| Replenishes MP by 1000 per second for 5s.  
5009 | Barrier III				| Absorbs up to 125000 damage for 15s.  
5015 | Rapid Growth III			| Increases hunting XP rewards by 15% for 1800s.  
5018 | Rapid Advancement III	| Increases skill advancement XP rewards by 15% for 1800s.  
5021 | Dual Boost III			| Increases hunting and skill advancement XP rewards by 7.5%  
5024 | Critical Crafting III	| Increases crafting critical success chance by 20%  
5027 | Backup Fisherman III		| Increases the chance to catch BAF by 50%  
5030 | Gathering Support III	| Decreases gathering time by 20%  


## Items preconfigured (in config.json)

Item | Partner buff
--- | ---
Major Replenishment Potable		| Emergency Service III  
Major Recovery Potable			| Urgent Recovery III  
Digory's Honey Moongourd Drink	| Barrier III  
Minor Battle Solution			| Rapid Advancement III  
Major Battle Solution			| Dual Boost III  
Castanica Midnight Oil			| Critical Crafting III  


## Installation
put `defs` insides to `node_modules\tera-data\protocol\` folder  
put `opcodes` insides to `node_modules\tera-data\map\` (in ToolBox that's a folder for opcodes in **addition** to standart ones) (In Pinkies you'd have to merge contents of those files with ones you already have, I think)

`ERROR: Error: [dispatch] hook: unmapped packet ` means you have no opcodes installed correctly for your current game version  
`unsupported packet ` means you have no defs installed correctly  


## Notes

Opcodes are gotten via third-party sources mostly (submitted by users), if there is no opcode for your region - too bad, you'd have to get em yourself, can't help you here, use https://github.com/Owyn/alex-packet-id-finder - then just enter `fpi C_START_SERVANT_ACTIVE_SKILL` and use your pet power buff - here, now you've got the opcode you'd need to put into your protocol file (see above Installation section), your protocol is written on game launch in the proxy console like this `[toolbox] Loaded protocol version 350024 (RU v82.5).` 
