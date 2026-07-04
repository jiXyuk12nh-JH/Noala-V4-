const { Aoijs } = require("aoi.js");
const fs = require("fs");

// database 폴더가 없으면 생성
if (!fs.existsSync("./database")) fs.mkdirSync("./database");

const bot = new Aoijs({
    token: process.env.TOKEN,
    prefix: "!",
    intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers"],
    database: {
        type: "aoi.db",
        db: require("@aoijs/db"),
        path: "./database/database.json"  // 👈 저장 경로 지정
    }
});

// ✅ 모든 변수 초기화 (DB 컬럼 역할)
bot.variables({
    money: 1000,                    // 기본 잔액
    last_daily_$authorID: 0,        // 마지막 출석 날짜
    daily_gamble_$authorID: 0,      // 오늘 도박 횟수
    bank_$authorID: 0               // (선택) 은행 잔액
});

// ✅ 명령어 자동 로드
bot.loadCommands(`./commands/`);

// ✅ 봇 실행 완료 이벤트
bot.readyCommand({
    name: "ready",
    code: `
    $log[✅ 봇이 성공적으로 실행되었습니다!]
    $log[📊 ${bot.guilds.cache.size}개의 서버에서 활동 중]
    $log[📁 데이터 저장 경로: ./database/database.json]
    `
});

// ✅ 접두사 명령어 + 슬래시 명령어 모두 지원
bot.onMessage();
bot.onInteractionCreate();

// ✅ 에러 핸들링 (서버 다운 방지)
bot.onError((error) => {
    console.error("❌ 오류 발생:", error);
});

// ✅ 24시간 유지를 위한 ping 유지 (선택)
setInterval(() => {
    console.log("🔄 봇 정상 작동 중...");
}, 3600000); // 1시간마다 로그
