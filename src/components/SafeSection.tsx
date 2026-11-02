import React from 'react';

/**
 * Error boundary around each invitation section: if one section fails on a
 * particular phone, it is hidden and the rest of the invitation still shows.
 */
export class SafeSection extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  declare props: { children: React.ReactNode };
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Section failed to render: ', error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
