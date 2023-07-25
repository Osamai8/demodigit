import { combineReducers } from "redux";
import { stateReducer } from "./State/Reducer";
import { DistrictReducer } from "./District/Reducer";
import { blockReducer } from "./Block/Reducer";
import { GrampanchayatReducer } from "./Grampanchayat/Reducer";
import { VillageReducer } from "./Village/Reducer";
import { DashBoardReducer } from "./Dashboard/Reducer";
import { ngoPartnerReducer } from "./NgoPartner/Reducer";
import { volunteerReducer } from "./Volunteer/Reducer";
import { authReducer, resetPasswordReducer } from "./Auth/reducer";
import { domainReducer } from "./Domain/Reducer";
import { subDomainReducer } from "./SubDomain/Reducer";
import { streamReducer } from "./Stream/Reducer";
import { userManagementReducer } from "./Users/Reducer";
import {
  userLevelCreateReducer,
  userLevelDeleteReducer,
  userLevelListReducer,
  userLevelUpdateReducer,
} from "./UserLevel/Reducer";
import { campaignReducer } from "./Campaign/Reducer";
import { beneficiaryReducer } from "./Beneficiary/Reducer";
import { languagesReducer } from "./Languages/Reducer";
import { benInterventionReducer } from "./BeneficiaryIntervention/Reducer";
import { communityInterventionReducer } from "./CommunityIntervention/Reducer";


const rootReducer = combineReducers({
  auth: authReducer,
  resetPass: resetPasswordReducer,
  user: userManagementReducer,
  userLevelList: userLevelListReducer,
  userLevelCreate: userLevelCreateReducer,
  userLevelUpdate: userLevelUpdateReducer,
  userLevelDelete: userLevelDeleteReducer,
  State: stateReducer,
  District: DistrictReducer,
  Block: blockReducer,
  Domain: domainReducer,
  SubDomain: subDomainReducer,
  Stream: streamReducer,
  Grampanchayat: GrampanchayatReducer,
  Village: VillageReducer,
  Dashboard: DashBoardReducer,
  ngoPartner: ngoPartnerReducer,
  volunteer: volunteerReducer,
  campaign: campaignReducer,
  beneficiary: beneficiaryReducer,
  languages: languagesReducer,
  beneficiaryIntervention: benInterventionReducer,
  communityIntervention: communityInterventionReducer
});
export default rootReducer;
