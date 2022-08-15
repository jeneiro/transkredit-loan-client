import React, { useState, Fragment } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance as axios } from "../interceptor";
import { webapibaseurl } from "../environment";
import { useAlert } from "react-alert";
import CorporateStepper from "./corporateStepper";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Director() {
  const alert = useAlert();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({});
  const [selectedDateDOB, handleDateChangeDOB] = useState(new Date());
  const [selectedDateID, handleDateChangeID] = useState(new Date());
  const [selectedDateED, handleDateChangeED] = useState(new Date());
  const [activate, setActivate] = useState(true);
  const id = localStorage.getItem("CorporateId")

 // const dashboard = `${webapibaseurl}/dashboard?officerId=${url}`;
 const individualURL = `${webapibaseurl}/director/${id}`;
  function changeHandler(e) {
    e.preventDefault();
    if (e.target.name === "nationality" && e.target.value === "Nigeria") {
      setActivate(false);
    } if(e.target.name === "nationality" && e.target.value !== "Nigeria") {
      setActivate(true);
    }
    const name = e.target.name;
    const value = e.target.value;
    console.log(formik.values.bvn);
    setPayload({ ...payload, [name]: value });
  }
  function submitForm(e) {
    e.preventDefault();
    payload.dob = selectedDateDOB;
    payload.expiryDate = selectedDateED;
    payload.issuanceDate = selectedDateID;
    payload.bvn = formik.values.bvn;
    axios.post(individualURL, payload).then((res)=>{
    
      alert.success("Director Information submitted")
      navigate("/app/add-director")
    }
    
    ).catch((error)=>{alert.error(error.response.data.msg)})
   
  }
  const formSchema = Yup.object().shape({
    bvn: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .length(11,'Must be exactly 11 digits')
  });
  const initialValues = {
    bvn: "",
   
  };
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema})

  return (
    <div style={{ marginTop: 155 }}>
   <CorporateStepper activeStep={1} />
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
            <h6>DIRECTOR INFORMATION</h6>
          </div>
          <div style={{ padding: 2 }}>
            <div class="row">
              <div class=" col-md-4">
                <label>Title</label>
                <select
                  name="title"
                  class="input-group"
                  required
                  onChange={changeHandler}
                >
                  {" "}
                  <option selected>--Title--</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div class="input-group col-md-8">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={"" || payload.name}
                  required
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div class=" row">
              <div className="input-group col-md-4">
                <label>Date Of Birth</label>
                <Fragment className="input-group">
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Date Of Birth"
                    format="dd/MM/yyyy"
                    value={selectedDateDOB}
                    maxDate={Date.now}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDateChangeDOB(date)}
                  />
                </Fragment>
              </div>

              <div class=" col-md-4">
                <label>Gender</label>
                <div>
                  <input
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={changeHandler}
                  />
                  <label for="gender-male">Male</label>
                  <input
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={changeHandler}
                  />
                  <label for="gender-female">Female</label>
                </div>
              </div>

              <div className=" input-group col-md-4">
                {" "}
                <label>BVN</label>{" "}
                <input
                  type="number"
                  placeholder="BVN"
                  minLength={11}
                  required
                  name="bvn"
                  value={"" || payload.bvn}
                {...formik.getFieldProps("bvn")}
                />
                 {formik.touched.bvn && formik.errors.bvn ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block" style={{ color: "red" }}>
                        *{formik.errors.bvn}
                      </div>
                    </div>
                  ) : null}
              </div>
            </div>
            <div className="row">
              <div className=" input-group col-md-4">
                {" "}
                <label>Phone Number</label>{" "}
                <input
                  type="number"
                  placeholder="Phone Number"
                  minLength={11}
                  required
                  name="phone"
                  value={"" || payload.phone}
                  onChange={changeHandler}
                />
              </div>

              <div className=" input-group col-md-4">
                {" "}
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

              <div className=" input-group col-md-4">
                {" "}
                <label>Mother's Maiden Name</label>{" "}
                <input
                  type="text"
                  placeholder="Mother's Maiden Name"
                  required
                  name="motherMaidenName"
                  value={"" || payload.motherMaidenName}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="row">
              <div class=" col-md-3">
                <label>Marital Status</label>
                <select
                  name="maritalStatus"
                  class="input-group"
                  onChange={changeHandler}
                >
                  <option disabled selected>
                    --Select Status--
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div class="input-group col-md-3">
                <label>TIN</label>
                <input
                  type="text"
                  placeholder="TIN"
                  name="tin"
                  value={"" || payload.tin}
                  required
                  onChange={changeHandler}
                />
              </div>

              <div className="input-group col-md-3 " style={{ align: "left" }}>
                <label>Nationality</label>
                <select
                  class="input-group"
                  name="nationality"
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
              <div class=" col-md-3">
                <label>State of Origin (*Nigerians)</label>
                <select
                  name="stateOfOrigin"
                  class="input-group"
                  onChange={changeHandler}
                  disabled={activate}
                >
                  <option disabled selected>
                    --Select State--
                  </option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="FCT">Federal Capital Territory</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div class=" col-md-3">
                <label>Means Of Identification</label>
                <select
                  name="meansOfID"
                  class="input-group"
                  onChange={changeHandler}
                >
                  <option value="Driver's License">Driver's License</option>
                  <option value="International Passport">
                    International Passport
                  </option>
                  <option value="National Identity Card">
                    National Identity Card
                  </option>
                  <option value="Birth Certificate">Birth Certificate</option>
                </select>
              </div>

              <div class="input-group col-md-3">
                <label>ID Number</label>
                <input
                  type="text"
                  placeholder="ID Number"
                  name="IDnumber"
                  value={"" || payload.IDnumber}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div className="input-group col-md-3">
                <label>Issuance Date</label>
                <Fragment className="input-group">
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Issuance Date"
                    format="dd/MM/yyyy"
                    value={selectedDateID}
                    maxDate={Date.now()}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDateChangeID(date)}
                  />
                </Fragment>
              </div>
              <div className="input-group col-md-3">
                <label>Expire Date</label>
                <Fragment className="input-group">
                  <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Expire Date"
                    format="dd/MM/yyyy"
                    value={selectedDateED}
                    minDate={selectedDateID}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => handleDateChangeED(date)}
                  />
                </Fragment>
              </div>
            </div>
            <div className="row">
            <div class="input-group col-md-4">
                <label>Occupation</label>
                <input
                  type="text"
                  placeholder="Occupation"
                  name="occupation"
                  value={"" || payload.occupation}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class="input-group col-md-4">
                <label>Place of Work</label>
                <input
                  type="text"
                  placeholder="Place of Work"
                  name="placeOfWork"
                  value={"" || payload.placeOfWork}
                  required
                  onChange={changeHandler}
                />
              </div>
              <div class="input-group col-md-4">
                <label>Nature Of Business</label>
                <input
                  type="text"
                  placeholder="Nature Of Business"
                  name="natureOfBusiness"
                  value={"" || payload.natureOfBusiness}
                  required
                  onChange={changeHandler}
                />
              </div>
              </div>

            <div className="row">
              <div className="input-group col-md-6">
                <label>Work Address</label>
                <input
                  type="text"
                  className="input-group"
                  placeholder="Work Address"
                  name="workAddress"
                  value={"" || payload.workAddress}
                  required
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="input-group col-md-6">
                <label>Residential Address</label>
                <input
                  type="text"
                  className="input-group"
                  placeholder=" Residential Address"
                  name="address"
                  value={"" || payload.address}
                  required
                  onChange={changeHandler}
                ></input>
              </div>
              <div className="col-md-4" style={{ marginTop: 30 }}>
                <button type="submit">Add</button>
              </div>
            </div>
          </div>

         
        </form>
      
      </div>
      <div style={{height:100}}>
        &nbsp;
      </div>
    </div>
  );
}
