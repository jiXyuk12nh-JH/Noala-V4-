module.exports = {
    name: "내정보",
    description: "📋 내 프로필, 잔액, 아이디 등을 확인합니다!",
    type: "interaction",
    options: [
        {
            name: "유저",
            description: "정보를 확인할 유저 (비워두면 본인)",
            type: "user",
            required: false
        }
    ],
    code: `
    $nomention
    $var[target;$option[유저]??$authorID]

    $title[📋 $username[$var[target]]님의 프로필]
    $color[#9B59B6]
    $thumbnail[$userAvatar[$var[target];1024]]
    $addField[🆔 유저 ID;$var[target];true]
    $addField[👤 유저 이름;$username[$var[target]]#$discriminator[$var[target]];true]
    $addField[💵 보유 잔액;$getUserVar[money;$var[target]]원;true]
    $addField[📅 계정 생성일;<t:$creationDate[$var[target]]:D>;true]
    $addField[📆 서버 입장일;<t:$joinedAt[$var[target]]:D>;true]
    $addField[🎯 서버 닉네임;$nickname[$var[target]] (없으면 없음);true]
    $footer[🕒 조회 시간: $date]
    `
}