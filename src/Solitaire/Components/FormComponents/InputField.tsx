type Props = {
  value: string;
  setValue: (newVal: string) => void;
  label: string;
};

function InputField({ value, setValue, label }: Props) {
  return (
    <>
      <label className="block text-black text-sm font-bold mb-1">{label}</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

export default InputField;
