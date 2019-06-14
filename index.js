module.exports = function pet(mod) {
    mod.hook('C_SERVANT_ABILITY', 1, event => {
        event.skill = 1138
        return true
    })
}