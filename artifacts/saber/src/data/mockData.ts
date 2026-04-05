export type VerificationStatus = "verified" | "misleading" | "unverified";

export interface Source {
  name: string;
  url: string;
  logo: string;
}

export interface VerificationResult {
  status: VerificationStatus;
  confidence: number;
  explanation: string;
  sources: Source[];
  recommendation: string;
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
  {
    name: "وكالة الأنباء السعودية (واس)",
    url: "https://www.spa.gov.sa",
    logo: "https://www.spa.gov.sa/favicon.ico",
  },
  {
    name: "هيئة الاتصالات والفضاء والتقنية",
    url: "https://www.cst.gov.sa",
    logo: "https://www.cst.gov.sa/favicon.ico",
  },
  {
    name: "وزارة الصحة السعودية",
    url: "https://www.moh.gov.sa",
    logo: "https://www.moh.gov.sa/favicon.ico",
  },
  {
    name: "المركز الوطني للفضاء",
    url: "https://www.space.gov.sa",
    logo: "https://www.space.gov.sa/favicon.ico",
  },
  {
    name: "هيئة السوق المالية",
    url: "https://www.cma.org.sa",
    logo: "https://www.cma.org.sa/favicon.ico",
  },
];

const verifiedResults: VerificationResult[] = [
  {
    status: "verified",
    confidence: 94,
    explanation:
      "تم التحقق من هذا الخبر عبر مصادر رسمية متعددة. المعلومات الواردة دقيقة ومتوافقة مع البيانات الرسمية الصادرة من الجهات المعنية. لا توجد تناقضات في التفاصيل المذكورة.",
    sources: [officialSources[0], officialSources[2]],
    recommendation:
      "يمكن الوثوق بهذا الخبر ومشاركته. المحتوى موثق من مصادر رسمية موثوقة.",
  },
  {
    status: "verified",
    confidence: 87,
    explanation:
      "المعلومات الواردة في هذا الخبر صحيحة بشكل عام. تم التأكد من المعطيات الأساسية عبر التحقق المتقاطع مع عدة مصادر موثوقة ومعتمدة.",
    sources: [officialSources[1], officialSources[4]],
    recommendation:
      "الخبر موثوق ويمكن الاعتماد عليه. نوصي بمتابعة المصادر الرسمية للتحديثات المستجدة.",
  },
];

const misleadingResults: VerificationResult[] = [
  {
    status: "misleading",
    confidence: 89,
    explanation:
      "يحتوي هذا الخبر على معلومات مضللة أو مبالغ فيها. بعض التفاصيل الواردة لا تتطابق مع البيانات الرسمية، وقد يكون المحتوى خارج سياقه الأصلي أو مأخوذاً بشكل انتقائي.",
    sources: [officialSources[0], officialSources[3]],
    recommendation:
      "توخ الحذر عند مشاركة هذا الخبر. يُنصح بالرجوع إلى المصادر الرسمية للحصول على المعلومات الدقيقة.",
  },
  {
    status: "misleading",
    confidence: 76,
    explanation:
      "تبيّن أن المعلومات الواردة في هذا الخبر غير دقيقة أو مضللة. يتضمن ادعاءات لا يمكن التحقق منها من مصادر موثوقة، وهناك تناقضات واضحة مع الحقائق الموثقة.",
    sources: [officialSources[2]],
    recommendation:
      "لا تنشر هذا الخبر. قم بمراجعة المصادر الرسمية الموثوقة قبل تداول أي معلومات.",
  },
];

export function simulateVerification(_newsText: string): VerificationResult {
  const random = Math.random();
  if (random < 0.5) {
    return verifiedResults[Math.floor(Math.random() * verifiedResults.length)];
  } else {
    return misleadingResults[
      Math.floor(Math.random() * misleadingResults.length)
    ];
  }
}

export const trendingNews: TrendingItem[] = [
  {
    id: 1,
    headline:
      "المملكة العربية السعودية تطلق مبادرة لزراعة مليار شجرة بحلول 2030",
    status: "verified",
    confidence: 96,
    date: "٢٠٢٦/٤/٥",
    category: "البيئة",
  },
  {
    id: 2,
    headline: "ادعاءات بانهيار البورصة السعودية خلال الأسابيع القادمة",
    status: "misleading",
    confidence: 91,
    date: "٢٠٢٦/٤/٥",
    category: "الاقتصاد",
  },
  {
    id: 3,
    headline: "اكتشاف علاجي جديد لمرض السكر في مستشفيات المملكة",
    status: "misleading",
    confidence: 78,
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
    confidence: 83,
    date: "٢٠٢٦/٤/٣",
    category: "الاقتصاد",
  },
  {
    id: 6,
    headline:
      "المملكة تستضيف بطولة كأس العالم للرياضات الإلكترونية ٢٠٢٧",
    status: "verified",
    confidence: 88,
    date: "٢٠٢٦/٤/٣",
    category: "الرياضة",
  },
  {
    id: 7,
    headline: "إلغاء تأشيرة الزيارة بين المملكة ودول الخليج بشكل كامل",
    status: "verified",
    confidence: 92,
    date: "٢٠٢٦/٤/٢",
    category: "السياسة",
  },
  {
    id: 8,
    headline: "وباء جديد ينتشر في عدة مدن سعودية وفق مزاعم مجهولة المصدر",
    status: "misleading",
    confidence: 97,
    date: "٢٠٢٦/٤/٢",
    category: "الصحة",
  },
];
