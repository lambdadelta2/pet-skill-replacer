module.exports = function pet_skills(mod) {
	
	let config = require('./config.json');
	let petId = 0n;
	
    mod.hook('C_START_SERVANT_ACTIVE_SKILL', 1, event => {
		petId = event.gameId;
		if(config.ReplaceAbility && ((event.skill >= 1101 && event.skill < 1138) || event.skill === 1001))
		{
			event.skill = config.NewPartnerAbility;
			return true;
		}
    });
	
	mod.hook('C_USE_ITEM', 3, event => {
		if (config.ReplaceItems && config.TheItems[event.id])
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
				mod.command.message("You need to use the partner skill first as a sample");
			}
			return false;
		}
	});
	
	mod.hook('S_LOGIN', 'raw', event => {
		petId = 0n;
	});
}