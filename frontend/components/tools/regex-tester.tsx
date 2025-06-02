import React, { useState, useEffect } from 'react';

const flagOptions = [
    { label: 'Global (g)', value: 'g' },
    { label: 'Ignore Case (i)', value: 'i' },
    { label: 'Multiline (m)', value: 'm' },
    { label: 'DotAll (s)', value: 's' },
];

export default function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [testString, setTestString] = useState('');
    const [flags, setFlags] = useState<string[]>([]);
    const [error, setError] = useState<string>('');
    const [matches, setMatches] = useState<RegExpMatchArray[] | null>(null);

    useEffect(() => {
        try {
            const regex = new RegExp(pattern, flags.join(''));
            setError('');
            const allMatches = [...testString.matchAll(regex)];
            setMatches(allMatches.length > 0 ? allMatches : null);
        } catch (e: any) {
            setError(e.message);
            setMatches(null);
        }
    }, [pattern, testString, flags]);

    const handleFlagToggle = (flag: string) => {
        setFlags(prev => prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]);
    };

    const highlightMatches = () => {
        if (!matches) return testString;
        let result = '';
        let lastIndex = 0;
        matches.forEach(match => {
            const start = match.index ?? 0;
            const end = start + match[0].length;
            result += testString.slice(lastIndex, start);
            result += `<mark>${testString.slice(start, end)}</mark>`;
            lastIndex = end;
        });
        result += testString.slice(lastIndex);
        return result;
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Regex Tester</h2>
            <div className="mb-4">
                <label className="block font-medium">Regex Pattern:</label>
                <input
                    type="text"
                    className="border p-2 w-full"
                    value={pattern}
                    onChange={e => setPattern(e.target.value)}
                    placeholder="e.g. (\\w+)"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Test String:</label>
                <textarea
                    className="border p-2 w-full h-32"
                    value={testString}
                    onChange={e => setTestString(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium">Flags:</label>
                <div className="flex gap-4">
                    {flagOptions.map(flag => (
                        <label key={flag.value} className="flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={flags.includes(flag.value)}
                                onChange={() => handleFlagToggle(flag.value)}
                            />
                            {flag.label}
                        </label>
                    ))}
                </div>
            </div>
            {error && <p className="text-red-500">Regex Error: {error}</p>}
            <div className="mt-4">
                <label className="block font-medium">Match Result:</label>
                <div
                    className="border p-2 whitespace-pre-wrap bg-gray-100"
                    dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                />
            </div>
            {matches && (
                <div className="mt-4">
                    <h3 className="font-semibold mb-2">Match Details:</h3>
                    <ul className="list-disc pl-5">
                        {matches.map((match, idx) => (
                            <li key={idx}>
                                Match {idx + 1}: "{match[0]}" at index {match.index}
                                {match.length > 1 && (
                                    <ul className="list-disc pl-5 text-sm">
                                        {match.slice(1).map((group, gIdx) => (
                                            <li key={gIdx}>Group {gIdx + 1}: "{group}"</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
