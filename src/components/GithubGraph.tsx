import { GitHubCalendar } from 'react-github-calendar';

export const GithubGraph = () => {
  // Theme to match the cyan cyber aesthetic
  const explicitTheme = {
    light: ['#18181b', '#083344', '#164e63', '#06b6d4', '#22d3ee'],
    dark: ['#18181b', '#083344', '#164e63', '#06b6d4', '#22d3ee'],
  };

  return (
    <div className="terminal-panel p-6 overflow-x-auto w-full border-l-4 border-l-cyan-400">
      <div className="text-cyan-400 font-mono text-sm mb-6">&gt; FETCHING_COMMIT_HISTORY...</div>
      <div className="min-w-[700px] flex justify-center">
        <GitHubCalendar 
          username="ishansaxena012" 
          theme={explicitTheme}
          colorScheme="dark"
          blockSize={14}
          blockMargin={5}
          fontSize={12}
        />
      </div>
    </div>
  );
};
