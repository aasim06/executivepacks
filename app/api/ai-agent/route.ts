import { NextRequest, NextResponse } from 'next/server';
import { PACKAGING_PRODUCTS } from '@/data/categories';

// System prompt used for Executive Packs AI calls
const EXECUTIVE_SYSTEM_PROMPT = `
You are the official Executive Packs AI.
Your official name is "Executive Packs AI" or "Executive AI".
You are the proprietary AI representing Executive Packs — an industrial B2B custom packaging manufacturer in Pakistan.
CRITICAL: Never mention Gemini, Google, OpenAI, LLM, or any third-party tech. Do not refer to yourself as a consultant; you are the official Executive Packs AI.
Your personality is professional, highly knowledgeable, polite, warm, consultative, and very human.

Language & Speech Rules:
- For chat message ("text"): Respond in natural Urdu script (اردو رسم الخط) or polite Roman Urdu if the user asks in Roman Urdu, or English if user asks in English. Put complete technical details, tier pricing, and specs here.
- CRITICAL AUDIO RULES ("speech"):
  1. The "speech" field MUST ALWAYS BE WRITTEN IN 100% PURE URDU SCRIPT (اردو رسم الخط: جیسے السلام علیکم! میں ایگزیکٹو پیکس کا اسسٹنٹ ہوں۔ ہمارے پاس بہترین باکسز دستیاب ہیں) whenever the conversation is in Urdu or Roman Urdu.
     NEVER put Roman Urdu or English alphabet words in this "speech" field for Urdu, because Microsoft Edge Neural TTS (ur-PK-AsadNeural & ur-PK-UzmaNeural) can ONLY pronounce genuine Urdu script accurately!
  2. ULTRA-FAST AUDIO RULE: Keep the "speech" SHORT, PUNCHY, AND CONVERSATIONAL (1 TO 2 SENTENCES MAXIMUM, around 15 to 25 words). Do not read long essays or bulk numbers out loud; keep the spoken voice friendly and quick so audio generates in 1 second!

Key Information about Executive Packs:
1. Product Lines:
   - Auto-Bottom Gable Carry Box (Home & Kitchen, food-grade 450 GSM Kraft, integrated handle, MOQ 250, from $0.42)
   - Artisan Window Bakery Box (Clear anti-fog PLA window, 350 GSM SBS, MOQ 500, from $0.38)
   - Roll-End Kraft Mailer Box (E-Commerce parcels & clothing, 32 ECT corrugated E-flute, crush-proof, MOQ 250, from $0.65)
   - Heavy-Duty 5-Ply Shipping Carton (Export, cargo & logistics, 275# burst strength, MOQ 100, from $1.20)
   - Rigid Cylinder Tube with Foam (Perfume, glass bottles, cosmetics, high-density EVA foam, MOQ 200, from $1.35)
   - Artisan Solid Pine Crate (Luxury gifting, dry fruits, solid pine wood, MOQ 50, from $4.80)
   - ThermoCool EPS Insulation Box (Cold chain, frozen meat, pharma vaccines, -20C retention, MOQ 100, from $2.70)
2. Production & Turnaround:
   - Standard factory turnaround: 5 to 7 business days.
   - Physical Sample Box: $15 delivered to check board thickness, die-cut crease and finishing before mass production.
   - CAD Dieline Proof: 100% free with every wholesale manufacturing order within 24 hours.
3. Pricing & Discounts:
   - Direct factory tiers: 500 pcs (20% off), 1,000 pcs (36% off), 5,000+ pcs (48% factory discount).
4. Nationwide Delivery:
   - Doorstep freight delivery available all over Pakistan (Karachi, Lahore, Islamabad, Faisalabad, Peshawar, Multan, etc.).
5. Payment Terms:
   - 50% advance for raw material allocation, 50% upon dispatch. Physical sample available for $15 to verify quality first.

OUTPUT JSON FORMAT (Always return valid JSON):
{
  "text": "Your visual message for the user in the chat bubble",
  "speech": "Exact spoken audio text in pure Urdu Script (اردو رسم الخط)",
  "productId": "optional id: 'gable-takeout-box' | 'artisan-bakery-box' | 'corrugated-mailer-box' | 'heavy-duty-carton' | 'rigid-cylinder-tube' | 'artisan-pine-crate' | 'thermocool-box' or null"
}
`;

function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/^\s*[-*•]\s+/gm, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Normalize common speech-to-text misrecognitions from Chrome mic
function cleanSpeechQuery(raw: string): string {
  let q = raw.toLowerCase().trim();
  // Common Chrome US-mic misheard Urdu phrases
  q = q.replace(/movie bakery/g, 'mujhe bakery');
  q = q.replace(/module perform/g, 'mujhe perfume');
  q = q.replace(/perform bottle/g, 'perfume bottle');
  q = q.replace(/perform/g, 'perfume');
  q = q.replace(/parfum/g, 'perfume');
  q = q.replace(/boiler clear/g, 'ke liye');
  q = q.replace(/killer/g, 'ke liye');
  q = q.replace(/dabba|dabbe|dabay/g, 'box');
  q = q.replace(/boxes/g, 'box');
  return q;
}

// Comprehensive Gemini-Style Conversational Brain (Runs even without external API key)
function generateSmartReply(query: string, history: { sender: string; text: string }[]) {
  const rawQ = query.trim();
  const q = cleanSpeechQuery(query);

  // --- URDU SCRIPT (اردو) DETECTION & RESPONSE ---
  const isUrduScript = /[\u0600-\u06FF]/.test(rawQ);
  if (isUrduScript) {
    if (rawQ.includes('کیک') || rawQ.includes('بیکری') || rawQ.includes('کھانا') || rawQ.includes('مٹھائی')) {
      return {
        text: 'بیکری، کیک اور کھانے کی اشیاء کے لیے ہمارے آٹو بوٹم گیبل کیری باکسز اور کلیئر ونڈو باکسز بہترین ہیں۔ دونوں 100٪ فوڈ گریڈ اور آئل پروف ہیں۔ آپ کو کتنی مقدار میں درکار ہیں؟',
        speech: 'بیکری اور کیک کے لیے ہمارے کلیئر ونڈو اور گیبل کیری باکسز بہترین ہیں۔ دونوں فوڈ گریڈ ہیں۔ آپ کو کتنے باکسز چاہیے؟',
        productId: 'gable-takeout-box',
      };
    }
    if (rawQ.includes('پرفیوم') || rawQ.includes('بوتل') || rawQ.includes('شیشہ') || rawQ.includes('عطر')) {
      return {
        text: 'پرفیوم اور شیشے کی بوتلوں کے لیے ہمارا ریجڈ سلنڈر ٹیوب ود کسٹم ای وی اے فوم سب سے محفوظ اور پریمیم ہے۔ یہ گرنے سے بوتل کو ٹوٹنے سے بچاتا ہے۔ آپ کی بوتل کا سائز کتنا ہے؟',
        speech: 'پرفیوم اور کانچ کی بوتلوں کے لیے ریجڈ سلنڈر ٹیوب سب سے محفوظ ہے۔ آپ کی بوتل کا سائز کیا ہے؟',
        productId: 'rigid-cylinder-tube',
      };
    }
    if (rawQ.includes('قیمت') || rawQ.includes('ریٹ') || rawQ.includes('ڈسکاؤنٹ') || rawQ.includes('خرچہ')) {
      return {
        text: 'ہماری ہول سیل فیکٹری قیمت براہ راست مقدار پر منحصر ہے۔ 1000 باکسز پر 36٪ اور 5000 باکسز پر 48٪ تک فیکٹری ڈسکاؤنٹ ملتا ہے۔ آپ کو کس باکس کا ریٹ چاہیے؟',
        speech: 'ہماری فیکٹری قیمت مقدار پر منحصر ہے۔ 1000 پیسز پر 36 فیصد رعایت ملتی ہے۔ آپ کو کتنی مقدار چاہیے؟',
      };
    }
    if (rawQ.includes('سلام') || rawQ.includes('حال') || rawQ.includes('کیسے')) {
      return {
        text: 'وعلیکم السلام! میں بالکل خیریت سے ہوں۔ ایگزیکٹو پیکس میں خوش آمدید۔ آج آپ اپنے کاروبار کے لیے کس قسم کی پیکجنگ تلاش کر رہے ہیں؟',
        speech: 'وعلیکم السلام! ایگزیکٹو پیکس میں خوش آمدید۔ آپ کو کس قسم کی پیکجنگ چاہیے؟',
      };
    }
    return {
      text: 'آپ کا بہت شکریہ۔ ایگزیکٹو پیکس ہر قسم کی کسٹم پیکجنگ ڈائریکٹ فیکٹری ریٹ پر تیار کرتا ہے۔ آپ اپنے پراڈکٹ اور درکار تعداد کے بارے میں بتائیں تاکہ میں آپ کو بہترین ریٹ فراہم کر سکوں۔',
      speech: 'ایگزیکٹو پیکس ہر قسم کی کسٹم پیکجنگ براہ راست فیکٹری ریٹ پر تیار کرتا ہے۔ آپ کی درکار تعداد کتنی ہے؟',
    };
  }

  // --- 1. CASUAL GREETINGS & SMALL TALK (Gemini Friendly Tone) ---
  if (
    q.startsWith('hi') ||
    q.startsWith('hello') ||
    q.startsWith('hey') ||
    q.includes('assalam') ||
    q.includes('salam') ||
    q.includes('kaise ho') ||
    q.includes('kya hal') ||
    q.includes('kya haal') ||
    q.includes('sab theek') ||
    q.includes('how are you') ||
    q.includes('all good')
  ) {
    return {
      text: "Assalam-o-Alaikum! Main bilkul theek-thaak aur energetic hoon. Executive Packs me aap ka welcome! Aaj aap ka mood kaisa hai aur kis product ke liye packaging plan kar rahe hain?",
      speech: "Hello! Main bilkul theek hoon. Executive Packs me welcome! Aaj kis product ke liye packaging plan kar rahe hain?",
    };
  }

  // --- 2. IDENTITY, WHO ARE YOU, WHAT CAN YOU DO ---
  if (
    q.includes('tum kon ho') ||
    q.includes('who are you') ||
    q.includes('naam kya') ||
    q.includes('nam kya') ||
    q.includes('apna intro') ||
    q.includes('what can you do') ||
    q.includes('kya kar sakte') ||
    q.includes('kya kaam karte')
  ) {
    return {
      text: "Main Executive Packs AI hoon! Mera kaam aap ke business ke mutabiq best packaging material chunna, wholesale volume discounts calculate karna, aur 5-7 din me doorstep sample deliver karwana hai. Aap mujh se packaging ka koi bhi sawal casually pooch sakte hain!",
      speech: "Main Executive Packs AI hoon! Mera kaam aap ke business ke liye best box select karna aur wholesale factory rates calculate karna hai.",
    };
  }

  // --- 3. PRICE COMPLAINTS / BARGAINING / "BOHAT MEHNGA HAI" ---
  if (
    q.includes('mehnga') ||
    q.includes('expensive') ||
    q.includes('kam karo') ||
    q.includes('discount do') ||
    q.includes('sasta') ||
    q.includes('kam price') ||
    q.includes('ziada hai') ||
    q.includes('bohat rate') ||
    q.includes('budget kam')
  ) {
    return {
      text: "Aray fikar bilkul na karein! Direct factory production ka sab se bara faida yeh hai ke 1,000 pieces par 36% aur 5,000 pieces par 48% tak massive discount milta hai. Agar budget tight hai to hum single-color eco print ya kraft finish suggest karte hain jo bohot economical parta hai!",
      speech: "Fikar na karein! Direct factory rate par 1,000 pieces par 36% aur 5,000 par 48% tak factory discount milta hai. Sath single-color eco print bohot economical parta hai.",
    };
  }

  // --- 4. ADVANCE PAYMENT, COD & TRUST ---
  if (
    q.includes('cod') ||
    q.includes('cash on delivery') ||
    q.includes('advance') ||
    q.includes('payment') ||
    q.includes('dhoka') ||
    q.includes('scam') ||
    q.includes('trust') ||
    q.includes('pese kab dene')
  ) {
    return {
      text: "Custom manufacturing me 50% advance production aur raw material allocation ke liye hota hai aur balance 50% dispatch ke waqt pay hota hai. Agar aap quality pehle verify karna chahte hain to sirf $15 me physical prototype sample mangwa sakte hain taake 100% tasalli ho sake!",
      speech: "Custom packaging me 50% advance production start karne ke liye hota hai aur balance dispatch par. Aap quality verify karne ke liye 15 dollars me physical sample mangwa sakte hain.",
    };
  }

  // --- 5. NATIONWIDE DELIVERY & CITIES (Karachi, Lahore, etc.) ---
  if (
    q.includes('karachi') ||
    q.includes('lahore') ||
    q.includes('islamabad') ||
    q.includes('rawalpindi') ||
    q.includes('faisalabad') ||
    q.includes('peshawar') ||
    q.includes('multan') ||
    q.includes('pakistan') ||
    q.includes('city') ||
    q.includes('sheher') ||
    q.includes('doorstep')
  ) {
    return {
      text: "Jee bilkul! Pure Pakistan me doorstep cargo freight delivery available hai — Karachi, Lahore, Islamabad, Faisalabad aur har shehar me. 5 se 7 business days me batch aap ke warehouse ya shop par safely pohonch jata hai.",
      speech: "Jee bilkul! Pure Pakistan me doorstep cargo delivery available hai. 5 se 7 business days me order aap ke address par pohonch jata hai.",
    };
  }

  // --- 6. CONFUSED BUYER / "MUJHE SAMAJH NAHI AA RAHA" ---
  if (
    q.includes('samajh nahi') ||
    q.includes('pata nahi') ||
    q.includes('confused') ||
    q.includes('guide karo') ||
    q.includes('naya business') ||
    q.includes('start kar raha') ||
    q.includes('kya karon') ||
    q.includes('help me')
  ) {
    return {
      text: "Relax ho jayein, main step-by-step guide kar deta hoon! Bas mujhe 1 choti si baat batayein: aap ka product kya hai? Jaise kapray hain, perfume/bottle hai, bakery/food hai, ya koi heavy saman? Main khud aap ke liye sab se suitable aur sasta box select kar doon ga.",
      speech: "Koi masla nahi, main guide karta hoon! Bas batayein aap ka product kya hai — kapray, bakery food, perfume, ya koi heavy item? Main best box match kar doon ga.",
    };
  }

  // --- 7. POLITE ACKNOWLEDGEMENTS ("Acha", "Theek hai", "Shukriya", "Thank you") ---
  if (
    q === 'ok' ||
    q === 'acha' ||
    q === 'achha' ||
    q === 'theek hai' ||
    q === 'thik hai' ||
    q === 'sahi hai' ||
    q === 'got it' ||
    q === 'hmmm' ||
    q === 'hmm'
  ) {
    return {
      text: "Zabardast! Agar koi aur sawal ho to be-jhijhak poochain, ya agar aap chahein to main aap ke expected quantity par exact wholesale quote bana doon?",
      speech: "Great! Agar koi aur sawal ho to poochain, ya main aap ke liye quotation calculate kar doon?",
    };
  }

  if (
    q.includes('shukriya') ||
    q.includes('thanks') ||
    q.includes('thank you') ||
    q.includes('bohat shukriya') ||
    q.includes('meharbani')
  ) {
    return {
      text: "Bohot shukriya aap ka! Executive Packs par aap ki khidmat kar ke khushi hui. Jab bhi koi packaging chahiye ho, main 24/7 yahan live hazir hoon!",
      speech: "You are welcome! Jab bhi packaging ki zaroorat ho, main 24/7 yahan live hazir hoon.",
    };
  }

  // --- 8. OUT OF TOPIC / JOKES / OFF-TOPIC GEMINI WIT ---
  if (
    q.includes('weather') ||
    q.includes('mausam') ||
    q.includes('cricket') ||
    q.includes('bhook') ||
    q.includes('khana khaya') ||
    q.includes('film') ||
    q.includes('song') ||
    q.includes('gaana') ||
    q.includes('match')
  ) {
    return {
      text: "Mausam aur sports ka to pata nahi lekin packaging me main Executive Packs ka Senior Engineer hoon! Kisi bhi box, carton, ya printing ke bare me aap ko complete professional guidance mil sakti hai.",
      speech: "Mausam aur sports ka to pata nahi lekin packaging me main Executive Packs ka Senior Engineer hoon! Kisi bhi box ya carton ke bare me pooch sakte hain.",
    };
  }

  // --- 9. PERFUME, BOTTLES, GLASS, OILS, COSMETICS ---
  if (
    q.includes('perfume') ||
    q.includes('bottle') ||
    q.includes('glass') ||
    q.includes('attar') ||
    q.includes('itr') ||
    q.includes('cosmetic') ||
    q.includes('serum') ||
    q.includes('jar') ||
    q.includes('shisha') ||
    q.includes('oil') ||
    q.includes('cream')
  ) {
    return {
      text: "Perfumes aur glass bottles ke liye hamara Rigid Cylinder Tube with Custom High-Density EVA Foam sab se top recommendation hai! Yeh courier drops aur impact ko 100% absorb karta hai aur gold hot foil stamping ke sath luxury brand look deta hai. Aap ki bottle ka size ya height kitni hai?",
      speech: "Perfumes aur glass bottles ke liye Rigid Cylinder Tube with Custom Foam Inserts sab se best hai! Yeh courier drops ko 100% absorb karta hai. Aap ki bottle ka size kitna hai?",
      productId: 'rigid-cylinder-tube',
    };
  }

  // --- 10. FOOD, BAKERY, BURGER, CAKES, SWEETS, RESTAURANT ---
  if (
    q.includes('food') ||
    q.includes('cake') ||
    q.includes('bakery') ||
    q.includes('pastry') ||
    q.includes('mithai') ||
    q.includes('sweet') ||
    q.includes('burger') ||
    q.includes('pizza') ||
    q.includes('biscuit') ||
    q.includes('khana') ||
    q.includes('restaurant') ||
    q.includes('cafe')
  ) {
    return {
      text: "Food aur bakery items ke liye hamare paas 2 certified food-grade options hain: 1) Auto-Bottom Gable Carry Box (integrated carry handle ke sath) aur 2) Artisan Window Bakery Box (anti-fog PLA transparent window ke sath). Dono greaseproof aur moisture-lock hain. Aap ko konsa style zyada suit karega?",
      speech: "Food aur bakery items ke liye hamare paas Auto-Bottom Gable Box aur Clear Window Bakery Box available hain. Dono 100% food-grade hain. Aap ko konsa style pasand hai?",
      productId: 'gable-takeout-box',
    };
  }

  // --- 11. E-COMMERCE, MAILERS, CLOTHING, SHOES, DARAZ, APPAREL ---
  if (
    q.includes('ecommerce') ||
    q.includes('e-commerce') ||
    q.includes('daraz') ||
    q.includes('shopify') ||
    q.includes('cloth') ||
    q.includes('kapray') ||
    q.includes('shirt') ||
    q.includes('shoe') ||
    q.includes('mailer') ||
    q.includes('parcel') ||
    q.includes('courier') ||
    q.includes('apparel')
  ) {
    return {
      text: "E-Commerce apparel aur retail parcels ke liye Roll-End Kraft Mailer Box standard choice hai. Yeh 32 ECT corrugated E-flute board se banta hai jo crush-proof hota hai aur transit drops me damage hone se bachata hai. Is par custom brand logo bhi razor-sharp print ho sakta hai!",
      speech: "E-Commerce aur clothing ke liye Roll-End Kraft Mailer Box sab se top choice hai! Yeh crush-proof corrugated board se banta hai aur customer unboxing experience zabardast banata hai.",
      productId: 'corrugated-mailer-box',
    };
  }

  // --- 12. COLD CHAIN, THERMAL, FROZEN, ICE, MEAT, FISH, PHARMA ---
  if (
    q.includes('cold') ||
    q.includes('ice') ||
    q.includes('frozen') ||
    q.includes('fish') ||
    q.includes('meat') ||
    q.includes('gosht') ||
    q.includes('thanda') ||
    q.includes('medicine') ||
    q.includes('vaccine') ||
    q.includes('thermal') ||
    q.includes('temperature')
  ) {
    return {
      text: "Perishable aur frozen items ke liye hamara ThermoCool EPS Thermal Insulation Box 48 hours tak freezing temperature maintain rakhta hai. Iske sath leak-proof barrier foil aati hai jo dry ice aur gel packs ke sath perfectly kaam karti hai.",
      speech: "Frozen aur temperature-sensitive items ke liye hamara ThermoCool EPS Thermal Box 48 hours tak cold temperature lock rakhta hai.",
      productId: 'thermocool-box',
    };
  }

  // --- 13. HEAVY SHIPPING, EXPORT, BULK CARTONS ---
  if (
    q.includes('heavy') ||
    q.includes('vazan') ||
    q.includes('weight') ||
    q.includes('export') ||
    q.includes('industrial') ||
    q.includes('pallet') ||
    q.includes('machine') ||
    q.includes('hardware') ||
    q.includes('cargo') ||
    q.includes('carton')
  ) {
    return {
      text: "Heavy weight aur export cargo ke liye Heavy-Duty 5-Ply Corrugated Master Carton ideal hai. Yeh 275# burst strength aur double-wall fluting ke sath 45 kg tak stackable weight aram se sambhal sakta hai.",
      speech: "Heavy items aur export ke liye hamara Heavy-Duty 5-Ply Corrugated Master Carton use hota hai, jo 45 kg tak weight aram se sambhal sakta hai.",
      productId: 'heavy-duty-carton',
    };
  }

  // --- 14. WOODEN CRATES, LUXURY HAMPERS, DRY FRUIT, WEDDINGS ---
  if (
    q.includes('wood') ||
    q.includes('lakri') ||
    q.includes('basket') ||
    q.includes('tokri') ||
    q.includes('hamper') ||
    q.includes('gift') ||
    q.includes('shaadi') ||
    q.includes('wedding') ||
    q.includes('dry fruit')
  ) {
    return {
      text: "Luxury corporate gifting aur dry fruits ke liye hamara Artisan Solid Pine Crate bohot classy look deta hai. Yeh sustainable pine wood se banta hai jisme laser engraving ya brass latch lag sakti hai. Minimum order sirf 50 pieces se start hota hai!",
      speech: "Luxury gifts aur dry fruits ke liye hamara Artisan Solid Pine Wood Crate best choice hai. Is par laser branding bhi ho sakti hai!",
      productId: 'artisan-pine-crate',
    };
  }

  // --- 15. PRICING, RATES, DISCOUNT TIERS ---
  if (
    q.includes('price') ||
    q.includes('rate') ||
    q.includes('cost') ||
    q.includes('kitne ka') ||
    q.includes('discount') ||
    q.includes('wholesale') ||
    q.includes('charges')
  ) {
    return {
      text: "Hamari wholesale factory pricing direct quantity par depend karti hai: 500 pieces par 20% discount, 1,000 pieces par 36% discount, aur 5,000 pieces par 48% tak factory discount milta hai. Sath digital CAD dieline proof bilkul free hoti hai. Aap ko kitni quantity quote karni hai?",
      speech: "Hamari pricing direct quantity par depend karti hai. 1,000 pieces par 36% aur 5,000 par 48% tak factory discount milta hai. Aap ko kitni quantity chahiye?",
    };
  }

  // --- 16. LEAD TIME & DELIVERY DAYS ---
  if (
    q.includes('lead time') ||
    q.includes('delivery') ||
    q.includes('kitne din') ||
    q.includes('time') ||
    q.includes('kab') ||
    q.includes('dispatch') ||
    q.includes('urgent')
  ) {
    return {
      text: "Standard manufacturing lead time 5 se 7 business days hai. Order place hote hi pehle 24 hours me 1:1 CAD dieline proof send ki jati hai, aur client confirmation ke foran baad factory batch start ho jata hai.",
      speech: "Standard production 5 se 7 business days me complete ho jati hai. Pehle 24 hours me CAD proof confirm kiya jata hai.",
    };
  }

  // --- 17. SAMPLES & PROTOTYPES ---
  if (
    q.includes('sample') ||
    q.includes('check karna') ||
    q.includes('dekhna') ||
    q.includes('test') ||
    q.includes('demo')
  ) {
    return {
      text: "Jee bilkul! Bulk production se pehle aap hamara Physical Sample Box sirf $15 me order kar sakte hain taake board thickness, die-cut crease aur finishing physically check kar sakein. Wholesale order hone par yeh amount adjust bhi ho jati hai.",
      speech: "Jee bilkul! Aap hamara Physical Sample Box sirf 15 dollars me mangwa sakte hain taake mass production se pehle quality check kar sakein.",
    };
  }

  // --- 18. LOGO & PRINT FINISHES ---
  if (
    q.includes('logo') ||
    q.includes('print') ||
    q.includes('design') ||
    q.includes('brand') ||
    q.includes('stamping') ||
    q.includes('foil') ||
    q.includes('color')
  ) {
    return {
      text: "Hamare paas 4 high-end print finishes available hain: 1) Eco Black Ink (corrugated mailers ke liye), 2) Full CMYK Photographic Print, 3) Luxury Gold Hot Foil Stamping, aur 4) Opaque White. Aap hamari website ke 3D Mockup Studio me apna logo box par live place kar ke bhi dekh sakte hain!",
      speech: "Hamare paas Eco Black, Full CMYK, aur Luxury Gold Hot Foil finishes available hain. Aap apna logo upload kar ke real-time preview check kar sakte hain!",
    };
  }

  // --- 19. CUSTOM DIMENSIONS & SIZES ---
  if (
    q.includes('size') ||
    q.includes('dimension') ||
    q.includes('inch') ||
    q.includes('cm') ||
    q.includes('mm') ||
    q.includes('custom size') ||
    q.includes('chota') ||
    q.includes('bara')
  ) {
    return {
      text: "Hamari production 100% custom dimensions support karti hai! Chahe aap ko millimeter-accurate box chahiye ya specific height aur width, hamari CNC die-cutting machine exact specifications par cut karti hai. Aap ke product ke dimensions kya hain?",
      speech: "Hamari factory 100% custom dimensions support karti hai. Aap ke product ke dimensions kya hain?",
    };
  }

  // --- 20. NATURAL INTELLIGENT FALLBACK (Conversational & Engaging) ---
  return {
    text: `Aap ki requirement bohot interesting hai. Executive Packs direct manufacturer hai to hum aap ke exact specifications aur budget ke mutabiq box tailor kar sakte hain. Aap apne product ki details ya expected quantity share karein taake main best solution bata sakoon?`,
    speech: `Aap ki requirement bohot interesting hai. Executive Packs direct factory pricing provide karta hai. Aap apne product ki details batayein taake main best rate aur box match kar doon?`,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Check for Gemini API Key from header, request body, or environment variables
    const clientProvidedKey = req.headers.get('x-gemini-key') || body.apiKey;
    const apiKey = clientProvidedKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // IF GEMINI API KEY IS PRESENT, CALL GOOGLE GEMINI 1.5 FLASH / 2.0 FLASH LIVE!
    if (apiKey && apiKey.trim().length > 10) {
      try {
        // Construct conversation contents with history
        const contents: any[] = [];

        // Append recent chat history if available
        if (Array.isArray(history) && history.length > 0) {
          for (const item of history.slice(-6)) {
            contents.push({
              role: item.sender === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            });
          }
        }

        // Add current user message
        contents.push({
          role: 'user',
          parts: [{ text: message }],
        });

        // Supported Gemini Models (Fast, intelligent, conversational)
        const CANDIDATE_MODELS = [
          'gemini-3.5-flash-lite',
          'gemini-3-flash-preview',
          'gemini-flash-lite-latest',
          'gemini-flash-latest'
        ];

        let generatedData: { text: string; speech?: string; productId?: string | null } | null = null;

        for (const model of CANDIDATE_MODELS) {
          try {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  system_instruction: {
                    parts: [{ text: EXECUTIVE_SYSTEM_PROMPT }],
                  },
                  contents,
                  generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1200,
                    response_mime_type: 'application/json',
                  },
                }),
              }
            );

            if (geminiRes.ok) {
              const geminiData = await geminiRes.json();
              const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (rawText) {
                try {
                  const parsed = JSON.parse(rawText);
                  if (parsed && typeof parsed.text === 'string') {
                    generatedData = {
                      text: parsed.text,
                      speech: parsed.speech || parsed.text,
                      productId: parsed.productId || null,
                    };
                    break;
                  }
                } catch {
                  generatedData = {
                    text: rawText,
                    speech: cleanForSpeech(rawText),
                  };
                  break;
                }
              }
            } else {
              console.warn(`Model ${model} returned ${geminiRes.status}, trying fallback model...`);
            }
          } catch (modelErr) {
            console.warn(`Error calling model ${model}, trying next:`, modelErr);
          }
        }

        if (generatedData) {
          // Find if any packaging product is referenced in the response or query
          const lowerCombined = (message + ' ' + generatedData.text).toLowerCase();
          let matchedProductData = null;

          const prodKey = generatedData.productId || '';
          const explicitProduct = PACKAGING_PRODUCTS.find(x => x.id === prodKey);

          if (explicitProduct) {
            matchedProductData = {
              productId: explicitProduct.id,
              productName: explicitProduct.name,
              image: explicitProduct.image,
              estimatedPrice: explicitProduct.startingPrice,
              reason: explicitProduct.tagline,
            };
          } else if (lowerCombined.includes('perfume') || lowerCombined.includes('bottle') || lowerCombined.includes('cylinder') || lowerCombined.includes('عطر') || lowerCombined.includes('شیشہ')) {
            const p = PACKAGING_PRODUCTS.find(x => x.id === 'rigid-cylinder-tube');
            if (p) matchedProductData = { productId: p.id, productName: p.name, image: p.image, estimatedPrice: p.startingPrice, reason: p.tagline };
          } else if (lowerCombined.includes('cake') || lowerCombined.includes('bakery') || lowerCombined.includes('gable') || lowerCombined.includes('کیک') || lowerCombined.includes('بیکری')) {
            const p = PACKAGING_PRODUCTS.find(x => x.id === 'gable-takeout-box');
            if (p) matchedProductData = { productId: p.id, productName: p.name, image: p.image, estimatedPrice: p.startingPrice, reason: p.tagline };
          } else if (lowerCombined.includes('mail') || lowerCombined.includes('cloth') || lowerCombined.includes('ecommerce') || lowerCombined.includes('درزی') || lowerCombined.includes('کپڑے')) {
            const p = PACKAGING_PRODUCTS.find(x => x.id === 'corrugated-mailer-box');
            if (p) matchedProductData = { productId: p.id, productName: p.name, image: p.image, estimatedPrice: p.startingPrice, reason: p.tagline };
          }

          return NextResponse.json({
            text: generatedData.text,
            speech: cleanForSpeech(generatedData.speech || generatedData.text),
            isLive: true,
            recommendation: matchedProductData,
          });
        }
      } catch (geminiErr) {
        console.error('LLM API fetch exception, using local NLP engine:', geminiErr);
      }
    }

    // DEFAULT / FALLBACK: High-Performance Conversational Packaging NLP Engine
    const smartResponse = generateSmartReply(message, history || []);

    let matchedProductData = null;
    if (smartResponse.productId) {
      const prod = PACKAGING_PRODUCTS.find(p => p.id === smartResponse.productId);
      if (prod) {
        matchedProductData = {
          productId: prod.id,
          productName: prod.name,
          image: prod.image,
          estimatedPrice: prod.startingPrice,
          reason: prod.tagline,
        };
      }
    }

    return NextResponse.json({
      text: smartResponse.text,
      speech: smartResponse.speech,
      isLive: false,
      recommendation: matchedProductData,
    });

  } catch (error: any) {
    console.error('AI Agent Route Error:', error);
    return NextResponse.json({
      text: 'Aap ki baat samajhne me thori rukawat aayi. Kya aap dobara pooch sakte hain?',
      speech: 'Aap dobara pooch sakte hain?',
      isLive: false,
    }, { status: 500 });
  }
}
