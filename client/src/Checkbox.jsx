import { useState } from "react";


import Logo from '/logo.png'


const Checkbox = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
      </label>
      <span>{label}</span>
    
    <img src={Logo} alt='logo' width='100px' height='50px'/>
    </div>

  );
};

export default Checkbox;