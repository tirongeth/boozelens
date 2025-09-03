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
            "Never have I ever danced on a table or bar",
            "Never have I ever pretended to be someone else online",
            "Never have I ever accidentally sent a text to the wrong person",
            "Never have I ever forgotten someone's name right after being introduced",
            "Never have I ever laughed at something I didn't understand",
            "Never have I ever pretended to know a song I'd never heard",
            "Never have I ever fallen asleep during a movie in theaters",
            "Never have I ever googled myself",
            "Never have I ever tried to look cool and failed miserably",
            "Never have I ever pretended my phone was dead to avoid talking",
            "Never have I ever used fake ID",
            "Never have I ever been caught talking to myself",
            "Never have I ever pretended to be sick to get out of something",
            "Never have I ever accidentally liked an old photo while stalking someone",
            "Never have I ever said 'I'm almost there' when I haven't left yet",
            "Never have I ever fallen asleep on public transport and missed my stop",
            "Never have I ever pretended to understand directions and gotten completely lost",
            "Never have I ever waved back at someone who wasn't waving at me",
            "Never have I ever practiced conversations in my head before making phone calls",
            "Never have I ever pretended to text someone to avoid awkward situations",
            "Never have I ever sang in the shower and thought I sounded amazing"
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
            "Never have I ever gotten lost in a foreign country",
            "Never have I ever tried a food I couldn't pronounce",
            "Never have I ever been in a limousine",
            "Never have I ever seen the ocean",
            "Never have I ever been to a music festival",
            "Never have I ever ridden a horse",
            "Never have I ever been camping",
            "Never have I ever been to a wedding",
            "Never have I ever tried sushi",
            "Never have I ever been on a blind date",
            "Never have I ever been to a zoo",
            "Never have I ever tried karaoke",
            "Never have I ever been to a casino",
            "Never have I ever been on a road trip longer than 8 hours",
            "Never have I ever been to a professional sports game",
            "Never have I ever tried ice skating",
            "Never have I ever been to a museum",
            "Never have I ever tried skiing or snowboarding",
            "Never have I ever been to a comedy show",
            "Never have I ever been to a farmers market",
            "Never have I ever tried rock climbing",
            "Never have I ever been to a drive-in movie",
            "Never have I ever been on a boat",
            "Never have I ever tried mini golf",
            "Never have I ever been to a theme park",
            "Never have I ever tried bowling",
            "Never have I ever been to a library as an adult",
            "Never have I ever tried fishing",
            "Never have I ever been to a bookstore and stayed for hours",
            "Never have I ever tried a cooking class"
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
            "Never have I ever broken something and blamed someone else",
            "Never have I ever pretended to know how to cook something and completely messed it up",
            "Never have I ever cried during a commercial",
            "Never have I ever stalked someone on social media for hours",
            "Never have I ever pretended to be asleep to avoid doing something",
            "Never have I ever eaten an entire pizza by myself",
            "Never have I ever Googled someone before a first date",
            "Never have I ever pretended to be busy to avoid hanging out with someone",
            "Never have I ever taken a selfie in a public bathroom",
            "Never have I ever bought something expensive and hid it from family/friends",
            "Never have I ever pretended to have read a book I never actually read",
            "Never have I ever used someone else's Netflix password without asking",
            "Never have I ever fallen asleep while someone was talking to me",
            "Never have I ever pretended my internet was down to avoid video calls",
            "Never have I ever eaten expired food because I was too lazy to go shopping",
            "Never have I ever lied about my weight or height",
            "Never have I ever pretended to like a gift I actually hated",
            "Never have I ever checked my ex's social media obsessively",
            "Never have I ever pretended to understand a movie that made no sense",
            "Never have I ever bought clothes online in the wrong size and kept them anyway",
            "Never have I ever pretended to be someone else's friend for personal benefit"
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
            "Never have I ever kissed someone to make someone else jealous",
            "Never have I ever sent a flirty text to the wrong person",
            "Never have I ever had a crush on my friend's sibling",
            "Never have I ever made out in a car",
            "Never have I ever had a friends with benefits situation",
            "Never have I ever kissed someone on the first date",
            "Never have I ever had a romantic encounter at work",
            "Never have I ever sent or received a sext",
            "Never have I ever had a one night stand with someone I met online",
            "Never have I ever fooled around in a public place",
            "Never have I ever had a threesome fantasy",
            "Never have I ever kissed someone the same night I met them",
            "Never have I ever hooked up with someone significantly older/younger",
            "Never have I ever had a romantic encounter while traveling",
            "Never have I ever made the first move on someone",
            "Never have I ever had a crush on a celebrity and fantasized about them",
            "Never have I ever hooked up with someone I shouldn't have",
            "Never have I ever been in a relationship for the wrong reasons",
            "Never have I ever kissed multiple people in the same night",
            "Never have I ever had a romantic encounter in an unusual location",
            "Never have I ever pretended to be single when I wasn't"
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
            "Never have I ever compared my partner to an ex",
            "Never have I ever snooped through my partner's phone",
            "Never have I ever pretended to like my partner's friends when I didn't",
            "Never have I ever faked being happy about a gift my partner gave me",
            "Never have I ever been jealous of my partner's ex",
            "Never have I ever gone through my partner's social media",
            "Never have I ever pretended to enjoy something my partner loves",
            "Never have I ever had doubts about my relationship but stayed anyway",
            "Never have I ever been tempted to cheat but didn't",
            "Never have I ever lied about how much something cost to my partner",
            "Never have I ever been embarrassed by something my partner did in public",
            "Never have I ever fantasized about someone else during intimacy",
            "Never have I ever pretended to be asleep to avoid intimacy",
            "Never have I ever checked up on my partner without them knowing",
            "Never have I ever been in love with two people at the same time",
            "Never have I ever kept a major secret from my partner",
            "Never have I ever regretted introducing my partner to my family",
            "Never have I ever pretended my partner's cooking was good when it wasn't",
            "Never have I ever been attracted to one of my partner's friends",
            "Never have I ever thought about breaking up during a fight",
            "Never have I ever wished my partner would change something about themselves"
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
            "What's your most embarrassing moment?",
            "What's the weirdest thing you've eaten and actually liked?",
            "What's your most irrational fear?",
            "What's the worst haircut you've ever had?",
            "What's your most embarrassing childhood memory?",
            "What's the strangest thing you believed as a child?",
            "What's your worst fashion mistake?",
            "What's the most embarrassing thing you've done in front of your parents?",
            "What's your weirdest habit that no one knows about?",
            "What's the most embarrassing thing you've said to someone you had a crush on?",
            "What's your most awkward encounter with a celebrity or famous person?",
            "What's the worst advice you've ever given someone?",
            "What's your most embarrassing social media post?",
            "What's the weirdest place you've fallen asleep?",
            "What's your most embarrassing autocorrect fail?",
            "What's the strangest compliment you've ever received?",
            "What's your worst 'foot in mouth' moment?",
            "What's the most embarrassing thing you've done while trying to impress someone?",
            "What's your weirdest dream that you still remember?",
            "What's the most childish thing you still secretly enjoy?"
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
            "What's something you've never told anyone?",
            "What's your favorite memory from this year?",
            "What's something you're really proud of?",
            "What's your biggest goal for next year?",
            "What's your favorite thing about yourself?",
            "What's the nicest thing someone has ever done for you?",
            "What's your favorite family tradition?",
            "What's something you're grateful for today?",
            "What's your favorite way to relax?",
            "What's the best gift you've ever received?",
            "What's your favorite season and why?",
            "What's something you've always wanted to learn?",
            "What's your favorite childhood toy?",
            "What's the best book you've ever read?",
            "What's your favorite type of music?",
            "What's something that always makes you smile?",
            "What's your favorite food that reminds you of home?",
            "What's the most beautiful place you've ever been?",
            "What's something you're looking forward to?",
            "What's your favorite thing to do on weekends?"
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
            "What's the meanest thing you've ever said to someone?",
            "What's your most embarrassing browser history?",
            "What's the weirdest thing in your fridge right now?",
            "What's your most embarrassing habit when you think no one is watching?",
            "What's the strangest thing you've done for attention?",
            "What's your most embarrassing moment in school?",
            "What's the weirdest thing you've googled recently?",
            "What's your most embarrassing text message fail?",
            "What's the strangest thing you've pretended to like to impress someone?",
            "What's your most embarrassing moment at work?",
            "What's the weirdest thing you've done when you couldn't sleep?",
            "What's your most embarrassing social media stalking story?",
            "What's the strangest thing you've done while home alone?",
            "What's your most embarrassing moment in a public bathroom?",
            "What's the weirdest thing you've done to avoid someone?",
            "What's your most embarrassing shopping experience?",
            "What's the strangest thing you've done to get out of a conversation?",
            "What's your most embarrassing moment with technology?",
            "What's the weirdest thing you've done while procrastinating?",
            "What's your most embarrassing moment trying to be cool?"
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
            "Who in this room do you think is the best looking?",
            "What's your most embarrassing sexual experience?",
            "What's the most scandalous thing you've done in public?",
            "What's your biggest sexual regret?",
            "What's the wildest thing on your bucket list?",
            "What's your most embarrassing bedroom story?",
            "What's the most adventurous thing you've ever done?",
            "What's your biggest secret crush right now?",
            "What's the most inappropriate place you've been turned on?",
            "What's your most embarrassing dating story?",
            "What's the wildest thing you've done while drunk?",
            "What's your biggest turn-off in bed?",
            "What's the most embarrassing thing you've said during intimacy?",
            "What's your most scandalous text message exchange?",
            "What's the wildest place you've fantasized about someone?",
            "What's your biggest relationship deal-breaker?",
            "What's the most embarrassing thing you've done to get someone's attention?",
            "What's your wildest 'what if' fantasy about someone you know?",
            "What's the most inappropriate thought you've had about someone here?",
            "What's your biggest secret that would shock everyone here?"
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
            "If you could change one thing about your partner, what would it be?",
            "What's the most romantic thing you've ever done for someone?",
            "What's your biggest fear about relationships?",
            "What's the worst breakup line you've ever used or heard?",
            "What's your most embarrassing moment with your current or ex partner?",
            "What's the biggest sacrifice you've made for love?",
            "What's your biggest relationship insecurity?",
            "What's the most embarrassing thing your partner has caught you doing?",
            "What's your biggest turn-on about your partner?",
            "What's something you wish your partner would do more of?",
            "What's your most embarrassing couple's fight about?",
            "What's the weirdest thing you and your partner do together?",
            "What's your biggest relationship pet peeve?",
            "What's the most embarrassing thing you've done while jealous?",
            "What's your most cringe-worthy romantic gesture?",
            "What's something you've never told your partner but want to?",
            "What's your biggest relationship deal-breaker that you've overlooked?",
            "What's the most embarrassing thing about your dating history?",
            "What's your most irrational relationship worry?",
            "What's the weirdest thing that turns you on about your partner?"
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
            "Tell a joke and make someone laugh",
            "Do your best moonwalk",
            "Sing the alphabet backwards",
            "Do a cartwheel (or attempt one)",
            "Pretend to be a weather reporter for 1 minute",
            "Do your best zombie impression",
            "Hop on one foot for 30 seconds",
            "Do 15 sit-ups",
            "Pretend to be a robot for 1 minute",
            "Do your best opera singing voice",
            "Act out your morning routine in fast forward",
            "Do a dramatic reading of a text message",
            "Pretend to be a news anchor reporting on the party",
            "Do your best runway model walk",
            "Act like you're underwater for 1 minute",
            "Do 10 burpees",
            "Pretend to be a mime stuck in a box",
            "Do your best superhero pose and hold it for 30 seconds",
            "Act out a movie scene without speaking",
            "Do the funky chicken dance"
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
            "High five everyone in the room",
            "Do a silly face for 10 seconds",
            "Clap your hands above your head 20 times",
            "Do your best ballerina spin",
            "Make everyone laugh without speaking",
            "Do 3 jumping jacks",
            "Show your best thumbs up pose",
            "Do a funny walk across the room",
            "Make your silliest sound for 15 seconds",
            "Do your best statue impression for 30 seconds",
            "Show everyone your best smile",
            "Do a gentle dance for 20 seconds",
            "Make a toast to everyone in the room",
            "Do your best wave like you're famous",
            "Show your most creative hand gesture",
            "Do a simple magic trick (or pretend to)",
            "Give everyone a compliment",
            "Do your best 'thinking' pose",
            "Show your victory celebration dance",
            "Make everyone say 'aww' without using words"
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
            "Do the worm",
            "Let someone pick your next Instagram story",
            "Do a handstand against the wall for 10 seconds",
            "Let the group give you a new nickname for the night",
            "Eat a weird food combination chosen by the group",
            "Let someone rearrange your hair with just their hands",
            "Do your best impression of a baby for 1 minute",
            "Let someone write something funny on your arm",
            "Try to lick your own elbow for 30 seconds",
            "Let the group choose your next profile picture",
            "Do 25 jumping jacks while singing",
            "Let someone apply makeup on you blindfolded",
            "Try to touch your nose with your tongue for 15 seconds",
            "Let someone mess up your outfit for 2 rounds",
            "Do your best runway walk in slow motion",
            "Let the group pick an embarrassing song for you to sing",
            "Try to do a split (or your best attempt)",
            "Let someone give you a temporary tattoo with a pen",
            "Do your best interpretive dance for 45 seconds",
            "Let the group choose a funny filter for your next selfie"
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
            "Take a body shot off someone",
            "Do a sexy dance for 45 seconds",
            "Let someone blindfold you and feed you something",
            "Give someone a sensual shoulder massage for 1 minute",
            "Do your best seductive walk across the room",
            "Let someone tie your hands behind your back for 2 rounds",
            "Whisper your biggest turn-on to the person next to you",
            "Do a strip tease to your socks (keep clothes on!)",
            "Let someone apply lipstick on you while blindfolded",
            "Give someone a flirty compliment in a sexy voice",
            "Do your best impression of a romantic movie scene",
            "Let someone feed you whipped cream or chocolate",
            "Dance seductively with an imaginary partner",
            "Let someone give you a hickey on your arm",
            "Do your sexiest runway model pose for 30 seconds",
            "Let someone write something flirty on your body",
            "Give someone bedroom eyes for 20 seconds",
            "Do a sensual dance with the person to your right",
            "Let someone mess up your hair in a 'just woke up' style",
            "Recreate your most seductive selfie pose live"
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
            "Whisper your wildest fantasy to your partner",
            "Give your partner a romantic kiss on the forehead",
            "Let your partner style your hair however they want",
            "Do a couple's dance together for 1 minute",
            "Let your partner choose your next drink",
            "Give your partner a piggyback ride across the room",
            "Let your partner apply makeup on you",
            "Share your most embarrassing couple moment with everyone",
            "Let your partner pick your outfit for tomorrow",
            "Do 10 couple push-ups together (facing each other)",
            "Let your partner give you a new hairstyle using only their hands",
            "Feed each other something blindfolded",
            "Do your partner's signature dance move together",
            "Let your partner choose your next social media post",
            "Give your partner a foot massage for 1 minute",
            "Let your partner draw a heart on your face",
            "Do the lift from Dirty Dancing (safely!)",
            "Let your partner choose a pet name for you to use all night",
            "Give your partner your phone for them to text anyone",
            "Let your partner give you a makeover using whatever's available"
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
    ],
    triviaCategories: {
        sports: [
            {
                question: "Which country has won the most FIFA World Cups?",
                options: ["Germany", "Brazil", "Argentina", "Italy"],
                correct: 1
            },
            {
                question: "How many players are on a basketball court at one time?",
                options: ["8", "10", "12", "14"],
                correct: 1
            },
            {
                question: "In which year were the first modern Olympics held?",
                options: ["1896", "1900", "1904", "1912"],
                correct: 0
            },
            {
                question: "What is the maximum score in 10-pin bowling?",
                options: ["200", "250", "300", "350"],
                correct: 2
            },
            {
                question: "Which tennis player has won the most Grand Slam titles?",
                options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
                correct: 2
            },
            {
                question: "How long is a marathon?",
                options: ["40.2 km", "41.2 km", "42.2 km", "43.2 km"],
                correct: 2
            },
            {
                question: "Which sport is known as 'The Beautiful Game'?",
                options: ["Basketball", "Football/Soccer", "Tennis", "Golf"],
                correct: 1
            },
            {
                question: "How many rings are on the Olympic flag?",
                options: ["4", "5", "6", "7"],
                correct: 1
            },
            {
                question: "In golf, what is an eagle?",
                options: ["1 under par", "2 under par", "3 under par", "Par"],
                correct: 1
            },
            {
                question: "Which country invented ice hockey?",
                options: ["USA", "Russia", "Canada", "Sweden"],
                correct: 2
            },
            {
                question: "Which footballer is known as 'CR7'?",
                options: ["Messi", "Ronaldo", "Neymar", "Mbappé"],
                correct: 1
            },
            {
                question: "How many Grand Slam tournaments are there in tennis each year?",
                options: ["3", "4", "5", "6"],
                correct: 1
            },
            {
                question: "In American football, how many points is a touchdown worth?",
                options: ["5", "6", "7", "8"],
                correct: 1
            },
            {
                question: "Which city will host the 2028 Summer Olympics?",
                options: ["Paris", "Los Angeles", "Brisbane", "Tokyo"],
                correct: 1
            },
            {
                question: "What is the term for scoring three goals in hockey?",
                options: ["Triple", "Hat trick", "Three-pointer", "Trilogy"],
                correct: 1
            },
            {
                question: "Which sport uses terms like 'slam dunk' and 'alley-oop'?",
                options: ["Volleyball", "Basketball", "Tennis", "Badminton"],
                correct: 1
            },
            {
                question: "How many periods are in a standard hockey game?",
                options: ["2", "3", "4", "5"],
                correct: 1
            },
            {
                question: "Which boxer was known as 'The Greatest'?",
                options: ["Mike Tyson", "Muhammad Ali", "Floyd Mayweather", "Rocky Balboa"],
                correct: 1
            },
            {
                question: "In which sport would you perform a slam dunk?",
                options: ["Volleyball", "Basketball", "Tennis", "Football"],
                correct: 1
            },
            {
                question: "How long is a standard NFL game?",
                options: ["90 minutes", "60 minutes", "120 minutes", "80 minutes"],
                correct: 1
            },
            {
                question: "Which country dominates in Formula 1 with the most constructor championships?",
                options: ["Italy", "Germany", "United Kingdom", "France"],
                correct: 0
            },
            {
                question: "What is the maximum weight for heavyweight boxing?",
                options: ["No limit", "250 lbs", "300 lbs", "200 lbs"],
                correct: 0
            },
            {
                question: "In baseball, what is it called when a batter hits all four bases in one play?",
                options: ["Grand slam", "Home run", "Triple", "Bases loaded"],
                correct: 1
            },
            {
                question: "Which swimming stroke is fastest?",
                options: ["Backstroke", "Breaststroke", "Freestyle", "Butterfly"],
                correct: 2
            },
            {
                question: "How many players are on a soccer field at one time per team?",
                options: ["10", "11", "12", "9"],
                correct: 1
            },
            {
                question: "Which NBA team has won the most championships?",
                options: ["Lakers", "Celtics", "Warriors", "Bulls"],
                correct: 1
            },
            {
                question: "What is the highest possible score in ten-pin bowling?",
                options: ["250", "300", "350", "400"],
                correct: 1
            },
            {
                question: "In which sport is the Stanley Cup awarded?",
                options: ["Basketball", "Football", "Ice Hockey", "Baseball"],
                correct: 2
            },
            {
                question: "How many points is a field goal worth in American football?",
                options: ["2", "3", "6", "7"],
                correct: 1
            },
            {
                question: "Which sport features positions called 'scrum-half' and 'fly-half'?",
                options: ["American Football", "Rugby", "Soccer", "Australian Football"],
                correct: 1
            },
            {
                question: "In tennis, what is the term for a score of 40-40?",
                options: ["Match point", "Deuce", "Advantage", "Set point"],
                correct: 1
            },
            {
                question: "Which Formula 1 driver holds the record for most race wins?",
                options: ["Michael Schumacher", "Lewis Hamilton", "Ayrton Senna", "Sebastian Vettel"],
                correct: 1
            },
            {
                question: "How many holes are played in a standard round of golf?",
                options: ["16", "18", "20", "22"],
                correct: 1
            },
            {
                question: "In which sport would you find a 'libero'?",
                options: ["Basketball", "Volleyball", "Soccer", "Handball"],
                correct: 1
            },
            {
                question: "What is the term for a perfect game in bowling?",
                options: ["Strike out", "Clean sweep", "Perfect 300", "All strikes"],
                correct: 2
            },
            {
                question: "Which cyclist has won the most Tour de France titles?",
                options: ["Lance Armstrong", "Eddy Merckx", "Miguel Indurain", "Jacques Anquetil"],
                correct: 1
            },
            {
                question: "In swimming, which stroke must you use in an Individual Medley first?",
                options: ["Freestyle", "Backstroke", "Butterfly", "Breaststroke"],
                correct: 2
            },
            {
                question: "What is the term for scoring two under par on a golf hole?",
                options: ["Birdie", "Eagle", "Albatross", "Bogey"],
                correct: 1
            },
            {
                question: "Which sport is played at Wimbledon?",
                options: ["Cricket", "Tennis", "Badminton", "Squash"],
                correct: 1
            },
            {
                question: "How many substitutions are allowed in soccer during regular play?",
                options: ["3", "5", "7", "Unlimited"],
                correct: 1
            },
            {
                question: "In which sport would you perform a 'slam dunk'?",
                options: ["Volleyball", "Basketball", "Tennis", "Badminton"],
                correct: 1
            },
            {
                question: "What is the maximum number of sets in a men's tennis Grand Slam match?",
                options: ["3", "5", "7", "9"],
                correct: 1
            },
            {
                question: "Which sport uses the term 'love' for a score of zero?",
                options: ["Tennis", "Badminton", "Squash", "All of the above"],
                correct: 3
            },
            {
                question: "In basketball, how many personal fouls result in disqualification?",
                options: ["5", "6", "7", "8"],
                correct: 1
            },
            {
                question: "What is the diameter of a basketball hoop?",
                options: ["16 inches", "18 inches", "20 inches", "22 inches"],
                correct: 1
            },
            {
                question: "Which sport features the 'Fosbury Flop' technique?",
                options: ["Long jump", "High jump", "Pole vault", "Triple jump"],
                correct: 1
            },
            {
                question: "How many minutes are in a standard soccer match including stoppage time?",
                options: ["90+", "100", "120", "80"],
                correct: 0
            },
            {
                question: "In which sport would you use a shuttlecock?",
                options: ["Tennis", "Squash", "Badminton", "Table tennis"],
                correct: 2
            },
            {
                question: "What is the term for hitting a golf ball into the water?",
                options: ["Water hazard", "Penalty stroke", "Splash shot", "Aqua bogey"],
                correct: 0
            },
            {
                question: "Which sport is known as 'America's Pastime'?",
                options: ["Basketball", "Football", "Baseball", "Hockey"],
                correct: 2
            },
            {
                question: "In track and field, what is the standard distance for a marathon?",
                options: ["26.2 miles", "25 miles", "27 miles", "30 miles"],
                correct: 0
            },
            {
                question: "Which sport uses terms like 'spike' and 'dig'?",
                options: ["Tennis", "Volleyball", "Badminton", "Squash"],
                correct: 1
            },
            {
                question: "How many points is a safety worth in American football?",
                options: ["1", "2", "3", "6"],
                correct: 1
            },
            {
                question: "In which sport would you find a 'wicket'?",
                options: ["Baseball", "Cricket", "Field Hockey", "Lacrosse"],
                correct: 1
            },
            {
                question: "What is the term for a score of one under par in golf?",
                options: ["Eagle", "Birdie", "Bogey", "Albatross"],
                correct: 1
            },
            {
                question: "Which swimmer holds the most Olympic gold medals?",
                options: ["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Katie Ledecky"],
                correct: 1
            },
            {
                question: "In tennis, what surface is used at the French Open?",
                options: ["Grass", "Hard court", "Clay", "Synthetic"],
                correct: 2
            },
            {
                question: "How many innings are in a standard baseball game?",
                options: ["7", "8", "9", "10"],
                correct: 2
            },
            {
                question: "Which sport is Tiger Woods famous for?",
                options: ["Tennis", "Golf", "Swimming", "Athletics"],
                correct: 1
            },
            {
                question: "What is the maximum score possible in a single frame of bowling?",
                options: ["20", "25", "30", "35"],
                correct: 2
            }
        ],
        history: [
            {
                question: "In which year did World War II end?",
                options: ["1943", "1944", "1945", "1946"],
                correct: 2
            },
            {
                question: "Who was the first President of the United States?",
                options: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
                correct: 1
            },
            {
                question: "The ancient city of Rome was built on how many hills?",
                options: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "In which year did the Berlin Wall fall?",
                options: ["1987", "1988", "1989", "1990"],
                correct: 2
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
                correct: 1
            },
            {
                question: "Which empire built Machu Picchu?",
                options: ["Aztec", "Maya", "Inca", "Olmec"],
                correct: 2
            },
            {
                question: "In which year did Christopher Columbus reach the Americas?",
                options: ["1490", "1491", "1492", "1493"],
                correct: 2
            },
            {
                question: "Who was known as the 'Iron Lady'?",
                options: ["Queen Elizabeth II", "Margaret Thatcher", "Angela Merkel", "Golda Meir"],
                correct: 1
            },
            {
                question: "The French Revolution began in which year?",
                options: ["1787", "1788", "1789", "1790"],
                correct: 2
            },
            {
                question: "Which ancient wonder of the world still stands today?",
                options: ["Colossus of Rhodes", "Great Pyramid of Giza", "Hanging Gardens", "Lighthouse of Alexandria"],
                correct: 1
            },
            {
                question: "Which emperor built the Roman Colosseum?",
                options: ["Julius Caesar", "Augustus", "Vespasian", "Nero"],
                correct: 2
            },
            {
                question: "In which year did the Titanic sink?",
                options: ["1910", "1911", "1912", "1913"],
                correct: 2
            },
            {
                question: "Who was the first man to walk on the moon?",
                options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
                correct: 1
            },
            {
                question: "Which war was fought from 1914 to 1918?",
                options: ["World War II", "World War I", "Korean War", "Vietnam War"],
                correct: 1
            },
            {
                question: "Who was the last Pharaoh of Egypt?",
                options: ["Tutankhamun", "Cleopatra VII", "Ramesses II", "Akhenaten"],
                correct: 1
            },
            {
                question: "In which year did the United States gain independence?",
                options: ["1775", "1776", "1777", "1778"],
                correct: 1
            },
            {
                question: "Which civilization built Stonehenge?",
                options: ["Romans", "Celts", "Neolithic Britons", "Vikings"],
                correct: 2
            },
            {
                question: "Who led the Mongol Empire?",
                options: ["Attila the Hun", "Genghis Khan", "Tamerlane", "Kublai Khan"],
                correct: 1
            },
            {
                question: "In which century did the Renaissance begin?",
                options: ["13th", "14th", "15th", "16th"],
                correct: 1
            },
            {
                question: "Which country was first to give women the right to vote?",
                options: ["United States", "United Kingdom", "New Zealand", "Australia"],
                correct: 2
            },
            {
                question: "Who wrote the Communist Manifesto?",
                options: ["Lenin", "Stalin", "Marx and Engels", "Trotsky"],
                correct: 2
            },
            {
                question: "Which battle ended Napoleon's rule?",
                options: ["Battle of Trafalgar", "Battle of Waterloo", "Battle of Leipzig", "Battle of Austerlitz"],
                correct: 1
            },
            {
                question: "In which year did the Soviet Union collapse?",
                options: ["1989", "1990", "1991", "1992"],
                correct: 2
            },
            {
                question: "Who was the first Roman Emperor?",
                options: ["Julius Caesar", "Augustus", "Caligula", "Claudius"],
                correct: 1
            },
            {
                question: "Which explorer discovered the Pacific Ocean for Europeans?",
                options: ["Magellan", "Balboa", "Columbus", "Cortés"],
                correct: 1
            },
            {
                question: "In which year was John F. Kennedy assassinated?",
                options: ["1962", "1963", "1964", "1965"],
                correct: 1
            },
            {
                question: "Which ancient civilization invented writing?",
                options: ["Egyptians", "Greeks", "Sumerians", "Chinese"],
                correct: 2
            },
            {
                question: "Who was known as the Sun King?",
                options: ["Henry VIII", "Louis XIV", "Napoleon", "Charles V"],
                correct: 1
            },
            {
                question: "Which war lasted from 1955 to 1975?",
                options: ["Korean War", "Vietnam War", "Cold War", "World War III"],
                correct: 1
            },
            {
                question: "In which year did Hitler come to power in Germany?",
                options: ["1932", "1933", "1934", "1935"],
                correct: 1
            },
            {
                question: "Which city was the capital of the Byzantine Empire?",
                options: ["Rome", "Athens", "Constantinople", "Alexandria"],
                correct: 2
            },
            {
                question: "Who discovered penicillin?",
                options: ["Louis Pasteur", "Alexander Fleming", "Marie Curie", "Joseph Lister"],
                correct: 1
            },
            {
                question: "Which revolution happened in 1917?",
                options: ["French Revolution", "American Revolution", "Russian Revolution", "Chinese Revolution"],
                correct: 2
            },
            {
                question: "Who was the first female Prime Minister of the UK?",
                options: ["Margaret Thatcher", "Theresa May", "Elizabeth I", "Victoria"],
                correct: 0
            },
            {
                question: "In which year was the United Nations founded?",
                options: ["1944", "1945", "1946", "1947"],
                correct: 1
            },
            {
                question: "Which ancient Greek philosopher taught Alexander the Great?",
                options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
                correct: 2
            },
            {
                question: "What was the name of the ship Charles Darwin sailed on?",
                options: ["HMS Victory", "HMS Beagle", "HMS Endeavour", "HMS Bounty"],
                correct: 1
            },
            {
                question: "Which pope called for the First Crusade?",
                options: ["Urban II", "Gregory VII", "Innocent III", "Alexander VI"],
                correct: 0
            },
            {
                question: "In which year did the Black Death peak in Europe?",
                options: ["1347", "1348", "1349", "1350"],
                correct: 1
            },
            {
                question: "Who unified Germany in 1871?",
                options: ["Wilhelm I", "Otto von Bismarck", "Frederick III", "Heinrich Himmler"],
                correct: 1
            },
            {
                question: "Which treaty ended World War I?",
                options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Vienna", "Treaty of Ghent"],
                correct: 1
            },
            {
                question: "Who was the first person to circumnavigate the globe?",
                options: ["Ferdinand Magellan", "Juan Sebastián Elcano", "Francis Drake", "James Cook"],
                correct: 1
            },
            {
                question: "Which empire was ruled by Hammurabi?",
                options: ["Egyptian", "Babylonian", "Assyrian", "Persian"],
                correct: 1
            },
            {
                question: "In which year was the printing press invented?",
                options: ["1440", "1450", "1455", "1460"],
                correct: 0
            },
            {
                question: "Who led the Indian independence movement?",
                options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"],
                correct: 1
            },
            {
                question: "Which civilization built Petra?",
                options: ["Romans", "Greeks", "Nabataeans", "Phoenicians"],
                correct: 2
            },
            {
                question: "In which battle was Admiral Nelson killed?",
                options: ["Battle of the Nile", "Battle of Copenhagen", "Battle of Trafalgar", "Battle of Cape St Vincent"],
                correct: 2
            },
            {
                question: "Who painted the ceiling of the Sistine Chapel?",
                options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
                correct: 2
            },
            {
                question: "Which Spanish conquistador conquered the Aztec Empire?",
                options: ["Francisco Pizarro", "Hernán Cortés", "Diego Velázquez", "Vasco Núñez de Balboa"],
                correct: 1
            },
            {
                question: "In which year did apartheid end in South Africa?",
                options: ["1992", "1993", "1994", "1995"],
                correct: 2
            },
            {
                question: "Who was the first person in space?",
                options: ["Neil Armstrong", "Yuri Gagarin", "John Glenn", "Alan Shepard"],
                correct: 1
            },
            {
                question: "Which king signed the Magna Carta?",
                options: ["King Henry VIII", "King Richard I", "King John", "King Edward I"],
                correct: 2
            },
            {
                question: "In which year did the Great Fire of London occur?",
                options: ["1665", "1666", "1667", "1668"],
                correct: 1
            },
            {
                question: "Who was the first Holy Roman Emperor?",
                options: ["Charlemagne", "Otto I", "Frederick Barbarossa", "Charles V"],
                correct: 0
            },
            {
                question: "Which war was triggered by the assassination of Archduke Franz Ferdinand?",
                options: ["Franco-Prussian War", "World War I", "Crimean War", "Balkan Wars"],
                correct: 1
            },
            {
                question: "In which year was the Suez Canal opened?",
                options: ["1867", "1868", "1869", "1870"],
                correct: 2
            },
            {
                question: "Who founded the Mongol Empire?",
                options: ["Genghis Khan", "Kublai Khan", "Ögedei Khan", "Tolui Khan"],
                correct: 0
            },
            {
                question: "Which revolution overthrew the Russian Tsar?",
                options: ["October Revolution", "February Revolution", "Decembrist Revolt", "Revolution of 1905"],
                correct: 1
            },
            {
                question: "In which year did the American Civil War end?",
                options: ["1864", "1865", "1866", "1867"],
                correct: 1
            },
            {
                question: "Who was known as the 'Maid of Orléans'?",
                options: ["Marie Antoinette", "Joan of Arc", "Eleanor of Aquitaine", "Catherine de' Medici"],
                correct: 1
            }
        ],
        science: [
            {
                question: "What is the chemical symbol for gold?",
                options: ["Go", "Gd", "Au", "Ag"],
                correct: 2
            },
            {
                question: "How many bones are in an adult human body?",
                options: ["196", "206", "216", "226"],
                correct: 1
            },
            {
                question: "What is the speed of light in vacuum?",
                options: ["299,792 km/s", "199,792 km/s", "399,792 km/s", "499,792 km/s"],
                correct: 0
            },
            {
                question: "What is the largest planet in our solar system?",
                options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
                correct: 1
            },
            {
                question: "What is the powerhouse of the cell?",
                options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
                correct: 2
            },
            {
                question: "What is the most abundant gas in Earth's atmosphere?",
                options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                correct: 2
            },
            {
                question: "How many chambers does a human heart have?",
                options: ["2", "3", "4", "5"],
                correct: 2
            },
            {
                question: "What is the study of earthquakes called?",
                options: ["Geology", "Seismology", "Volcanology", "Meteorology"],
                correct: 1
            },
            {
                question: "What is the smallest unit of matter?",
                options: ["Molecule", "Atom", "Electron", "Quark"],
                correct: 3
            },
            {
                question: "At what temperature does water boil at sea level?",
                options: ["90°C", "100°C", "110°C", "120°C"],
                correct: 1
            },
            {
                question: "How many hearts does an octopus have?",
                options: ["1", "2", "3", "4"],
                correct: 2
            },
            {
                question: "What color is a polar bear's skin?",
                options: ["White", "Pink", "Black", "Brown"],
                correct: 2
            },
            {
                question: "Which animal can't jump?",
                options: ["Elephant", "Hippo", "Rhino", "All of the above"],
                correct: 3
            },
            {
                question: "What's the only mammal that can fly?",
                options: ["Flying squirrel", "Sugar glider", "Bat", "Flying lemur"],
                correct: 2
            },
            {
                question: "How long is a day on Venus?",
                options: ["24 hours", "100 days", "243 Earth days", "1 year"],
                correct: 2
            },
            {
                question: "What percentage of our brain do we actually use?",
                options: ["10%", "50%", "Almost 100%", "33%"],
                correct: 2
            },
            {
                question: "Which came first: fire or the wheel?",
                options: ["Fire", "Wheel", "Same time", "Neither"],
                correct: 0
            },
            {
                question: "What's the most abundant gas in the air we breathe?",
                options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
                correct: 2
            },
            {
                question: "How many bones do sharks have?",
                options: ["Over 200", "About 100", "Zero", "It depends"],
                correct: 2
            },
            {
                question: "What's the loudest animal on Earth?",
                options: ["Lion", "Blue whale", "Elephant", "Howler monkey"],
                correct: 1
            },
            {
                question: "Which planet spins backwards?",
                options: ["Mars", "Venus", "Uranus", "Neptune"],
                correct: 1
            },
            {
                question: "What do you call a group of flamingos?",
                options: ["Flock", "Flamboyance", "Pink parade", "Colony"],
                correct: 1
            },
            {
                question: "How many smell receptors does a dog have?",
                options: ["6 million", "300 million", "1 billion", "50 million"],
                correct: 1
            },
            {
                question: "What's the fastest muscle in your body?",
                options: ["Heart", "Tongue", "Eye", "Leg"],
                correct: 2
            },
            {
                question: "Which animal has the highest blood pressure?",
                options: ["Elephant", "Giraffe", "Whale", "Horse"],
                correct: 1
            },
            {
                question: "How many times does a hummingbird's heart beat per minute?",
                options: ["200", "600", "1200", "2000"],
                correct: 2
            },
            {
                question: "What's the only letter that doesn't appear in any US state name?",
                options: ["Q", "X", "Z", "J"],
                correct: 0
            },
            {
                question: "How many teeth does a snail have?",
                options: ["0", "About 100", "Over 25,000", "Just 2"],
                correct: 2
            },
            {
                question: "What's the most common element in the human body?",
                options: ["Carbon", "Hydrogen", "Oxygen", "Nitrogen"],
                correct: 2
            },
            {
                question: "Which fruit has the most vitamin C?",
                options: ["Orange", "Lemon", "Kiwi", "Strawberry"],
                correct: 2
            },
            {
                question: "How long can a cockroach live without its head?",
                options: ["1 hour", "1 day", "1 week", "1 month"],
                correct: 2
            },
            {
                question: "What's the hardest substance in the human body?",
                options: ["Bone", "Tooth enamel", "Cartilage", "Nails"],
                correct: 1
            },
            {
                question: "How many species of spiders exist?",
                options: ["5,000", "25,000", "45,000", "100,000"],
                correct: 2
            },
            {
                question: "Which animal sleeps the most?",
                options: ["Cat", "Sloth", "Koala", "Brown bat"],
                correct: 3
            },
            {
                question: "What's the smallest bone in your body?",
                options: ["In your toe", "In your finger", "In your ear", "In your nose"],
                correct: 2
            },
            {
                question: "How many muscles do you use to smile?",
                options: ["5", "17", "25", "43"],
                correct: 1
            },
            {
                question: "What's the only planet that rotates on its side?",
                options: ["Mars", "Jupiter", "Uranus", "Saturn"],
                correct: 2
            },
            {
                question: "Which animal has fingerprints almost identical to humans?",
                options: ["Chimpanzee", "Gorilla", "Koala", "Orangutan"],
                correct: 2
            },
            {
                question: "How many calories does your brain burn per day?",
                options: ["100", "320", "500", "800"],
                correct: 1
            },
            {
                question: "What's the only food that never expires?",
                options: ["Salt", "Sugar", "Honey", "Rice"],
                correct: 2
            },
            {
                question: "How many times per minute does a hummingbird flap its wings?",
                options: ["200", "800", "3000", "5000"],
                correct: 2
            },
            {
                question: "What color is the 'black box' on airplanes?",
                options: ["Black", "Orange", "Red", "Yellow"],
                correct: 1
            },
            {
                question: "Which animal has blue blood?",
                options: ["Shark", "Lobster", "Dolphin", "Penguin"],
                correct: 1
            },
            {
                question: "How many cells die in your body every second?",
                options: ["1,000", "25,000", "1 million", "25 million"],
                correct: 3
            },
            {
                question: "What's the most abundant protein in your body?",
                options: ["Keratin", "Collagen", "Elastin", "Actin"],
                correct: 1
            },
            {
                question: "Which came first: the lighter or the match?",
                options: ["Match", "Lighter", "Same time", "Fire"],
                correct: 1
            },
            {
                question: "How fast does a sneeze travel?",
                options: ["50 mph", "100 mph", "160 mph", "200 mph"],
                correct: 2
            },
            {
                question: "What's the only mammal that can't sweat?",
                options: ["Whale", "Dolphin", "Seal", "All of the above"],
                correct: 3
            },
            {
                question: "How many times can you fold a piece of paper in half?",
                options: ["5", "7", "12", "Unlimited"],
                correct: 1
            },
            {
                question: "What's the most common phobia?",
                options: ["Heights", "Spiders", "Public speaking", "Flying"],
                correct: 2
            },
            {
                question: "Which animal has the longest tongue relative to body size?",
                options: ["Giraffe", "Anteater", "Chameleon", "Pangolin"],
                correct: 2
            },
            {
                question: "How many taste buds does the average person have?",
                options: ["1,000", "10,000", "100,000", "1 million"],
                correct: 1
            },
            {
                question: "What's the fastest-growing plant?",
                options: ["Sunflower", "Bamboo", "Corn", "Grass"],
                correct: 1
            },
            {
                question: "Which animal can run faster: a chicken or a T-Rex?",
                options: ["Chicken", "T-Rex", "Same speed", "Neither could run"],
                correct: 0
            },
            {
                question: "How many different facial expressions can humans make?",
                options: ["50", "1,000", "10,000", "Unlimited"],
                correct: 2
            },
            {
                question: "What's the only part of your body that has no blood supply?",
                options: ["Hair", "Nails", "Eye cornea", "Teeth"],
                correct: 2
            },
            {
                question: "Which weighs more: a pound of feathers or a pound of gold?",
                options: ["Feathers", "Gold", "Same weight", "Depends on humidity"],
                correct: 2
            },
            {
                question: "How many times does lightning strike the Earth per second?",
                options: ["10", "50", "100", "500"],
                correct: 2
            },
            {
                question: "What's the most recycled material on Earth?",
                options: ["Paper", "Plastic", "Glass", "Steel"],
                correct: 3
            },
            {
                question: "Which animal has the best memory?",
                options: ["Elephant", "Dolphin", "Octopus", "Human"],
                correct: 0
            }
        ],
        flags: [
            {
                question: "ca",
                flagCode: "ca",
                options: ["USA", "Canada", "Norway", "Denmark"],
                correct: 1
            },
            {
                question: "gb",
                flagCode: "gb",
                options: ["Australia", "New Zealand", "United Kingdom", "Ireland"],
                correct: 2
            },
            {
                question: "in",
                flagCode: "in",
                options: ["Pakistan", "India", "Bangladesh", "Sri Lanka"],
                correct: 1
            },
            {
                question: "us",
                flagCode: "us",
                options: ["Malaysia", "Liberia", "United States", "Puerto Rico"],
                correct: 2
            },
            {
                question: "vn",
                flagCode: "vn",
                options: ["China", "Vietnam", "Morocco", "Turkey"],
                correct: 1
            },
            {
                question: "jp",
                flagCode: "jp",
                options: ["South Korea", "Japan", "Bangladesh", "Palau"],
                correct: 1
            },
            {
                question: "ch",
                flagCode: "ch",
                options: ["Denmark", "Switzerland", "Austria", "Poland"],
                correct: 1
            },
            {
                question: "br",
                flagCode: "br",
                options: ["Argentina", "Brazil", "Colombia", "Venezuela"],
                correct: 1
            },
            {
                question: "de",
                flagCode: "de",
                options: ["Belgium", "Germany", "Netherlands", "Luxembourg"],
                correct: 1
            },
            {
                question: "fr",
                flagCode: "fr",
                options: ["Italy", "France", "Netherlands", "Russia"],
                correct: 1
            },
            {
                question: "it",
                flagCode: "it",
                options: ["Mexico", "Hungary", "Italy", "Iran"],
                correct: 2
            },
            {
                question: "es",
                flagCode: "es",
                options: ["Portugal", "Spain", "Colombia", "Venezuela"],
                correct: 1
            },
            {
                question: "mx",
                flagCode: "mx",
                options: ["Italy", "Mexico", "Hungary", "Iran"],
                correct: 1
            },
            {
                question: "au",
                flagCode: "au",
                options: ["New Zealand", "United Kingdom", "Australia", "Fiji"],
                correct: 2
            },
            {
                question: "kr",
                flagCode: "kr",
                options: ["North Korea", "South Korea", "Japan", "China"],
                correct: 1
            },
            {
                question: "se",
                flagCode: "se",
                options: ["Norway", "Finland", "Sweden", "Denmark"],
                correct: 2
            },
            {
                question: "no",
                flagCode: "no",
                options: ["Sweden", "Norway", "Denmark", "Iceland"],
                correct: 1
            },
            {
                question: "dk",
                flagCode: "dk",
                options: ["Norway", "Sweden", "Denmark", "Finland"],
                correct: 2
            },
            {
                question: "fi",
                flagCode: "fi",
                options: ["Sweden", "Norway", "Denmark", "Finland"],
                correct: 3
            },
            {
                question: "nl",
                flagCode: "nl",
                options: ["Luxembourg", "Netherlands", "France", "Belgium"],
                correct: 1
            },
            {
                question: "be",
                flagCode: "be",
                options: ["Germany", "Netherlands", "Belgium", "Luxembourg"],
                correct: 2
            },
            {
                question: "pt",
                flagCode: "pt",
                options: ["Spain", "Portugal", "Italy", "Brazil"],
                correct: 1
            },
            {
                question: "gr",
                flagCode: "gr",
                options: ["Uruguay", "Greece", "Israel", "Finland"],
                correct: 1
            },
            {
                question: "pl",
                flagCode: "pl",
                options: ["Monaco", "Indonesia", "Poland", "Singapore"],
                correct: 2
            },
            {
                question: "at",
                flagCode: "at",
                options: ["Latvia", "Austria", "Poland", "Indonesia"],
                correct: 1
            },
            {
                question: "ie",
                flagCode: "ie",
                options: ["Italy", "Ireland", "Ivory Coast", "India"],
                correct: 1
            },
            {
                question: "cz",
                flagCode: "cz",
                options: ["Slovakia", "Slovenia", "Czech Republic", "Croatia"],
                correct: 2
            },
            {
                question: "ar",
                flagCode: "ar",
                options: ["Uruguay", "Argentina", "Honduras", "Guatemala"],
                correct: 1
            },
            {
                question: "cl",
                flagCode: "cl",
                options: ["Texas", "Chile", "Cuba", "Puerto Rico"],
                correct: 1
            },
            {
                question: "co",
                flagCode: "co",
                options: ["Venezuela", "Ecuador", "Colombia", "Bolivia"],
                correct: 2
            },
            {
                question: "pe",
                flagCode: "pe",
                options: ["Canada", "Austria", "Peru", "Lebanon"],
                correct: 2
            },
            {
                question: "za",
                flagCode: "za",
                options: ["South Africa", "Central African Republic", "Sudan", "Namibia"],
                correct: 0
            },
            {
                question: "eg",
                flagCode: "eg",
                options: ["Syria", "Yemen", "Egypt", "Iraq"],
                correct: 2
            },
            {
                question: "ma",
                flagCode: "ma",
                options: ["Turkey", "Tunisia", "Morocco", "Vietnam"],
                correct: 2
            },
            {
                question: "ng",
                flagCode: "ng",
                options: ["Nigeria", "Niger", "Cameroon", "Chad"],
                correct: 0
            },
            {
                question: "ke",
                flagCode: "ke",
                options: ["Uganda", "Kenya", "Tanzania", "Ethiopia"],
                correct: 1
            },
            {
                question: "nz",
                flagCode: "nz",
                options: ["Australia", "New Zealand", "Fiji", "United Kingdom"],
                correct: 1
            },
            {
                question: "th",
                flagCode: "th",
                options: ["Costa Rica", "Thailand", "Netherlands", "Paraguay"],
                correct: 1
            },
            {
                question: "sg",
                flagCode: "sg",
                options: ["Indonesia", "Poland", "Singapore", "Monaco"],
                correct: 2
            },
            {
                question: "my",
                flagCode: "my",
                options: ["Malaysia", "United States", "Liberia", "Uruguay"],
                correct: 0
            },
            {
                question: "ua",
                flagCode: "ua",
                options: ["Sweden", "Ukraine", "Kazakhstan", "Belarus"],
                correct: 1
            },
            {
                question: "tr",
                flagCode: "tr",
                options: ["Tunisia", "Turkey", "Morocco", "Algeria"],
                correct: 1
            },
            {
                question: "sa",
                flagCode: "sa",
                options: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait"],
                correct: 1
            },
            {
                question: "is",
                flagCode: "is",
                options: ["Ireland", "Iceland", "Estonia", "Latvia"],
                correct: 1
            },
            {
                question: "hr",
                flagCode: "hr",
                options: ["Serbia", "Slovenia", "Croatia", "Bosnia"],
                correct: 2
            },
            {
                question: "lv",
                flagCode: "lv",
                options: ["Lithuania", "Latvia", "Estonia", "Finland"],
                correct: 1
            },
            {
                question: "lt",
                flagCode: "lt",
                options: ["Latvia", "Lithuania", "Estonia", "Poland"],
                correct: 1
            },
            {
                question: "ee",
                flagCode: "ee",
                options: ["Latvia", "Lithuania", "Estonia", "Finland"],
                correct: 2
            },
            {
                question: "rs",
                flagCode: "rs",
                options: ["Russia", "Serbia", "Slovenia", "Slovakia"],
                correct: 1
            },
            {
                question: "bg",
                flagCode: "bg",
                options: ["Hungary", "Bulgaria", "Romania", "Moldova"],
                correct: 1
            },
            {
                question: "ro",
                flagCode: "ro",
                options: ["Moldova", "Romania", "Bulgaria", "Hungary"],
                correct: 1
            },
            {
                question: "hu",
                flagCode: "hu",
                options: ["Hungary", "Romania", "Bulgaria", "Italy"],
                correct: 0
            },
            {
                question: "sk",
                flagCode: "sk",
                options: ["Slovenia", "Slovakia", "Czech Republic", "Poland"],
                correct: 1
            },
            {
                question: "si",
                flagCode: "si",
                options: ["Slovakia", "Slovenia", "Serbia", "Switzerland"],
                correct: 1
            },
            {
                question: "lu",
                flagCode: "lu",
                options: ["Netherlands", "Belgium", "Luxembourg", "Germany"],
                correct: 2
            },
            {
                question: "mt",
                flagCode: "mt",
                options: ["Monaco", "Malta", "San Marino", "Vatican"],
                correct: 1
            },
            {
                question: "cy",
                flagCode: "cy",
                options: ["Greece", "Turkey", "Cyprus", "Malta"],
                correct: 2
            },
            {
                question: "md",
                flagCode: "md",
                options: ["Romania", "Moldova", "Ukraine", "Bulgaria"],
                correct: 1
            },
            {
                question: "by",
                flagCode: "by",
                options: ["Bulgaria", "Belarus", "Belgium", "Bosnia"],
                correct: 1
            },
            {
                question: "ge",
                flagCode: "ge",
                options: ["Armenia", "Azerbaijan", "Georgia", "Turkey"],
                correct: 2
            },
            {
                question: "am",
                flagCode: "am",
                options: ["Armenia", "Azerbaijan", "Georgia", "Iran"],
                correct: 0
            },
            {
                question: "az",
                flagCode: "az",
                options: ["Armenia", "Azerbaijan", "Turkmenistan", "Kazakhstan"],
                correct: 1
            }
        ],
        economy: [
            {
                question: "What does GDP stand for?",
                options: ["General Domestic Product", "Gross Domestic Product", "Grand Domestic Price", "Gross Domestic Price"],
                correct: 1
            },
            {
                question: "What is inflation?",
                options: ["Decrease in prices", "Increase in supply", "General increase in prices", "Increase in demand only"],
                correct: 2
            },
            {
                question: "Who wrote 'The Wealth of Nations'?",
                options: ["Karl Marx", "John Keynes", "Adam Smith", "Milton Friedman"],
                correct: 2
            },
            {
                question: "What is the study of economics on a large scale called?",
                options: ["Microeconomics", "Macroeconomics", "Econometrics", "Finance"],
                correct: 1
            },
            {
                question: "In economics, what does the term 'opportunity cost' mean?",
                options: ["The cost of an opportunity", "The next best alternative foregone", "The total cost of production", "The profit margin"],
                correct: 1
            },
            {
                question: "What is a bull market?",
                options: ["Falling prices", "Rising prices", "Stable prices", "Volatile prices"],
                correct: 1
            },
            {
                question: "Which organization sets monetary policy in the US?",
                options: ["Treasury", "Congress", "Federal Reserve", "World Bank"],
                correct: 2
            },
            {
                question: "What does IPO stand for?",
                options: ["International Purchase Order", "Initial Public Offering", "Internal Price Order", "Investment Portfolio Option"],
                correct: 1
            },
            {
                question: "What is the invisible hand theory associated with?",
                options: ["Communism", "Free market", "Socialism", "Mercantilism"],
                correct: 1
            },
            {
                question: "What is a recession typically defined as?",
                options: ["1 quarter negative growth", "2 quarters negative growth", "3 quarters negative growth", "4 quarters negative growth"],
                correct: 1
            },
            {
                question: "What company was originally called 'Backrub'?",
                options: ["Facebook", "Google", "Twitter", "Apple"],
                correct: 1
            },
            {
                question: "Which billionaire bought Twitter in 2022?",
                options: ["Jeff Bezos", "Elon Musk", "Mark Zuckerberg", "Bill Gates"],
                correct: 1
            },
            {
                question: "What does the 'i' in iPhone stand for?",
                options: ["Internet", "Individual", "Innovation", "It doesn't stand for anything specific"],
                correct: 3
            },
            {
                question: "Which company's slogan is 'Just Do It'?",
                options: ["Adidas", "Nike", "Puma", "Under Armour"],
                correct: 1
            },
            {
                question: "What was Netflix's original business model?",
                options: ["Streaming", "DVD by mail", "Movie theaters", "Video stores"],
                correct: 1
            },
            {
                question: "Which country has the most expensive Big Mac?",
                options: ["USA", "Switzerland", "Norway", "Denmark"],
                correct: 1
            },
            {
                question: "What's the most valuable company in the world (2024)?",
                options: ["Apple", "Microsoft", "Google", "Amazon"],
                correct: 0
            },
            {
                question: "How much did Instagram sell for to Facebook?",
                options: ["$1 billion", "$19 billion", "$50 billion", "$100 billion"],
                correct: 0
            },
            {
                question: "What's the most expensive spice in the world?",
                options: ["Vanilla", "Cardamom", "Saffron", "Black truffle"],
                correct: 2
            },
            {
                question: "Which company owns YouTube?",
                options: ["Facebook", "Google", "Microsoft", "Amazon"],
                correct: 1
            },
            {
                question: "What was Amazon originally going to be called?",
                options: ["Cadabra", "Relentless", "River", "Both A and B"],
                correct: 3
            },
            {
                question: "How much is a trillion dollars in $100 bills (weight)?",
                options: ["1 ton", "10 tons", "100 tons", "1000 tons"],
                correct: 1
            },
            {
                question: "Which fast food chain has the most locations worldwide?",
                options: ["McDonald's", "Subway", "KFC", "Pizza Hut"],
                correct: 1
            },
            {
                question: "What's the most traded currency after the US Dollar?",
                options: ["Euro", "Yen", "Pound", "Yuan"],
                correct: 0
            },
            {
                question: "How much did the domain 'Pizza.com' sell for?",
                options: ["$1 million", "$2.6 million", "$10 million", "$50 million"],
                correct: 1
            },
            {
                question: "Which company invented the first smartphone?",
                options: ["Apple", "IBM", "Nokia", "BlackBerry"],
                correct: 1
            },
            {
                question: "What's the most expensive pizza ever made?",
                options: ["$1,000", "$5,000", "$12,000", "$70,000"],
                correct: 2
            },
            {
                question: "How many hours does the average person work in their lifetime?",
                options: ["50,000", "90,000", "150,000", "200,000"],
                correct: 1
            },
            {
                question: "What company owns Snapchat?",
                options: ["Facebook", "Google", "Snap Inc.", "Twitter"],
                correct: 2
            },
            {
                question: "Which country invented paper money?",
                options: ["USA", "China", "Italy", "England"],
                correct: 1
            },
            {
                question: "How much did WhatsApp sell to Facebook for?",
                options: ["$5 billion", "$19 billion", "$50 billion", "$100 billion"],
                correct: 1
            },
            {
                question: "What's the most expensive NFT ever sold?",
                options: ["$10 million", "$30 million", "$69 million", "$200 million"],
                correct: 2
            },
            {
                question: "Which company makes the most money per second?",
                options: ["Apple", "Saudi Aramco", "Microsoft", "Amazon"],
                correct: 1
            },
            {
                question: "What's the world's most counterfeited brand?",
                options: ["Rolex", "Nike", "Louis Vuitton", "Gucci"],
                correct: 1
            },
            {
                question: "How much does it cost to make a penny?",
                options: ["0.5 cents", "1 cent", "2.4 cents", "5 cents"],
                correct: 2
            },
            {
                question: "Which company has the longest company name?",
                options: ["Google", "A 747-letter Welsh company", "Microsoft", "International Business Machines"],
                correct: 1
            },
            {
                question: "What percentage of all US currency is in $100 bills?",
                options: ["20%", "50%", "80%", "95%"],
                correct: 2
            },
            {
                question: "Which dating app makes the most money?",
                options: ["Tinder", "Bumble", "Hinge", "Match"],
                correct: 0
            },
            {
                question: "How many Google searches happen per day?",
                options: ["1 billion", "8.5 billion", "50 billion", "100 billion"],
                correct: 1
            },
            {
                question: "What's the most expensive coffee in the world?",
                options: ["Jamaican Blue Mountain", "Kopi Luwak", "Black Ivory", "Hawaiian Kona"],
                correct: 2
            },
            {
                question: "Which company spends the most on advertising?",
                options: ["Coca-Cola", "Amazon", "Apple", "Procter & Gamble"],
                correct: 1
            },
            {
                question: "How much money does the average person spend on coffee per year?",
                options: ["$500", "$1,100", "$2,000", "$5,000"],
                correct: 1
            },
            {
                question: "What's the most expensive hotel room in the world per night?",
                options: ["$50,000", "$100,000", "$500,000", "$1 million"],
                correct: 2
            },
            {
                question: "Which country has the most billionaires?",
                options: ["China", "USA", "Germany", "India"],
                correct: 1
            },
            {
                question: "How much did the most expensive car ever sell for?",
                options: ["$50 million", "$100 million", "$142 million", "$500 million"],
                correct: 2
            },
            {
                question: "What's the cheapest country to live in?",
                options: ["India", "Pakistan", "Afghanistan", "Nepal"],
                correct: 2
            },
            {
                question: "Which company was the first to reach $1 trillion valuation?",
                options: ["Microsoft", "Apple", "Amazon", "Google"],
                correct: 1
            },
            {
                question: "How much does the average wedding cost in the US?",
                options: ["$15,000", "$30,000", "$50,000", "$100,000"],
                correct: 1
            },
            {
                question: "What's the most expensive Pokémon card ever sold?",
                options: ["$1 million", "$5.25 million", "$10 million", "$50 million"],
                correct: 1
            },
            {
                question: "Which social media platform makes the most money per user?",
                options: ["Facebook", "TikTok", "Snapchat", "LinkedIn"],
                correct: 3
            },
            {
                question: "How much money is spent on Black Friday annually in the US?",
                options: ["$5 billion", "$20 billion", "$50 billion", "$100 billion"],
                correct: 1
            },
            {
                question: "What's the most valuable sports team in the world?",
                options: ["Dallas Cowboys", "Real Madrid", "New York Yankees", "Golden State Warriors"],
                correct: 0
            },
            {
                question: "Which cryptocurrency was created as a joke?",
                options: ["Bitcoin", "Ethereum", "Dogecoin", "Litecoin"],
                correct: 2
            },
            {
                question: "How much does the average person spend on their phone per year?",
                options: ["$500", "$1,000", "$2,000", "$5,000"],
                correct: 1
            },
            {
                question: "What's the most expensive painting ever sold?",
                options: ["$300 million", "$450 million", "$600 million", "$1 billion"],
                correct: 1
            },
            {
                question: "Which company has the most employees worldwide?",
                options: ["Walmart", "Amazon", "McDonald's", "US Department of Defense"],
                correct: 0
            },
            {
                question: "How much does it cost to raise a child to 18 in the US?",
                options: ["$100,000", "$233,610", "$500,000", "$1 million"],
                correct: 1
            },
            {
                question: "What's the most expensive thing ever stolen?",
                options: ["Mona Lisa", "Crown jewels", "The Mona Lisa", "Entire countries' GDP"],
                correct: 3
            },
            {
                question: "Which app has been downloaded the most times?",
                options: ["WhatsApp", "Facebook", "Instagram", "TikTok"],
                correct: 0
            },
            {
                question: "How much does the average American spend on food per year?",
                options: ["$3,500", "$7,700", "$15,000", "$25,000"],
                correct: 1
            }
        ]
    }
};