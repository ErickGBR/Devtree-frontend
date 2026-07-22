import { Component, ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-8">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong</h1>
          <p className="text-gray-400 mb-4">An unexpected error occurred.</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
