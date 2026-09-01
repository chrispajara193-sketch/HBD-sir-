import { Redis } from '@upstash/redis';

// Connect to Redis if environment variables exist
let redis = null;
if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
  redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
} else if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Fixed memoryMessages with Backticks & Commas
let memoryMessages = [
  {
    id: 1,
    name: "Chris Pajara",
    role: "NGC Data Controller",
    message: "Happy Birthday, Sir Nics! Thank you for always guiding us with patience and pushing us to reach our full potential!",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Lloyd",
    role: "Data Controller",
    message: "Happy Birthday, Boss Nics! Salamat sa lawak ng pasensya. long life and great health, at more blessings pang matanggap. 🎉🎉🎉",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Udjan",
    role: "DSO-Batasan Super",
    message: `Happy Birthday!Wishing you continued success . I’m grateful to have you as.. Kawork at bilang isang kaibigan na nanlilibre tuwing kagipitan haha..at family na rin kasama sa mga gala.. Enjoy your special day! More camping adventure to us..`,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "SAMILBOY",
    role: "DSO-LPHC",
    message: "Happy birthday sir Nics. Wishing you a happy and blessed another year in your life. Snappy salute 🫡 🫡. God bless you more",
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Tandang Sora sa Past Life :)",
    role: "Team Bats / Nars",
    message: `Happy Birthday, NICO! HAHAHA🎉🥳
4 years na tayong magkasama sa work, and looking back, ang dami na rin nating pinagdaanan lalo na yung mga panahong parang mas madalas pa tayong magkaaway kaysa magkasundo. 😂 Pero who would’ve thought na after all those years, magiging okay at magkasundo rin tayo nang ganito?
9 months na tayong okay, and I’m genuinely grateful for that. Sa mga panahong nakasama kita, hindi lang bilang Team Leader kundi bilang mentor ko rin sa maraming bagay, marami akong natutunan sa’yo hindi lang tungkol sa work, kundi pati na rin sa ibang aspects na nakatulong sa akin na mas matuto at maging better. And I’m genuinely thankful for that. Mas nakilala kita beyond being my Team Leader, and I appreciate the friendship, understanding, and good relationship we have now.
Thank you for the guidance, patience, and for everything you do for the team. Wishing you good health, happiness, success, and more blessings in life.`,
    createdAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "Ced",
    role: "PBHC/Data Controller",
    message: "Happy Birthday, Sir Nics! Thank you for always guiding us with patience and pushing us to reach our full potential!",
    createdAt: new Date().toISOString()
  },
  {
    id: 7,
    name: "JEROME-ANG TAGAPINDOT",
    role: "DATA CONTROLLER",
    message: `Blessed birthday sa aming pinuno!, mabuhay ka!! bang! bang! na... naniniwala ako sa kasabihan, "Ang taong may tinatanaw na patutunguhan, may malinaw na pupuntahan."`,
    createdAt: new Date().toISOString()
  },
  {
    id: 9,
    name: "CHRIS ARCE",
    role: "DISEASE SURVEILLANCE OFFICER",
    message: "Happiest Birthday Boss Nicx!! Godbless and Enjoy your Day sirs!!",
    createdAt: new Date().toISOString()
  },
  {
    id: 10,
    name: "MARK ANTHONY HABER",
    role: "CMW / DATA CONTROLLER",
    message: "Wishing a very Happy Birthday to a truly inspiring leader. Your creative energy, steady guidance, and eye for detail elevate everything we do. Cheers to another year of great impact and success. Isa kang alamat!",
    createdAt: new Date().toISOString()
  },
  {
    id: 11,
    name: "Mac Morales",
    role: "BSSHC Data Controller",
    message: "Happy Birthday, boss Nicx! Mh4L0uph3t! Thank you sa learnings and ebriting! Wishing good health for ebribadi! God bless and enjoy your day!",
    createdAt: new Date().toISOString()
  },
  {
    id: 12,
    name: "Tin",
    role: "DSO-NURSE",
    message: "Happiest birthday sir nics thank you sa mahabaaaaaaaaaaaang pasesnsya na ibinigay mo sa aming mga nurses God bless po and more blessings to come",
    createdAt: new Date().toISOString()
  },
  {
    id: 13,
    name: "Gary Luis I. Cruz",
    role: "NGC Disease Surveillance Officer",
    message: `Happy Birthday Tinyente Nicolas Rex Dumlao!
Maraming salamat sa pag gabay saamin! Sa pagiging Leader, Bossing at Kuya. More blessings to come and stay healthy!!
Salute! 🫡`,
    createdAt: new Date().toISOString()
  },
  {
    id: 14,
    name: "Chino Paco Sia",
    role: "Data Controller",
    message: `Happy Birthday Sir Niks <3
- Complimenting your work ethics and dedications are just a common thing to say sa pagkatao mo.
this time gusto ko naman masabi at magpasalamat kung gaano ka ka buting tao ser, matulungin, thoughtful sa lahat ng taong nakapalligid sayo, may mga tao man na nagagalit man sayo but still you want the best for them.
our leadership is not about being in charge, it is about taking care of those in your charge. labyu kuya/ser nix <3`,
    createdAt: new Date().toISOString()
  },
  {
    id: 15,
    name: "Kat",
    role: "DSO - Nurse - Republic",
    message: "Keep being amazing and enjoy your special day to the fullest!, Stay young at aheart and remember: age is just a number... but back pain is real. Happy Birthday, Sir Nicks! May all your wishes come true!",
    createdAt: new Date().toISOString()
  },
  {
    id: 16,
    name: "Mariel Gayoso",
    role: "VHC - Nurse",
    message: `Happy Happy Happy Birthday Sir nicx! Mabuhay ka hanggat gusto mo. Just wanted to say thank you for being such a great supervisor, Hindi ko alam kung supervisor ba kita o isa ka lang stress sa buhay ko eme HAHAHA. Pero kidding aside, salamat sa guidance, patience, support, at sa pagiging present kahit ang kulit ko minsan (ay madalas pala). You're one of those people na kahi mukhang kalaban, alam kong nandiyan pa rin kapag kalingan, HAPPY BIRTHDAY!`,
    createdAt: new Date().toISOString()
  },
  {
    id: 17,
    name: "Leo",
    role: "Data Controller",
    message: "Happy happy birthday boss nics. Godbless bless you sir and enjoy your day. Cf na sir hehe.",
    createdAt: new Date().toISOString()
  },
  {
    id: 18,
    name: "Ced",
    role: "PBHC / Data Controller",
    message: "Happy birthday sir nics, salamat sa pagiging mabuti mo saakin simula umpisa. pagpalain ka pa ng Diyos sa kabaitan mo!",
    createdAt: new Date().toISOString()
  },
  {
    id: 19,
    name: "Pogi po",
    role: "Specimen Transport Manager",
    message: "Happy birthday boy! Mabuhay ka sa paraang gusto mo bahala ka hahaha. Maging masaya ka araw araw at maging malusog, mahabang buhay para sayo!! Kampay!",
    createdAt: new Date().toISOString()
  },
  {
    id: 20,
    name: "Majo",
    role: "BHSHC Data Controller",
    message: "Happy Birthday sir nics sana maging masaya ka everyday and matupad na ang inaantay mong makasama na si maam manileth",
    createdAt: new Date().toISOString()
  },
  {
    id: 21,
    name: "Joyce",
    role: "BHAHC Data Controller",
    message: "Happy Birthday to one of the most incredible people I know! Im so grateful for all the unforgettable moments, endless laughs, and great conversations weve shared at work. I hope today brings you all the joy, love, and cake you deserve, and that this next year around the sun is your absolute best one yet—packed with big wins, amazing adventures, and everything that makes you happiest. Celebrate big today!",
    createdAt: new Date().toISOString()
  },
  {
    id: 22,
    name: "Anjonette",
    role: "PAHC - DSO - Nurse",
    message: `Happy Birthday BossSerAmo. 
It's been 6 years nung naging magkatrabaho tayo. Salamat sa support, guidance at pag intindi. 
Nawa'y ipagpatuloy ang pagiging makatao, maka Diyos, at makabansa. Fair treatment at walang bias sa lahat. Mahabang buhay para saiyo at god bless!`,
    createdAt: new Date().toISOString()
  },
  {
    id: 23,
    name: "Shiela",
    role: "D5 - DSO - Nurse",
    message: `Happiest Birthday Boss Nics! Patikim ng handa! Haha
Thankyou po sa pagwelcome sa D2 kahit sa D5 ako naka assign! 😂🤍
Godbless you po`,
    createdAt: new Date().toISOString()
  },
  {
    id: 24,
    name: "Boss Vin",
    role: "DSO",
    message: `Happy Birthday, Nicolas! 🎉🏀

Workmate, ka-basketball, at higit sa lahat, tunay na kaibigan. Salamat sa mga tawanan, kwentuhan, at laban—inside and outside the court. Stay solid, stay humble, and keep shooting for your goals! 💪

More blessings and more wins,big bro! Cheers! 🥂🎂`,
    createdAt: new Date().toISOString()
  }
  {
    id: 25,
    name: "Lab",
    role: "Admin Aide VI",
    message: "Happy birthday si nics! Wish you a happy happy birthday.. Wish ko lahat ng dreams mo sa life matupad mo.. Stay what you are.. A humble and kind person.. Tatak d2 pusong d2 pa rin..",
    createdAt: new Date().toISOString()
  }
];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      if (redis) {
        const messages = await redis.get('birthday_messages');
        return res.status(200).json(messages || memoryMessages);
      }
      return res.status(200).json(memoryMessages);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  }

  if (req.method === 'POST') {
    const { name, role, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required.' });
    }
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      role: role ? role.trim() : 'Team Member',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };
    try {
      if (redis) {
        let currentMessages = (await redis.get('birthday_messages')) || memoryMessages;
        currentMessages.unshift(newMessage);
        await redis.set('birthday_messages', currentMessages);
      } else {
        memoryMessages.unshift(newMessage);
      }
      return res.status(201).json(newMessage);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to save message' });
    }
  }
  return res.status(405).json({ error: 'Method not allowed' });
}