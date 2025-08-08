import { Gamepad } from "lucide-react";

export default function Header({Title, UserName}: {Title: string, UserName: string}) {
  return (
    <header className="Header">

      <h1 className='Title' style={{textAlign: "center", fontWeight: "bold"}}>{Title}</h1>
      <span className='UserName'>Welcome Back,<br />{UserName}</span>
    </header>
  );
}