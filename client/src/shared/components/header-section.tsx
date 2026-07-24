type HeaderSectionProps = {
    title: string,
    content?: string
}

export default function HeaderSection({ title,content = ""}: HeaderSectionProps)  {
    return  <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
           { title }
        </h1>
        <p className="text-sm text-gray-500">
          { content }
        </p>
    </div>
}