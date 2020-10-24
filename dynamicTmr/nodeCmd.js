let mysql = require('mysql');

let con = mysql.createConnection( {
    host: "localhost", 
    user: "polarischiba",
    password: "Lin01055006@",
    database: "tmr_clan"
});

con.connect(function(err) {
    let cnt = 0;
    function cmd(command) {
        con.query(command, function(err, result, fields) {
            if (err) throw err;
            console.log(cnt++);
        })
    }
    
    /*
    cmd("create table related_selection (id INT AUTO_INCREMENT PRIMARY KEY, name nvarchar(255), value varchar(255))");
    cmd(`insert into related_selection (name, value) values ('鬼厲.87.Ninja', 'https://www.youtube.com/channel/UCa9lhR6ho-x51BZIx0NYCEQ')`);
    cmd(`insert into related_selection (name, value) values ('L GENM', 'https://www.youtube.com/channel/UCvo03MIzZnU4bkaG2kVfOaw')`);
    cmd(`insert into related_selection (name, value) values ('黯666', 'https://www.youtube.com/channel/UCRsVJxrl_Xpq4AiCQeYmwXA')`);
    cmd(`insert into related_selection (name, value) values ('六星上將', 'https://www.youtube.com/channel/UCtp-x79qb3-V_VTFxQocYQw')`);
    cmd(`insert into related_selection (name, value) values ('雞蛋糕', 'https://www.youtube.com/channel/UCXkZhwazhbS3rGFHcmwKtkg')`);
    */
    
    /*
    cmd("create table nav_selection (id INT AUTO_INCREMENT PRIMARY KEY, name nvarchar(255), value varchar(255))");
    cmd(`insert into nav_selection (name, value) values ('TMR的介紹', 'introduce')`);
    cmd(`insert into nav_selection (name, value) values ('TMR的成員', 'members')`);
    cmd(`insert into nav_selection (name, value) values ('TMR的YT頻道介紹', 'youtube')`);
    cmd(`insert into nav_selection (name, value) values ('聯絡TMR', 'gmail')`);
    */
    
    /*
    let context_1 = "我們是shellshock.io這款遊戲的戰隊，成立於2019年。至今有超過100名成員，是目前亞洲中最大的shellshock戰隊。<br>我們戰隊聚集了許多強大的玩家，像是鬼厲.87.Ninja、蚵仔煎、中野三玖、內藤由保、L GENM、幻、sin，雞蛋糕，02......等等(族繁不及備載)。<br>戰隊內大部分的隊員都是出現在晚上、週六、週日和假期。<span class='blackie' style='text-decoration-line: underline'>戰隊內也有著來自其他戰隊的訪客（大部分為外國人）但都有著強大的實力。</span><br>同時隊內提供了玩家們交流的空間，可以互相約戰、單挑、團體戰，有著優良的技術磨練的環境。<br>戰隊內是以艦隊的分法來分類實力的 而入隊有分為待觀察隊員和正式隊員 待觀察和正式的隊員有著不同的規則。<br>如果你只是想要開心的玩遊戲的話，我們也相當歡迎你，在TMR戰隊中，隨時隨地都可以享受到開心遊玩或者作死後被虐的樂趣。<br>除此之外，如果想要聊其他遊戲的話，我們也十分歡迎你，戰隊內有些人有玩食物語、戰神36計、戰艦世界、碧藍航線、皇室、英雄聯盟、貓咪大戰爭...等等的遊戲。<br>在這裡，你絕對不缺一起開心遊玩的同伴。";
    cmd("create table introduce (id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), value nvarchar(4000))");
    cmd(`insert into introduce (name, value) values ('p', "${context_1}")`);
    */
    
    //cmd(`insert into tab_names (name, value) values ('p', "${context_1}")`);
    /*
    let context_2 = "TMR的GMAIL：<span class='tmr-gmail'>tmrshellshocker@gmail.com</span><br>想要加入TMR這個大家庭嗎？想要知道更多TMR的訊息嗎？想要認識TMR的成員們嗎？<br>我們隨時歡迎有實力的你來踢館<br>我們隨時歡迎尋求夥伴的你加入<br>我們隨時歡迎對TMR有興趣的人來一同交流<br><a href='mailto:tmrshellshocker@gmail.com' class='gmail-link'>不用害羞，寫封信給我們吧！</a>";
    cmd(`insert into gmail (name, value) values ('p', "${context_2}")`);
    */
    let context_3 = "<a href='https://www.youtube.com/channel/UCGS8upZ9ajyaksr9vNX_MYw' target='_blank' class='tmr-yt-link'>TMR戰隊YT傳送門</a>";
    cmd(`insert into youtube (name, value) values ('p', "${context_3}")`);
    let context_4 = "<video autoplay controls loop muted><source src'videos/jointmr.mp4' type='video/mp4'></video><figure>我們的戰隊官方帳號的影片還不多，就等你加入，一起來充實這片頻道吧！</figure>";
    cmd(`insert into youtube (name, value) values ('figcaption>', "${context_4}")`);
});