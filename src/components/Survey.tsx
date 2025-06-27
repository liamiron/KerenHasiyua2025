import "survey-core/survey-core.css";
import { Model } from "survey-core";
import { Serializer } from "survey-core";
import { Survey } from "survey-react-ui";
import { DoubleBorderLight } from "survey-core/themes";
import { useCallback } from "react";
import { BenefitstoPages } from "../functions/BenefitstoPages";
import { BenefitsPDF } from "../functions/BenefitsPDF";

Serializer.addProperty("question", {
  name: "benefits",
  type: "object",
  default: null,
});

const surveyJson = {
  elements: [
    {
      name: "howManyDays",
      title: "כמה ימי מילואים ביצעת בשנה האחרונה בצו 8?",
      type: "rating",
      autoGenerate: false,
      rateCount: 4,
      rateValues: [
        {
          value: 1,
          text: "מתחת ל-30 ימים",
        },
        {
          value: 2,
          text: "30-45 ימים",
        },
        {
          value: 3,
          text: "45-50 ימים",
        },
        {
          value: 4,
          text: "מעל ל-50 ימים",
        },
      ],
      benefits: {
        "1": [],
        "2": ["emotionalSupport"],
        "3": ["professionalDevelopment", "emotionalSupport"],
        "4": ["professionalDevelopment", "emotionalSupport"],
      },
    },
    {
      name: "moreThan45DaysInRow",
      title: "האם ביצעת מעל 45 ימי מילואים *ברצף* בשנה האחרונה?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{howManyDays} = 3 or {howManyDays} = 4",
    },
    {
      name: "isStudent",
      title: "האם את.ה סטודנט?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{howManyDays} != 4",
      benefits: {
        כן: ["privateLessons"],
        לא: [],
      },
    },
    {
      name: "isStudent50",
      title: "האם את.ה סטודנט?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{howManyDays} = 4",
      benefits: {
        כן: ["tuitionRefund"],
        לא: [],
      },
    },
    {
      name: "needReCourse",
      title: "האם את.ה זקוק.ה לקורס חוזר עקב שירותך במילואים?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{isStudent} = 'כן' or {isStudent50} = 'כן'",
      benefits: {
        כן: ["reCourse"],
        לא: [],
      },
    },
    {
      name: "unemployed",
      title: "האם את.ה מובטל.ת?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{moreThan45DaysInRow} = 'כן'",
      benefits: {
        כן: ["unemployedDamages"],
        לא: [],
      },
    },
    {
      name: "selfEmployed",
      title: `האם את.ה עובד.ת עצמאי.ת?`,
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{unemployed} != 'כן'",
      benefits: {
        כן: ["selfEmployed"],
        לא: [],
      },
    },
    {
      name: "hasPartner",
      title: "האם יש לך בן.בת זוג?",
      type: "radiogroup",
      choices: ["כן", "לא"],
    },
    {
      name: "unemployedPartner",
      title: "האם בן.בת הזוג שלך מובטל.ת?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{hasPartner} = 'כן'",
      benefits: {
        כן: ["unemployedPartner"],
        לא: [],
      },
    },
    {
      name: "isDevorced",
      title: "האם את.ה גרוש.ה?",
      type: "radiogroup",
      choices: ["כן", "לא"],
    },
    {
      name: "didTheExDamaged",
      title: "האם בן.ת זוגך לשעבר נפגע בעקבות שירותך הפעיל במילואים?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{isDevorced} = 'כן'",
      benefits: {
        כן: ["exDamages"],
        לא: [],
      },
    },
    {
      name: "pregnantPartner",
      title:
        "האם בת זוגך הייתה בהריון ולא חזרה לעבודתה בעקבות הארכת חופשת הלידה מעבר לתקופה המזכה בתשלום דמי לידה?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{moreThan45DaysInRow} = 'כן' and {hasPartner} = 'כן'",
    },
    {
      name: "pregnantPartnerWhileMil",
      title:
        "האם חופשת הלידה של בת זוגך חפפה למשך 21 ימים לפחות עם שירותך במילואים או ל-30 הימים שאחריה?",
      description: "ובנוסף, בת זוגך לא קיבלה פיצוי בגין אובדן הכנסה מקרן הסיוע",
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{pregnantPartner} = 'כן'",
      benefits: {
        כן: ["parentalLeave"],
        לא: [],
      },
    },
    {
      name: "hasCholdren",
      title: "האם יש לך ילדים?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      benefits: {
        כן: ["babysitter", "summerCamp"],
        לא: [],
      },
    },
    {
      name: "household",
      title: "האם מימשת בעבר פיצוי בגין מענה שוטף לכלכלת הבית?",
      type: "radiogroup",
      choices: ["כן", "לא", "לא בטוח.ה"],
      benefits: {
        כן: [],
        לא: ["household"],
        "לא בטוח.ה": ["household"],
      },
    },
    {
      name: "dogOwner",
      title: "האם יש לך כלב?",
      type: "radiogroup",
      choices: ["כן", "לא"],
      benefits: {
        כן: [],
        לא: ["dogPension"],
      },
    },
    {
      name: "livingAbroad",
      title: `האם את.ה חי.ה בחו"ל ואינך מבוטח.ת בביטוח לאומי?`,
      type: "radiogroup",
      choices: ["כן", "לא"],
      benefits: {
        כן: ["livingAbroad"],
        לא: [],
      },
    },
    {
      name: "daysFromOctober7",
      title: `האם ביצעת מעל ל-120 ימי מילואים בצו 8 במערך הלוחים מאז 7.10.23?`,
      type: "radiogroup",
      choices: ["כן", "לא"],
      benefits: {
        כן: ["additionalEmotionalSupport"],
        לא: [],
      },
    },
    {
      name: "moving",
      title: `האם עברת דירה במהלך תקופתך בצו 8?`,
      type: "radiogroup",
      choices: ["כן", "לא"],
      visibleIf: "{daysFromOctober7} = 'כן'",
      benefits: {
        כן: ["movingRefund"],
        לא: [],
      },
    },
    {
      name: "damagedWhileAmKelavi",
      title: `האם ביתך נפגע או שפונית מביתך עקב מבצע 'עם כלביא' במהלך שירותך בצו 8?`,
      type: "radiogroup",
      choices: ["כן", "לא"],
      benefits: {
        כן: ["damagedWhileAmKelavi"],
        לא: [],
      },
    },
  ],
};

export default function SurveyComponent() {
  const survey = new Model(surveyJson);
  survey.clearInvisibleValues = "onHidden";
  survey.applyTheme(DoubleBorderLight);
  survey.showCompletedPage = false;
  survey.completeText = "חישוב הטבות";

  const getResults = useCallback((survey: Model): string[] => {
    const benefits = [
      "personaEquipmentExpenses",
      "other",
      "sixRoad",
      "vacationCancelation",
      "vacationVouchers",
      "bonusesExplanations",
    ];
    survey.getAllQuestions().forEach((question) => {
      const answer = survey.data[question.name];
      const benefitMap = question.benefits;

      if (benefitMap && benefitMap[answer]) {
        benefits.push(...benefitMap[answer]);
      }
    });
    return benefits;
  }, []);

  survey.onComplete.add((survey) => {
    document.getElementById("root")!.innerHTML = `
        <h1>קובץ ההטבות שלך בדרך...</h1>
        <p id="showFullPDF">לחץ כאן על מנת לקרוא גם על כל שאר ההטבות</p>
    `;
    document
      .getElementById("showFullPDF")
      ?.addEventListener("click", async () => {
        const BenefitsFile = await fetch(
          "../../public/assets/KerenHasiyuaBenefits.pdf"
        ).then((res) => res.arrayBuffer());
        const blob = new Blob([BenefitsFile], { type: "application/pdf" });
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL, "_blank");
      });

    const userBenefits = getResults(survey);
    const benefitsforFile: number[] = [];
    userBenefits.forEach((benefit) => {
      const pages: number[] = BenefitstoPages[benefit];
      pages.forEach((page) => {
        const pageIndex = page - 1;
        if (!benefitsforFile.includes(pageIndex)) {
          benefitsforFile.push(pageIndex);
        }
      });
    });
    benefitsforFile.sort((a, b) => a - b);
    BenefitsPDF(benefitsforFile);
  });

  return <Survey model={survey} />;
}
