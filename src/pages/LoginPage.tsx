import AuthForm from "@/components/AuthForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-hairy-primary to-hairy-tertiary p-6">
      <div className="mb-8 text-center">
        <img 
          src="/lovable-uploads/3547e277-3db5-473c-9772-6b0f5b4c5895.png" 
          alt="Hairy Buddy Token" 
          className="w-16 h-16 rounded-full bg-white p-2 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-white">Hairy Wallet</h1>
      </div>
      <AuthForm mode="login" />
    </div>
  );
};

export default LoginPage;
