import React, { Fragment, useContext, useState } from "react";
import axios from "axios";
import { Button, Input, LoadingSpinner, Modal, Toast } from "../../components";
import { errorMessages, initialInputState, toastTypes } from "../../constants";
import { Hide, Show } from "../../assets/icons";
import { encryptPassword } from "../../utils/utils";
import {
  validate,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import {
  StyledAuthentication,
  StyledFormTitle,
  StyledFormItem,
  StyledFormButton,
  StyledFormFooter,
} from "./StyledAuthentication";

const Authentication = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState(initialInputState);
  const [password, setPassword] = useState({
    ...initialInputState,
    isVisible: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [toastData, setToastData] = useState({});

  const toggleShowLogin = () => {
    resetForm();
    setShowLogin((prevShowLogin) => !prevShowLogin);
  };

  const onCloseModal = () => setErrorMessage("");

  const resetForm = () => {
    setUsername(initialInputState);
    setPassword(initialInputState);
    setInputErrors({});
  };

  const validateForm = () => {
    !username.isValid &&
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        username: errorMessages.USERNAME,
      }));
    !password.isValid &&
      setInputErrors((prevErrors) => ({
        ...prevErrors,
        password: errorMessages.PASSWORD(6),
      }));
    return !!username.isValid && !!password.isValid;
  };

  const toggleIsPasswordVisible = (setter) =>
    setter((prevPassword) => ({
      ...prevPassword,
      isVisible: !prevPassword.isVisible,
    }));

  const handleSubmit = (event) => {
    event.preventDefault();
    !showLogin ? submitSignUp() : submitLogin();
  };
  const handleInputTouch = (setter) =>
    setter((prevState) => ({ ...prevState, isTouched: true }));

  const handleInputChange = (value, validators, setter) =>
    setter((prevState) => ({
      ...prevState,
      value,
      isValid: validate(value, validators),
    }));

  const submitLogin = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      setToastData({
        message: "Your data in invalid! Please correct it.",
        type: toastTypes.WARNING,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/account/login/`,
        {
          username: username.value,
          password: encryptPassword(password.value),
        }
      );
      login(response.data.user_id, response.data.token, response.data.username);
      history.push("/todos");
    } catch (error) {
      setErrorMessage(
        error.request.status === 400
          ? "Your credentials are incorrect. Please login again."
          : "An error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };

  const submitSignUp = async () => {
    const isFormValid = validateForm();

    if (!isFormValid) {
      setToastData({
        message: "Your data in invalid! Please correct it.",
        type: toastTypes.WARNING,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/account/register/`,
        {
          username: username.value,
          password: encryptPassword(password.value),
        }
      );
      setToastData({
        message: "Your account was created!",
        type: toastTypes.SUCCESS,
      });
      login(response.data.user_id, response.data.token, response.data.username);
      history.push("/todos");
    } catch (error) {
      setErrorMessage(
        error.request.status === 422
          ? "This user already exists! Please login."
          : "An error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      {errorMessage && (
        <Modal
          onClose={onCloseModal}
          buttonLabel={"OK"}
          message={errorMessage}
        />
      )}
      <StyledAuthentication isLoading={isLoading}>
        {toastData.message && <Toast {...toastData} onClean={setToastData} />}
        <StyledFormTitle className="page__card-title">
          {showLogin ? "Login" : "Create Account"}
        </StyledFormTitle>
        <form onSubmit={handleSubmit}>
          <StyledFormItem>
            <Input
              id="username"
              label={"Username"}
              isRequired={username.isRequired}
              value={username.value}
              isInvalid={!username.isValid && username.isTouched}
              onChange={(event) =>
                handleInputChange(
                  event.target.value,
                  [VALIDATOR_REQUIRE()],
                  setUsername
                )
              }
              onBlur={() => handleInputTouch(setUsername)}
              errorText={inputErrors.username}
            />
          </StyledFormItem>
          <StyledFormItem>
            <Input
              id="password"
              type={password.isVisible ? "text" : "password"}
              label={"Password"}
              isRequired={password.isRequired}
              value={password.value}
              isInvalid={!password.isValid && password.isTouched}
              onChange={(event) =>
                handleInputChange(
                  event.target.value,
                  showLogin ? [VALIDATOR_REQUIRE()] : [VALIDATOR_MINLENGTH(6)],
                  setPassword
                )
              }
              onBlur={() => handleInputTouch(setPassword)}
              errorText={inputErrors.password}
              icon={password.isVisible ? Hide : Show}
              iconText={password.isVisible ? "Hide password" : "Show password"}
              onIconClick={() => toggleIsPasswordVisible(setPassword)}
            />
          </StyledFormItem>
          <StyledFormButton>
            <Button
              label={showLogin ? "Login" : "Create Account"}
              type="submit"
              isLarge={true}
              onClick={handleSubmit}
            />
          </StyledFormButton>
        </form>
        <StyledFormFooter onClick={toggleShowLogin}>
          {showLogin ? "Create an Account" : "Already have an account?"}
        </StyledFormFooter>
      </StyledAuthentication>
    </Fragment>
  );
};

export default Authentication;
