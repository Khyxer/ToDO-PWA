export const InputItem = ({ type, texto, isPass, value, onChange, maxLength }) => (
  <div className=" relative group">
    <input
      type={type}
      required
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      className="border-b-2 w-full bg-transparent text-[#4C4C4C] dark:text-[#d3d3d3c5] border-[#728AA1] dark:focus:border-[#d3d3d3c5] dark:valid:border-[#d3d3d3c5] focus:border-[#4C4C4Cc5] valid:border-[#4C4C4Cc5] placeholder:text-[#728AA1] px-2 text-lg outline-none peer"
    />
    <label
      className={`absolute left-2 duration-200 pointer-events-none text-base text-[#728AA1]
          peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-[#728aa17e]
          peer-valid:scale-75 peer-valid:-translate-y-6 peer-valid:text-[#728aa17e]
          ${isPass ? "peer-focus:left-1 peer-valid:left-1" : ""}`}
    >
      {texto}
    </label>
  </div>
);
