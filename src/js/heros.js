import _ from 'lodash'
export let heros = [
  {
    "img": "npc_dota_hero_elder_titan.png",
    "text": "上古巨神"
  },
  {
    "img": "npc_dota_hero_undying.png",
    "text": "不朽尸王"
  },
  {
    "img": "npc_dota_hero_juggernaut.png",
    "text": "主宰"
  },
  {
    "img": "npc_dota_hero_abaddon.png",
    "text": "亚巴顿"
  },
  {
    "img": "npc_dota_hero_shredder.png",
    "text": "伐木机"
  },
  {
    "img": "npc_dota_hero_tinker.png",
    "text": "修补匠"
  },
  {
    "img": "npc_dota_hero_furion.png",
    "text": "先知"
  },
  {
    "img": "npc_dota_hero_keeper_of_the_light.png",
    "text": "光之守卫"
  },
  {
    "img": "npc_dota_hero_clinkz.png",
    "text": "克林克兹"
  },
  {
    "img": "npc_dota_hero_omniknight.png",
    "text": "全能骑士"
  },
  {
    "img": "npc_dota_hero_beastmaster.png",
    "text": "兽王"
  },
  {
    "img": "npc_dota_hero_legion_commander.png",
    "text": "军团指挥官"
  },
  {
    "img": "npc_dota_hero_viper.png",
    "text": "冥界亚龙"
  },
  {
    "img": "npc_dota_hero_skeleton_king.png",
    "text": "冥魂大帝"
  },
  {
    "img": "npc_dota_hero_phoenix.png",
    "text": "凤凰"
  },
  {
    "img": "npc_dota_hero_razor.png",
    "text": "剃刀"
  },
  {
    "img": "npc_dota_hero_venomancer.png",
    "text": "剧毒术士"
  },
  {
    "img": "npc_dota_hero_riki.png",
    "text": "力丸"
  },
  {
    "img": "npc_dota_hero_centaur.png",
    "text": "半人马战行者"
  },
  {
    "img": "npc_dota_hero_drow_ranger.png",
    "text": "卓尔游侠"
  },
  {
    "img": "npc_dota_hero_rattletrap.png",
    "text": "发条技师"
  },
  {
    "img": "npc_dota_hero_morphling.png",
    "text": "变体精灵"
  },
  {
    "img": "npc_dota_hero_nyx_assassin.png",
    "text": "司夜刺客"
  },
  {
    "img": "npc_dota_hero_huskar.png",
    "text": "哈斯卡"
  },
  {
    "img": "npc_dota_hero_life_stealer.png",
    "text": "噬魂鬼"
  },
  {
    "img": "npc_dota_hero_templar_assassin.png",
    "text": "圣堂刺客"
  },
  {
    "img": "npc_dota_hero_vengefulspirit.png",
    "text": "复仇之魂"
  },
  {
    "img": "npc_dota_hero_earth_spirit.png",
    "text": "大地之灵"
  },
  {
    "img": "npc_dota_hero_skywrath_mage.png",
    "text": "天怒法师"
  },
  {
    "img": "npc_dota_hero_grimstroke.png",
    "text": "天涯墨客"
  },
  {
    "img": "npc_dota_hero_arc_warden.png",
    "text": "天穹守望者"
  },
  {
    "img": "npc_dota_hero_naga_siren.png",
    "text": "娜迦海妖"
  },
  {
    "img": "npc_dota_hero_abyssal_underlord.png",
    "text": "孽主"
  },
  {
    "img": "npc_dota_hero_zuus.png",
    "text": "宙斯"
  },
  {
    "img": "npc_dota_hero_winter_wyvern.png",
    "text": "寒冬飞龙"
  },
  {
    "img": "npc_dota_hero_tiny.png",
    "text": "小小"
  },
  {
    "img": "npc_dota_hero_techies.png",
    "text": "工程师"
  },
  {
    "img": "npc_dota_hero_tusk.png",
    "text": "巨牙海民"
  },
  {
    "img": "npc_dota_hero_troll_warlord.png",
    "text": "巨魔战将"
  },
  {
    "img": "npc_dota_hero_witch_doctor.png",
    "text": "巫医"
  },
  {
    "img": "npc_dota_hero_lich.png",
    "text": "巫妖"
  },
  {
    "img": "npc_dota_hero_puck.png",
    "text": "帕克"
  },
  {
    "img": "npc_dota_hero_pudge.png",
    "text": "帕吉"
  },
  {
    "img": "npc_dota_hero_pugna.png",
    "text": "帕格纳"
  },
  {
    "img": "npc_dota_hero_disruptor.png",
    "text": "干扰者"
  },
  {
    "img": "npc_dota_hero_phantom_assassin.png",
    "text": "幻影刺客"
  },
  {
    "img": "npc_dota_hero_phantom_lancer.png",
    "text": "幻影长矛手"
  },
  {
    "img": "npc_dota_hero_spectre.png",
    "text": "幽鬼"
  },
  {
    "img": "npc_dota_hero_nevermore.png",
    "text": "影魔"
  },
  {
    "img": "npc_dota_hero_lone_druid.png",
    "text": "德鲁伊"
  },
  {
    "img": "npc_dota_hero_terrorblade.png",
    "text": "恐怖利刃"
  },
  {
    "img": "npc_dota_hero_dazzle.png",
    "text": "戴泽"
  },
  {
    "img": "npc_dota_hero_leshrac.png",
    "text": "拉席克"
  },
  {
    "img": "npc_dota_hero_rubick.png",
    "text": "拉比克"
  },
  {
    "img": "npc_dota_hero_earthshaker.png",
    "text": "撼地者"
  },
  {
    "img": "npc_dota_hero_antimage.png",
    "text": "敌法师"
  },
  {
    "img": "npc_dota_hero_axe.png",
    "text": "斧王"
  },
  {
    "img": "npc_dota_hero_slark.png",
    "text": "斯拉克"
  },
  {
    "img": "npc_dota_hero_slardar.png",
    "text": "斯拉达"
  },
  {
    "img": "npc_dota_hero_sven.png",
    "text": "斯温"
  },
  {
    "img": "npc_dota_hero_kunkka.png",
    "text": "昆卡"
  },
  {
    "img": "npc_dota_hero_night_stalker.png",
    "text": "暗夜魔王"
  },
  {
    "img": "npc_dota_hero_shadow_demon.png",
    "text": "暗影恶魔"
  },
  {
    "img": "npc_dota_hero_shadow_shaman.png",
    "text": "暗影萨满"
  },
  {
    "img": "npc_dota_hero_doom_bringer.png",
    "text": "末日使者"
  },
  {
    "img": "npc_dota_hero_warlock.png",
    "text": "术士"
  },
  {
    "img": "npc_dota_hero_jakiro.png",
    "text": "杰奇洛"
  },
  {
    "img": "npc_dota_hero_treant.png",
    "text": "树精卫士"
  },
  {
    "img": "npc_dota_hero_hoodwink.png",
    "text": "森海飞霞"
  },
  {
    "img": "npc_dota_hero_death_prophet.png",
    "text": "死亡先知"
  },
  {
    "img": "npc_dota_hero_obsidian_destroyer.png",
    "text": "殁境神蚀者"
  },
  {
    "img": "npc_dota_hero_crystal_maiden.png",
    "text": "水晶室女"
  },
  {
    "img": "npc_dota_hero_silencer.png",
    "text": "沉默术士"
  },
  {
    "img": "npc_dota_hero_sand_king.png",
    "text": "沙王"
  },
  {
    "img": "npc_dota_hero_chaos_knight.png",
    "text": "混沌骑士"
  },
  {
    "img": "npc_dota_hero_tidehunter.png",
    "text": "潮汐猎人"
  },
  {
    "img": "npc_dota_hero_ember_spirit.png",
    "text": "灰烬之灵"
  },
  {
    "img": "npc_dota_hero_alchemist.png",
    "text": "炼金术士"
  },
  {
    "img": "npc_dota_hero_ursa.png",
    "text": "熊战士"
  },
  {
    "img": "npc_dota_hero_sniper.png",
    "text": "狙击手"
  },
  {
    "img": "npc_dota_hero_lycan.png",
    "text": "狼人"
  },
  {
    "img": "npc_dota_hero_mars.png",
    "text": "玛尔斯"
  },
  {
    "img": "npc_dota_hero_snapfire.png",
    "text": "电炎绝手"
  },
  {
    "img": "npc_dota_hero_queenofpain.png",
    "text": "痛苦女王"
  },
  {
    "img": "npc_dota_hero_necrolyte.png",
    "text": "瘟疫法师"
  },
  {
    "img": "npc_dota_hero_gyrocopter.png",
    "text": "矮人直升机"
  },
  {
    "img": "npc_dota_hero_pangolier.png",
    "text": "石鳞剑士"
  },
  {
    "img": "npc_dota_hero_dawnbreaker.png",
    "text": "破晓辰星"
  },
  {
    "img": "npc_dota_hero_invoker.png",
    "text": "祈求者"
  },
  {
    "img": "npc_dota_hero_oracle.png",
    "text": "神谕者"
  },
  {
    "img": "npc_dota_hero_bane.png",
    "text": "祸乱之源"
  },
  {
    "img": "npc_dota_hero_mirana.png",
    "text": "米拉娜"
  },
  {
    "img": "npc_dota_hero_meepo.png",
    "text": "米波"
  },
  {
    "img": "npc_dota_hero_visage.png",
    "text": "维萨吉"
  },
  {
    "img": "npc_dota_hero_weaver.png",
    "text": "编织者"
  },
  {
    "img": "npc_dota_hero_medusa.png",
    "text": "美杜莎"
  },
  {
    "img": "npc_dota_hero_broodmother.png",
    "text": "育母蜘蛛"
  },
  {
    "img": "npc_dota_hero_wisp.png",
    "text": "艾欧"
  },
  {
    "img": "npc_dota_hero_lina.png",
    "text": "莉娜"
  },
  {
    "img": "npc_dota_hero_lion.png",
    "text": "莱恩"
  },
  {
    "img": "npc_dota_hero_void_spirit.png",
    "text": "虚无之灵"
  },
  {
    "img": "npc_dota_hero_faceless_void.png",
    "text": "虚空假面"
  },
  {
    "img": "npc_dota_hero_batrider.png",
    "text": "蝙蝠骑士"
  },
  {
    "img": "npc_dota_hero_bloodseeker.png",
    "text": "血魔"
  },
  {
    "img": "npc_dota_hero_spirit_breaker.png",
    "text": "裂魂人"
  },
  {
    "img": "npc_dota_hero_enigma.png",
    "text": "谜团"
  },
  {
    "img": "npc_dota_hero_bounty_hunter.png",
    "text": "赏金猎人"
  },
  {
    "img": "npc_dota_hero_ancient_apparition.png",
    "text": "远古冰魄"
  },
  {
    "img": "npc_dota_hero_dark_willow.png",
    "text": "邪影芳灵"
  },
  {
    "img": "npc_dota_hero_brewmaster.png",
    "text": "酒仙"
  },
  {
    "img": "npc_dota_hero_bristleback.png",
    "text": "钢背兽"
  },
  {
    "img": "npc_dota_hero_chen.png",
    "text": "陈"
  },
  {
    "img": "npc_dota_hero_luna.png",
    "text": "露娜"
  },
  {
    "img": "npc_dota_hero_storm_spirit.png",
    "text": "风暴之灵"
  },
  {
    "img": "npc_dota_hero_windrunner.png",
    "text": "风行者"
  },
  {
    "img": "npc_dota_hero_ogre_magi.png",
    "text": "食人魔魔法师"
  },
  {
    "img": "npc_dota_hero_magnataur.png",
    "text": "马格纳斯"
  },
  {
    "img": "npc_dota_hero_enchantress.png",
    "text": "魅惑魔女"
  },
  {
    "img": "npc_dota_hero_dark_seer.png",
    "text": "黑暗贤者"
  },
  {
    "img": "npc_dota_hero_monkey_king.png",
    "text": "齐天大圣"
  },
  {
    "img": "npc_dota_hero_dragon_knight.png",
    "text": "龙骑士"
  }
]

export let heroMap = _.keyBy(heros.map(d => {
  return {
    text: d.text,
    img: `/d2img/${d.img}`,
  }
}), 'text')