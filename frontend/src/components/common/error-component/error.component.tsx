type ErrorComponentProps = {
  error: Error;
};

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <div className="w-full h-full flex flex-col space-y-4 justify-center text-red-400 items-center">
      <img src="/assets/error-icon.svg" />
      <p className="text-2xl max-w-md text-center">{error.message}</p>
    </div>
  );
};

export default ErrorComponent;
