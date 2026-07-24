type Props = {
  title: string;
  description?: string;
};

export default function FormTitle({ title, description }: Props) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-900 font-mono">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}