module.exports = {
    name: "돈받기",
    description: "💰 매일 한 번씩 무료로 10,000원을 받아요!",
    type: "interaction",
    code: `
    $nomention

    $if[$getUserVar[last_daily_$authorID]==$day]
    ❌ 오늘은 이미 돈을 받으셨네요! **내일** 다시 시도해주세요!
    $stop
    $endif

    $setUserVar[money;$sum[$getUserVar[money];10000]]
    $setUserVar[last_daily_$authorID;$day]

    $title[💰 일일 보너스]
    $color[#2ECC71]
    $description[
    ✅ **$username**님에게 **10,000원**이 지급되었습니다!

    💵 현재 잔액: **$getUserVar[money]원**
    📅 다음 보너스: **내일**
    ]
    $footer[🕒 $date]
    `
}