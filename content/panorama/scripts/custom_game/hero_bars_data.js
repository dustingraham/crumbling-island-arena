
var colors = {
    2: [ 255, 82, 66 ],
    3: [ 48, 168, 255 ] ,
    6: [ 197, 77, 168 ],
    7: [ 199, 228, 13 ],
    8: [ 161, 127, 255 ],
    9: [ 101, 212, 19 ]
};

var shieldModifiers = [
    "modifier_gyro_w",
    "modifier_lc_w_shield",
    "modifier_undying_q_health"
];

var hideBarModifiers = [
    "modifier_tusk_e",
    "modifier_ember_e",
    "modifier_hidden",
    "modifier_omni_e",
    "modifier_gyro_e",
    "modifier_storm_spirit_e",
    "modifier_ursa_e",
    "modifier_ursa_r"
];

var etherealModifiers = [
    "modifier_invoker_w"
];

var specialLayouts = {
    "npc_dota_hero_ursa": "UrsaBar",
    //"npc_dota_hero_juggernaut": "JuggBar",
    "npc_dota_hero_undying": "UndyingBar"
};

var statusEffects = {};

function AddStatusEffect(modifier, token, color, priority) {
    statusEffects[modifier] = {
        token: token,
        color: color,
        priority: priority || 0
    }
}

var ultimateAbilities = {};

function AddUltimateAbility(name, color) {
    ultimateAbilities[name] = {
        token: "#StatusUltimate",
        color: color
    }
}

var specialLayoutCallbacks = {};

specialLayoutCallbacks.npc_dota_hero_ursa = function(entity, panel) {
    var fury = FindModifier(entity.id, "modifier_ursa_fury");
    var frenzy = FindModifier(entity.id, "modifier_ursa_frenzy");
    var bar = panel.FindChildTraverse("UrsaRage");

    panel.FindChildTraverse("UrsaRage_Left").SetHasClass("UrsaFrenzy", !!frenzy);

    if (frenzy) {
        bar.value = 100;
    } else if (fury) {
        bar.value = Buffs.GetStackCount(entity.id, fury);
    }
};

specialLayoutCallbacks.npc_dota_hero_juggernaut = function(entity, panel) {

};

specialLayoutCallbacks.npc_dota_hero_undying = function(entity, panel) {
    var shield = FindModifier(entity.id, "modifier_undying_q_health");
    var bar = panel.FindChildTraverse("UndyingShield");

    if (shield) {
        bar.value = Math.round(Buffs.GetRemainingTime(entity.id, shield) / Buffs.GetDuration(entity.id, shield) * 100);
    } else {
        bar.value = 0;
    }
};

AddStatusEffect("modifier_stunned_lua", "#StatusStunned", "#45baff", 2);
AddStatusEffect("modifier_knockback_lua", "#StatusStunned", "#45baff", 2);
AddStatusEffect("modifier_storm_w", "#StatusStunned", "#45baff", 2);
AddStatusEffect("modifier_qop_w", "#StatusCharmed", "#ff748a", 2);
AddStatusEffect("modifier_lycan_e", "#StatusFear", "#5e679b", 2);
AddStatusEffect("modifier_cm_frozen", "#StatusFrozen", "#7ceeff", 2);
AddStatusEffect("modifier_silence_lua", "#StatusSilenced", "#ffffff", 2);
AddStatusEffect("modifier_sven_w_slow", "#StatusSilenced", "#ffffff", 2);

AddStatusEffect("modifier_cm_r_slow", "#StatusFrozen", "#7ceeff");
AddStatusEffect("modifier_ursa_frenzy", "#StatusFrenzy", "#FF6A00");
AddStatusEffect("modifier_invoker_w", "#StatusEthereal", "#8EE72D");
AddStatusEffect("modifier_ember_burning", "#StatusBurning", "#FF6A00");
AddStatusEffect("modifier_tinker_q", "#StatusDisarmed", "#b4dbe7");
AddStatusEffect("modifier_zeus_a", "#StatusShock", "#95dbe7");
AddStatusEffect("modifier_sniper_w", "#StatusRooted", "#a6e7e2");
AddStatusEffect("modifier_venge_w", "#StatusBreak", "#b2e7c8");
AddStatusEffect("modifier_ta_q", "#StatusBreak", "#b2e7c8");
AddStatusEffect("modifier_venge_r_target", "#StatusBreak", "#b2e7c8");
//AddStatusEffect("modifier_wr_a", "#StatusHaste", "#91e246");

AddStatusEffect("modifier_ursa_r", "#StatusUltimate", "#ff1b00", 1);
AddStatusEffect("modifier_undying_r", "#StatusUltimate", "#30b529", 1);
AddStatusEffect("modifier_qop_r", "#StatusUltimate", "#d81b00", 1);
AddStatusEffect("modifier_pa_r", "#StatusUltimate", "#a1d5d8", 1);
AddStatusEffect("modifier_slark_r", "#StatusUltimate", "#415d67", 1);
AddStatusEffect("modifier_jugger_r", "#StatusUltimate", "#ffd13f", 1);
AddStatusEffect("modifier_pudge_r_aura", "#StatusUltimate", "#799118", 1);
AddStatusEffect("modifier_tiny_r", "#StatusUltimate", "#c3d8c8", 1);
AddStatusEffect("modifier_ta_r", "#StatusUltimate", "#da96ff", 1);
AddStatusEffect("modifier_sven_r", "#StatusUltimate", "#ff3622", 1);
AddStatusEffect("modifier_lc_r", "#StatusUltimate", "#ffd813", 1);
AddStatusEffect("modifier_lycan_r", "#StatusUltimate", "#ff2b12", 1);
AddStatusEffect("modifier_tusk_r_aura", "#StatusUltimate", "#bcfff8", 1);

AddUltimateAbility("wk_r", "#49f299");
AddUltimateAbility("gyro_r", "#ff6d10");
AddUltimateAbility("wr_r", "#8cff27");
AddUltimateAbility("drow_r",  "#6aace7");
AddUltimateAbility("lycan_r",  "#ff2b12");