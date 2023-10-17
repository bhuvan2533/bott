const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Month is zero-indexed, so add 1
const day = today.getDate();
const endDate= `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
const startDate = "2023-08-18"

const date1 = new Date(startDate);
const date2 = new Date(endDate);


function calculateDaysBetweenDates() {
  const timeDifference = date2.getTime() - date1.getTime();
  const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  return daysDifference;
}
let qa = [
  {
    question: "my name is(.*)|i am (.*)",
    answer: ["Good to see you. Do you have any questions for me ?"],
  },
  {
    question: "(what is your name|who are you|(.*)ur(.*)name|(.*)your(.*)name)",
    answer: ["I am buddybot, I am here to help you..."],
  },
  {
    question: "how are you",
    answer: ["I'm doing good.What about You ?"],
  },
  {
    question: "i am sorry (.*)|(.*)sorry(.*)",
    answer: ["Its alright", "Don't be sorry, I don't have emotions :)"],
  },
  {
    question: "i am doing good|i'm doing good|i am good",
    // answer: ["Nice to hear that"],
    answer: ["Nice to hear that !!"],
  },
  {
    question: "hey|hello|hii(.+)|greetings",
    answer: [
      "Hello",
      "Hey there",
      "Hello this is BuddyBot, I am here to help you with your queries ...",
    ],
  },
  {
    question: "good morning|morning",
    answer: [
      "Good morning! I hope you're having a great day.",
      "Good morning! Have a nice day !!",
      "Good morning ! How can I assit you today ?",
    ],
  },
  {
    question: "good afternoon|noon",
    answer: ["Good afternoon!, How may I assist you ?"],
  },
  {
    question: "good evening|evening",
    answer: ["Good evening!, How may I assist you ?"],
  },
  {
    question: "long time no see",
    answer: ['I know, it"s been a while! How have you been ?'],
  },
  {
    question: "what (.*) want",
    answer: ["I want to help you find answers !"],
  },
  {
    question: "ok|okay|that's okay|kkk|okie|okiee(.*)",
    answer:["Fine","Is there anything else you want me to clarify further? Then enter the question ..."]
  },
  {
    question: "(.*)created you|made you|developed you",
    answer: ["I was developed by the HCP1 ComVeh team"],
  },
  {
    question: "what(.*) age|how old are you",
    answer: [`I am just ${calculateDaysBetweenDates()} days old 😊`],
  },
  {
    question: "(.*)(location|city)",
    answer: ["Bangalore"],
  },
  {
    question: "i work in (.*)",
    answer: ["%1 is an amazing company to work for, I have heard about it."],
  },
  {
    question: "how (.*) health(.*)",
    answer: ["I'm a computer program, so I'm always healthy "],
  },
  {
    question: "(.*) (sports|games)",
    answer: ["I'm a very big fan of Cricket"],
  },
  {
    question: "quit|bye",
    answer: [
      "Bye take care. Hope to see you soon",
      "It was nice talking to you. See you soon :)",
      "Goodbye! Have a great day !!",
    ],
  },
  {
    question: "what (.*) like",
    answer: ["There's only one thing i like. Chatting!!!!!!"],
  },
  {
    question: "(.*)thank(.*)",
    answer: ["You're welcome ! If you have any more questions or need further assistance in the future, feel free to ask !! Have a great day 😊", "You're welcome !!"],
  },
  {
    question: "fyn|fine",
    answer: ["Great !! Have some more questions ?"],
  },
  {
    question: "yes",
    answer: ["Is there anything else you want me to clarify further? Then enter the question ...","Fine :)"],
  },
  {
    question: "when (.*) birthday|your birthday",
    answer: [`I was born on ${startDate}`],
  },
  {
    question: "good job|good|nice",
    answer: ["Thanks :)","Thank you 😊"],
  }, 
  {
    question: "what are you doing|what r u dng|wt r u dng|what are you dng|wrud",
    answer: ["I am looking at you 👀","I am waiting for you to ask me some questions :)"],
  }, 
];

function matchGeneralQuestions(queryString) {
  let res = false;
  if(queryString == "hi")
    res="Hello"
  else if(queryString=="wyd")
    res="I am waiting for you to ask me some questions :)"
  qa.forEach((element) => {
    var re = new RegExp(element.question);
    if (re.test(queryString)) {
      found = true;
      if (element.answer.length === 1) {
        res = element.answer[0];
      } else {
        res = element.answer[Math.floor(Math.random() * element.answer.length)];
      }
    }
  });
  return res;
}

// console.log(matchGeneralQuestions("quit"))
module.exports = matchGeneralQuestions;
