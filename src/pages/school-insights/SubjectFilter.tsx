
interface SubjectFilterProps {
  availableSubjects: string[];
  subjectFilter: string;
  setSubjectFilter: (subject: string) => void;
}

export function SubjectFilter({ availableSubjects, subjectFilter, setSubjectFilter }: SubjectFilterProps) {
  return (
    <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
      <label htmlFor="subject-filter" className="font-medium text-gray-700">
        Filter by Subject:
      </label>
      <select
        id="subject-filter"
        className="border rounded px-2 py-2 text-sm md:w-64 w-full focus:outline-none"
        value={subjectFilter}
        onChange={(e) => setSubjectFilter(e.target.value)}
      >
        <option value="All">All Subjects</option>
        {availableSubjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
}
