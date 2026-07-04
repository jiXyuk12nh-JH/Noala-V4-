module.exports = {
    name: "도박",
    description: "🎰 슬롯머신 도박을 즐겨보세요! (최소 100원)",
    type: "interaction",
    options: [
        {
            name: "금액",
            description: "배팅할 금액",
            type: "number",
            required: true,
            min_value: 100
        }
    ],
    code: `
    $nomention

    // ❌ 금액 검증
    $if[$option[금액]<100]
    ❌ 최소 배팅 금액은 **100원**입니다!
    $stop
    $endif

    // ❌ 잔액 부족
    $if[$getUserVar[money]<$option[금액]]
    ❌ 잔액이 부족합니다!
    💵 현재 잔액: **$getUserVar[money]원**
    $stop
    $endif

    // 🎲 랜덤 확률
    $var[확률;$random[1;100]]
    $var[이모지1;$randomElement[🍒;🍎;🍇;💎;⭐;🎯;🔔;🍉]]
    $var[이모지2;$randomElement[🍒;🍎;🍇;💎;⭐;🎯;🔔;🍉]]
    $var[이모지3;$randomElement[🍒;🍎;🍇;💎;⭐;🎯;🔔;🍉]]

    // 🔥 대박 (20%) - 3배
    $if[$var[확률]<=20]
    $setUserVar[money;$sum[$getUserVar[money];$option[금액];$option[금액]]]
    $title[🎰 슬롯머신 도박 결과]
    $color[#00FF00]
    $description[
    **$username**님이 **$option[금액]원**을 배팅하셨습니다!

    🛸 ┃ $var[이모지1] ┃ $var[이모지2] ┃ $var[이모지3] ┃ 🛸

    🎉 **대박!** $var[이모지1] $var[이모지2] $var[이모지3] 모두 일치!
    💰 **배팅금의 3배**를 획득하셨습니다!
    💵 현재 잔액: **$getUserVar[money]원**
    ]
    $endif

    // ✨ 당첨 (21~50%) - 본전
    $if[$var[확률]>20]
    $if[$var[확률]<=50]
    $title[🎰 슬롯머신 도박 결과]
    $color[#3498DB]
    $description[
    **$username**님이 **$option[금액]원**을 배팅하셨습니다!

    🛸 ┃ $var[이모지1] ┃ $var[이모지2] ┃ $var[이모지3] ┃ 🛸

    ✨ **당첨!** 두 개가 일치했습니다!
    💰 **본전!** 배팅금을 그대로 돌려받습니다!
    💵 현재 잔액: **$getUserVar[money]원**
    ]
    $endif
    $endif

    // 💸 꽝 (51~100%) - 전액 손실
    $if[$var[확률]>50]
    $setUserVar[money;$sub[$getUserVar[money];$option[금액]]]
    $title[🎰 슬롯머신 도박 결과]
    $color[#FF0000]
    $description[
    **$username**님이 **$option[금액]원**을 배팅하셨습니다!

    🛸 ┃ $var[이모지1] ┃ $var[이모지2] ┃ $var[이모지3] ┃ 🛸

    💸 **꽝!** 아쉽게도 낙첨되었습니다...
    📉 **-$option[금액]원**을 잃었습니다.
    💵 현재 잔액: **$getUserVar[money]원**
    ]
    $endif
    `
}