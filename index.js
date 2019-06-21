module.exports = function pet_skills(mod) {
	
	const command = mod.command;
	let config = require('./config.json');
	let petId = 0n,
	let enabled = true;
	
	mod.game.initialize("me");
	
	command.add('petr', {
		$none() {
			enabled = !enabled;
			command.message(`${enabled ? 'En' : 'Dis'}abled`);
		}
	});
	
    mod.hook('C_START_SERVANT_ACTIVE_SKILL', 1, event => {
		petId = event.gameId;
		if(enabled && config.ReplaceAbility && ((event.skill >= 1101 && event.skill < 1138) || event.skill === 1001))
		{
			event.skill = config.NewPartnerAbility;
			return true;
		}
    });
	
	mod.hook('C_USE_ITEM', 3, event => {
		if (enabled && config.ReplaceItems && config.TheItems[event.id])
		{
			if(petId)
			{
				mod.send('C_START_SERVANT_ACTIVE_SKILL', 1, {
					gameId: petId,
					skill: config.TheItems[event.id]
				});
			}
			else
			{
				command.message("Partner not found - You need to summon him to use his partner skill");
			}
			return false;
		}
	});
	
	mod.hook('S_REQUEST_SPAWN_SERVANT', 1, event => {
		if(event.ownerId === mod.game.me.gameId)
		{
			petId = event.gameId;
		}
	});
	
	mod.hook('S_REQUEST_DESPAWN_SERVANT', 1, event => {
		if(event.gameId === petId)
		{
			petId = 0n;
		}
	});
}