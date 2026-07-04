module.exports = {
    name: "돈지급",
    description: "⭐ 관리자 전용: 특정 유저에게 돈을 지급합니다.",
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
            description: "지급할 금액",
            type: "number",
            required: true,
            min_value: 1
        }
    ],
    code: `
    $nomention
    $onlyPerms[admin;❌ 관리자 권한이 있는 사람만 이 명령어를 사용할 수 있습니다!]

    $setUserVar[money;$sum[$getUserVar[money;$option[유저]];$option[금액]];$option[유저]]

    $title[💸 가상 경제 관리자 시스템]
    $color[#2ECC71]
    $description[
    ✅ **$username[$option[유저]]**님에게 **$option[금액]원**을 정상 지급했습니다!

    💵 지급 후 잔액: **$getUserVar[money;$option[유저]]원**
    ]
    $footer[🕒 $date]
    `
}