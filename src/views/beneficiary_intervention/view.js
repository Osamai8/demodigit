import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Page from "src/components/Page";
import { benInterventionListAction } from "src/Redux/BeneficiaryIntervention/action";
import {  getBeneficiaryDisability } from "src/utils/halper";

const BeneficiaryInterventionView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(benInterventionListAction({ id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useSelector((state) => {
    return state.beneficiaryIntervention.data.data;
  });

  let singleData = data?.length ? data[0] : {};
  // console.log(singleData);

  return (
    <Page  href="/app/beneficiary_intervention/list" title="Beneficiary view">
      <div className="viewWrapper">
        <ul>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">Mode of intervention</h4>
            <p className="right">{singleData.mode_of_intervention}</p>
          </li>
          <li>
            <h4 className="left">Call status</h4>
            <p className="right">{singleData.call_status}</p>
          </li>
          <li>
            <h4 className="left">
              Are Parents available to interact with volunteers?
            </h4>
            <p className="right">
              {singleData.parents_available_interact_volunteer}
            </p>
          </li>
          <li>
            <h4 className="left">Name of Village</h4>
            <p className="right">{singleData.village_name}</p>
          </li>
          <li>
            <h4 className="left">Members in family</h4>
            <p className="right">
              {singleData.how_many_members_are_there_in_family}
            </p>
          </li>
          <li>
            <h4 className="left">Student name</h4>
            <p className="right">{singleData.beneficiary_name}</p>
          </li>
          <li>
            <h4 className="left">Volunteer name</h4>
            <p className="right">{singleData.volunteer_name}</p>
          </li>
          <li>
            <h4 className="left">Student Age</h4>
            <p className="right">{singleData.age}</p>
          </li>
          <li>
            <h4 className="left">Student disability type</h4>
            <p className="right">
              {getBeneficiaryDisability(singleData.disability_type)}
            </p>
          </li>
          <li>
            <h4 className="left">Previous Enrollement status of student</h4>
            <p className="right">{singleData.student_status}</p>
          </li>
          <li>
            <h4 className="left">Current Enrollement status of student</h4>
            <p className="right">{singleData.enrollement_status_of_student}</p>
          </li>
          <li>
            <h4 className="left">Present Engagement of child</h4>
            <p className="right">{singleData.present_eng_of_std}</p>
          </li>
          <li>
            <h4 className="left">Is she going to school</h4>
            <p className="right">{singleData.is_she_going_to_school}</p>
          </li>
          <li>
            <h4 className="left">Mode of class she is attending</h4>
            <p className="right">{singleData.mode_of_class_she_is_attending}</p>
          </li>
          <li>
            <h4 className="left">Reasons for not going to school</h4>
            <p className="right">
              {singleData.reasons_for_not_going_to_school}
            </p>
          </li>
          <li>
            <h4 className="left">Other reasons for not going to school</h4>
            <p className="right">
              {singleData.other_reasons_for_not_going_to_school}
            </p>
          </li>

          <li>
            <h4 className="left">Reasons for not enrolling in school</h4>
            <p className="right">
              {singleData.reasons_for_not_enrolling_in_school}
            </p>
          </li>

          <li>
            <h4 className="left">Other reasons for not enrolling in school</h4>
            <p className="right">
              {singleData.other_reasons_for_not_enrolling_in_school}
            </p>
          </li>
          <li>
            <h4 className="left">
              Type of support or Guidance you have provided
            </h4>
            <p className="right">
              {singleData.support_or_guidance_you_have_provided}
            </p>
          </li>
          <li>
            <h4 className="left">
              Other type of support or Guidance you have provided
            </h4>
            <p className="right">
              {singleData.other_support_or_guidance_you_have_provided}
            </p>
          </li>

          <li>
            <h4 className="left">Status of case</h4>
            <p className="right">{singleData.status_of_case}</p>
          </li>

          <li>
            <h4 className="left">Reason of case closure</h4>
            <p className="right">{singleData.reason_of_case_closure}</p>
          </li>
          <li>
            <h4 className="left">Other reason of case closure</h4>
            <p className="right">{singleData.other_reason_of_case_closure}</p>
          </li>
          <h3 className="viewTitle">
            COVID Vaccination Details
          </h3>
          <li>
            <h4 className="left">Previous Vaccination case status of student</h4>
            <p className="right">{singleData.vaccination_case_status_of_case}</p>
          </li>
          <li>
            <h4 className="left">Share current Covid Vaccination Status of student</h4>
            <p className="right">{singleData.current_vaccination_status_student}</p>
          </li>
          <li>
            <h4 className="left">Reason of not getting vaccinated</h4>
            <p className="right">{singleData.reason_of_not_getting_vaccinated}</p>
          </li>
          <li>
            <h4 className="left">Other reason of not getting vaccinated</h4>
            <p className="right">{singleData.other_reason_of_not_getting_vaccinated}</p>
          </li>
          <li>
            <h4 className="left">What type of support or Guidance  you have provided to encourage for Covid vaccination</h4>
            <p className="right">{singleData.what_type_of_support_or_guidance}</p>
          </li>
          <li>
            <h4 className="left">Other type of support or Guidance  you have provided to encourage for Covid Vaccination</h4>
            <p className="right">{singleData.other_type_of_support_or_guidance}</p>
          </li>
          <li>
            <h4 className="left">Vaccination case status of case</h4>
            <p className="right">{singleData.vaccination_case_status_of_case}</p>
          </li>
          <li>
            <h4 className="left">Reason of case closure-Vaccination</h4>
            <p className="right">{singleData.reason_of_case_closure_vaccination}</p>
          </li>
          <li>
            <h4 className="left">Reason of case closure-Vaccination</h4>
            <p className="right">{singleData.other_reason_of_case_closure_vaccination}</p>
          </li>
          <li>
            <h4 className="left">Created At</h4>
            <p className="right">
              {moment(singleData.created_at).format("DD-MM-YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">Updated At</h4>
            <p className="right">
              {moment(singleData.updated_at).format("DD-MM-YYYY")}
            </p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default BeneficiaryInterventionView;
