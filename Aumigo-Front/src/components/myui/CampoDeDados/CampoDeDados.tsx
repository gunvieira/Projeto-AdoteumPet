

export default function CampoDeDados({ label, value }: { label: string; value: string }) {
    return (
        <div className="border border-gray-200 rounded-md p-3">
        <label className="text-sm text-gray-500">{label}</label>
            <p className="text-base text-gray-800">{value}</p>
        </div>
    );
}