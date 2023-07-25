import { toast } from "react-toastify";
import { fetchWrapper } from "src/services/http_requests";

const baseUrl = process.env.REACT_APP_API_URL;
const handleHorizontalScroll = (e) => {
  let target = e.target;
  e.stopPropagation();
  e.preventDefault();
  target.scrollLeft += e.deltaY;
};

function filterUrl(obj) {
  let params = "";
  if (obj !== undefined) {
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      return params;
    } else {
      let keys = Object.keys(obj);
      let i = 0;
      for (const key of keys) {
        if (obj[key] !== "") {
          if (i === 0) {
            params = `?${key}=${obj[key]}`;
          } else {
            params += `&${key}=${obj[key]}`;
          }
          i++;
        }
      }
    }
  }
  return params;
}

function selectedLableValueMultiselect(selected, dataArr, field, label) {
  let arr = [];
  if (selected.length) {
    for (const pf of selected) {
      let d = dataArr?.find((e) => e[field].toString() === pf);
      if (d) {
        arr.push(d[label]);
      }
    }
  }
  return arr;
}

function rowsPerPageOptions() {
  return [10, 25, 50, 100, 500];
}
function isPageAuth(data, key) {
  if (data !== undefined && data.actions !== undefined) {
    let d = data.actions.field((e) => e.key === key);
    if (d) {
      return d.access;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

const languages = [
  { id: "1", name: "Assamese" },
  { id: "2", name: "Bengali" },
  { id: "3", name: "English" },
  { id: "4", name: "Gujarati" },
  { id: "5", name: "Hindi" },
  { id: "6", name: "Kannada" },
  { id: "7", name: "Malayalam" },
  { id: "8", name: "Marathi" },
  { id: "9", name: "Oriya" },
  { id: "10", name: "Punjabi" },
  { id: "11", name: "Tamil" },
  { id: "12", name: "Telugu" },
];

const campaignMode = [
  { id: "1", name: "In Cummunity" },
  { id: "2", name: "Virtual" },
];

const stakeHolders = [
  { id: "1", name: "District Administration" },
  { id: "2", name: "DIET" },
  { id: "3", name: "ICDS" },
  { id: "4", name: "SHGs" },
  { id: "5", name: "DoE" },
  { id: "6", name: "PRI members" },
  { id: "7", name: "Faith leaders" },
  { id: "8", name: "Local Media" },
  { id: "9", name: "Student" },
  { id: "10", name: "Teacher" },
];

const learningOpportunities = [
  { id: "1", name: "Communication" },
  { id: "2", name: "Collaboration Counselling " },
  { id: "3", name: "Tech literacy" },
  { id: "4", name: "Exposure to campaigns" },
  { id: "5", name: "Expansion of community outreach" },
  { id: "6", name: "Facilitation" },
  { id: "7", name: "Leadership skills" },
  { id: "8", name: "Domain knowledge" },
  { id: "9", name: "Convergence" },
  { id: "10", name: "Data Analytics" },
];

const domainsSelect = [
  { id: "1", name: "Art & Culture" },
  { id: "2", name: "Agriculture" },
  { id: "3", name: "Animal welfare" },
  { id: "4", name: "Child development" },
  { id: "5", name: "Conservation of culture" },
  { id: "6", name: "Drinking Water" },
  { id: "7", name: "Economic Development" },
  { id: "8", name: "Education" },
  { id: "9", name: "Elderly care" },
  { id: "10", name: "Environment" },
  { id: "11", name: "Financial Services" },
  { id: "12", name: "Gender" },
  { id: "13", name: "Health" },
  { id: "14", name: "Legal awareness/ Public Advocacy" },
  { id: "15", name: "Livelihood" },
  { id: "16", name: "Micro Finance" },
  { id: "17", name: "Migration issues / Migrants" },
  { id: "18", name: "Nutrition" },
  { id: "19", name: "Rural Development" },
  { id: "20", name: "Sanitation & Hygiene" },
  { id: "21", name: "Social Welfare" },
  { id: "22", name: "Sports / Yoga" },
  { id: "23", name: "Women empowerment" },
  { id: "24", name: "Senior citizens" },
  { id: "25", name: "Working for Disabled / Differently Abled" },
  { id: "26", name: "Youth affairs / Youth awareness" },
];

const ngoTypeSelect = [
  { id: "1", name: "Society" },
  { id: "2", name: "Trust" },
  { id: "3", name: "Section 8 Company" },
  { id: "4", name: "Other" },
];

const whyEnrollAsVolunteerSelect = [
  { id: "1", name: "Support My Community" },
  { id: "2", name: "Improve Employability" },
  { id: "3", name: "Learn New Skills" },
  { id: "4", name: "Connect with People" },
  { id: "5", name: "Others" },
];

const howYouWantToVolunteerSelect = [
  { id: "1", name: "In Community" },
  { id: "2", name: "Virtual" },
];

const areaOfInterestSelect = [
  { id: "1", name: "Education" },
  { id: "2", name: "Environment" },
  { id: "3", name: "Gender" },
  { id: "4", name: "Health" },
  { id: "5", name: "Livelihood" },
  { id: "6", name: "Rural development" },
  { id: "7", name: "Skilling" },
  { id: "8", name: "Working for disabled" },
  { id: "9", name: "Youth affaires" },
]

const profOccupationSelect = [
  { id: "1", name: "Aanganwadi / ASHA worker" },
  { id: "2", name: "Teacher" },
  { id: "3", name: "Doctor" },
  { id: "4", name: "Engineer" },
  { id: "5", name: "Self Employed" },
  { id: "6", name: "Other" },
  { id: "7", name: "CRC" },
];

export const beneficiaryCategories = [
  { id: "4", name: "General" },
  { id: "5", name: "Minority" },
  { id: "3", name: "OBC" },
  { id: "1", name: "SC" },
  { id: "2", name: "ST" },
];

export const beneficiaryClass = [
  { id: "1", name: "I" },
  { id: "2", name: "II" },
  { id: "3", name: "III" },
  { id: "4", name: "IV" },
  { id: "5", name: "V" },
  { id: "6", name: "VI" },
  { id: "7", name: "VII" },
  { id: "8", name: "VIII" },
  { id: "9", name: "XI" },
  { id: "10", name: "X" }
];

export const beneficiaryDisabilities = [
  { id: "13", name: "Acid Attack Victim" },
  { id: "19", name: "Autism Spectrum Disorder" },
  { id: "1", name: "Blindness" },
  { id: "8", name: "Cerebral Palsy" },
  { id: "20", name: "Chronic Neurological conditions" },
  { id: "5", name: "Dwarfism" },
  { id: "11", name: "Hearing Impairment (Deaf and Hard of Hearing)" },
  { id: "17", name: "Hemophilia" },
  { id: "6", name: "Intellectual Disability" },
  { id: "3", name: "Leprosoy Cured persons" },
  { id: "4", name: "Locomotor Disability" },
  { id: "2", name: "Low vision" },
  { id: "7", name: "Mental Illness" },
  { id: "15", name: "Multiple Sclerosis" },
  { id: "18", name: "Sickle Cell disease" },
  { id: "9", name: "Specific Learning Disabilities" },
  { id: "10", name: "Speech and Language disability" },
  { id: "16", name: "Thalassemia" },
  { id: "22", name: "None" },
];

export const beneficiaryStatus = [
  { id: "4", name: "Dropout" },
  { id: "5", name: "Enrolled and going to school" },
  { id: "1", name: "Enrolled but not going to school" },
  { id: "2", name: "Not Enrolled" },
  { id: "3", name: "Potential Dropout" },
  { id: "6", name: "Enrolled but Irregular" },

];

export const beneficiaryDropoutReason = [
  { id: "2", name: "Care Giver to sibling/family members" },
  { id: "5", name: "Disablility" },
  { id: "10", name: "Failure in the Class Exam" },
  { id: "1", name: "Household Work" },
  { id: "3", name: "Labour Service Work(Earning)" },
  { id: "8", name: "Lack of Female teachers" },
  { id: "12", name: "No teachers in School/ Teacher's absentism" },
  { id: "7", name: "Lack of Girls Toilet in the School" },
  { id: "4", name: "Lack of Interest" },
  { id: "9", name: "Lack of School Infrastructure" },
  { id: "6", name: "Poor Financial Condition" },
  { id: "11", name: "No School nearby, school distance in issue" },
  { id: "14", name: "Due to marriage 15:Due to pregnency" },
  { id: "15", name: "Due to pregnency" },
  { id: "16", name: "Due to health issue" },
  { id: "17", name: "Due to start of Periods" },
  { id: "18", name: "Due to Safety and Security" },
  { id: "19", name: "Schools are closed due to COVID" },
  { id: "13", name: "Other (Please specify)" }
];

export const beneficiaryEngagement = [
  { id: "2", name: "Care Giver to sibling/family members" },
  { id: "1", name: "Household Work" },
  { id: "3", name: "Labour Service Work(Earning)" },
  { id: "6", name: "Other (Please specify)" },
];

export const beneficiaryOccupation = [
  { id: "2", name: "Agriculture" },
  { id: "5", name: "Business" },
  { id: "4", name: "Govt Employee" },
  { id: "3", name: "Labour" },
  { id: "1", name: "Service" },
  { id: "6", name: "Other (Please specify)" },
];

export const beneficiaryGender = [
  { id: "1", name: "Male" },
  { id: "2", name: "Female" },
  { id: "3", name: "Other" },
];

export const modeOfIntervention = [
  { id: "1", name: "In Community/ Physical" },
  { id: "2", name: "Virtual" }
];

export const callStatus = [
  { id: "1", name: "Connected" },
  { id: "2", name: "Incorrect Phone number/ incoming calls not allowed to this number" },
  { id: "3", name: "Phone ringing but not picked up" },
  { id: "4", name: "Phone switched off/out of network" },
  { id: "5", name: "Beneficiary not interested to talk" },
  { id: "6", name: "Asked to call later" },

];
export const accessibilityOfMobile = [
  { id: "1", name: "Basic Phone" },
  { id: "2", name: "Android Phone" },
  { id: "3", name: "Android Phone" },
  { id: "4", name: "No access of Mobile" },
]
export const covidVaccinationStatus = [
  { id: "1", name: "1st Dose" },
  { id: "2", name: "2nd Dose" },
  { id: "3", name: "Not Vaccinated" },
  { id: "4", name: "Age below 15 years" },
]

const calculateCallStatus = (code) => {
  if (code) return callStatus.find((obj) => obj.id === code).name;
};
const calculateAccessibilityOfMobile = (code) => {
  if (code) return accessibilityOfMobile.find((obj) => obj.id === code).name;
};
const calculateCovidVaccinationStatus = (code) => {
  if (code) return covidVaccinationStatus.find((obj) => obj.id === code).name;
};
const calculateProfOccupation = (code) => {
  if (code) return profOccupationSelect.find((obj) => obj.id === code).name;
};

const calculateDomain = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) => domainsSelect.find((obj) => obj.id === id));
    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateNGOType = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) => ngoTypeSelect.find((obj) => obj.id === id));

    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateAreaOfInterest = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) =>
      areaOfInterestSelect.find((obj) => obj.id === id)
    );

    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateHowYouWantToVol = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) =>
      howYouWantToVolunteerSelect.find((obj) => obj.id === id)
    );

    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateWhyYouWantToEnrollAsVol = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) =>
      whyEnrollAsVolunteerSelect.find((obj) => obj.id === id)
    );

    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateModeOfCamp = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) => campaignMode.find((obj) => obj.id === id));

    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateLanguagesKnown = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) => languages.find((lang) => lang.id === id));

    return arr.map((lang) => lang.name).join(", ");
  }
};

const calculateStakeHolders = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) => stakeHolders.find((obj) => obj.id === id));

    return arr.map((obj) => obj.name).join(", ");
  }
};

const calculateLearningOpp = (codes) => {
  if (codes) {
    const ids = codes.replace(/\s/g, "").split(",");
    const arr = ids.map((id) =>
      learningOpportunities.find((obj) => obj.id === id)
    );

    return arr.map((obj) => obj.name).join(", ");
  }
};



const calculateGender = (code) => {
  switch (code) {
    case 1:
    case "1":
      return "Male";
    case 2:
    case "2":
      return "Female";
    case 3:
    case "3":
      return "Others";
    default:
      return "";
  }
};

const calculateEducation = (code) => {
  switch (code) {
    case "1":
      return "Below 10th";
    case "2":
      return "10th passed";
    case "3":
      return "12th passed";
    case "4":
      return "Graduate";
    case "5":
      return "Post Graduate";
    case "6":
      return "Not Educated";
    default:
      return "";
  }
};

const calculateTypeOfPhone = (code) => {
  switch (code) {
    case "1":
      return "Android";
    case "2":
      return "Feature phone";
    case "3":
      return "iPhone";
    case "4":
      return "Others";
    default:
      return "Invalid";
  }
};

const calculateWorkExp = (code) => {
  switch (code) {
    case "1":
      return "Yes";
    case "2":
      return "No";
    default:
      return "Invalid";
  }
};

export const getBeneficiaryCategory = (id) => {
  if (id) {
    const obj = beneficiaryCategories.find((obj) => obj.id === id);
    return obj?.name;
  }
};
export const getBeneficiaryDisability = (id) => {
  if (id) {
    const obj = beneficiaryDisabilities.find((obj) => obj.id === id);
    return obj?.name || "";
  }
};
export const getBeneficiaryStatus = (id) => {
  if (id) {
    const obj = beneficiaryStatus.find((obj) => obj.id === id);
    return obj?.name;
  }
};
export const getBeneficiaryDropoutReason = (id) => {
  if (id) {
    const obj = beneficiaryDropoutReason.find((obj) => obj.id === id);
    return obj?.name;
  }
};
export const getBeneficiaryClass = (id) => {
  if (id) {
    const obj = beneficiaryClass.find((obj) => obj.id === id);
    return obj?.name;
  }
};

export const getBeneficiaryEngagement = (id) => {
  if (id) {
    const obj = beneficiaryEngagement.find((obj) => obj.id === id);
    return obj?.name || "";
  }
};
export const getBeneficiaryOccupation = (id) => {
  if (id) {
    const obj = beneficiaryOccupation.find((obj) => obj.id === id);
    return obj?.name;
  }
};
export const getBeneficiaryGender = (id) => {
  if (id) {
    const obj = beneficiaryGender.find((obj) => obj.id === id.toString());
    return obj?.name;
  }
};

export const calculateAge = (date) => {
  const birthday = new Date(date);
  if (birthday instanceof Date) {
    const ageDifferenceInMS = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifferenceInMS);
    const realAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return realAge;
  }
  return "Invalid date";
};
const calculateModeOfIntervention = (id) => {
  if (id) return modeOfIntervention.find((obj) => obj.id === id).name;
};
const fetchApi = async (route, setState, filterData) => {
  const url = `${baseUrl}${route}${filterUrl(filterData)}`;
  try {
    let data = await fetchWrapper.get(url);
    setState(data?.data);
  } catch (error) {
    toast.error(error);
  }
}
export {
  handleHorizontalScroll,
  filterUrl,
  selectedLableValueMultiselect,
  rowsPerPageOptions,
  isPageAuth,
  languages,
  campaignMode,
  domainsSelect,
  stakeHolders,
  learningOpportunities,
  ngoTypeSelect,
  whyEnrollAsVolunteerSelect,
  howYouWantToVolunteerSelect,
  areaOfInterestSelect,
  profOccupationSelect,
  calculateStakeHolders,
  calculateLearningOpp,
  calculateGender,
  calculateEducation,
  calculateTypeOfPhone,
  calculateLanguagesKnown,
  calculateWorkExp,
  calculateModeOfCamp,
  calculateWhyYouWantToEnrollAsVol,
  calculateHowYouWantToVol,
  calculateAreaOfInterest,
  calculateNGOType,
  calculateDomain,
  calculateProfOccupation,
  calculateModeOfIntervention,
  calculateCallStatus,
  calculateAccessibilityOfMobile,
  calculateCovidVaccinationStatus,
  baseUrl,
  fetchApi
};
