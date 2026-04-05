export type VerificationStatus = "verified" | "misleading";

export interface Source {
  name: string;
  url: string;
  type: "government" | "news";
}

export interface VerificationResult {
  status: VerificationStatus;
  confidence: number;
  title: string;
  explanation: string;
  sources: Source[];
  recommendation: string;
  publishDate: string;
}

export interface TrendingItem {
  id: number;
  headline: string;
  status: VerificationStatus;
  confidence: number;
  date: string;
  category: string;
}

const officialSources: Source[] = [
  { name: "وكالة الأنباء السعودية (واس)", url: "https://www.spa.gov.sa", type: "government" },
  { name: "هيئة الاتصالات والفضاء والتقنية", url: "https://www.cst.gov.sa", type: "government" },
  { name: "وزارة الصحة السعودية", url: "https://www.moh.gov.sa", type: "government" },
  { name: "البوابة الوطنية للحكومة الإلكترونية", url: "https://www.saudi.gov.sa", type: "government" },
  { name: "هيئة السوق المالية", url: "https://www.cma.org.sa", type: "government" },
  { name: "وزارة الاقتصاد والتخطيط", url: "https://www.mep.gov.sa", type: "government" },
];

const verifiedResults: VerificationResult[] = [
  {
    status: "verified",
    confidence: 96,
    title: "تم التحقق",
    explanation:
      "تم التحقق من صحة هذه المعلومات عبر مصادر رسمية متعددة. تتطابق التفاصيل الواردة مع البيانات الرسمية الصادرة من الجهات الحكومية المعنية، ولا توجد أي تناقضات في المعطيات المذكورة. الخبر موثق ومؤكد من قِبل المصادر الرسمية.",
    sources: [officialSources[0], officialSources[3]],
    recommendation: "يمكن الاعتماد على هذا الخبر ومشاركته بثقة. المحتوى موثق رسمياً.",
    publishDate: "٥ أبريل ٢٠٢٦",
  },
  {
    status: "verified",
    confidence: 91,
    title: "تم التحقق",
    explanation:
      "المعلومات الواردة في هذا الخبر صحيحة بشكل عام. تم التأكد من المعطيات الأساسية عبر التحقق المتقاطع مع مصادر رسمية موثوقة ومعتمدة. النتائج متسقة مع البيانات المتاحة للعموم.",
    sources: [officialSources[1], officialSources[4]],
    recommendation: "الخبر موثوق ويمكن الاعتماد عليه. نوصي بمتابعة المصادر الرسمية للتحديثات.",
    publishDate: "٤ أبريل ٢٠٢٦",
  },
];

const misleadingResults: VerificationResult[] = [
  {
    status: "misleading",
    confidence: 17,
    title: "معلومات مضللة",
    explanation:
      "يحتوي هذا الخبر على معلومات غير دقيقة أو مضللة. بعض التفاصيل الواردة تتعارض مع البيانات الرسمية الصادرة عن الجهات المختصة. قد يكون المحتوى مأخوذاً خارج سياقه الأصلي أو يتضمن تحريفاً متعمداً للحقائق.",
    sources: [officialSources[0], officialSources[2]],
    recommendation: "نوصي بعدم مشاركة هذا المحتوى. يُرجى الرجوع إلى المصادر الرسمية للحصول على المعلومات الدقيقة.",
    publishDate: "٥ أبريل ٢٠٢٦",
  },
  {
    status: "misleading",
    confidence: 23,
    title: "معلومات مضللة",
    explanation:
      "تبيّن أن هذا الخبر يتضمن ادعاءات غير مؤكدة لا يمكن التحقق منها عبر أي مصدر رسمي موثوق. هناك تناقضات واضحة بين ما يُدَّعى وما هو موثق رسمياً. الخبر يفتقر إلى المصداقية ويُحتمل أن يكون مُضخَّماً أو مُختلقاً.",
    sources: [officialSources[5]],
    recommendation: "نوصي بعدم مشاركة هذا المحتوى. قم بمراجعة المصادر الرسمية الموثوقة قبل تداول أي معلومات.",
    publishDate: "٣ أبريل ٢٠٢٦",
  },
];

export function simulateVerification(_newsText: string): VerificationResult {
  const random = Math.random();
  if (random < 0.5) {
    return verifiedResults[Math.floor(Math.random() * verifiedResults.length)];
  } else {
    return misleadingResults[Math.floor(Math.random() * misleadingResults.length)];
  }
}

export const trendingNews: TrendingItem[] = [
  {
    id: 1,
    headline: "المملكة العربية السعودية تطلق مبادرة لزراعة مليار شجرة بحلول 2030",
    status: "verified",
    confidence: 97,
    date: "٢٠٢٦/٤/٥",
    category: "البيئة",
  },
  {
    id: 2,
    headline: "ادعاءات بانهيار البورصة السعودية خلال الأسابيع القادمة",
    status: "misleading",
    confidence: 12,
    date: "٢٠٢٦/٤/٥",
    category: "الاقتصاد",
  },
  {
    id: 3,
    headline: "اكتشاف علاجي جديد لمرض السكر في مستشفيات المملكة",
    status: "misleading",
    confidence: 21,
    date: "٢٠٢٦/٤/٤",
    category: "الصحة",
  },
  {
    id: 4,
    headline: "إطلاق القمر الاصطناعي السعودي للاتصالات بنجاح",
    status: "verified",
    confidence: 99,
    date: "٢٠٢٦/٤/٤",
    category: "التقنية",
  },
  {
    id: 5,
    headline: "رفع أسعار الوقود في المملكة بنسبة ٢٥٪ الشهر القادم",
    status: "misleading",
    confidence: 8,
    date: "٢٠٢٦/٤/٣",
    category: "الاقتصاد",
  },
  {
    id: 6,
    headline: "المملكة تستضيف بطولة كأس العالم للرياضات الإلكترونية ٢٠٢٧",
    status: "verified",
    confidence: 88,
    date: "٢٠٢٦/٤/٣",
    category: "الرياضة",
  },
  {
    id: 7,
    headline: "إلغاء تأشيرة الزيارة بين المملكة ودول الخليج بشكل كامل",
    status: "verified",
    confidence: 93,
    date: "٢٠٢٦/٤/٢",
    category: "السياسة",
  },
  {
    id: 8,
    headline: "وباء جديد ينتشر في عدة مدن سعودية وفق مزاعم مجهولة المصدر",
    status: "misleading",
    confidence: 4,
    date: "٢٠٢٦/٤/٢",
    category: "الصحة",
  },
];
