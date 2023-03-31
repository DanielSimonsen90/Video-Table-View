import { PureComponent } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundaryTypes";

export default class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
  public static getDerivedStateFromError(error: Error) {
    return { error };
  }

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { error } = this.state;

    return error && (
      <article className="error">
        <h1>{error.message}</h1>
        <pre>{error.stack}</pre>
      </article>
    ) || this.props.children;
  }
}