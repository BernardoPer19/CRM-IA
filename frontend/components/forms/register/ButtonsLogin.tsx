"use client"
import { Button } from "@/components/ui/button";

import { FaGoogle, FaGithub } from "react-icons/fa";

const ButtonsLogin = () => {
  const handleSocialLogin = (provider: string) => {
    // TODO: Implementar login social
    console.log(`Register with ${provider}`);
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("google")}
        className="w-full"
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => handleSocialLogin("github")}
        className="w-full"
      >
        <FaGithub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
};

export default ButtonsLogin;
