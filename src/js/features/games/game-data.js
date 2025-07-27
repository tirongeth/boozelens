// ========================================
// GAME DATA MODULE
// ========================================
// All game data and content

export const gameData = {
    beerPongRules: {
        standard: {
            title: "📜 Standard Beer Pong Rules",
            description: "The official way to play Beer Pong",
            rules: [
                { name: "🔄 Balls Back", desc: "Both partners make cups = shoot again! No re-racks during bonus shots." },
                { name: "🔙 Behind-the-Back", desc: "Miss and grab the ball while it's on the table? Shoot behind your back for a bonus cup!" },
                { name: "⚡ Bouncing", desc: "Bounce shots count as 2 cups! But opponents can swat bounced shots away." },
                { name: "💪 Elbows", desc: "Keep those elbows behind the table edge when shooting. Breaking the plane = reshoot!" },
                { name: "👀 Eye-to-Eye", desc: "To decide who goes first, one player from each team shoots while making eye contact. First to make it wins!" },
                { name: "🔥 Fire", desc: "Make 2 in a row? Call 'heating up'. Make the 3rd? Call 'fire' and keep shooting until you miss!" },
                { name: "🏝️ Island", desc: "Once per game, call 'island' on an isolated cup. Make it = remove 2 cups!" },
                { name: "⏰ Overtime", desc: "Tied game? Each team sets up 3 cups in a triangle. No re-racks allowed!" },
                { name: "🙏 Redemption", desc: "Lost all cups? Keep shooting until you miss! Make them all = overtime!" },
                { name: "♻️ Re-racks", desc: "2 re-racks per game. Diamond, line, triangle - get creative!" },
                { name: "🧹 Tidying-up", desc: "Tighten those cups anytime! Keep the formation clean." }
            ]
        },
        creator: {
            title: "🎯 Creator's Beer Pong Rules",
            description: "The way Beer Pong was meant to be played! 🍺",
            rules: [
                { name: "👀 Eye-to-Eye", desc: "Same as standard - stare into their soul while shooting to go first!" },
                { name: "♻️ Re-racks", desc: "2 per game - get creative with those formations!" },
                { name: "🎩 Gentleman", desc: "Call 'Gentleman' to tidy cups OR force opponent to line up their last 2 cups!" },
                { name: "🔄 Balls Back", desc: "Both make it = balls back baby! Keep that momentum going!" },
                { name: "⚡ Bouncing", desc: "Bounce = 2 cups removed! High risk, high reward!" },
                { name: "💪 Elbows", desc: "Watch those elbows - we're not playing reach pong!" },
                { name: "🏝️ Island", desc: "Isolated cup = 2 cups removed when made. Call it out!" },
                { name: "🎪 Trickshot", desc: "Ball on table after miss? Any creative shot = 2 cups! Behind back is for beginners!" },
                { name: "💥 Double Trouble", desc: "Same cup hit twice? That cup + ALL touching cups are gone! Legendary move!" },
                { name: "🎮 Redemption 2.0", desc: "Lost all cups? Make one to stay alive - but nothing gets removed! It's sudden death mode!" }
            ]
        }
    },
    specialBeerPongRules: {
        classic: [
            "🎯 Make a rule! Everyone must follow it for the rest of the game",
            "🔄 Switch sides! Both teams swap positions",
            "💃 Dance before shooting! Do a 10-second dance before each shot",
            "🎵 Sing while shooting! Must sing during your entire turn",
            "🎭 Accent round! Speak in an accent for 5 minutes",
            "🤐 Silent round! No talking for 2 rounds",
            "👯 Mirror mode! Copy everything your opponent does",
            "🎯 Call your shot! Must call which cup you're aiming for",
            "⏰ Speed round! 5-second shot clock for next 3 shots",
            "🤡 Compliment battle! Compliment opponents before each shot"
        ],
        gettingStarted: [
            "🎯 Nice shot bonus! Make a cup = opponent drinks water",
            "🤝 Team spirit! High five after every shot",
            "🎵 Theme song! Pick a song to play during your turn",
            "📣 Announce your shots! Describe your technique before shooting",
            "🎪 Celebration dance! Do a victory dance after making a cup",
            "👏 Applause rule! Everyone claps after a made cup",
            "🎯 Practice shot! Get one practice shot per turn",
            "🤗 Encouragement only! Only positive comments allowed",
            "🎯 Second chance! Miss = get one retry per game",
            "🏆 MVP! Best shot of the round gets to make a rule"
        ],
        normal: [
            "👁️ Blindfold shot! Next shot must be taken blindfolded",
            "🤝 Partner shot! Both teammates must hold the ball together",
            "🎪 Trick shot only! Next 3 shots must be trick shots",
            "🚫 No elbows! Next round, elbows must stay at your sides",
            "🦩 Flamingo stance! Stand on one leg for your next shot",
            "🔄 Opposite hand! Use your non-dominant hand for 2 turns",
            "🎪 Spin before shooting! Do 3 spins before taking your shot",
            "💪 Push-up penalty! Do 5 push-ups if you miss",
            "🎯 Behind the back only! All shots must be behind the back",
            "🤸 Gymnastics shot! Do a cartwheel before shooting"
        ],
        spicy: [
            "👕 Strip pong! Remove clothing item when opponent makes cup",
            "💋 Kiss for miss! Miss = kiss your teammate",
            "🍑 Distraction allowed! Opponents can distract however they want",
            "📱 Phone roulette! Text your ex 'I miss you'",
            "🔥 Hot seat! Answer any question or take 2 shots",
            "💃 Sexy dance! Do a lap dance if you miss",
            "🎯 Body shots! Made cup = body shot off opponent",
            "👅 Lick it! Lick the ball before shooting",
            "🔥 Truth shot! Make cup = opponent answers truth question",
            "💋 Make out break! Teams make out for 30 seconds"
        ],
        couples: [
            "💑 Couple shots! Partners must be touching while shooting",
            "💋 Kiss for cups! Make a cup = kiss your partner",
            "🤝 Trust shot! Partner guides your blindfolded shot",
            "💕 Compliment rule! Compliment partner before each shot",
            "🎯 Love wins! Make 2 in a row = opponents kiss",
            "👫 Switch partners! Play with opponent's partner for 1 round",
            "💑 Couple's choice! Make cup = give opponents a couple dare",
            "❤️ Heart eyes! Maintain eye contact with partner while shooting",
            "💋 Victory kiss! Kiss for 10 seconds after making a cup",
            "🤗 Support system! Hug partner after every shot"
        ]
    },
    specialBeerPongDares: {
        classic: [
            "Take a shot chosen by opponents",
            "Do 20 jumping jacks",
            "Sing the alphabet backwards",
            "Do your best impression of someone in the room",
            "Tell your most embarrassing story",
            "Do the chicken dance for 1 minute",
            "Speak in rhymes for the next 5 minutes",
            "Call a random contact and say 'I love you'",
            "Do 10 push-ups",
            "Let opponents choose your next drink"
        ],
        gettingStarted: [
            "Give someone a high five",
            "Tell a joke",
            "Do your best dance move",
            "Sing your favorite song chorus",
            "Give someone a compliment",
            "Do 5 jumping jacks",
            "Share a fun fact about yourself",
            "Do your best animal impression",
            "Tell us your hidden talent",
            "Make everyone laugh"
        ],
        normal: [
            "Let opponents post something on your social media",
            "Do 20 burpees right now",
            "Let everyone go through your phone for 30 seconds",
            "Show your last 5 Google searches",
            "Let opponents give you a nickname for the night",
            "Swap an item of clothing with an opponent",
            "Let opponents draw on your face with marker",
            "Chug a mystery drink made by opponents",
            "Let everyone read your last text conversation",
            "Freestyle rap for 30 seconds"
        ],
        spicy: [
            "Call your crush and tell them you're thinking of them",
            "Send a nude to your ex (or pretend to)",
            "Reveal your body count",
            "Let opponents go through your dating apps",
            "Do a strip tease for 30 seconds",
            "Make out with someone chosen by opponents",
            "Send a dirty text to someone",
            "Reveal your biggest kink",
            "Take a body shot off someone",
            "Flash everyone for 3 seconds"
        ],
        couples: [
            "Kiss your partner for 30 seconds",
            "Give your partner a lap dance",
            "Reveal your partner's most annoying habit",
            "Let your partner post on your social media",
            "Switch clothes with your partner",
            "Tell everyone your partner's biggest fear",
            "Massage your partner for 1 minute",
            "Share your wildest experience together",
            "Feed your partner a shot",
            "Whisper your fantasy to your partner"
        ]
    },
    neverHaveIEver: {
        classic: [
            "Never have I ever been kicked out of a bar or club",
            "Never have I ever lied about my age to get into a club", 
            "Never have I ever karaoke'd while drunk",
            "Never have I ever lost my phone on a night out",
            "Never have I ever thrown up in public",
            "Never have I ever called in sick when I wasn't",
            "Never have I ever fallen asleep at work/in class",
            "Never have I ever gotten a tattoo I regret",
            "Never have I ever crashed a wedding or private party",
            "Never have I ever danced on a table or bar"
        ],
        gettingStarted: [
            "Never have I ever traveled to another continent",
            "Never have I ever gone skydiving",
            "Never have I ever been on TV",
            "Never have I ever met a celebrity",
            "Never have I ever won a competition",
            "Never have I ever been in a helicopter",
            "Never have I ever gone surfing",
            "Never have I ever stayed up for 24 hours straight",
            "Never have I ever eaten something I couldn't identify",
            "Never have I ever gotten lost in a foreign country"
        ],
        normal: [
            "Never have I ever ghosted someone",
            "Never have I ever sent a risky text to the wrong person",
            "Never have I ever walked into a glass door",
            "Never have I ever farted loudly in a quiet room",
            "Never have I ever tripped and fallen in front of a crowd",
            "Never have I ever accidentally sent a screenshot to the person I was talking about",
            "Never have I ever lied on my resume",
            "Never have I ever eaten food off the floor",
            "Never have I ever gone 3+ days without showering",
            "Never have I ever broken something and blamed someone else"
        ],
        spicy: [
            "Never have I ever kissed someone I just met",
            "Never have I ever had a one night stand",
            "Never have I ever skinny dipped",
            "Never have I ever done a body shot",
            "Never have I ever slept with a coworker",
            "Never have I ever hooked up with a professor/boss",
            "Never have I ever been in a hot tub with strangers",
            "Never have I ever woken up wearing someone else's clothes",
            "Never have I ever dated two people at once",
            "Never have I ever kissed someone to make someone else jealous"
        ],
        couples: [
            "Never have I ever been in love with my best friend",
            "Never have I ever broken up with someone over text",
            "Never have I ever stalked an ex on social media",
            "Never have I ever been in love with two people at once",
            "Never have I ever cheated or been cheated on",
            "Never have I ever had a crush on my partner's friend",
            "Never have I ever lied to my partner about where I was",
            "Never have I ever kept a secret from my partner",
            "Never have I ever dreamt about someone else while in a relationship",
            "Never have I ever compared my partner to an ex"
        ]
    },
    truths: {
        classic: [
            "What's your most embarrassing drunk story?",
            "What's the biggest lie you've ever told?",
            "What's the most trouble you've gotten into?",
            "Have you ever been caught doing something you shouldn't?",
            "What's your worst habit that no one knows about?",
            "Who in this room has the best style?",
            "Who here would you want to switch lives with?",
            "What's the most embarrassing thing on your phone right now?",
            "What's the craziest thing you've done for money?",
            "What's your most embarrassing moment?"
        ],
        gettingStarted: [
            "What's your dream vacation destination?",
            "What's your biggest fear?",
            "What's your hidden talent?",
            "What's the best compliment you've ever received?",
            "What's your favorite childhood memory?",
            "If you could have dinner with anyone, who would it be?",
            "What's your biggest pet peeve?",
            "What's the best advice you've ever received?",
            "What's your guilty pleasure TV show?",
            "What's something you've never told anyone?"
        ],
        normal: [
            "What's the weirdest thing you do when you're alone?",
            "What's your most embarrassing Google search?",
            "Who here do you think has the biggest secret?",
            "What's the last lie you told?",
            "What's your most irrational fear?",
            "What's the most childish thing you still do?",
            "What's your worst dating app experience?",
            "What's the most embarrassing thing your parents have caught you doing?",
            "What's your biggest insecurity?",
            "What's the meanest thing you've ever said to someone?"
        ],
        spicy: [
            "What's your biggest turn on?",
            "Who was your worst kiss and why?",
            "Who in this room would you most want to make out with?",
            "What's the wildest place you've hooked up?",
            "What's your wildest fantasy?",
            "What's the most illegal thing you've done?",
            "If you had to date someone here, who would it be?",
            "What's your body count?",
            "What's the kinkiest thing you've ever done?",
            "Who in this room do you think is the best looking?"
        ],
        couples: [
            "What's the most embarrassing thing you've done for love?",
            "Have you ever been in love with two people at once?",
            "Have you ever cheated or been cheated on?",
            "What's your biggest relationship regret?",
            "What's the longest you've gone without sex in a relationship?",
            "What's something your partner does that annoys you?",
            "Have you ever faked an orgasm?",
            "What's your partner's most annoying habit?",
            "What's something you've lied to your partner about?",
            "If you could change one thing about your partner, what would it be?"
        ]
    },
    dares: {
        classic: [
            "Do 10 pushups",
            "Plank for 1 minute",
            "Sing everything you say for the next 2 turns",
            "Speak in an accent for the next 3 rounds",
            "Act like a chicken for 1 minute",
            "Do your best impression of someone in the room",
            "Take a shot without using your hands",
            "Finish your drink",
            "Do 20 jumping jacks",
            "Tell a joke and make someone laugh"
        ],
        gettingStarted: [
            "Show your best dance move",
            "Sing the chorus of your favorite song",
            "Do your best celebrity impression",
            "Tell your most embarrassing story",
            "Show the last photo in your camera roll",
            "Do 5 pushups",
            "Speak in a British accent for 2 turns",
            "Make animal noises for 30 seconds",
            "Do the robot dance",
            "High five everyone in the room"
        ],
        normal: [
            "Let someone draw on your face with marker",
            "Let someone style your hair however they want",
            "Post an ugly selfie",
            "Let someone text anyone from your phone",
            "Eat a spoonful of hot sauce",
            "Let the group choose someone for you to call and sing to",
            "Make a gross drink combination and take a sip",
            "Waterfall for 5 seconds",
            "Let someone go through your phone for 30 seconds",
            "Do the worm"
        ],
        spicy: [
            "Do your best twerk for 30 seconds",
            "Give someone a lap dance for 10 seconds",
            "Kiss the person to your left on the cheek",
            "Give someone a 30 second massage",
            "Switch an item of clothing with someone",
            "Whisper something dirty to the person on your right",
            "Post 'I'm pregnant' on your story for 1 minute",
            "Like your crush's oldest Instagram photo",
            "Send the last photo in your gallery to your ex",
            "Take a body shot off someone"
        ],
        couples: [
            "Give your partner a 1 minute massage",
            "Recreate your first kiss with your partner",
            "Let your partner post something on your social media",
            "Switch clothes with your partner for the rest of the game",
            "Slow dance with your partner for 1 minute",
            "Tell everyone your partner's most annoying habit",
            "Let your partner draw on your face",
            "Feed your partner a shot",
            "Sit on your partner's lap for the next 3 rounds",
            "Whisper your wildest fantasy to your partner"
        ]
    },
    wouldYouRather: {
        classic: [
            "Would you rather have to sing everything you say or dance everywhere you walk?",
            "Would you rather be the funniest person in the room or the smartest?",
            "Would you rather never be able to drink alcohol again or never be able to eat chocolate again?",
            "Would you rather have a rewind button or a pause button for your life?",
            "Would you rather go to a party where you know everyone or where you know no one?",
            "Would you rather always smell like garlic or always smell like wet dog?",
            "Would you rather be able to fly or be invisible?",
            "Would you rather be rich or famous?",
            "Would you rather lose your phone or your wallet?",
            "Would you rather always be 10 minutes late or 20 minutes early?"
        ],
        gettingStarted: [
            "Would you rather have unlimited money or unlimited time?",
            "Would you rather live in the city or the countryside?",
            "Would you rather be able to read minds or see the future?",
            "Would you rather travel to the past or the future?",
            "Would you rather have a pet dragon or a pet unicorn?",
            "Would you rather be a superhero or a supervillain?",
            "Would you rather never use social media again or never watch TV again?",
            "Would you rather always tell the truth or always lie?",
            "Would you rather have super strength or super speed?",
            "Would you rather live without music or without movies?"
        ],
        normal: [
            "Would you rather have fingers as long as legs or legs as short as fingers?",
            "Would you rather drunk text your ex or your boss?",
            "Would you rather throw up in front of your crush or pee yourself at a party?",
            "Would you rather be able to fly but only 1 foot off the ground or be invisible but only when no one is looking?",
            "Would you rather eat a live spider or a dead worm?",
            "Would you rather swim in a pool of beer or a pool of wine?",
            "Would you rather burp glitter or fart confetti?",
            "Would you rather have a third arm or a third leg?",
            "Would you rather always speak in rhymes or sing everything you say?",
            "Would you rather have taste buds in your butt or poop through your mouth?"
        ],
        spicy: [
            "Would you rather date someone who's extremely hot but boring or average looking but hilarious?",
            "Would you rather have sex with the lights on always or off always?",
            "Would you rather be naked in public or have everyone read your texts?",
            "Would you rather give up sex or give up food?",
            "Would you rather have a threesome or be in an open relationship?",
            "Would you rather sleep with your boss or your best friend's partner?",
            "Would you rather be dominant or submissive?",
            "Would you rather have great sex once a month or mediocre sex every day?",
            "Would you rather be caught masturbating or catch your parents doing it?",
            "Would you rather send nudes to your ex or your boss?"
        ],
        couples: [
            "Would you rather have your partner be best friends with their ex or hate their ex?",
            "Would you rather catch your parents having sex or have them catch you?",
            "Would you rather be in a relationship with someone who's too clingy or too distant?",
            "Would you rather know when you're going to die or how you're going to die?",
            "Would you rather have your partner forget your birthday or your anniversary?",
            "Would you rather have a partner who's too jealous or not jealous at all?",
            "Would you rather argue every day for a week or not talk for a week?",
            "Would you rather have your partner be a bad kisser or bad in bed?",
            "Would you rather live with your partner's parents or have them live with you?",
            "Would you rather have your partner cheat emotionally or physically?"
        ]
    },
    mostLikelyTo: {
        classic: [
            "Who's most likely to get kicked out of a club?",
            "Who's most likely to throw up tonight?",
            "Who's most likely to become famous?",
            "Who's most likely to become a millionaire?",
            "Who's most likely to forget their own birthday?",
            "Who's most likely to get lost in their own city?",
            "Who's most likely to cry during a Disney movie?",
            "Who's most likely to eat food off the floor?",
            "Who's most likely to laugh at their own jokes?",
            "Who's most likely to lose their phone tonight?"
        ],
        gettingStarted: [
            "Who's most likely to win a Nobel Prize?",
            "Who's most likely to travel the world?",
            "Who's most likely to write a book?",
            "Who's most likely to start their own business?",
            "Who's most likely to become a teacher?",
            "Who's most likely to adopt a pet?",
            "Who's most likely to learn a new language?",
            "Who's most likely to run a marathon?",
            "Who's most likely to become vegetarian?",
            "Who's most likely to move to another country?"
        ],
        normal: [
            "Who's most likely to drunk text their ex?",
            "Who's most likely to end up sleeping on the bathroom floor?",
            "Who's most likely to go to jail?",
            "Who's most likely to die first in a zombie apocalypse?",
            "Who's most likely to have 10 kids?",
            "Who's most likely to get a weird tattoo?",
            "Who's most likely to join a cult?",
            "Who's most likely to become a crazy cat person?",
            "Who's most likely to marry for money?",
            "Who's most likely to fake their own death?"
        ],
        spicy: [
            "Who's most likely to have a one night stand?",
            "Who's most likely to have a secret crush on someone here?",
            "Who's most likely to sleep with their boss?",
            "Who's most likely to have a threesome?",
            "Who's most likely to send nudes?",
            "Who's most likely to have sex in public?",
            "Who's most likely to date two people at once?",
            "Who's most likely to have a sugar daddy/mommy?",
            "Who's most likely to do porn?",
            "Who's most likely to have the highest body count?"
        ],
        couples: [
            "Who's most likely to get married first?",
            "Who's most likely to cheat on their partner?",
            "Who's most likely to fall in love with their best friend?",
            "Who's most likely to have kids first?",
            "Who's most likely to forget their anniversary?",
            "Who's most likely to get divorced?",
            "Who's most likely to propose in public?",
            "Who's most likely to have a destination wedding?",
            "Who's most likely to elope?",
            "Who's most likely to stay single forever?"
        ]
    },
    spinBottleTasks: {
        classic: [
            "Give a compliment",
            "Share your most embarrassing moment",
            "Do your best impression of someone here",
            "Sing a song for 30 seconds",
            "Tell them something you like about them",
            "Do a silly dance together",
            "Take a selfie together",
            "Give them a high five",
            "Tell a joke",
            "Share a secret"
        ],
        gettingStarted: [
            "Give them a hug",
            "Say something nice about them",
            "Show them your best dance move",
            "Teach them your secret handshake",
            "Play rock paper scissors",
            "Thumb wrestle",
            "Staring contest for 30 seconds",
            "Tell them your favorite thing about the party",
            "Share your worst pickup line",
            "Do 5 jumping jacks together"
        ],
        normal: [
            "Let them post something on your social media",
            "Give a 30 second massage",
            "Whisper something in their ear",
            "Do a trust fall",
            "Sit on their lap for the next round",
            "Feed them a snack",
            "Let them style your hair",
            "Arm wrestle",
            "Let them draw on your hand",
            "Share an embarrassing photo from your phone"
        ],
        spicy: [
            "Kiss on the cheek",
            "Give a lap dance for 10 seconds",
            "Switch an item of clothing",
            "Take a body shot",
            "Play with their hair for 1 minute",
            "Whisper your dirtiest thought",
            "Lick their ear",
            "Give them a hickey",
            "Make out for 10 seconds",
            "Remove an item of clothing"
        ],
        couples: [
            "Kiss for 30 seconds",
            "Give your partner a 1 minute massage",
            "Whisper what you want to do later",
            "Share your favorite memory together",
            "Recreate your first kiss",
            "Slow dance for 1 minute",
            "Feed each other a shot",
            "Tell them what you love most about them",
            "Give them a lap dance",
            "Make out until the next turn"
        ]
    },
    trivia: [
        {
            question: "When was HSG founded?",
            options: ["1898", "1923", "1945", "1967"],
            correct: 0
        },
        {
            question: "What does HSG stand for?",
            options: ["High School Gymnasium", "Hochschule St. Gallen", "Higher Studies Group", "Helvetic Study Group"],
            correct: 1
        },
        {
            question: "How many students attend HSG?",
            options: ["5,000", "9,000", "12,000", "15,000"],
            correct: 1
        },
        {
            question: "What's the most popular major at HSG?",
            options: ["Law", "Business Administration", "Computer Science", "International Affairs"],
            correct: 1
        }
    ]
};