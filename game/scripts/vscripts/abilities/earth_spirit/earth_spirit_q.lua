earth_spirit_q = class({})

require('abilities/earth_spirit/earth_spirit_remnant')
LinkLuaModifier("modifier_earth_spirit_stand", "abilities/earth_spirit/modifier_earth_spirit_stand", LUA_MODIFIER_MOTION_NONE)

function earth_spirit_q:OnSpellStart()
    Wrappers.DirectionalAbility(self, 1000)

    local hero = self:GetCaster().hero
    local cursor = self:GetCursorPosition()
    local dir = self:GetDirection()

    local particle = ImmediateEffect("particles/units/heroes/hero_earth_spirit/espirit_magnetize_target.vpcf", PATTACH_CUSTOMORIGIN, hero)
    ParticleManager:SetParticleControl(particle, 0, cursor)

    local down = Vector(0, 0, 10000)
    local unit = CreateUnitByName(hero:GetName(), down, false, nil, nil, hero:GetUnit():GetTeamNumber())

    unit:AddNewModifier(unit, nil, "modifier_earth_spirit_remnant", {})
    unit:SetForwardVector(dir * Vector(1, 1, 0))
    unit:SetAbsOrigin(down)

    StartAnimation(unit, {duration=1, activity=ACT_DOTA_VICTORY, rate=10})

    hero:EmitSound("Arena.Earth.CastQ.Voice")

    Timers:CreateTimer(0.7,
        function()
            FreezeAnimation(unit)

            local remnant = EarthSpiritRemnant(hero.round, hero)
            remnant:SetUnit(unit, true)
            remnant:SetPos(cursor + Vector(0, 0, 600))
            remnant:CreateCounter()
            remnant:Activate()
        end
    )
end

if IsClient() then
    require("wrappers")
end

Wrappers.NormalAbility(earth_spirit_q)