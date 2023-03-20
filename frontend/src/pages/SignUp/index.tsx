import SignUpForm from "../../modules/Auth/components/SignUpForm";
import { Holder, Logo, LogoContainer } from "./styledComponents";
import JiteraLogo from "./../../assets/images/logo.png";

const SignUp: React.FC = () => {
  return (
    <Holder>
      <LogoContainer>
        <Logo src={JiteraLogo} />
      </LogoContainer>
      <SignUpForm />
    </Holder>
  );
};

export default SignUp;
