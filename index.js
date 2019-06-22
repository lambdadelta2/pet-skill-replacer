module.exports = function pet_skills(mod) {
	const config = require('./config.json');
	const opcodes = require('./opcodes.json');
	const protocolVersion = mod.dispatch.protocolVersion;
	let petId = 0n;
	let enabled = true;

	if(!mod.dispatch.protocol.messages.has('C_START_SERVANT_ACTIVE_SKILL')) {
		mod.dispatch.protocol.messages.set('C_START_SERVANT_ACTIVE_SKILL', new Map());

		let definition = [['gameId','uint64'],['skill','int32']];
		definition.type = 'root';
		mod.dispatch.protocol.messages.get('C_START_SERVANT_ACTIVE_SKILL').set(1, definition);
		if(!mod.dispatch.latestDefVersion.get('C_START_SERVANT_ACTIVE_SKILL')) {
			mod.dispatch.latestDefVersion.set('C_START_SERVANT_ACTIVE_SKILL', 1);
		}
	}

	for(let i in opcodes[protocolVersion]) {
		mod.dispatch.protocolMap.name.set(i, opcodes[protocolVersion][i]);
		mod.dispatch.protocolMap.code.set(opcodes[protocolVersion][i], i);
	}

	const buffs = {
		power: 1138,
		fellowship: 5012,
		exp: 5015,
		talent: 5018,
		dual: 5021,
		craft: 5024,
		baf: 5027,
		gather: 5030
	};

	mod.game.initialize("me");
	
	mod.command.add('petr', (cmd, arg) => {
		if(cmd == 'use') {
			if(arg) {
				if(Object.keys(buffs).includes(arg)) {
					if(petId) {
						mod.command.message('Used '+arg);
						mod.toServer('C_START_SERVANT_ACTIVE_SKILL', 1, {
							gameId: petId,
							skill: buffs[arg]
						});
					} else {
						mod.command.message('Partner not found - Please spawn one!');
					}
				} else {
					mod.command.message('Invalid skill!\nValid skill names:\n'+Object.keys(buffs).join(', '));
				}
			} else {
				mod.command.message('Specify a skill!\nValid skill names:\n'+Object.keys(buffs).join(', '));
			}
		} else {
			mod.command.message((enabled = !enabled) ? 'Enabled' : 'Disabled');
		}
	});
	
	mod.hook('C_START_SERVANT_ACTIVE_SKILL', 1, (e) => {
		petId = e.gameId;
		if(enabled && config.ReplaceAbility && (e.skill >= 1101 && e.skill < 1138)) {
			e.skill = config.NewPartnerAbility;
			return true;
		}
	});
	
	mod.hook('C_USE_ITEM', 3, (e) => {
		if(enabled && config.ReplaceItems && config.TheItems[e.id]) {
			if(petId) {
				mod.send('C_START_SERVANT_ACTIVE_SKILL', 1, {
					gameId: petId,
					skill: config.TheItems[e.id]
				});
			} else {
				mod.command.message('Partner not found - Please spawn one!');
			}
			return false;
		}
	});
	
	mod.hook('S_REQUEST_SPAWN_SERVANT', 1, (e) => { if(mod.game.me.is(e.ownerId)) petId = e.gameId; });
	mod.hook('S_REQUEST_DESPAWN_SERVANT', 1, (e) => { if(e.gameId === petId) petId = 0n; });
}