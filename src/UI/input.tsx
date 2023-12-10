"use client";
export default function Input({
  register,
  title,
  registerName,
  handleBlur,
  type = "text",
}: {
  title: string;
  registerName: string;
  register: any;
  handleBlur: any;
  type?: string;
}) {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {title}
      </label>
      <div className="mt-2">
        <input
          type={type}
          {...register(registerName)}
          onBlur={handleBlur}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
      </div>
    </div>
  );
}
