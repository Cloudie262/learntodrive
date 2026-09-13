/* Shared UI strings; question/article dictionaries remain in their original files. */
(() => {
 const my = {
 'Driving License Quiz Portal':'ယာဉ်မောင်းလိုင်စင် လေ့ကျင့်ခန်း ပေါ်တယ်',
 'License Practice Portal':'လိုင်စင် လေ့ကျင့်ခန်း ပေါ်တယ်',
 'Pass all modules to unlock the Official Test Simulation':'အစမ်းစာမေးပွဲ ဖြေဆိုရန် သင်ခန်းစာအုပ်စုအားလုံးကို အောင်မြင်ပါ',
 'PORTAL PROGRESS':'လေ့ကျင့်ခန်း တိုးတက်မှု', 'completed':'ပြီးစီးသည်', 'OVERALL AVERAGE':'စုစုပေါင်း ပျမ်းမျှ', 'best score':'အကောင်းဆုံးရမှတ်',
 'DYNAMIC SIMULATION (INTERACTIVE STATE)':'အခြေအနေ ပြောင်းလဲမှု စမ်းသပ်ခြင်း',
 'Module 3 Passed':'သင်ခန်းစာအုပ်စု ၃ အောင်မြင်သည်','Module 4 Passed':'သင်ခန်းစာအုပ်စု ၄ အောင်မြင်သည်',
 'All':'အားလုံး','Completed':'ပြီးစီးပြီ','In Progress':'လေ့ကျင့်နေဆဲ','4 Modules':'သင်ခန်းစာအုပ်စု ၄ ခု',
 'Road Signs & Signals':'လမ်းအမှတ်အသားများနှင့် အချက်ပြများ',
 'Official regulatory, warnings, signals, and markers.':'စည်းကမ်း၊ သတိပေး၊ အချက်ပြနှင့် လမ်းအမှတ်အသားများ။',
 '20 Questions':'မေးခွန်း ၂၀','25 Questions':'မေးခွန်း ၂၅','15 Questions':'မေးခွန်း ၁၅','• Min 80%':'• အနည်းဆုံး ၈၀%',
 'Rules & Right-of-Way':'စည်းကမ်းနှင့် ဦးစားပေးဖြတ်သန်းခွင့်',
 'Intersections, roundabouts, priority procedures.':'လမ်းဆုံ၊ အဝိုင်းပတ်နှင့် ဦးစားပေးစည်းကမ်းများ။',
 'Speed Limits & Lane Controls':'အမြန်နှုန်းကန့်သတ်ချက်နှင့် ယာဉ်ကြောစည်းကမ်းများ',
 'Freeway conditions, speed tiers, lane discipline.':'အမြန်လမ်းအခြေအနေ၊ အမြန်နှုန်းနှင့် ယာဉ်ကြောစည်းကမ်း။',
 'Alcohol, Laws & Violations':'အရက်၊ ဥပဒေနှင့် စည်းကမ်းချိုးဖောက်မှုများ',
 'Legal limits, penalties, liability issues.':'ဥပဒေအရ ကန့်သတ်ချက်၊ ပြစ်ဒဏ်နှင့် တာဝန်ရှိမှုများ။',
 'Locked':'ပိတ်ထားသည်','LOCKED':'ပိတ်ထားသည်',
 'Official Mock Exam':'စုစုပေါင်း အစမ်းစာမေးပွဲ',
 '⏱ 50 questions • 45 mins • Full simulator':'⏱ မေးခွန်း ၅၀ • ၄၅ မိနစ် • အစမ်းစာမေးပွဲ',
 '• Locked until all practice modules are completed.':'• သင်ခန်းစာအုပ်စုအားလုံး ပြီးစီးမှ ဖြေဆိုနိုင်မည်။',
 'Locked until all practice modules are completed.':'သင်ခန်းစာအုပ်စုအားလုံး ပြီးစီးမှ ဖြေဆိုနိုင်မည်။',
 'All requirements met. Ready for test simulation.':'လိုအပ်ချက်အားလုံး ပြည့်စုံပြီ။ အစမ်းစာမေးပွဲ ဖြေဆိုနိုင်ပါပြီ။',
 'Take Mock Exam':'အစမ်းစာမေးပွဲ ဖြေမည်',
 'Please enter a valid email address.':'မှန်ကန်သော အီးမေးလ်လိပ်စာကို ထည့်ပါ။',
 'Please enter a valid phone number.':'မှန်ကန်သော ဖုန်းနံပါတ်ကို ထည့်ပါ။',
 'That username already exists.':'ထိုအသုံးပြုသူအမည် ရှိပြီးဖြစ်ပါသည်။',
 'Account created successfully. You can now log in.':'အကောင့်ဖွင့်ပြီးပါပြီ။ ယခု ဝင်ရောက်နိုင်ပါပြီ။',
 'Username must be 5-20 characters and contain only letters, numbers, underscore, or spaces.':'အသုံးပြုသူအမည်တွင် အက္ခရာ၊ ဂဏန်း၊ အောက်မျဉ်း သို့မဟုတ် နေရာလွတ် ၅ မှ ၂၀ လုံးသာ ပါဝင်ရမည်။',
 'Password must contain at least 6 characters, including uppercase, lowercase, a number, and a special character.':'စကားဝှက်တွင် အင်္ဂလိပ်စာလုံးကြီး၊ စာလုံးသေး၊ ဂဏန်းနှင့် အထူးအက္ခရာ ပါဝင်ပြီး အနည်းဆုံး ၆ လုံး ရှိရမည်။'
 };
 L2DI18n.addMessages('my',my);
 L2DI18n.addMessages('en',Object.fromEntries(Object.keys(my).map(key=>[key,key])));
})();
