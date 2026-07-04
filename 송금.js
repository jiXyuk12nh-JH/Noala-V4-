module.exports = {
    name: "송금",
    description: "💸 다른 유저에게 돈을 송금합니다.",
    type: "interaction",
    options: [
        {
            name: "유저",
            description: "돈을 받을 유저",
            type: "user",
            required: true
        },
        {
            name: "금액",
            description: "송금할 금액",
            type: "number",
            required: true,
            min_value: 1
        }
    ],
    code: `
    $nomention

    // ❌ 자기 자신에게 송금 금지
    $if[$option[유저]==$authorID]
    ❌ 자신에게는 송금할 수 없어요!
    $stop
    $endif

    // ❌ 잔액 부족 체크
    $if[$getUserVar[money]<$option[금액]]
    ❌ 잔액이 부족합니다!
    💵 현재 잔액: **$getUserVar[money]원**
    $stop
    $endif

    // 💰 송금 처리
    $setUserVar[money;$sub[$getUserVar[money];$option[금액]]]
    $setUserVar[money;$sum[$getUserVar[money;$option[유저]];$option[금액]];$option[유저]]

    $title[💸 송금 완료]
    $color[#3498DB]
    $description[
    ✅ **$username**님이 **$username[$option[유저]]**님에게 **$option[금액]원**을 송금했어요!

    💵 내 잔액: **$getUserVar[money]원**
    ]
    $footer[🕒 $date]
    `
}