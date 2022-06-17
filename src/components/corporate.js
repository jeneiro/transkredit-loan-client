import React, { useState, Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import CorporateStepper from "./corporateStepper";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { useAlert } from "react-alert";

export default function Corporate() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [selectedDateDOI, handleDateChangeDOI] = useState(new Date());
  const [selectedDateID, handleDateChangeID] = useState(new Date());
  const [selectedDateED, handleDateChangeED] = useState(new Date());
  const [activate, setActivate] = useState(true);
  const [corporativeName, setCorporativeName] = useState("");
  const id = localStorage.getItem("id");

  // const dashboard = `${webapibaseurl}/dashboard?officerId=${url}`;
  const corporateURL = `${webapibaseurl}/corporate/${id}`;
  function changeHandler(e) {
    e.preventDefault();
    if (e.target.name === "nationality" && e.target.value === "Nigeria") {
      setActivate(false);
    }
    if (e.target.name === "nationality" && e.target.value !== "Nigeria") {
      setActivate(true);
    }
    const name = e.target.name;
    const value = e.target.value;
    setPayload({ ...payload, [name]: value });
  }
  function submitForm(e) {
    e.preventDefault();
    payload.doi = selectedDateDOI;
    payload.expiryDate = selectedDateED;
    payload.issuanceDate = selectedDateID;

    axios
      .post(corporateURL, payload)
      .then((res) => {
        localStorage.setItem("CorporateId", res.data.corporate.id);
        const CorporateId = res.data.corporate.id;
        const url = `${webapibaseurl}/corporative/${CorporateId}`;
        axios
          .post(url,{name: corporativeName})
          .then(() => {
            alert.success("Corporate Information submitted");
            navigate("/app/directors");
          })
          .catch((err) => console.log(err));
      })
      .catch((error) => {
        // alert.error(error.response.data);
        console.log(error);
      });
  }

  return (
    <div style={{ marginTop: 155, marginBottom: 100 }}>
      <CorporateStepper />
      <div class="Form-container ">
        <form className="register-form" onSubmit={submitForm}>
          <h5>Corporate Account Registration</h5>
          <hr />
          <div
            class="row"
            style={{
              backgroundColor: "#f15a29",
              color: "#fff",
              padding: 4,
              margin: 2,
            }}
          >
            <h6>Company Detail</h6>
          </div>
          <div style={{ padding: 2 }}>
            <div class="row">
              <div class=" col-md-4">
                <label> Category</label>
                <select
                  name="category"
                  class="input-group"
                  required
                  onChange={changeHandler}
                >
                  {" "}
                  <option selected>--Category--</option>
                  <option value="llc">Limited Liability Company</option>
                  <option value="plc">Public Limited Company</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole proprietorship">
                    Sole Proprietorship
                  </option>
                  <option value="schools">Schools</option>
                </select>
              </div>
              <div class="input-group col-md-8">
                <label>Company/Business Name</label>
                <input
                  type="text"
                  placeholder="Company/Business Name"
                  name="companyName"
                  value={"" || payload.companyName}
                  required
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div class=" row">
              <div className="input-group col-md-4">
                <label>Date Of Incorporation</label>
                <Fragment className="input-group">
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Date Of Incorporation"
                    format="dd/MM/yyyy"
                    value={selectedDateDOI}
                    maxDate={Date.now}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDateChangeDOI(date)}
                  />
                </Fragment>
              </div>

              <div className=" input-group col-md-4">
                {" "}
                <label>Certificate Of Incorporation Number</label>{" "}
                <input
                  type="number"
                  placeholder="Certificate Of Incorporation Number"
                  // minLength={11}
                  required
                  name="registrationNumber"
                  value={"" || payload.registrationNumber}
                  onChange={changeHandler}
                />
              </div>

              <div className="input-group col-md-4 ">
                <label>Country of Incorporation</label>
                <select
                  class="input-group"
                  name="countryOfRegistration"
                  onChange={changeHandler}
                >
                  <option disabled selected>
                    --Select Country--
                  </option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antartica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegowina">
                    Bosnia and Herzegowina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo">
                    Congo, the Democratic Republic of the
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                  <option value="Croatia">Croatia (Hrvatska)</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="East Timor">East Timor</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="France Metropolitan">
                    France, Metropolitan
                  </option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard and McDonald Islands">
                    Heard and Mc Donald Islands
                  </option>
                  <option value="Holy See">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran (Islamic Republic of)</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Democratic People's Republic of Korea">
                    Korea, Democratic People's Republic of
                  </option>
                  <option value="Korea">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao">Lao People's Democratic Republic</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macau">Macau</option>
                  <option value="Macedonia">
                    Macedonia, The Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova">Moldova, Republic of</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint LUCIA">Saint LUCIA</option>
                  <option value="Saint Vincent">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia (Slovak Republic)</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="Span">Spain</option>
                  <option value="SriLanka">Sri Lanka</option>
                  <option value="St. Helena">St. Helena</option>
                  <option value="St. Pierre and Miguelon">
                    St. Pierre and Miquelon
                  </option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard">
                    Svalbard and Jan Mayen Islands
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syrian Arab Republic</option>
                  <option value="Taiwan">Taiwan, Province of China</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania">Tanzania, United Republic of</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Viet Nam</option>
                  <option value="Virgin Islands (British)">
                    Virgin Islands (British)
                  </option>
                  <option value="Virgin Islands (U.S)">
                    Virgin Islands (U.S.)
                  </option>
                  <option value="Wallis and Futana Islands">
                    Wallis and Futuna Islands
                  </option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className=" input-group col-md-4">
                {" "}
                <label>Nature/Type Of Business</label>{" "}
                <input
                  type="text"
                  placeholder="Nature/Type Of Business"
                  required
                  name="typeOfBusiness"
                  value={"" || payload.typeOfBusiness}
                  onChange={changeHandler}
                />
              </div>
              <div className=" input-group col-md-4">
                <label>Sector/Industry</label>{" "}
                <input
                  type="text"
                  placeholder="Sector/Industry"
                  required
                  name="sector"
                  value={"" || payload.sector}
                  onChange={changeHandler}
                />
              </div>
              <div className=" input-group col-md-4">
                <label>Cooperative Name</label>{" "}
                <input
                  type="text"
                  placeholder="Cooperative Name"
                  required
                  name="sector"
                  value={"" || corporativeName}
                  onChange={(e) => {
                    e.preventDefault();
                    setCorporativeName(e.target.value);
                  }}
                />
              </div>
              <div className=" input-group col-md-4">
                <label>TIN</label>{" "}
                <input
                  type="text"
                  placeholder="TIN"
                  required
                  name="tin"
                  value={"" || payload.tin}
                  onChange={changeHandler}
                />
              </div>

              <div className=" input-group col-md-4">
                <label>Email Address</label>{" "}
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  name="email"
                  value={"" || payload.email}
                  onChange={changeHandler}
                />
              </div>
              <div class="input-group col-md-4">
                <label>Contact Number</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="phoneNumber"
                  value={"" || payload.phoneNumber}
                  required
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="row">
              <div class=" col-md-8">
                <label> Operating Business Address</label>
                <input
                  type="text"
                  placeholder="Operating Business Address"
                  name="OperatingAddress"
                  value={"" || payload.OperatingAddress}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class="input-group col-md-4">
                <label>SCUML Reg No.</label>
                <input
                  type="text"
                  placeholder="Contact Number"
                  name="scumlRegNo"
                  value={"" || payload.scumlRegNo}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class=" col-md-8">
                <label> Corporate Business Address</label>
                <input
                  type="text"
                  placeholder=" Corporate Business Address"
                  name="CorporateAddress"
                  value={"" || payload.CorporateAddress}
                  required
                  onChange={changeHandler}
                />
              </div>

              <div className="col-md-4" style={{ marginTop: 30 }}>
                <button>Submit</button>
              </div>
            </div>
          </div>

          {/* <div class="row">
            <h4>Terms and Conditions</h4>
            <div class="input-group">
              <input id="terms" type="checkbox" />
              <label for="terms">
                I accept the terms and conditions for signing up to this
                service, and hereby confirm I have read the privacy policy.
              </label>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
}
