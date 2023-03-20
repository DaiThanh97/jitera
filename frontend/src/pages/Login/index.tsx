import LoginForm from "../../modules/Auth/components/LoginForm";
import { Holder, Logo, LogoContainer } from "./styledComponents";
import JiteraLogo from "./../../assets/images/logo.png";

const Login: React.FC = () => {
  return (
    <Holder>
      <LogoContainer>
        <Logo src={JiteraLogo} />
      </LogoContainer>
      <LoginForm />
    </Holder>
  );
};

export default Login;
