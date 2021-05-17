module.exports = {
    isStaff : function(guildMember){
        if (guildMember.roles.highest.position >= guildMember.guild.roles.cache.find(r => r.name.toLowerCase() == "staff").position){
            return true;
        } else {
            return false;
        }
    },

    isMod : function(guildMember){
        if (guildMember.roles.highest.position >= guildMember.guild.roles.cache.find(r => r.name.toLowerCase() == "moderator").position){
            return true;
        } else {
            return false;
        }
    },

    isAdmin : function(guildMember){
        if (guildMember.roles.highest.position >= guildMember.guild.roles.cache.find(r => r.name.toLowerCase() == "admin").position){
            return true;
        } else {
            return false;
        }
    }
}