import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-parchment flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-parchment-light rounded-xl border-2 border-vote-reject/40 p-8 text-center shadow-seal">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-vote-reject/20 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-vote-reject" />
              </div>

              <h1 className="text-3xl font-display font-bold text-burnt-umber mb-2">
                Something went wrong
              </h1>

              <p className="text-burnt-umber/70 mb-6 font-body">
                We encountered an unexpected error. Our scribes have been notified and are working to fix it.
              </p>

              {this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm font-display font-semibold text-burnt-umber/60 hover:text-burnt-umber mb-2">
                    Technical Details
                  </summary>
                  <div className="p-3 bg-burnt-umber/5 rounded border border-burnt-umber/20 text-xs font-mono text-burnt-umber/60 overflow-auto">
                    {this.state.error.toString()}
                  </div>
                </details>
              )}

              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-gold border-2 border-burnt-umber text-burnt-umber font-display font-semibold rounded-lg hover:bg-gold-light transition-all"
              >
                Try Again
              </button>

              <div className="mt-4">
                <a
                  href="/"
                  className="text-sm text-council-blue hover:text-council-blue/80 font-display"
                >
                  Return to Great Hall
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
