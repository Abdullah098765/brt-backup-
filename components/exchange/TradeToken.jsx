import { useState, useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import styles from "./styles/exchange.module.css"
const ThirdwebProviderComp = dynamic(
  () => import("../Providers/ThirdwebProvider"),
  {
    ssr: false,
  }
);
// const ConverterBRGToMatic = dynamic(
//   () => import("../TabComp/TabComponents/Currency/ConverterBRGToMatic"),
//   {
//     ssr: false,
//   }
// );



export default function TradeToken({ history, setHistory, setActiveSection }) {
  const [Menuopen, setMenuopen] = useState(false);
  const profile = useState(true);
  const [selectedOption, setSelectedOption] = useState("Select Currency");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [tax, setTax] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [total, setTotal] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");
  const [nextSection, setNextSection] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  let gasFeePlaceholder = 0;
  let serviceFeePlaceholder = 0;

  if (selectedOption === "USD (US Dollar)") {
    gasFeePlaceholder = 1.7;
    serviceFeePlaceholder = 3.2;
  } else if (selectedOption === "USDT (Matic)") {
    gasFeePlaceholder = 0.5;
    serviceFeePlaceholder = 1.9;
  } else if (selectedOption === "Ethereum (Mainnet)") {
    gasFeePlaceholder = 3.1;
    serviceFeePlaceholder = 2.8;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      const amountValue = parseFloat(amount) || 0;

      if (
        amountValue > 0 &&
        selectedOption !== "Select Currency" &&
        tax !== "" &&
        serviceFee !== "" &&
        total !== "" &&
        currency !== ""
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [amount, selectedOption, tax, serviceFee, total]);

  useEffect(() => {
    const amountValue = parseFloat(amount) || 0;
    const taxValue = (amountValue * gasFeePlaceholder) / 100;
    const serviceFeeValue = (amountValue * serviceFeePlaceholder) / 100;

    const calculatedTotal = (amountValue - taxValue - serviceFeeValue) / 3;
    setTax(taxValue.toFixed(2));
    setServiceFee(serviceFeeValue.toFixed(2));
    setTotal(calculatedTotal.toFixed(2));
  }, [amount, selectedOption]);

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    const numbersOnly = /^[0-9]*$/;
    if (inputValue === "" || numbersOnly.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  //   useEffect(() => {
  //     const timeout = setTimeout(() => {

  //       if (amount && selectedOption && tax && serviceFee && total) {
  //         setIsFormValid(true);
  //       } else {
  //         setIsFormValid(false);
  //       }
  //     }, 2000);
  //     return () => clearTimeout(timeout);
  //   }, [amount, selectedOption, tax, serviceFee, total]);

  return (
    <div className="flex w-full h-full min-h-[100%]">
      <section className="text-gray-600 body-font w-full">
        {!history ? (
          <h1 className="text-center main-text lg:text-2xl text-xl">
            Token Exchange
          </h1>

        ) : (
          <h1 className="text-center main-text lg:text-2xl text-xl">
            Exchange History
          </h1>

        )}

        <div className="tube-card-dark ">
          <div classNanme="flex justify-center items-center text-center main-text text-2xl -mb-2">
            sell or convert your BRG
          </div>

          {!isFormValid && !history && (
            <ThirdwebProviderComp>
              {/* <ConverterBRGToMatic history={history} setHistory={setHistory} setActiveSection={setActiveSection} /> */}
            </ThirdwebProviderComp>
          )}

          {isFormValid && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >

                <div className="p-6 main-text flex w-full h-auto space-x-10">
                  <div className="flex-col w-1/2">
                    <h3 className="main-text text-xl my-3">
                      Billion Information
                    </h3>
                    <div className="mt-4 flex items-center">
                      <label htmlFor="reciever-name" className="mr-7">
                        Name
                      </label>
                      <input
                        id="reciever-name"
                        type="text"
                        name="reciever-name"
                        className="input flex-1"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label htmlFor="reciever-email" className="mr-7">
                        Email
                      </label>
                      <input
                        id="reciever-email"
                        type="email"
                        name="reciever-email"
                        className="input flex-1"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label htmlFor="reciever-address" className="mr-2">
                        Address
                      </label>
                      <input
                        id="reciever-address"
                        type="text"
                        name="reciever-address"
                        className="input flex-1"
                        placeholder="Enter Address"
                      />
                    </div>
                    <div className="mt-4 flex items-center">
                      <label htmlFor="reciever-number" className="mr-4">
                        Phone
                      </label>
                      <input
                        id="reciever-number"
                        type="text"
                        name="reciever-number"
                        className="input flex-1"
                        placeholder="Enter Phone number"
                      />
                    </div>
                  </div>

                  <div className="flex-col w-1/2">
                    <div className="mt-3">
                      <label
                        htmlFor="payment-method"
                        className="main-text text-xl mb-5"
                      >
                        Accept Payment Via: {selectedPayment}
                      </label>
                      <select
                        id="payment-method"
                        name="payment-method"
                        className="select mt-4"
                        value={selectedPayment}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                      >
                        <option value=" " className="text-[#000]">
                          Select Payment
                        </option>
                        <option value="Bank Account" className="text-[#000]">
                          Bank Account
                        </option>
                        <option value="Debit/Credit Card" className="text-[#000]">
                          Debit/Credit Card
                        </option>
                        <option value="Paypal" className="text-[#000]">
                          Paypal
                        </option>
                        <option value="Digital Wallet" className="text-[#000]">
                          Digital Wallet
                        </option>
                      </select>
                    </div>

                    {selectedPayment === "Bank Account" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className=" w-full mt-2">
                          <div className="text-lg">Bank Details:</div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="acno" className="mr-1">
                              Account Number
                            </label>
                            <input
                              id="acno"
                              type="text"
                              name="acno"
                              className="input flex-1 ml-3"
                              placeholder="Enter Account Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="bank-name" className="mr-10">
                              Bank Name
                            </label>
                            <input
                              id="bank-name"
                              type="text"
                              name="bank-name"
                              className="input flex-1 ml-3"
                              placeholder="Enter Bank Name"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="swift-code" className="mr-4">
                              SWIFT Number
                            </label>
                            <input
                              id="swift-code"
                              type="text"
                              name="swift-code"
                              className="input flex-1 ml-3"
                              placeholder="Enter SWIFT Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="iban-code" className="mr-5">
                              IBAN Number
                            </label>
                            <input
                              id="iban-code"
                              type="text"
                              name="iban-code"
                              className="input flex-1 ml-3"
                              placeholder="Enter IBAN Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="country" className="w-1/3 mb-0">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              className="select h-16 w-full"
                            >
                              <option value>Choose Country</option>
                              <option value="United States">United States</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Australia">Australia</option>
                              <option value="Germany">Germany</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Denmark">Denmark</option>
                              <option value="Norway">Norway</option>
                              <option value="New-Zealand">New Zealand</option>
                              <option value="Afghanistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American-Samoa">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Antigua Barbuda">
                                Antigua &amp; Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
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
                              <option value="Bosnia">
                                Bosnia &amp; Herzegovina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="British">
                                British Virgin Islands
                              </option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Cape">Cape Verde</option>
                              <option value="Cayman">Cayman Islands</option>
                              <option value="Central-African">
                                Central African Republic
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Costa-Rica">Costa Rica</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czechia">Czechia</option>
                              <option value="Côte">Côte d'Ivoire</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican">
                                Dominican Republic
                              </option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El-Salvador">El Salvador</option>
                              <option value="Equatorial-Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="Gabon">Gabon</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Greece">Greece</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guernsey">Guernsey</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-Bissau">Guinea-Bissau</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong-Kong">
                                Hong Kong SAR China
                              </option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">Liechtenstein</option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macedonia">Macedonia</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montenegro">Montenegro</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar (Burma)</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherlands">Netherlands</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="North-Korea">North Korea</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="Palestinian">
                                Palestinian Territories
                              </option>
                              <option value="Panama">Panama</option>
                              <option value="Papua">Papua New Guinea</option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Philippines">Philippines</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Réunion">Réunion</option>
                              <option value="Samoa">Samoa</option>
                              <option value="San-Marino">San Marino</option>
                              <option value="Saudi-Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra-Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon-Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South-Africa">South Africa</option>
                              <option value="South-Korea">South Korea</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri-Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Sao-Tome-and-Principe">
                                São Tomé &amp; Príncipe
                              </option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Timor-Leste">Timor-Leste</option>
                              <option value="Togo">Togo</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad-and-Tobago">
                                Trinidad &amp; Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="UAE">United Arab Emirates</option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                          </div>

                          <div className="mt-5 flex justify-end">
                            <button className={`${styles.globalBtnMd, styles.powder} px-1`}>
                              <div className="PurpleIcon__GreyCircle">
                                <div className="GreenIcon__GreenCircle">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 12.75l6 6 9-13.5"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="not-italic  text-[17px] leading-[130%] text-white text-[17px] m-0 hover:brightness-125">
                                <p className="mt-2 ml-2 text-[#1e78af99] engraved2 font-bold tracking-wider pr-2">
                                  {" "}
                                  Save
                                </p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedPayment === "Debit/Credit Card" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full mt-2">
                          <div className="text-lg">Card Details:</div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="acno" className="mr-1">
                              Account Number
                            </label>
                            <input
                              id="acno"
                              type="text"
                              name="acno"
                              className="input flex-1 ml-3"
                              placeholder="Enter Account Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="bank-name" className="mr-10">
                              Bank Name
                            </label>
                            <input
                              id="bank-name"
                              type="text"
                              name="bank-name"
                              className="input flex-1 ml-3"
                              placeholder="Enter Bank Name"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="swift-code" className="mr-4">
                              SWIFT Number
                            </label>
                            <input
                              id="swift-code"
                              type="text"
                              name="swift-code"
                              className="input flex-1 ml-3"
                              placeholder="Enter SWIFT Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="iban-code" className="mr-5">
                              IBAN Number
                            </label>
                            <input
                              id="iban-code"
                              type="text"
                              name="iban-code"
                              className="input flex-1 ml-3"
                              placeholder="Enter IBAN Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="country" className="w-1/3 mb-0">
                              Country
                            </label>
                            <select
                              id="country"
                              name="country"
                              className="select h-16"
                            >
                              <option value>Choose Country</option>
                              <option value="United States">United States</option>
                              <option value="United Kingdom">
                                United Kingdom
                              </option>
                              <option value="Canada">Canada</option>
                              <option value="Australia">Australia</option>
                              <option value="Germany">Germany</option>
                              <option value="Sweden">Sweden</option>
                              <option value="Denmark">Denmark</option>
                              <option value="Norway">Norway</option>
                              <option value="New-Zealand">New Zealand</option>
                              <option value="Afghanistan">Afghanistan</option>
                              <option value="Albania">Albania</option>
                              <option value="Algeria">Algeria</option>
                              <option value="American-Samoa">Andorra</option>
                              <option value="Angola">Angola</option>
                              <option value="Antigua Barbuda">
                                Antigua &amp; Barbuda
                              </option>
                              <option value="Argentina">Argentina</option>
                              <option value="Armenia">Armenia</option>
                              <option value="Aruba">Aruba</option>
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
                              <option value="Bosnia">
                                Bosnia &amp; Herzegovina
                              </option>
                              <option value="Botswana">Botswana</option>
                              <option value="Brazil">Brazil</option>
                              <option value="British">
                                British Virgin Islands
                              </option>
                              <option value="Brunei">Brunei</option>
                              <option value="Bulgaria">Bulgaria</option>
                              <option value="Burkina">Burkina Faso</option>
                              <option value="Burundi">Burundi</option>
                              <option value="Cambodia">Cambodia</option>
                              <option value="Cameroon">Cameroon</option>
                              <option value="Cape">Cape Verde</option>
                              <option value="Cayman">Cayman Islands</option>
                              <option value="Central-African">
                                Central African Republic
                              </option>
                              <option value="Chad">Chad</option>
                              <option value="Chile">Chile</option>
                              <option value="China">China</option>
                              <option value="Colombia">Colombia</option>
                              <option value="Comoros">Comoros</option>
                              <option value="Costa-Rica">Costa Rica</option>
                              <option value="Croatia">Croatia</option>
                              <option value="Cuba">Cuba</option>
                              <option value="Cyprus">Cyprus</option>
                              <option value="Czechia">Czechia</option>
                              <option value="Côte">Côte d'Ivoire</option>
                              <option value="Djibouti">Djibouti</option>
                              <option value="Dominica">Dominica</option>
                              <option value="Dominican">
                                Dominican Republic
                              </option>
                              <option value="Ecuador">Ecuador</option>
                              <option value="Egypt">Egypt</option>
                              <option value="El-Salvador">El Salvador</option>
                              <option value="Equatorial-Guinea">
                                Equatorial Guinea
                              </option>
                              <option value="Eritrea">Eritrea</option>
                              <option value="Estonia">Estonia</option>
                              <option value="Ethiopia">Ethiopia</option>
                              <option value="Fiji">Fiji</option>
                              <option value="Finland">Finland</option>
                              <option value="France">France</option>
                              <option value="Gabon">Gabon</option>
                              <option value="Georgia">Georgia</option>
                              <option value="Ghana">Ghana</option>
                              <option value="Greece">Greece</option>
                              <option value="Grenada">Grenada</option>
                              <option value="Guatemala">Guatemala</option>
                              <option value="Guernsey">Guernsey</option>
                              <option value="Guinea">Guinea</option>
                              <option value="Guinea-Bissau">Guinea-Bissau</option>
                              <option value="Guyana">Guyana</option>
                              <option value="Haiti">Haiti</option>
                              <option value="Honduras">Honduras</option>
                              <option value="Hong-Kong">
                                Hong Kong SAR China
                              </option>
                              <option value="Hungary">Hungary</option>
                              <option value="Iceland">Iceland</option>
                              <option value="India">India</option>
                              <option value="Indonesia">Indonesia</option>
                              <option value="Iran">Iran</option>
                              <option value="Iraq">Iraq</option>
                              <option value="Ireland">Ireland</option>
                              <option value="Israel">Israel</option>
                              <option value="Italy">Italy</option>
                              <option value="Jamaica">Jamaica</option>
                              <option value="Japan">Japan</option>
                              <option value="Jordan">Jordan</option>
                              <option value="Kazakhstan">Kazakhstan</option>
                              <option value="Kenya">Kenya</option>
                              <option value="Kuwait">Kuwait</option>
                              <option value="Kyrgyzstan">Kyrgyzstan</option>
                              <option value="Laos">Laos</option>
                              <option value="Latvia">Latvia</option>
                              <option value="Lebanon">Lebanon</option>
                              <option value="Lesotho">Lesotho</option>
                              <option value="Liberia">Liberia</option>
                              <option value="Libya">Libya</option>
                              <option value="Liechtenstein">Liechtenstein</option>
                              <option value="Lithuania">Lithuania</option>
                              <option value="Luxembourg">Luxembourg</option>
                              <option value="Macedonia">Macedonia</option>
                              <option value="Madagascar">Madagascar</option>
                              <option value="Malawi">Malawi</option>
                              <option value="Malaysia">Malaysia</option>
                              <option value="Maldives">Maldives</option>
                              <option value="Mali">Mali</option>
                              <option value="Malta">Malta</option>
                              <option value="Mauritania">Mauritania</option>
                              <option value="Mauritius">Mauritius</option>
                              <option value="Mexico">Mexico</option>
                              <option value="Moldova">Moldova</option>
                              <option value="Monaco">Monaco</option>
                              <option value="Mongolia">Mongolia</option>
                              <option value="Montenegro">Montenegro</option>
                              <option value="Morocco">Morocco</option>
                              <option value="Mozambique">Mozambique</option>
                              <option value="Myanmar">Myanmar (Burma)</option>
                              <option value="Namibia">Namibia</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Netherlands">Netherlands</option>
                              <option value="Nicaragua">Nicaragua</option>
                              <option value="Niger">Niger</option>
                              <option value="Nigeria">Nigeria</option>
                              <option value="North-Korea">North Korea</option>
                              <option value="Oman">Oman</option>
                              <option value="Pakistan">Pakistan</option>
                              <option value="Palau">Palau</option>
                              <option value="Palestinian">
                                Palestinian Territories
                              </option>
                              <option value="Panama">Panama</option>
                              <option value="Papua">Papua New Guinea</option>
                              <option value="Paraguay">Paraguay</option>
                              <option value="Peru">Peru</option>
                              <option value="Philippines">Philippines</option>
                              <option value="Poland">Poland</option>
                              <option value="Portugal">Portugal</option>
                              <option value="Puerto">Puerto Rico</option>
                              <option value="Qatar">Qatar</option>
                              <option value="Romania">Romania</option>
                              <option value="Russia">Russia</option>
                              <option value="Rwanda">Rwanda</option>
                              <option value="Réunion">Réunion</option>
                              <option value="Samoa">Samoa</option>
                              <option value="San-Marino">San Marino</option>
                              <option value="Saudi-Arabia">Saudi Arabia</option>
                              <option value="Senegal">Senegal</option>
                              <option value="Serbia">Serbia</option>
                              <option value="Seychelles">Seychelles</option>
                              <option value="Sierra-Leone">Sierra Leone</option>
                              <option value="Singapore">Singapore</option>
                              <option value="Slovakia">Slovakia</option>
                              <option value="Slovenia">Slovenia</option>
                              <option value="Solomon-Islands">
                                Solomon Islands
                              </option>
                              <option value="Somalia">Somalia</option>
                              <option value="South-Africa">South Africa</option>
                              <option value="South-Korea">South Korea</option>
                              <option value="Spain">Spain</option>
                              <option value="Sri-Lanka">Sri Lanka</option>
                              <option value="Sudan">Sudan</option>
                              <option value="Suriname">Suriname</option>
                              <option value="Swaziland">Swaziland</option>
                              <option value="Switzerland">Switzerland</option>
                              <option value="Syria">Syria</option>
                              <option value="Sao-Tome-and-Principe">
                                São Tomé &amp; Príncipe
                              </option>
                              <option value="Tajikistan">Tajikistan</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Thailand">Thailand</option>
                              <option value="Timor-Leste">Timor-Leste</option>
                              <option value="Togo">Togo</option>
                              <option value="Tonga">Tonga</option>
                              <option value="Trinidad-and-Tobago">
                                Trinidad &amp; Tobago
                              </option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="Turkey">Turkey</option>
                              <option value="Turkmenistan">Turkmenistan</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Ukraine">Ukraine</option>
                              <option value="UAE">United Arab Emirates</option>
                              <option value="Uruguay">Uruguay</option>
                              <option value="Uzbekistan">Uzbekistan</option>
                              <option value="Vanuatu">Vanuatu</option>
                              <option value="Venezuela">Venezuela</option>
                              <option value="Vietnam">Vietnam</option>
                              <option value="Yemen">Yemen</option>
                              <option value="Zambia">Zambia</option>
                              <option value="Zimbabwe">Zimbabwe</option>
                            </select>
                          </div>

                          <div className="mt-5 flex justify-end">
                            <button className={`${styles.globalBtnMd, styles.powder} px-1`}>
                              <div className="PurpleIcon__GreyCircle">
                                <div className="GreenIcon__GreenCircle">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 12.75l6 6 9-13.5"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="not-italic  text-[17px] leading-[130%] text-white text-[17px] m-0 hover:brightness-125">
                                <p className="mt-2 ml-2 text-[#1e78af99] engraved2 font-bold tracking-wider pr-2">
                                  {" "}
                                  Save
                                </p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {selectedPayment === "Digital Wallet" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full mt-2">
                          <div className="text-lg">MetaWallet Details:</div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="acno" className="mr-1">
                              Meta Address
                            </label>
                            <input
                              id="acno"
                              type="text"
                              name="acno"
                              className="input flex-1 ml-3"
                              placeholder="Enter Account Number"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="bank-name" className="mr-10">
                              Network
                            </label>
                            <input
                              id="bank-name"
                              type="text"
                              name="bank-name"
                              className="input flex-1 ml-3"
                              placeholder="Enter Bank Name"
                            />
                          </div>
                          <div className="flex items-center mt-4">
                            <label htmlFor="swift-code" className="mr-4">
                              Chain
                            </label>
                            <input
                              id="swift-code"
                              type="text"
                              name="swift-code"
                              className="input flex-1 ml-3"
                              placeholder="Enter SWIFT Number"
                            />
                          </div>

                          <div className="mt-5 flex justify-end">
                            <button className={`${styles.globalBtnMd, styles.powder} px-1`}>
                              <div className="PurpleIcon__GreyCircle">
                                <div className="GreenIcon__GreenCircle">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M4.5 12.75l6 6 9-13.5"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="not-italic  text-[17px] leading-[130%] text-white text-[17px] m-0 hover:brightness-125">
                                <p className="mt-2 ml-2 text-[#1e78af99] engraved2 font-bold tracking-wider pr-2">
                                  {" "}
                                  Save
                                </p>
                              </div>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>

              </motion.div>


            </>

          )}
        </div>


      </section>
    </div>
  );
}
