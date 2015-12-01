modifier_sk_w_aura = class({})

function modifier_sk_w_aura:OnCreated(kv)
    if IsServer() then
        local parent = self:GetParent()
        local index = ParticleManager:CreateParticle("particles/sk_w/sk_w.vpcf", PATTACH_ABSORIGIN, parent)
        ParticleManager:SetParticleControl(index, 0, parent:GetAbsOrigin())
        ParticleManager:SetParticleControl(index, 1, Vector(400, 400, 400))
        self:AddParticle(index, false, false, 1, false, false)

        parent:EmitSound("Arena.SK.CastW")
        parent:EmitSound("Arena.SK.LoopW")
    end
end

function modifier_sk_w_aura:IsAura()
    return true
end

function modifier_sk_w_aura:GetAuraRadius()
    return 400
end

function modifier_sk_w_aura:GetAuraDuration()
    return 0.1
end

function modifier_sk_w_aura:GetModifierAura()
    return "modifier_sk_w"
end

function modifier_sk_w_aura:CheckState()
    local state = {
        [MODIFIER_STATE_PROVIDES_VISION] = true
    }

    return state
end

function modifier_sk_w_aura:GetAuraSearchTeam()
    return DOTA_UNIT_TARGET_TEAM_ENEMY
end

function modifier_sk_w_aura:GetAuraSearchType()
    return DOTA_UNIT_TARGET_HERO
end

function modifier_sk_w_aura:OnDestroy()
    if IsServer() then
        local parent = self:GetParent()
        parent:StopSound("Arena.SK.LoopW")
        parent:RemoveSelf()
    end
end