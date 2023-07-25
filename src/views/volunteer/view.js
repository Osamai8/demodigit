import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/Page";
import { volunteerList } from "src/Redux/Volunteer/action";
import {
  calculateAreaOfInterest,
  calculateEducation,
  calculateGender,
  calculateHowYouWantToVol,
  calculateLanguagesKnown,
  calculateProfOccupation,
  calculateTypeOfPhone,
  calculateWhyYouWantToEnrollAsVol,
  calculateWorkExp,
} from "src/utils/halper";

const VolunteerView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const calculateAge = (birthday) => {
    const ageDifferenceInMS = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifferenceInMS);
    const realAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    return realAge;
  };

  useEffect(() => {
    if (id) {
      dispatch(volunteerList({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = useSelector((state) => {
    return state.volunteer.data.data;
  });

  let singleData = data?.length ? data[0] : {};

  // console.log(singleData);

  return (
    <Page href="/app/volunteer/list" title="Volunteer view">
      <div className="viewWrapper">
        {singleData.profile_image_volunteer && (
          <img
            src={singleData.profile_image_volunteer}
            alt="profile pic"
            height={80}
          />
        )}
        <ul>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">First Name</h4>
            <p className="right">{singleData.first_name}</p>
          </li>
          <li>
            <h4 className="left">Last Name</h4>
            <p className="right">{singleData.last_name}</p>
          </li>
          <li>
            <h4 className="left">Email</h4>
            <p className="right">{singleData.email}</p>
          </li>
          <li>
            <h4 className="left">Mobile Number</h4>
            <p className="right">{singleData.mobile_number}</p>
          </li>
          <li>
            <h4 className="left">Date of birth</h4>
            <p className="right">
              {moment(singleData.date_of_birth).format("DD/MM/YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">Age</h4>
            <p className="right">
              {calculateAge(new Date(singleData.date_of_birth))}
            </p>
          </li>
          <li>
            <h4 className="left">Gender</h4>
            <p className="right">{calculateGender(singleData.gender)}</p>
          </li>
          <li>
            <h4 className="left">Work Experience</h4>
            <p className="right">
              {calculateWorkExp(singleData.work_experience)}
            </p>
          </li>
          {singleData.work_experience === "1" && (
            <li>
              <h4 className="left">Professional Occupation</h4>
              <p className="right">
                {calculateProfOccupation(singleData.professional_occupation)}
              </p>
            </li>
          )}
          <li>
            <h4 className="left">Onboarding Partner</h4>
            <p className="right">{singleData.ngo_name}</p>
          </li>
          <li>
            <h4 className="left">Phone Type</h4>
            <p className="right">
              {calculateTypeOfPhone(singleData.type_of_phone)}
            </p>
          </li>
          <li>
            <h4 className="left">Committment Period (in hours per week)</h4>
            <p className="right">
              {singleData.no_are_hours_commited_for_month}
            </p>
          </li>
          <li>
            <h4 className="left">Languages Known</h4>
            <p className="right">
              {calculateLanguagesKnown(singleData.languages_known)}
            </p>
          </li>
          <li>
            <h4 className="left">Why do you want to enroll as volunteer</h4>
            <p className="right">
              {calculateWhyYouWantToEnrollAsVol(
                singleData.why_do_you_want_to_enroll_as_volunteer
              )}
              {singleData.why_do_you_want_to_enroll_as_volunteer?.indexOf("5") >
                -1 &&
                `, ${singleData.why_do_you_want_to_enroll_as_volunteer_other}`}
            </p>
          </li>
          <li>
            <h4 className="left">How do you want to volunteer</h4>
            <p className="right">
              {calculateHowYouWantToVol(
                singleData.how_do_you_want_to_volunteer
              )}
            </p>
          </li>
          <li>
            <h4 className="left">What is your area of interest</h4>
            <p className="right">
              {calculateAreaOfInterest(
                singleData.what_is_your_area_of_interest
              )}
            </p>
          </li>
          <li>
            <h4 className="left">Highest Education</h4>
            <p className="right">
              {calculateEducation(singleData.higest_education)}
              {singleData.other_higest_education}
            </p>
          </li>
          <li>
            <h4 className="left">State Name</h4>
            <p className="right">{singleData.state_name}</p>
          </li>
          <li>
            <h4 className="left">District Name</h4>
            <p className="right">{singleData.district_name}</p>
          </li>
          <li>
            <h4 className="left">Block Name</h4>
            <p className="right">{singleData.block_name}</p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default VolunteerView;
