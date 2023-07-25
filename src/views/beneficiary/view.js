import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Page from "src/components/Page";
import { beneficiaryListAction } from "src/Redux/Beneficiary/action";
import {
  getBeneficiaryCategory,
  getBeneficiaryDisability,
  getBeneficiaryStatus,
  getBeneficiaryDropoutReason,
  getBeneficiaryEngagement,
  getBeneficiaryOccupation,
  getBeneficiaryGender,
  calculateModeOfIntervention,
  calculateCallStatus,
  calculateAccessibilityOfMobile,
  calculateCovidVaccinationStatus,
  getBeneficiaryClass
} from "src/utils/halper";
import { fetchWrapper } from "../../services/http_requests";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_API_URL;


const BeneficiaryView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [singleData, setsingleData] = useState({});

  useEffect(() => {
    if (id) {
      getListData(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useSelector((state) => {
    return state.beneficiary.data.data;
  });

  const getListData = async (id) => {
    let url = `${baseUrl}beneficiary/view/${id}`;
    try {
      let data = await fetchWrapper.get(url);
      setsingleData(data?.data);
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Page href="/app/beneficiary/list" title="Beneficiary view">
      <div className="viewWrapper">
        <ul>
          <h3 className="viewTitle">Family Details</h3>
          <li>
            <h4 className="left">ID</h4>
            <p className="right">{singleData.id}</p>
          </li>
          <li>
            <h4 className="left">State</h4>
            <p className="right">{singleData.state_name}</p>
          </li>
          <li>
            <h4 className="left">District</h4>
            <p className="right">{singleData.district_name}</p>
          </li>
          <li>
            <h4 className="left">Block</h4>
            <p className="right">{singleData.block_name}</p>
          </li>
          {singleData.cluster_name && (
            <li>
              <h4 className="left">Cluster</h4>
              <p className="right">{singleData.cluster_name}</p>
            </li>
          )}
          {singleData.village && (
            <li>
              <h4 className="left">Village Name</h4>
              <p className="right">{singleData.village}</p>
            </li>
          )}
          <li>
            <h4 className="left">Father's Name</h4>
            <p className="right">{singleData.father_name}</p>
          </li>
          <li>
            <h4 className="left">Mother's Name</h4>
            <p className="right">{singleData.mother_name}</p>
          </li>
          <li>
            <h4 className="left">Contact Number</h4>
            <p className="right">{singleData.mobile_number}</p>
          </li>

          {singleData.campaign_name !== "Buniyaadi Shiksha Abiyaan" &&
            (<>
              <li>
                <h4 className="left">Category</h4>
                <p className="right">
                  {getBeneficiaryCategory(singleData.cetegory)}
                </p>
              </li>
              <li>
                <h4 className="left">Below Poverty Line (BPL) Status</h4>
                <p className="right">
                  {singleData.bpl_status === "1" && "Yes"}
                  {singleData.bpl_status === "2" && "No"}
                </p>
              </li>
              <li>
                <h4 className="left">Family Occupation</h4>
                <p className="right">
                  {singleData.other_family_occupation
                    ? singleData.other_family_occupation
                    : getBeneficiaryOccupation(singleData.family_occupation)}
                </p>
              </li>
              {singleData.how_many_members_are_there_in_family && (
                <li>
                  <h4 className="left">Family member count</h4>
                  <p className="right">
                    {singleData.how_many_members_are_there_in_family}
                  </p>
                </li>
              )}
              <li>
                <h4 className="left">Mode of intervention</h4>
                <p className="right">
                  {singleData.mode_of_intervention
                    ? singleData.mode_of_intervention
                    : calculateModeOfIntervention(singleData.mode_of_intervention)}
                </p>
              </li>
              <li>
                <h4 className="left">Call Status</h4>
                <p className="right">
                  {singleData.call_status
                    ? singleData.call_status
                    : calculateCallStatus(singleData.call_status)}
                </p>
              </li>
            </>
            )}

          {singleData.campaign_name !== "Buniyaadi Shiksha Abiyaan" &&
            (
              <h3 className="viewTitle">
                Adolescent girl child details(Age 10 to 19 years)
              </h3>
            )}
          <li>
            <h4 className="left">Child First Name</h4>
            <p className="right">{singleData.first_name}</p>
          </li>
          <li>
            <h4 className="left">Child Last Name</h4>
            <p className="right">{singleData.last_name}</p>
          </li>

          <li>
            <h4 className="left">Date of Birth of Child</h4>
            <p className="right">
              {moment(singleData.date_of_birth).format("DD/MM/YYYY")}
            </p>
          </li>
          <li>
            <h4 className="left">Age</h4>
            {/* <p className="right">{calculateAge(singleData.date_of_birth)}</p> */}
            <p className="right">{singleData.age}</p>
          </li>
          <li>
            <h4 className="left">Gender</h4>
            <p className="right">{getBeneficiaryGender(singleData.gender)}</p>
          </li>
          
          {singleData.campaign_name === "Buniyaadi Shiksha Abiyaan" &&
            (<>
              <li>
                <h4 className="left">Class</h4>
                <p className="right">
                  {getBeneficiaryClass(singleData.class)}
                </p>
              </li>
            </>
            )
          }

          {singleData.campaign_name !== "Buniyaadi Shiksha Abiyaan" &&
            (<>
              <li>
                <h4 className="left">Disability Type</h4>
                <p className="right">
                  {getBeneficiaryDisability(singleData.disability_type)}
                </p>
              </li>

              <li>
                <h4 className="left">School enrollment status of Child</h4>
                <p className="right">
                  {getBeneficiaryStatus(singleData.student_status)}
                </p>
              </li>
            </>
            )
          }

          {singleData.school && (
            <li>
              <h4 className="left">School Name</h4>
              <p className="right">{singleData.school}</p>
            </li>
          )}
          {singleData.udise_code && (
            <li>
              <h4 className="left">School udise code</h4>
              <p className="right">{singleData.udise_code}</p>
            </li>
          )}

          {singleData.last_class_attended && (
            <li>
              <h4 className="left">Last Class Attended</h4>
              <p className="right">{singleData.last_class_attended}</p>
            </li>
          )}
          {singleData.dropout_year && (
            <li>
              <h4 className="left">Dropout Year</h4>
              <p className="right">{singleData.dropout_year}</p>
            </li>
          )}
          {singleData.dropout_reason && (
            <li>
              <h4 className="left">Dropout Reason</h4>
              <p className="right">
                {singleData.dropout_other_reason
                  ? singleData.dropout_other_reason
                  : getBeneficiaryDropoutReason(singleData.dropout_reason)}
              </p>
            </li>
          )}
          {singleData.present_eng_of_std && (
            <li>
              <h4 className="left">Present Engagement of Child</h4>
              <p className="right">
                {singleData.other_present_eng_of_std
                  ? singleData.other_present_eng_of_std
                  : getBeneficiaryEngagement(singleData.present_eng_of_std)}
              </p>
            </li>
          )}

          {singleData.campaign_name !== "Buniyaadi Shiksha Abiyaan" &&
            (<>
              <li>
                <h4 className="left">School enrollment status of Child</h4>
                <p className="right">
                  {getBeneficiaryStatus(singleData.student_status)}
                </p>
              </li>
              <li>
                <h4 className="left">Accessibility of Mobile</h4>
                <p className="right">
                  {singleData.accessibility_of_mobile_phone
                    ? singleData.accessibility_of_mobile_phone
                    : calculateAccessibilityOfMobile(singleData.accessibility_of_mobile_phone)}
                </p>
              </li>
              <li>
                <h4 className="left">Covid Vaccination Status</h4>
                <p className="right">
                  {singleData.covid_vaccination_status
                    ? singleData.covid_vaccination_status
                    : calculateCovidVaccinationStatus(singleData.covid_vaccination_status)}
                </p>
              </li>
            </>
            )}
        </ul>
      </div>
    </Page>
  );
};

export default BeneficiaryView;
