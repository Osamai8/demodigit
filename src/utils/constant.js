export const ADMIN = 1;
export const FIELD_ENGINEER = 2;
export const STATE_COORDINATOR = 3;
export const DISTRICT_COORDINATOR = 4;

const VOLUNTEER_COLUMNS = [
  { id: "first_name" },
  { id: "last_name" },
  { id: "email" },
  { id: "mobile_number" },
  { id: "date_of_birth" },
  { id: "state_id" },
  { id: "district_id" },
  { id: "block_id" },
  { id: "higest_education" },
  { id: "other_higest_education" },
  { id: "work_experience" },
  { id: "type_of_phone" },
  { id: "on_boarding_partner" },
  { id: "volunteer_category" },
  { id: "number_are_hours_commited_for_week" },
  { id: "languages_known" },
  { id: "why_do_you_want_to_enroll_as_volunteer" },
  { id: "why_do_you_want_to_enroll_as_volunteer_other" },
  { id: "how_do_you_want_to_volunteer" },
  { id: "what_is_your_area_of_interest" },
  { id: "data_display_aggrement" },
];

const VOLUNTEER_DATA = [
  {
    first_name: "New Vol",
    last_name: "CSV",
    email: "vol.csv@gmail.com",
    mobile_number: "9288328890",
    date_of_birth: "04-03-1997",
    state_id: "36",
    district_id: "626",
    block_id: "6655",
    higest_education: "7",
    other_higest_education: "PHD",
    work_experience: "2",
    type_of_phone: "3",
    on_boarding_partner: "144",
    volunteer_category: "3",
    number_are_hours_commited_for_week: "56",
    languages_known: "12",
    why_do_you_want_to_enroll_as_volunteer: "5",
    why_do_you_want_to_enroll_as_volunteer_other: "Because I like it",
    how_do_you_want_to_volunteer: "2",
    what_is_your_area_of_interest: "9",
    data_display_aggrement: "1",
  },
  {
    first_name: "New Vol One",
    last_name: "CSV One",
    email: "volone.csv@gmail.com",
    mobile_number: "9223328890",
    date_of_birth: "04-03-1997",
    state_id: "36",
    district_id: "626",
    block_id: "6655",
    higest_education: "1",
    other_higest_education: "",
    work_experience: "1",
    type_of_phone: "1",
    on_boarding_partner: "144",
    volunteer_category: "1",
    number_are_hours_commited_for_week: "1",
    languages_known: "1",
    why_do_you_want_to_enroll_as_volunteer: "1",
    why_do_you_want_to_enroll_as_volunteer_other: "",
    how_do_you_want_to_volunteer: "1",
    what_is_your_area_of_interest: "1",
    data_display_aggrement: "1",
  },
];

const NGO_COLUMNS = [
  { id: "ngo_name" },
  { id: "reg_no" },
  { id: "state_id" },
  { id: "district_id" },
  { id: "block_id" },
  { id: "domain" },
  { id: "contact_no" },
  { id: "email" },
  { id: "foundation_year" },
  { id: "website" },
  { id: "ceo_name" },
  { id: "aspirational_district_id" },
  { id: "ngo_type" },
  { id: "other_ngo_type" },
];

const NGO_DATA = [
  {
    ngo_name: "Test ngo",
    reg_no: "923293",
    state_id: "5",
    district_id: "16",
    block_id: "1",
    domain: "1",
    contact_no: "8511346122",
    email: "testdemo@gmail.com",
    foundation_year: "Aug-21",
    website: "test.com",
    ceo_name: "John",
    aspirational_district_id: "318",
    ngo_type: "2",
    other_ngo_type: "",
  },
];

export const csvColsGenerator = (title) => {
  switch (title) {
    case "NGO":
      return { cols: NGO_COLUMNS, data: NGO_DATA };
    case "Volunteer":
      return { cols: VOLUNTEER_COLUMNS, data: VOLUNTEER_DATA };
    default:
      return null;
  }
};
